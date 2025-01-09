import {app, BrowserWindow} from 'electron';
// import { createRequire } from 'node:module'
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import isDev from 'electron-is-dev';
import {autoUpdater} from 'electron-updater';

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged
	? process.env.DIST
	: path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;

function createWindow() {
	win = new BrowserWindow({
		width: 1200,
		height: 800,
		autoHideMenuBar: true,
		icon: path.join(
			__dirname,
			'..',
			'public',
			process.platform === 'win32'
				? 'medexer-logo.ico'
				: process.platform === 'darwin'
				? 'medexer-logo.icns'
				: 'medexer-logo.png'
		),
		webPreferences: {
			// devTools: false,
			nodeIntegration: true,
			contextIsolation: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		...(process.platform === 'darwin' && {
			dockOptions: {
				icon: path.join(__dirname, '..', 'public', 'medexer-logo.icns'),
				iconSize: 32,
			},
		}),
	});

	// Prevent opening DevTools with keyboard shortcuts
	// win.webContents.on('before-input-event', (event, input) => {
	// 	if ((input.control || input.meta) && input.key.toLowerCase() === 'i') {
	// 		event.preventDefault();
	// 	}
	// });

	// Test active push message to Renderer-process.
	win.webContents.on('did-finish-load', () => {
		win?.webContents.send(
			'main-process-message',
			new Date().toLocaleString()
		);
	});

	// if (VITE_DEV_SERVER_URL) {
	// } else {
	// 	// win.loadFile('dist/index.html')
	// 	win.loadFile(path.join(RENDERER_DIST, 'index.html'));
	// }

	if (VITE_DEV_SERVER_URL) {
		win.loadURL(VITE_DEV_SERVER_URL!);
	} else {
		win.loadURL(`file://${path.resolve(process.env.DIST!, 'index.html')}`);
	}

	win.webContents.setWindowOpenHandler(({url}) => {
		require('electron').shell.openExternal(url);
		return {action: 'deny'};
	});
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
		win = null;
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.on('ready', () => {
	autoUpdater.checkForUpdatesAndNotify();
	console.log('checking for updates');
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

app.whenReady().then(createWindow);
