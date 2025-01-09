import { app as i, BrowserWindow as r } from "electron";
import { fileURLToPath as l } from "node:url";
import e from "node:path";
const n = e.dirname(l(import.meta.url));
process.env.APP_ROOT = e.join(n, "..");
const s = process.env.VITE_DEV_SERVER_URL, m = e.join(process.env.APP_ROOT, "dist-electron"), t = e.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = s ? e.join(process.env.APP_ROOT, "public") : t;
let o;
function c() {
  o = new r({
    width: 1200,
    height: 800,
    icon: e.join(
      n,
      "..",
      "public",
      process.platform === "win32" ? "medexer-logo.ico" : process.platform === "darwin" ? "medexer-logo.icns" : "medexer-logo.png"
    ),
    webPreferences: {
      preload: e.join(n, "preload.mjs")
      // devTools: false,
    },
    ...process.platform === "darwin" && {
      dockOptions: {
        icon: e.join(n, "..", "public", "medexer-logo.icns"),
        iconSize: 32
      }
    }
  }), o.webContents.on("did-finish-load", () => {
    o == null || o.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  }), s ? o.loadURL(s) : o.loadFile(e.join(t, "index.html"));
}
i.on("window-all-closed", () => {
  process.platform !== "darwin" && (i.quit(), o = null);
});
i.on("activate", () => {
  r.getAllWindows().length === 0 && c();
});
i.whenReady().then(c);
export {
  m as MAIN_DIST,
  t as RENDERER_DIST,
  s as VITE_DEV_SERVER_URL
};
