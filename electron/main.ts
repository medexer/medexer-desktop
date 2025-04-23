import { Server } from 'http';
import path from 'node:path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import log from 'electron-log';
import serve from 'electron-serve';
import { autoUpdater } from 'electron-updater';
import { setupAutoUpdater } from './features/auto-updater';
import { setupIPC } from './ipc';

//-------------------------------------------------------------------
// Logging & Auto-updater Setup (Single initialization)
//-------------------------------------------------------------------
// Configure logger once
log.transports.file.level = 'info';
log.info('App starting...');

// Configure auto-updater once
autoUpdater.logger = log;

// Initialize electron-serve
const loadURL = serve({
  directory: 'dist',
  scheme: 'app',
});

// The built directory structure
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js

const appRoot = app.isPackaged ? app.getAppPath() : app.getAppPath();
process.env.DIST = path.join(appRoot, 'dist');
process.env.VITE_PUBLIC = process.env.DIST;

// Fallback if structure is different
if (!require('fs').existsSync(process.env.DIST)) {
  log.warn(
    `DIST path ${process.env.DIST} not found using app.getAppPath(). Trying relative path...`
  );
  process.env.DIST = path.join(__dirname, '../dist');
  process.env.VITE_PUBLIC = process.env.DIST;
  if (!require('fs').existsSync(process.env.DIST)) {
    log.error(
      `CRITICAL: Cannot find dist directory at ${process.env.DIST}. Please check build output and packaging structure.`
    );
  }
}

log.info(`DIST path set to: ${process.env.DIST}`);
log.info(`VITE_PUBLIC path set to: ${process.env.VITE_PUBLIC}`);

let win: BrowserWindow | null;
let loaderWin: BrowserWindow | null;
const { VITE_DEV_SERVER_URL } = process.env;

// Function to get loader path
function getLoaderPath() {
  // In development, loader.html is in the electron directory
  const devPath = path.join(__dirname, '..', 'electron', 'loader.html');
  // In production, loader.html should be in dist-electron
  const prodPath = path.join(__dirname, 'loader.html');

  // Check which path exists
  if (require('fs').existsSync(devPath)) {
    log.info('Using development loader path:', devPath);
    return devPath;
  }
  if (require('fs').existsSync(prodPath)) {
    log.info('Using production loader path:', prodPath);
    return prodPath;
  }

  log.error('Loader file not found in either location:', { devPath, prodPath });
  throw new Error('Loader file not found');
}

// Function to update loader progress
function updateLoaderProgress(progress: number, status: string) {
  if (loaderWin && !loaderWin.isDestroyed()) {
    loaderWin.webContents.send('loading-progress', { progress, status });
  }
}

async function createLoader() {
  loaderWin = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
    center: true, // Center the loader window
  });

  try {
    const loaderPath = getLoaderPath();
    await loaderWin.loadFile(loaderPath);
    loaderWin.show();
    return loaderWin;
  } catch (error) {
    log.error('Failed to create loader window:', error);
    if (loaderWin && !loaderWin.isDestroyed()) {
      loaderWin.close();
      loaderWin = null;
    }
    throw error;
  }
}

async function setupMainWindow(win: BrowserWindow) {
  // Setup window event handlers first
  const setupPromise = new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      handleReady();
    }, 500);

    let isResolved = false;

    // Listen for the window to be ready
    const handleReady = () => {
      log.info('Window is ready to be show');
      if (!isResolved) {
        isResolved = true;
        resolve();
      }
    };

    // Handle window ready state - listen to both events as fallback
    win.once('ready-to-show', handleReady);
    win.webContents.once('did-finish-load', handleReady);

    // Handle errors during load
    win.webContents.once('did-fail-load', (_, errorCode, errorDescription) => {
      if (!isResolved) {
        isResolved = true;
        reject(new Error(`Failed to load window: ${errorDescription} (${errorCode})`));
      }
    });

    // Additional error handler
    win.webContents.once('crashed', () => {
      if (!isResolved) {
        isResolved = true;
        reject(new Error('Window crashed during setup'));
      }
    });
  });

  try {
    // Setup features
    log.info('Setting up IPC...');
    setupIPC(win);

    log.info('Setting up auto-updater...');
    setupAutoUpdater(win);
    // Wait for setup to complete
    await setupPromise;
  } catch (error) {
    log.error('Error during window setup:', error);
    throw error;
  }
}

