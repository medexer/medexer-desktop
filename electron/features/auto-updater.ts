import { autoUpdater } from 'electron-updater';
import { BrowserWindow } from 'electron';
import log from 'electron-log';

export function setupAutoUpdater(window: BrowserWindow) {
  // Configure logging
  autoUpdater.logger = log;
  autoUpdater.autoDownload = false;
  autoUpdater.autoInstallOnAppQuit = true;
  

  // Check for updates
  const checkForUpdates = () => {
    autoUpdater.checkForUpdates().catch((err) => {
      log.error('Error checking for updates:', err);
    });
  };

  // Initial check
  checkForUpdates();

  // Check periodically (every 4 hours)
  setInterval(checkForUpdates, 4 * 60 * 60 * 1000);

  // Update events
  autoUpdater.on('checking-for-update', () => {
    log.info('Checking for updates...');
    window.webContents.send('update:checking');
  });

  autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info);
    window.webContents.send('update:available', info);
  });

  autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available:', info);
    window.webContents.send('update:not-available');
  });

  autoUpdater.on('error', (err) => {
    log.error('Update error:', err);
    window.webContents.send('update:error', err.message);
  });

  autoUpdater.on('download-progress', (progress) => {
    log.info(`Download progress: ${progress.percent}%`);
    window.webContents.send('update:progress', progress);
  });

  autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded:', info);
    window.webContents.send('update:downloaded', info);
  });

  // Handle IPC events from renderer
  window.webContents.ipc.handle('update:start-download', () => {
    autoUpdater.downloadUpdate().catch((err) => {
      log.error('Error downloading update:', err);
    });
  });

  window.webContents.ipc.handle('update:install', () => {
    autoUpdater.quitAndInstall();
  });


} 