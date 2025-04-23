"use strict";
const electron = require("electron");
var ElectronAppEvents = /* @__PURE__ */ ((ElectronAppEvents2) => {
  ElectronAppEvents2["PRINTER_UTILS_USB_PRINT"] = "PRINTER_UTILS_USB_PRINT";
  ElectronAppEvents2["PRINTER_UTILS_USB_PRINT_TEST"] = "PRINTER_UTILS_USB_PRINT_TEST";
  ElectronAppEvents2["PRINTER_UTILS_USB_TEST"] = "PRINTER_UTILS_USB_TEST";
  ElectronAppEvents2["MINIMIZE_WINDOW"] = "MINIMIZE_WINDOW";
  ElectronAppEvents2["MAXIMIZE_WINDOW"] = "MAXIMIZE_WINDOW";
  ElectronAppEvents2["EXIT_WINDOW"] = "EXIT_WINDOW";
  ElectronAppEvents2["RELOAD_WINDOW"] = "RELOAD_WINDOW";
  ElectronAppEvents2["OPEN_DEV_TOOLS"] = "OPEN_DEV_TOOLS";
  ElectronAppEvents2["WINDOW_XY_AXIS"] = "WINDOW_XY_AXIS";
  ElectronAppEvents2["CHECK_FOR_UPDATES"] = "CHECK_FOR_UPDATES";
  ElectronAppEvents2["START_UPDATE"] = "START_UPDATE";
  ElectronAppEvents2["INSTALL_UPDATE"] = "INSTALL_UPDATE";
  return ElectronAppEvents2;
})(ElectronAppEvents || {});
electron.contextBridge.exposeInMainWorld("electron", {
  // Window controls
  minimizeWindow: () => electron.ipcRenderer.send(ElectronAppEvents.MINIMIZE_WINDOW),
  maximizeWindow: () => electron.ipcRenderer.send(ElectronAppEvents.MAXIMIZE_WINDOW),
  setWindowXYAxis: (x, y) => {
    if (typeof x === "number" && !isNaN(x) && typeof y === "number" && !isNaN(y)) {
      electron.ipcRenderer.send(ElectronAppEvents.WINDOW_XY_AXIS, { x, y });
    }
  },
  exitWindow: () => electron.ipcRenderer.send(ElectronAppEvents.EXIT_WINDOW),
  reloadWindow: () => electron.ipcRenderer.send(ElectronAppEvents.RELOAD_WINDOW),
  openDevTools: () => electron.ipcRenderer.send(ElectronAppEvents.OPEN_DEV_TOOLS),
  // App info
  getVersion: () => electron.ipcRenderer.invoke("app:get-version"),
  getPath: (name) => electron.ipcRenderer.invoke("app:get-path", name),
  // Updates
  checkForUpdates: () => electron.ipcRenderer.invoke(ElectronAppEvents.CHECK_FOR_UPDATES),
  startUpdate: () => electron.ipcRenderer.invoke(ElectronAppEvents.START_UPDATE),
  installUpdate: () => electron.ipcRenderer.invoke(ElectronAppEvents.INSTALL_UPDATE),
  onUpdateAvailable: (callback) => {
    electron.ipcRenderer.on("update:available", (_event, info) => callback(info));
  },
  onUpdateProgress: (callback) => {
    electron.ipcRenderer.on("update:progress", (_event, progress) => callback(progress));
  },
  onUpdateDownloaded: (callback) => {
    electron.ipcRenderer.on("update:downloaded", (_event, info) => callback(info));
  },
  // Printer
  printer: {
    print: (data) => electron.ipcRenderer.invoke(ElectronAppEvents.PRINTER_UTILS_USB_PRINT, data),
    test: () => electron.ipcRenderer.invoke(ElectronAppEvents.PRINTER_UTILS_USB_TEST),
    onDeviceAttached: (callback) => {
      electron.ipcRenderer.on("printer_utils:attach-usb", (_event, config) => callback(config));
    },
    onDeviceDetached: (callback) => {
      electron.ipcRenderer.on("printer_utils:detach-usb", () => callback());
    }
  }
});
