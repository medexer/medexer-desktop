export enum ElectronAppEvents {
  // Printer events
  PRINTER_UTILS_USB_PRINT = 'PRINTER_UTILS_USB_PRINT',
  PRINTER_UTILS_USB_PRINT_TEST = 'PRINTER_UTILS_USB_PRINT_TEST',
  PRINTER_UTILS_USB_TEST = 'PRINTER_UTILS_USB_TEST',

  // Window controls
  MINIMIZE_WINDOW = 'MINIMIZE_WINDOW',
  MAXIMIZE_WINDOW = 'MAXIMIZE_WINDOW',
  EXIT_WINDOW = 'EXIT_WINDOW',
  RELOAD_WINDOW = 'RELOAD_WINDOW',
  OPEN_DEV_TOOLS = 'OPEN_DEV_TOOLS',
  WINDOW_XY_AXIS="WINDOW_XY_AXIS",

  // Update events
  CHECK_FOR_UPDATES = 'CHECK_FOR_UPDATES',
  START_UPDATE = 'START_UPDATE',
  INSTALL_UPDATE = 'INSTALL_UPDATE'
}

export interface UpdateInfo {
  version: string;
  releaseDate: string;
  releaseNotes?: string;
}

export interface UpdateProgress {
  bytesPerSecond: number;
  percent: number;
  transferred: number;
  total: number;
}

export interface PrinterConfig {
  deviceId: string;
  vendorId: number;
  productId: number;
}

// Expose these types to the renderer process
declare global {
  interface Window {
    electron: {
      // Window controls
      minimizeWindow: () => void;
      maximizeWindow: () => void;
      exitWindow: () => void;
      reloadWindow: () => void;
      openDevTools: () => void;
      setWindowXYAxis: (x: number, y: number) => void;

      // App info
      getVersion: () => Promise<string>;
      getPath: (name: string) => Promise<string>;

      // Updates
      checkForUpdates: () => Promise<void>;
      startUpdate: () => Promise<void>;
      installUpdate: () => Promise<void>;
      onUpdateAvailable: (callback: (info: UpdateInfo) => void) => void;
      onUpdateProgress: (callback: (progress: UpdateProgress) => void) => void;
      onUpdateDownloaded: (callback: (info: UpdateInfo) => void) => void;

      // Printer
      printer: {
        print: (data: any) => Promise<void>;
        test: () => Promise<void>;
        onDeviceAttached: (callback: (config: PrinterConfig) => void) => void;
        onDeviceDetached: (callback: () => void) => void;
      };
    };
  }
}
