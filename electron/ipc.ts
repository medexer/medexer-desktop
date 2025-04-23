import { BrowserWindow, ipcMain } from 'electron';
import { ElectronAppEvents } from './interfaces';
// import { initializePrintWithUsb } from './usb_printer';
// import { $DemoiInvoiceData } from './utils/demo_invoice';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';

export function setupIPC(window: BrowserWindow) {
  // Add listeners for the IPC events
  // ipcMain.handle(ElectronAppEvents.PRINTER_UTILS_USB_PRINT, async (event, data) =>
  //   initializePrintWithUsb(data)
  // );
  // ipcMain.handle(ElectronAppEvents.PRINTER_UTILS_USB_TEST, async (event, data) =>
  //   initializePrintWithUsb($DemoiInvoiceData)
  // );

  // Window controls
  ipcMain.on(ElectronAppEvents.OPEN_DEV_TOOLS, () => {
    window?.webContents.openDevTools();
  });

  ipcMain.on(ElectronAppEvents.RELOAD_WINDOW, () => {
    window?.reload();
  });

  ipcMain.on(ElectronAppEvents.MINIMIZE_WINDOW, () => {
    window?.minimize();
  });

  // Improved window drag implementation
  ipcMain.on(ElectronAppEvents.WINDOW_XY_AXIS, (event, args) => {
    // Make sure we have valid values
    if (
      typeof args.x === 'number' &&
      typeof args.y === 'number' &&
      !isNaN(args.x) &&
      !isNaN(args.y)
    ) {
      try {
        // Get current position
        const [currentX, currentY] = window.getPosition();

        // Apply movement with animation flag set to true for smoother movement
        window.setPosition(Math.round(currentX + args.x), Math.round(currentY + args.y), true);

        // Log for debugging
        console.log(
          `Window moved by ${args.x}, ${args.y} to [${currentX + args.x}, ${currentY + args.y}]`
        );
      } catch (err) {
        console.error('Error moving window:', err);
      }
    }
  });

  ipcMain.on(ElectronAppEvents.EXIT_WINDOW, () => {
    window?.close();
  });

  ipcMain.on(ElectronAppEvents.MAXIMIZE_WINDOW, () => {
    if (window?.isMaximized()) {
      window?.unmaximize();
    } else {
      window?.maximize();
    }
  });

  // App info
  ipcMain.handle('app:get-version', () => {
    return process.env.npm_package_version;
  });

  ipcMain.handle('app:get-path', (event, name) => {
    //@ts-ignore
    return window.webContents.session.getPath(name);
  });

  // Update handlers
  ipcMain.handle(ElectronAppEvents.CHECK_FOR_UPDATES, async () => {
    try {
      log.info('Manually checking for updates...');
      const result = await autoUpdater.checkForUpdates();
      log.info('Update check result:', result);
      return result;
    } catch (error) {
      log.error('Error checking for updates:', error);
      throw error;
    }
  });

  ipcMain.handle(ElectronAppEvents.START_UPDATE, async () => {
    try {
      log.info('Starting update download...');
      const result = await autoUpdater.downloadUpdate();
      log.info('Update download complete:', result);
      return result;
    } catch (error) {
      log.error('Error downloading update:', error);
      throw error;
    }
  });

  ipcMain.handle(ElectronAppEvents.INSTALL_UPDATE, () => {
    log.info('Installing update...');
    autoUpdater.quitAndInstall(false, true);
  });
;
}