async function createWindow() {
  try {
    // Create and show loader first
    await createLoader();
    updateLoaderProgress(10, 'Initializing application...');

    // Create main window but keep it hidden
    win = new BrowserWindow({
      fullscreenable: true,
      icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
      show: false,
      hasShadow: false,
      darkTheme:false, 
      autoHideMenuBar: true,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        sandbox: false,
        allowRunningInsecureContent: true,
      },
      frame: true,
      simpleFullscreen: true,
    });

    // Set up window close handler early
    win.on('closed', () => {
      win = null;
      if (loaderWin && !loaderWin.isDestroyed()) {
        loaderWin.close();
        loaderWin = null;
      }
    });

    updateLoaderProgress(30, 'Loading resources...');

    // Load content
    try {
      if (VITE_DEV_SERVER_URL) {
        updateLoaderProgress(50, 'Connecting to development server...');
        await win.loadURL(VITE_DEV_SERVER_URL);
      } else {
        updateLoaderProgress(50, 'Loading application content...');
        await loadURL(win);
      }
    } catch (loadError) {
      log.error('Failed to load window content:', loadError);
      throw loadError;
    }

    if (!win || win.isDestroyed()) {
      throw new Error('Window was destroyed during content load');
    }

    // Setup features and wait for window to be ready
    updateLoaderProgress(70, 'Setting up features...');
    await setupMainWindow(win);

    // Window is ready, prepare for display
    updateLoaderProgress(90, 'Preparing display...');

    if (win && !win.isDestroyed()) {
      try {
        // Set window bounds
        const { screen } = require('electron');
        const primaryDisplay = screen.getPrimaryDisplay();
        const { width, height } = primaryDisplay.workAreaSize;
        win.setBounds({ x: 0, y: 0, width, height });

        // Configure external link handling
        win.webContents.setWindowOpenHandler(({ url }) => {
          log.info(`Opening external URL: ${url}`);
          shell.openExternal(url);
          return { action: 'deny' };
        });

        // Final display - ensure window is ready before showing
        updateLoaderProgress(95, 'Finalizing application setup...');

        // Static 5-second delay for consistent loading experience
        log.info('Waiting for 5 seconds before showing main window...');
        await new Promise((resolve) => setTimeout(resolve, 5000));

        updateLoaderProgress(100, 'Ready!');

        if (!win.isDestroyed()) {
          win.show();
          win.focus();
          log.info('Main window displayed successfully');
        }

        // Close loader after a short delay to ensure smooth transition
        setTimeout(() => {
          if (loaderWin && !loaderWin.isDestroyed()) {
            loaderWin.close();
            loaderWin = null;
          }
        }, 500);
      } catch (displayError) {
        log.error('Error preparing window for display:', displayError);
        throw displayError;
      }
    }
  } catch (err) {
    const error = err as Error;
    log.error('Error during window creation or setup:', error);
    updateLoaderProgress(100, `Error: ${error.message || 'Failed to load application'}`);

    if (loaderWin && !loaderWin.isDestroyed()) {
      loaderWin.webContents.send('loading-progress', {
        progress: 100,
        status: `Error: ${error.message || 'Failed to load application'}`,
        error: true,
      });

      // Show error for 3 seconds before closing
      setTimeout(() => {
        if (loaderWin && !loaderWin.isDestroyed()) {
          loaderWin.close();
          loaderWin = null;
        }
      }, 3000);
    }

    // Clean up main window if it exists
    if (win && !win.isDestroyed()) {
      win.destroy();
      win = null;
    }

    throw error;
  }
}

// --- App Lifecycle Events ---
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    log.info('App activated with no windows open, creating new window.');
    createWindow();
  }
});

app.whenReady().then(async () => {
  try {
    await createWindow();
  } catch (err) {
    const error = err as Error;
    log.error('Error during app initialization:', error);
  }
});

app.on('window-all-closed', () => {
  log.info('All windows closed.');
  if (process.platform !== 'darwin') {
    log.info('Quitting app (non-macOS).');
    app.quit();
  }
});

app.on('ready', () => {
  log.info('App ready event (checking for updates).');
  if (!app.isPackaged) {
    log.warn('Skipping update check in development mode.');
  } else {
    autoUpdater.checkForUpdatesAndNotify();
  }
});
