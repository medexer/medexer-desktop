import { contextBridge, ipcRenderer } from 'electron';
import { ElectronAppEvents, UpdateInfo, UpdateProgress, PrinterConfig } from './interfaces';

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('electron', {
  // Window controls
  minimizeWindow: () => ipcRenderer.send(ElectronAppEvents.MINIMIZE_WINDOW),
  maximizeWindow: () => ipcRenderer.send(ElectronAppEvents.MAXIMIZE_WINDOW),
  setWindowXYAxis: (x: number, y: number) => {
    // Ensure we send valid numbers only
    if (typeof x === 'number' && !isNaN(x) && typeof y === 'number' && !isNaN(y)) {
      ipcRenderer.send(ElectronAppEvents.WINDOW_XY_AXIS, { x, y });
    }
  },
  exitWindow: () => ipcRenderer.send(ElectronAppEvents.EXIT_WINDOW),
  reloadWindow: () => ipcRenderer.send(ElectronAppEvents.RELOAD_WINDOW),
  openDevTools: () => ipcRenderer.send(ElectronAppEvents.OPEN_DEV_TOOLS),

  // App info
  getVersion: () => ipcRenderer.invoke('app:get-version'),
  getPath: (name: string) => ipcRenderer.invoke('app:get-path', name),

  // Updates
  checkForUpdates: () => ipcRenderer.invoke(ElectronAppEvents.CHECK_FOR_UPDATES),
  startUpdate: () => ipcRenderer.invoke(ElectronAppEvents.START_UPDATE),
  installUpdate: () => ipcRenderer.invoke(ElectronAppEvents.INSTALL_UPDATE),
  onUpdateAvailable: (callback: (info: UpdateInfo) => void) => {
    ipcRenderer.on('update:available', (_event, info) => callback(info));
  },
  onUpdateProgress: (callback: (progress: UpdateProgress) => void) => {
    ipcRenderer.on('update:progress', (_event, progress) => callback(progress));
  },
  onUpdateDownloaded: (callback: (info: UpdateInfo) => void) => {
    ipcRenderer.on('update:downloaded', (_event, info) => callback(info));
  },

  // Printer
  printer: {
    print: (data: any) => ipcRenderer.invoke(ElectronAppEvents.PRINTER_UTILS_USB_PRINT, data),
    test: () => ipcRenderer.invoke(ElectronAppEvents.PRINTER_UTILS_USB_TEST),
    onDeviceAttached: (callback: (config: PrinterConfig) => void) => {
      ipcRenderer.on('printer_utils:attach-usb', (_event, config) => callback(config));
    },
    onDeviceDetached: (callback: () => void) => {
      ipcRenderer.on('printer_utils:detach-usb', () => callback());
    },
  },
});

