import bt, { app as Rt, BrowserWindow as Hi } from "electron";
import { fileURLToPath as Lu } from "node:url";
import je from "node:path";
import Ns from "events";
import Nr from "crypto";
import Uu from "tty";
import qi from "util";
import ji from "os";
import ft from "fs";
import Dr from "stream";
import Jt from "url";
import ku from "string_decoder";
import Mu from "constants";
import Ds from "assert";
import se from "path";
import Tn from "child_process";
import Ps from "zlib";
import Bu from "http";
var Le = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Zn = {}, ei = {}, It = {};
Object.defineProperty(It, "__esModule", { value: !0 });
It.CancellationError = It.CancellationToken = void 0;
const Hu = Ns;
class qu extends Hu.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Ri());
    const r = () => {
      if (n != null)
        try {
          this.removeListener("cancel", n), n = null;
        } catch {
        }
    };
    let n = null;
    return new Promise((i, o) => {
      let a = null;
      if (n = () => {
        try {
          a != null && (a(), a = null);
        } finally {
          o(new Ri());
        }
      }, this.cancelled) {
        n();
        return;
      }
      this.onCancel(n), t(i, o, (s) => {
        a = s;
      });
    }).then((i) => (r(), i)).catch((i) => {
      throw r(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
It.CancellationToken = qu;
class Ri extends Error {
  constructor() {
    super("cancelled");
  }
}
It.CancellationError = Ri;
var re = {}, Ii = { exports: {} }, Qr = { exports: {} }, ti, xo;
function ju() {
  if (xo) return ti;
  xo = 1;
  var e = 1e3, t = e * 60, r = t * 60, n = r * 24, i = n * 7, o = n * 365.25;
  ti = function(f, c) {
    c = c || {};
    var h = typeof f;
    if (h === "string" && f.length > 0)
      return a(f);
    if (h === "number" && isFinite(f))
      return c.long ? l(f) : s(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function a(f) {
    if (f = String(f), !(f.length > 100)) {
      var c = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        f
      );
      if (c) {
        var h = parseFloat(c[1]), g = (c[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function s(f) {
    var c = Math.abs(f);
    return c >= n ? Math.round(f / n) + "d" : c >= r ? Math.round(f / r) + "h" : c >= t ? Math.round(f / t) + "m" : c >= e ? Math.round(f / e) + "s" : f + "ms";
  }
  function l(f) {
    var c = Math.abs(f);
    return c >= n ? d(f, c, n, "day") : c >= r ? d(f, c, r, "hour") : c >= t ? d(f, c, t, "minute") : c >= e ? d(f, c, e, "second") : f + " ms";
  }
  function d(f, c, h, g) {
    var v = c >= h * 1.5;
    return Math.round(f / h) + " " + g + (v ? "s" : "");
  }
  return ti;
}
var ri, Lo;
function Fs() {
  if (Lo) return ri;
  Lo = 1;
  function e(t) {
    n.debug = n, n.default = n, n.coerce = d, n.disable = a, n.enable = o, n.enabled = s, n.humanize = ju(), n.destroy = f, Object.keys(t).forEach((c) => {
      n[c] = t[c];
    }), n.names = [], n.skips = [], n.formatters = {};
    function r(c) {
      let h = 0;
      for (let g = 0; g < c.length; g++)
        h = (h << 5) - h + c.charCodeAt(g), h |= 0;
      return n.colors[Math.abs(h) % n.colors.length];
    }
    n.selectColor = r;
    function n(c) {
      let h, g = null, v, w;
      function S(...b) {
        if (!S.enabled)
          return;
        const y = S, T = Number(/* @__PURE__ */ new Date()), R = T - (h || T);
        y.diff = R, y.prev = h, y.curr = T, h = T, b[0] = n.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
        let H = 0;
        b[0] = b[0].replace(/%([a-zA-Z%])/g, (C, $) => {
          if (C === "%%")
            return "%";
          H++;
          const m = n.formatters[$];
          if (typeof m == "function") {
            const U = b[H];
            C = m.call(y, U), b.splice(H, 1), H--;
          }
          return C;
        }), n.formatArgs.call(y, b), (y.log || n.log).apply(y, b);
      }
      return S.namespace = c, S.useColors = n.useColors(), S.color = n.selectColor(c), S.extend = i, S.destroy = n.destroy, Object.defineProperty(S, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (v !== n.namespaces && (v = n.namespaces, w = n.enabled(c)), w),
        set: (b) => {
          g = b;
        }
      }), typeof n.init == "function" && n.init(S), S;
    }
    function i(c, h) {
      const g = n(this.namespace + (typeof h > "u" ? ":" : h) + c);
      return g.log = this.log, g;
    }
    function o(c) {
      n.save(c), n.namespaces = c, n.names = [], n.skips = [];
      let h;
      const g = (typeof c == "string" ? c : "").split(/[\s,]+/), v = g.length;
      for (h = 0; h < v; h++)
        g[h] && (c = g[h].replace(/\*/g, ".*?"), c[0] === "-" ? n.skips.push(new RegExp("^" + c.slice(1) + "$")) : n.names.push(new RegExp("^" + c + "$")));
    }
    function a() {
      const c = [
        ...n.names.map(l),
        ...n.skips.map(l).map((h) => "-" + h)
      ].join(",");
      return n.enable(""), c;
    }
    function s(c) {
      if (c[c.length - 1] === "*")
        return !0;
      let h, g;
      for (h = 0, g = n.skips.length; h < g; h++)
        if (n.skips[h].test(c))
          return !1;
      for (h = 0, g = n.names.length; h < g; h++)
        if (n.names[h].test(c))
          return !0;
      return !1;
    }
    function l(c) {
      return c.toString().substring(2, c.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(c) {
      return c instanceof Error ? c.stack || c.message : c;
    }
    function f() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return n.enable(n.load()), n;
  }
  return ri = e, ri;
}
var Uo;
function Gu() {
  return Uo || (Uo = 1, function(e, t) {
    t.formatArgs = n, t.save = i, t.load = o, t.useColors = r, t.storage = a(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function r() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function n(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      l.splice(1, 0, d, "color: inherit");
      let f = 0, c = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (f++, h === "%c" && (c = f));
      }), l.splice(c, 0, d);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Fs()(t);
    const { formatters: s } = e.exports;
    s.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(Qr, Qr.exports)), Qr.exports;
}
var Zr = { exports: {} }, ni, ko;
function Vu() {
  return ko || (ko = 1, ni = (e, t) => {
    t = t || process.argv;
    const r = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", n = t.indexOf(r + e), i = t.indexOf("--");
    return n !== -1 && (i === -1 ? !0 : n < i);
  }), ni;
}
var ii, Mo;
function Wu() {
  if (Mo) return ii;
  Mo = 1;
  const e = ji, t = Vu(), r = process.env;
  let n;
  t("no-color") || t("no-colors") || t("color=false") ? n = !1 : (t("color") || t("colors") || t("color=true") || t("color=always")) && (n = !0), "FORCE_COLOR" in r && (n = r.FORCE_COLOR.length === 0 || parseInt(r.FORCE_COLOR, 10) !== 0);
  function i(s) {
    return s === 0 ? !1 : {
      level: s,
      hasBasic: !0,
      has256: s >= 2,
      has16m: s >= 3
    };
  }
  function o(s) {
    if (n === !1)
      return 0;
    if (t("color=16m") || t("color=full") || t("color=truecolor"))
      return 3;
    if (t("color=256"))
      return 2;
    if (s && !s.isTTY && n !== !0)
      return 0;
    const l = n ? 1 : 0;
    if (process.platform === "win32") {
      const d = e.release().split(".");
      return Number(process.versions.node.split(".")[0]) >= 8 && Number(d[0]) >= 10 && Number(d[2]) >= 10586 ? Number(d[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI"].some((d) => d in r) || r.CI_NAME === "codeship" ? 1 : l;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const d = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return d >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : (r.TERM === "dumb", l);
  }
  function a(s) {
    const l = o(s);
    return i(l);
  }
  return ii = {
    supportsColor: a,
    stdout: a(process.stdout),
    stderr: a(process.stderr)
  }, ii;
}
var Bo;
function Yu() {
  return Bo || (Bo = 1, function(e, t) {
    const r = Uu, n = qi;
    t.init = f, t.log = s, t.formatArgs = o, t.save = l, t.load = d, t.useColors = i, t.destroy = n.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = Wu();
      h && (h.stderr || h).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, g) => {
      const v = g.substring(6).toLowerCase().replace(/_([a-z])/g, (S, b) => b.toUpperCase());
      let w = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(w) ? w = !0 : /^(no|off|false|disabled)$/i.test(w) ? w = !1 : w === "null" ? w = null : w = Number(w), h[v] = w, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : r.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: g, useColors: v } = this;
      if (v) {
        const w = this.color, S = "\x1B[3" + (w < 8 ? w : "8;5;" + w), b = `  ${S};1m${g} \x1B[0m`;
        h[0] = b + h[0].split(`
`).join(`
` + b), h.push(S + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = a() + g + " " + h[0];
    }
    function a() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...h) {
      return process.stderr.write(n.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function f(h) {
      h.inspectOpts = {};
      const g = Object.keys(t.inspectOpts);
      for (let v = 0; v < g.length; v++)
        h.inspectOpts[g[v]] = t.inspectOpts[g[v]];
    }
    e.exports = Fs()(t);
    const { formatters: c } = e.exports;
    c.o = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, c.O = function(h) {
      return this.inspectOpts.colors = this.useColors, n.inspect(h, this.inspectOpts);
    };
  }(Zr, Zr.exports)), Zr.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Ii.exports = Gu() : Ii.exports = Yu();
var Xu = Ii.exports, Pr = {};
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.ProgressCallbackTransform = void 0;
const zu = Dr;
class Ku extends zu.Transform {
  constructor(t, r, n) {
    super(), this.total = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
Pr.ProgressCallbackTransform = Ku;
var Ho;
function Ju() {
  if (Ho) return re;
  Ho = 1, Object.defineProperty(re, "__esModule", { value: !0 }), re.safeStringifyJson = re.configureRequestOptions = re.safeGetHeader = re.DigestTransform = re.configureRequestUrl = re.configureRequestOptionsFromUrl = re.HttpExecutor = re.parseJson = re.HttpError = re.createHttpError = void 0;
  const e = Nr, t = Xu, r = ft, n = Dr, i = Jt, o = It, a = ce(), s = Pr, l = (0, t.default)("electron-builder");
  function d(x, C = null) {
    return new c(x.statusCode || -1, `${x.statusCode} ${x.statusMessage}` + (C == null ? "" : `
` + JSON.stringify(C, null, "  ")) + `
Headers: ` + H(x.headers), C);
  }
  re.createHttpError = d;
  const f = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class c extends Error {
    constructor(C, $ = `HTTP error: ${f.get(C) || C}`, m = null) {
      super($), this.statusCode = C, this.description = m, this.name = "HttpError", this.code = `HTTP_ERROR_${C}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  re.HttpError = c;
  function h(x) {
    return x.then((C) => C == null || C.length === 0 ? null : JSON.parse(C));
  }
  re.parseJson = h;
  class g {
    constructor() {
      this.maxRedirects = 10;
    }
    request(C, $ = new o.CancellationToken(), m) {
      R(C);
      const U = m == null ? void 0 : JSON.stringify(m), M = U ? Buffer.from(U) : void 0;
      if (M != null) {
        l(U);
        const { headers: k, ...W } = C;
        C = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": M.length,
            ...k
          },
          ...W
        };
      }
      return this.doApiRequest(C, $, (k) => k.end(M));
    }
    doApiRequest(C, $, m, U = 0) {
      return l.enabled && l(`Request: ${H(C)}`), $.createPromise((M, k, W) => {
        const D = this.createRequest(C, (I) => {
          try {
            this.handleResponse(I, C, $, M, k, U, m);
          } catch (L) {
            k(L);
          }
        });
        this.addErrorAndTimeoutHandlers(D, k, C.timeout), this.addRedirectHandlers(D, C, k, U, (I) => {
          this.doApiRequest(I, $, m, U).then(M).catch(k);
        }), m(D, k), W(() => D.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(C, $, m, U, M) {
    }
    addErrorAndTimeoutHandlers(C, $, m = 60 * 1e3) {
      this.addTimeOutHandler(C, $, m), C.on("error", $), C.on("aborted", () => {
        $(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(C, $, m, U, M, k, W) {
      var D;
      if (l.enabled && l(`Response: ${C.statusCode} ${C.statusMessage}, request options: ${H($)}`), C.statusCode === 404) {
        M(d(C, `method: ${$.method || "GET"} url: ${$.protocol || "https:"}//${$.hostname}${$.port ? `:${$.port}` : ""}${$.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (C.statusCode === 204) {
        U();
        return;
      }
      const I = (D = C.statusCode) !== null && D !== void 0 ? D : 0, L = I >= 300 && I < 400, O = y(C, "location");
      if (L && O != null) {
        if (k > this.maxRedirects) {
          M(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(g.prepareRedirectUrlOptions(O, $), m, W, k).then(U).catch(M);
        return;
      }
      C.setEncoding("utf8");
      let B = "";
      C.on("error", M), C.on("data", (F) => B += F), C.on("end", () => {
        try {
          if (C.statusCode != null && C.statusCode >= 400) {
            const F = y(C, "content-type"), G = F != null && (Array.isArray(F) ? F.find((z) => z.includes("json")) != null : F.includes("json"));
            M(d(C, `method: ${$.method || "GET"} url: ${$.protocol || "https:"}//${$.hostname}${$.port ? `:${$.port}` : ""}${$.path}

          Data:
          ${G ? JSON.stringify(JSON.parse(B)) : B}
          `));
          } else
            U(B.length === 0 ? null : B);
        } catch (F) {
          M(F);
        }
      });
    }
    async downloadToBuffer(C, $) {
      return await $.cancellationToken.createPromise((m, U, M) => {
        const k = [], W = {
          headers: $.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        w(C, W), R(W), this.doDownload(W, {
          destination: null,
          options: $,
          onCancel: M,
          callback: (D) => {
            D == null ? m(Buffer.concat(k)) : U(D);
          },
          responseHandler: (D, I) => {
            let L = 0;
            D.on("data", (O) => {
              if (L += O.length, L > 524288e3) {
                I(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              k.push(O);
            }), D.on("end", () => {
              I(null);
            });
          }
        }, 0);
      });
    }
    doDownload(C, $, m) {
      const U = this.createRequest(C, (M) => {
        if (M.statusCode >= 400) {
          $.callback(new Error(`Cannot download "${C.protocol || "https:"}//${C.hostname}${C.path}", status ${M.statusCode}: ${M.statusMessage}`));
          return;
        }
        M.on("error", $.callback);
        const k = y(M, "location");
        if (k != null) {
          m < this.maxRedirects ? this.doDownload(g.prepareRedirectUrlOptions(k, C), $, m++) : $.callback(this.createMaxRedirectError());
          return;
        }
        $.responseHandler == null ? T($, M) : $.responseHandler(M, $.callback);
      });
      this.addErrorAndTimeoutHandlers(U, $.callback, C.timeout), this.addRedirectHandlers(U, C, $.callback, m, (M) => {
        this.doDownload(M, $, m++);
      }), U.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(C, $, m) {
      C.on("socket", (U) => {
        U.setTimeout(m, () => {
          C.abort(), $(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(C, $) {
      const m = v(C, { ...$ }), U = m.headers;
      if (U != null && U.authorization) {
        const M = new i.URL(C);
        (M.hostname.endsWith(".amazonaws.com") || M.searchParams.has("X-Amz-Credential")) && delete U.authorization;
      }
      return m;
    }
    static retryOnServerError(C, $ = 3) {
      for (let m = 0; ; m++)
        try {
          return C();
        } catch (U) {
          if (m < $ && (U instanceof c && U.isServerError() || U.code === "EPIPE"))
            continue;
          throw U;
        }
    }
  }
  re.HttpExecutor = g;
  function v(x, C) {
    const $ = R(C);
    return w(new i.URL(x), $), $;
  }
  re.configureRequestOptionsFromUrl = v;
  function w(x, C) {
    C.protocol = x.protocol, C.hostname = x.hostname, x.port ? C.port = x.port : C.port && delete C.port, C.path = x.pathname + x.search;
  }
  re.configureRequestUrl = w;
  class S extends n.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(C, $ = "sha512", m = "base64") {
      super(), this.expected = C, this.algorithm = $, this.encoding = m, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, e.createHash)($);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(C, $, m) {
      this.digester.update(C), m(null, C);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(C) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch ($) {
          C($);
          return;
        }
      C(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  re.DigestTransform = S;
  function b(x, C, $) {
    return x != null && C != null && x !== C ? ($(new Error(`checksum mismatch: expected ${C} but got ${x} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function y(x, C) {
    const $ = x.headers[C];
    return $ == null ? null : Array.isArray($) ? $.length === 0 ? null : $[$.length - 1] : $;
  }
  re.safeGetHeader = y;
  function T(x, C) {
    if (!b(y(C, "X-Checksum-Sha2"), x.options.sha2, x.callback))
      return;
    const $ = [];
    if (x.options.onProgress != null) {
      const k = y(C, "content-length");
      k != null && $.push(new s.ProgressCallbackTransform(parseInt(k, 10), x.options.cancellationToken, x.options.onProgress));
    }
    const m = x.options.sha512;
    m != null ? $.push(new S(m, "sha512", m.length === 128 && !m.includes("+") && !m.includes("Z") && !m.includes("=") ? "hex" : "base64")) : x.options.sha2 != null && $.push(new S(x.options.sha2, "sha256", "hex"));
    const U = (0, r.createWriteStream)(x.destination);
    $.push(U);
    let M = C;
    for (const k of $)
      k.on("error", (W) => {
        U.close(), x.options.cancellationToken.cancelled || x.callback(W);
      }), M = M.pipe(k);
    U.on("finish", () => {
      U.close(x.callback);
    });
  }
  function R(x, C, $) {
    $ != null && (x.method = $), x.headers = { ...x.headers };
    const m = x.headers;
    return C != null && (m.authorization = C.startsWith("Basic") || C.startsWith("Bearer") ? C : `token ${C}`), m["User-Agent"] == null && (m["User-Agent"] = "electron-builder"), ($ == null || $ === "GET" || m["Cache-Control"] == null) && (m["Cache-Control"] = "no-cache"), x.protocol == null && process.versions.electron != null && (x.protocol = "https:"), x;
  }
  re.configureRequestOptions = R;
  function H(x, C) {
    return JSON.stringify(x, ($, m) => $.endsWith("Authorization") || $.endsWith("authorization") || $.endsWith("Password") || $.endsWith("PASSWORD") || $.endsWith("Token") || $.includes("password") || $.includes("token") || C != null && C.has($) ? "<stripped sensitive data>" : m, 2);
  }
  return re.safeStringifyJson = H, re;
}
var Gt = {};
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.getS3LikeProviderBaseUrl = Gt.githubUrl = void 0;
function Qu(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
Gt.githubUrl = Qu;
function Zu(e) {
  const t = e.provider;
  if (t === "s3")
    return ef(e);
  if (t === "spaces")
    return tf(e);
  throw new Error(`Not supported provider: ${t}`);
}
Gt.getS3LikeProviderBaseUrl = Zu;
function ef(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return xs(t, e.path);
}
function xs(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function tf(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return xs(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.parseDn = void 0;
function rf(e) {
  let t = !1, r = null, n = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let a = 0; a <= e.length; a++) {
    if (a === e.length) {
      r !== null && o.set(r, n);
      break;
    }
    const s = e[a];
    if (t) {
      if (s === '"') {
        t = !1;
        continue;
      }
    } else {
      if (s === '"') {
        t = !0;
        continue;
      }
      if (s === "\\") {
        a++;
        const l = parseInt(e.slice(a, a + 2), 16);
        Number.isNaN(l) ? n += e[a] : (a++, n += String.fromCharCode(l));
        continue;
      }
      if (r === null && s === "=") {
        r = n, n = "";
        continue;
      }
      if (s === "," || s === ";" || s === "+") {
        r !== null && o.set(r, n), r = null, n = "";
        continue;
      }
    }
    if (s === " " && !t) {
      if (n.length === 0)
        continue;
      if (a > i) {
        let l = a;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || r === null && e[i] === "=" || r !== null && e[i] === "+") {
        a = i - 1;
        continue;
      }
    }
    n += s;
  }
  return o;
}
Sn.parseDn = rf;
var yt = {}, qo;
function nf() {
  if (qo) return yt;
  qo = 1, Object.defineProperty(yt, "__esModule", { value: !0 }), yt.nil = yt.UUID = void 0;
  const e = Nr, t = ce(), r = "options.name must be either a string or a Buffer", n = (0, e.randomBytes)(16);
  n[0] = n[0] | 1;
  const i = {}, o = [];
  for (let c = 0; c < 256; c++) {
    const h = (c + 256).toString(16).substr(1);
    i[h] = c, o[c] = h;
  }
  class a {
    constructor(h) {
      this.ascii = null, this.binary = null;
      const g = a.check(h);
      if (!g)
        throw new Error("not a UUID");
      this.version = g.version, g.format === "ascii" ? this.ascii = h : this.binary = h;
    }
    static v5(h, g) {
      return d(h, "sha1", 80, g);
    }
    toString() {
      return this.ascii == null && (this.ascii = f(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(h, g = 0) {
      if (typeof h == "string")
        return h = h.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(h) ? h === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (i[h[14] + h[15]] & 240) >> 4,
          variant: s((i[h[19] + h[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(h)) {
        if (h.length < g + 16)
          return !1;
        let v = 0;
        for (; v < 16 && h[g + v] === 0; v++)
          ;
        return v === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (h[g + 6] & 240) >> 4,
          variant: s((h[g + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, t.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(h) {
      const g = Buffer.allocUnsafe(16);
      let v = 0;
      for (let w = 0; w < 16; w++)
        g[w] = i[h[v++] + h[v++]], (w === 3 || w === 5 || w === 7 || w === 9) && (v += 1);
      return g;
    }
  }
  yt.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function s(c) {
    switch (c) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var l;
  (function(c) {
    c[c.ASCII = 0] = "ASCII", c[c.BINARY = 1] = "BINARY", c[c.OBJECT = 2] = "OBJECT";
  })(l || (l = {}));
  function d(c, h, g, v, w = l.ASCII) {
    const S = (0, e.createHash)(h);
    if (typeof c != "string" && !Buffer.isBuffer(c))
      throw (0, t.newError)(r, "ERR_INVALID_UUID_NAME");
    S.update(v), S.update(c);
    const y = S.digest();
    let T;
    switch (w) {
      case l.BINARY:
        y[6] = y[6] & 15 | g, y[8] = y[8] & 63 | 128, T = y;
        break;
      case l.OBJECT:
        y[6] = y[6] & 15 | g, y[8] = y[8] & 63 | 128, T = new a(y);
        break;
      default:
        T = o[y[0]] + o[y[1]] + o[y[2]] + o[y[3]] + "-" + o[y[4]] + o[y[5]] + "-" + o[y[6] & 15 | g] + o[y[7]] + "-" + o[y[8] & 63 | 128] + o[y[9]] + "-" + o[y[10]] + o[y[11]] + o[y[12]] + o[y[13]] + o[y[14]] + o[y[15]];
        break;
    }
    return T;
  }
  function f(c) {
    return o[c[0]] + o[c[1]] + o[c[2]] + o[c[3]] + "-" + o[c[4]] + o[c[5]] + "-" + o[c[6]] + o[c[7]] + "-" + o[c[8]] + o[c[9]] + "-" + o[c[10]] + o[c[11]] + o[c[12]] + o[c[13]] + o[c[14]] + o[c[15]];
  }
  return yt.nil = new a("00000000-0000-0000-0000-000000000000"), yt;
}
var vt = {}, Ls = {};
(function(e) {
  (function(t) {
    t.parser = function(p, u) {
      return new n(p, u);
    }, t.SAXParser = n, t.SAXStream = f, t.createStream = d, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var r = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function n(p, u) {
      if (!(this instanceof n))
        return new n(p, u);
      var N = this;
      o(N), N.q = N.c = "", N.bufferCheckPosition = t.MAX_BUFFER_LENGTH, N.opt = u || {}, N.opt.lowercase = N.opt.lowercase || N.opt.lowercasetags, N.looseCase = N.opt.lowercase ? "toLowerCase" : "toUpperCase", N.tags = [], N.closed = N.closedRoot = N.sawRoot = !1, N.tag = N.error = null, N.strict = !!p, N.noscript = !!(p || N.opt.noscript), N.state = m.BEGIN, N.strictEntities = N.opt.strictEntities, N.ENTITIES = N.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), N.attribList = [], N.opt.xmlns && (N.ns = Object.create(w)), N.opt.unquotedAttributeValues === void 0 && (N.opt.unquotedAttributeValues = !p), N.trackPosition = N.opt.position !== !1, N.trackPosition && (N.position = N.line = N.column = 0), M(N, "onready");
    }
    Object.create || (Object.create = function(p) {
      function u() {
      }
      u.prototype = p;
      var N = new u();
      return N;
    }), Object.keys || (Object.keys = function(p) {
      var u = [];
      for (var N in p) p.hasOwnProperty(N) && u.push(N);
      return u;
    });
    function i(p) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), N = 0, A = 0, K = r.length; A < K; A++) {
        var ee = p[r[A]].length;
        if (ee > u)
          switch (r[A]) {
            case "textNode":
              W(p);
              break;
            case "cdata":
              k(p, "oncdata", p.cdata), p.cdata = "";
              break;
            case "script":
              k(p, "onscript", p.script), p.script = "";
              break;
            default:
              I(p, "Max buffer length exceeded: " + r[A]);
          }
        N = Math.max(N, ee);
      }
      var ie = t.MAX_BUFFER_LENGTH - N;
      p.bufferCheckPosition = ie + p.position;
    }
    function o(p) {
      for (var u = 0, N = r.length; u < N; u++)
        p[r[u]] = "";
    }
    function a(p) {
      W(p), p.cdata !== "" && (k(p, "oncdata", p.cdata), p.cdata = ""), p.script !== "" && (k(p, "onscript", p.script), p.script = "");
    }
    n.prototype = {
      end: function() {
        L(this);
      },
      write: Be,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        a(this);
      }
    };
    var s;
    try {
      s = require("stream").Stream;
    } catch {
      s = function() {
      };
    }
    s || (s = function() {
    });
    var l = t.EVENTS.filter(function(p) {
      return p !== "error" && p !== "end";
    });
    function d(p, u) {
      return new f(p, u);
    }
    function f(p, u) {
      if (!(this instanceof f))
        return new f(p, u);
      s.apply(this), this._parser = new n(p, u), this.writable = !0, this.readable = !0;
      var N = this;
      this._parser.onend = function() {
        N.emit("end");
      }, this._parser.onerror = function(A) {
        N.emit("error", A), N._parser.error = null;
      }, this._decoder = null, l.forEach(function(A) {
        Object.defineProperty(N, "on" + A, {
          get: function() {
            return N._parser["on" + A];
          },
          set: function(K) {
            if (!K)
              return N.removeAllListeners(A), N._parser["on" + A] = K, K;
            N.on(A, K);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    f.prototype = Object.create(s.prototype, {
      constructor: {
        value: f
      }
    }), f.prototype.write = function(p) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(p)) {
        if (!this._decoder) {
          var u = ku.StringDecoder;
          this._decoder = new u("utf8");
        }
        p = this._decoder.write(p);
      }
      return this._parser.write(p.toString()), this.emit("data", p), !0;
    }, f.prototype.end = function(p) {
      return p && p.length && this.write(p), this._parser.end(), !0;
    }, f.prototype.on = function(p, u) {
      var N = this;
      return !N._parser["on" + p] && l.indexOf(p) !== -1 && (N._parser["on" + p] = function() {
        var A = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        A.splice(0, 0, p), N.emit.apply(N, A);
      }), s.prototype.on.call(N, p, u);
    };
    var c = "[CDATA[", h = "DOCTYPE", g = "http://www.w3.org/XML/1998/namespace", v = "http://www.w3.org/2000/xmlns/", w = { xml: g, xmlns: v }, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, y = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(p) {
      return p === " " || p === `
` || p === "\r" || p === "	";
    }
    function H(p) {
      return p === '"' || p === "'";
    }
    function x(p) {
      return p === ">" || R(p);
    }
    function C(p, u) {
      return p.test(u);
    }
    function $(p, u) {
      return !C(p, u);
    }
    var m = 0;
    t.STATE = {
      BEGIN: m++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: m++,
      // leading whitespace
      TEXT: m++,
      // general stuff
      TEXT_ENTITY: m++,
      // &amp and such.
      OPEN_WAKA: m++,
      // <
      SGML_DECL: m++,
      // <!BLARG
      SGML_DECL_QUOTED: m++,
      // <!BLARG foo "bar
      DOCTYPE: m++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: m++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: m++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: m++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: m++,
      // <!-
      COMMENT: m++,
      // <!--
      COMMENT_ENDING: m++,
      // <!-- blah -
      COMMENT_ENDED: m++,
      // <!-- blah --
      CDATA: m++,
      // <![CDATA[ something
      CDATA_ENDING: m++,
      // ]
      CDATA_ENDING_2: m++,
      // ]]
      PROC_INST: m++,
      // <?hi
      PROC_INST_BODY: m++,
      // <?hi there
      PROC_INST_ENDING: m++,
      // <?hi "there" ?
      OPEN_TAG: m++,
      // <strong
      OPEN_TAG_SLASH: m++,
      // <strong /
      ATTRIB: m++,
      // <a
      ATTRIB_NAME: m++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: m++,
      // <a foo _
      ATTRIB_VALUE: m++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: m++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: m++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: m++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: m++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: m++,
      // <foo bar=&quot
      CLOSE_TAG: m++,
      // </a
      CLOSE_TAG_SAW_WHITE: m++,
      // </a   >
      SCRIPT: m++,
      // <script> ...
      SCRIPT_ENDING: m++
      // <script> ... <
    }, t.XML_ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }, t.ENTITIES = {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }, Object.keys(t.ENTITIES).forEach(function(p) {
      var u = t.ENTITIES[p], N = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[p] = N;
    });
    for (var U in t.STATE)
      t.STATE[t.STATE[U]] = U;
    m = t.STATE;
    function M(p, u, N) {
      p[u] && p[u](N);
    }
    function k(p, u, N) {
      p.textNode && W(p), M(p, u, N);
    }
    function W(p) {
      p.textNode = D(p.opt, p.textNode), p.textNode && M(p, "ontext", p.textNode), p.textNode = "";
    }
    function D(p, u) {
      return p.trim && (u = u.trim()), p.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function I(p, u) {
      return W(p), p.trackPosition && (u += `
Line: ` + p.line + `
Column: ` + p.column + `
Char: ` + p.c), u = new Error(u), p.error = u, M(p, "onerror", u), p;
    }
    function L(p) {
      return p.sawRoot && !p.closedRoot && O(p, "Unclosed root tag"), p.state !== m.BEGIN && p.state !== m.BEGIN_WHITESPACE && p.state !== m.TEXT && I(p, "Unexpected end"), W(p), p.c = "", p.closed = !0, M(p, "onend"), n.call(p, p.strict, p.opt), p;
    }
    function O(p, u) {
      if (typeof p != "object" || !(p instanceof n))
        throw new Error("bad call to strictFail");
      p.strict && I(p, u);
    }
    function B(p) {
      p.strict || (p.tagName = p.tagName[p.looseCase]());
      var u = p.tags[p.tags.length - 1] || p, N = p.tag = { name: p.tagName, attributes: {} };
      p.opt.xmlns && (N.ns = u.ns), p.attribList.length = 0, k(p, "onopentagstart", N);
    }
    function F(p, u) {
      var N = p.indexOf(":"), A = N < 0 ? ["", p] : p.split(":"), K = A[0], ee = A[1];
      return u && p === "xmlns" && (K = "xmlns", ee = ""), { prefix: K, local: ee };
    }
    function G(p) {
      if (p.strict || (p.attribName = p.attribName[p.looseCase]()), p.attribList.indexOf(p.attribName) !== -1 || p.tag.attributes.hasOwnProperty(p.attribName)) {
        p.attribName = p.attribValue = "";
        return;
      }
      if (p.opt.xmlns) {
        var u = F(p.attribName, !0), N = u.prefix, A = u.local;
        if (N === "xmlns")
          if (A === "xml" && p.attribValue !== g)
            O(
              p,
              "xml: prefix must be bound to " + g + `
Actual: ` + p.attribValue
            );
          else if (A === "xmlns" && p.attribValue !== v)
            O(
              p,
              "xmlns: prefix must be bound to " + v + `
Actual: ` + p.attribValue
            );
          else {
            var K = p.tag, ee = p.tags[p.tags.length - 1] || p;
            K.ns === ee.ns && (K.ns = Object.create(ee.ns)), K.ns[A] = p.attribValue;
          }
        p.attribList.push([p.attribName, p.attribValue]);
      } else
        p.tag.attributes[p.attribName] = p.attribValue, k(p, "onattribute", {
          name: p.attribName,
          value: p.attribValue
        });
      p.attribName = p.attribValue = "";
    }
    function z(p, u) {
      if (p.opt.xmlns) {
        var N = p.tag, A = F(p.tagName);
        N.prefix = A.prefix, N.local = A.local, N.uri = N.ns[A.prefix] || "", N.prefix && !N.uri && (O(p, "Unbound namespace prefix: " + JSON.stringify(p.tagName)), N.uri = A.prefix);
        var K = p.tags[p.tags.length - 1] || p;
        N.ns && K.ns !== N.ns && Object.keys(N.ns).forEach(function(jr) {
          k(p, "onopennamespace", {
            prefix: jr,
            uri: N.ns[jr]
          });
        });
        for (var ee = 0, ie = p.attribList.length; ee < ie; ee++) {
          var pe = p.attribList[ee], ye = pe[0], Qe = pe[1], ue = F(ye, !0), Pe = ue.prefix, Vn = ue.local, qr = Pe === "" ? "" : N.ns[Pe] || "", tr = {
            name: ye,
            value: Qe,
            prefix: Pe,
            local: Vn,
            uri: qr
          };
          Pe && Pe !== "xmlns" && !qr && (O(p, "Unbound namespace prefix: " + JSON.stringify(Pe)), tr.uri = Pe), p.tag.attributes[ye] = tr, k(p, "onattribute", tr);
        }
        p.attribList.length = 0;
      }
      p.tag.isSelfClosing = !!u, p.sawRoot = !0, p.tags.push(p.tag), k(p, "onopentag", p.tag), u || (!p.noscript && p.tagName.toLowerCase() === "script" ? p.state = m.SCRIPT : p.state = m.TEXT, p.tag = null, p.tagName = ""), p.attribName = p.attribValue = "", p.attribList.length = 0;
    }
    function Y(p) {
      if (!p.tagName) {
        O(p, "Weird empty close tag."), p.textNode += "</>", p.state = m.TEXT;
        return;
      }
      if (p.script) {
        if (p.tagName !== "script") {
          p.script += "</" + p.tagName + ">", p.tagName = "", p.state = m.SCRIPT;
          return;
        }
        k(p, "onscript", p.script), p.script = "";
      }
      var u = p.tags.length, N = p.tagName;
      p.strict || (N = N[p.looseCase]());
      for (var A = N; u--; ) {
        var K = p.tags[u];
        if (K.name !== A)
          O(p, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        O(p, "Unmatched closing tag: " + p.tagName), p.textNode += "</" + p.tagName + ">", p.state = m.TEXT;
        return;
      }
      p.tagName = N;
      for (var ee = p.tags.length; ee-- > u; ) {
        var ie = p.tag = p.tags.pop();
        p.tagName = p.tag.name, k(p, "onclosetag", p.tagName);
        var pe = {};
        for (var ye in ie.ns)
          pe[ye] = ie.ns[ye];
        var Qe = p.tags[p.tags.length - 1] || p;
        p.opt.xmlns && ie.ns !== Qe.ns && Object.keys(ie.ns).forEach(function(ue) {
          var Pe = ie.ns[ue];
          k(p, "onclosenamespace", { prefix: ue, uri: Pe });
        });
      }
      u === 0 && (p.closedRoot = !0), p.tagName = p.attribValue = p.attribName = "", p.attribList.length = 0, p.state = m.TEXT;
    }
    function J(p) {
      var u = p.entity, N = u.toLowerCase(), A, K = "";
      return p.ENTITIES[u] ? p.ENTITIES[u] : p.ENTITIES[N] ? p.ENTITIES[N] : (u = N, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), A = parseInt(u, 16), K = A.toString(16)) : (u = u.slice(1), A = parseInt(u, 10), K = A.toString(10))), u = u.replace(/^0+/, ""), isNaN(A) || K.toLowerCase() !== u ? (O(p, "Invalid character entity"), "&" + p.entity + ";") : String.fromCodePoint(A));
    }
    function fe(p, u) {
      u === "<" ? (p.state = m.OPEN_WAKA, p.startTagPosition = p.position) : R(u) || (O(p, "Non-whitespace before first tag."), p.textNode = u, p.state = m.TEXT);
    }
    function V(p, u) {
      var N = "";
      return u < p.length && (N = p.charAt(u)), N;
    }
    function Be(p) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return I(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (p === null)
        return L(u);
      typeof p == "object" && (p = p.toString());
      for (var N = 0, A = ""; A = V(p, N++), u.c = A, !!A; )
        switch (u.trackPosition && (u.position++, A === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case m.BEGIN:
            if (u.state = m.BEGIN_WHITESPACE, A === "\uFEFF")
              continue;
            fe(u, A);
            continue;
          case m.BEGIN_WHITESPACE:
            fe(u, A);
            continue;
          case m.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var K = N - 1; A && A !== "<" && A !== "&"; )
                A = V(p, N++), A && u.trackPosition && (u.position++, A === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += p.substring(K, N - 1);
            }
            A === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = m.OPEN_WAKA, u.startTagPosition = u.position) : (!R(A) && (!u.sawRoot || u.closedRoot) && O(u, "Text data outside of root node."), A === "&" ? u.state = m.TEXT_ENTITY : u.textNode += A);
            continue;
          case m.SCRIPT:
            A === "<" ? u.state = m.SCRIPT_ENDING : u.script += A;
            continue;
          case m.SCRIPT_ENDING:
            A === "/" ? u.state = m.CLOSE_TAG : (u.script += "<" + A, u.state = m.SCRIPT);
            continue;
          case m.OPEN_WAKA:
            if (A === "!")
              u.state = m.SGML_DECL, u.sgmlDecl = "";
            else if (!R(A)) if (C(S, A))
              u.state = m.OPEN_TAG, u.tagName = A;
            else if (A === "/")
              u.state = m.CLOSE_TAG, u.tagName = "";
            else if (A === "?")
              u.state = m.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (O(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var ee = u.position - u.startTagPosition;
                A = new Array(ee).join(" ") + A;
              }
              u.textNode += "<" + A, u.state = m.TEXT;
            }
            continue;
          case m.SGML_DECL:
            if (u.sgmlDecl + A === "--") {
              u.state = m.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = m.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + A, u.sgmlDecl = "") : (u.sgmlDecl + A).toUpperCase() === c ? (k(u, "onopencdata"), u.state = m.CDATA, u.sgmlDecl = "", u.cdata = "") : (u.sgmlDecl + A).toUpperCase() === h ? (u.state = m.DOCTYPE, (u.doctype || u.sawRoot) && O(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : A === ">" ? (k(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = m.TEXT) : (H(A) && (u.state = m.SGML_DECL_QUOTED), u.sgmlDecl += A);
            continue;
          case m.SGML_DECL_QUOTED:
            A === u.q && (u.state = m.SGML_DECL, u.q = ""), u.sgmlDecl += A;
            continue;
          case m.DOCTYPE:
            A === ">" ? (u.state = m.TEXT, k(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += A, A === "[" ? u.state = m.DOCTYPE_DTD : H(A) && (u.state = m.DOCTYPE_QUOTED, u.q = A));
            continue;
          case m.DOCTYPE_QUOTED:
            u.doctype += A, A === u.q && (u.q = "", u.state = m.DOCTYPE);
            continue;
          case m.DOCTYPE_DTD:
            A === "]" ? (u.doctype += A, u.state = m.DOCTYPE) : A === "<" ? (u.state = m.OPEN_WAKA, u.startTagPosition = u.position) : H(A) ? (u.doctype += A, u.state = m.DOCTYPE_DTD_QUOTED, u.q = A) : u.doctype += A;
            continue;
          case m.DOCTYPE_DTD_QUOTED:
            u.doctype += A, A === u.q && (u.state = m.DOCTYPE_DTD, u.q = "");
            continue;
          case m.COMMENT:
            A === "-" ? u.state = m.COMMENT_ENDING : u.comment += A;
            continue;
          case m.COMMENT_ENDING:
            A === "-" ? (u.state = m.COMMENT_ENDED, u.comment = D(u.opt, u.comment), u.comment && k(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + A, u.state = m.COMMENT);
            continue;
          case m.COMMENT_ENDED:
            A !== ">" ? (O(u, "Malformed comment"), u.comment += "--" + A, u.state = m.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = m.DOCTYPE_DTD : u.state = m.TEXT;
            continue;
          case m.CDATA:
            A === "]" ? u.state = m.CDATA_ENDING : u.cdata += A;
            continue;
          case m.CDATA_ENDING:
            A === "]" ? u.state = m.CDATA_ENDING_2 : (u.cdata += "]" + A, u.state = m.CDATA);
            continue;
          case m.CDATA_ENDING_2:
            A === ">" ? (u.cdata && k(u, "oncdata", u.cdata), k(u, "onclosecdata"), u.cdata = "", u.state = m.TEXT) : A === "]" ? u.cdata += "]" : (u.cdata += "]]" + A, u.state = m.CDATA);
            continue;
          case m.PROC_INST:
            A === "?" ? u.state = m.PROC_INST_ENDING : R(A) ? u.state = m.PROC_INST_BODY : u.procInstName += A;
            continue;
          case m.PROC_INST_BODY:
            if (!u.procInstBody && R(A))
              continue;
            A === "?" ? u.state = m.PROC_INST_ENDING : u.procInstBody += A;
            continue;
          case m.PROC_INST_ENDING:
            A === ">" ? (k(u, "onprocessinginstruction", {
              name: u.procInstName,
              body: u.procInstBody
            }), u.procInstName = u.procInstBody = "", u.state = m.TEXT) : (u.procInstBody += "?" + A, u.state = m.PROC_INST_BODY);
            continue;
          case m.OPEN_TAG:
            C(b, A) ? u.tagName += A : (B(u), A === ">" ? z(u) : A === "/" ? u.state = m.OPEN_TAG_SLASH : (R(A) || O(u, "Invalid character in tag name"), u.state = m.ATTRIB));
            continue;
          case m.OPEN_TAG_SLASH:
            A === ">" ? (z(u, !0), Y(u)) : (O(u, "Forward-slash in opening tag not followed by >"), u.state = m.ATTRIB);
            continue;
          case m.ATTRIB:
            if (R(A))
              continue;
            A === ">" ? z(u) : A === "/" ? u.state = m.OPEN_TAG_SLASH : C(S, A) ? (u.attribName = A, u.attribValue = "", u.state = m.ATTRIB_NAME) : O(u, "Invalid attribute name");
            continue;
          case m.ATTRIB_NAME:
            A === "=" ? u.state = m.ATTRIB_VALUE : A === ">" ? (O(u, "Attribute without value"), u.attribValue = u.attribName, G(u), z(u)) : R(A) ? u.state = m.ATTRIB_NAME_SAW_WHITE : C(b, A) ? u.attribName += A : O(u, "Invalid attribute name");
            continue;
          case m.ATTRIB_NAME_SAW_WHITE:
            if (A === "=")
              u.state = m.ATTRIB_VALUE;
            else {
              if (R(A))
                continue;
              O(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", k(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", A === ">" ? z(u) : C(S, A) ? (u.attribName = A, u.state = m.ATTRIB_NAME) : (O(u, "Invalid attribute name"), u.state = m.ATTRIB);
            }
            continue;
          case m.ATTRIB_VALUE:
            if (R(A))
              continue;
            H(A) ? (u.q = A, u.state = m.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || I(u, "Unquoted attribute value"), u.state = m.ATTRIB_VALUE_UNQUOTED, u.attribValue = A);
            continue;
          case m.ATTRIB_VALUE_QUOTED:
            if (A !== u.q) {
              A === "&" ? u.state = m.ATTRIB_VALUE_ENTITY_Q : u.attribValue += A;
              continue;
            }
            G(u), u.q = "", u.state = m.ATTRIB_VALUE_CLOSED;
            continue;
          case m.ATTRIB_VALUE_CLOSED:
            R(A) ? u.state = m.ATTRIB : A === ">" ? z(u) : A === "/" ? u.state = m.OPEN_TAG_SLASH : C(S, A) ? (O(u, "No whitespace between attributes"), u.attribName = A, u.attribValue = "", u.state = m.ATTRIB_NAME) : O(u, "Invalid attribute name");
            continue;
          case m.ATTRIB_VALUE_UNQUOTED:
            if (!x(A)) {
              A === "&" ? u.state = m.ATTRIB_VALUE_ENTITY_U : u.attribValue += A;
              continue;
            }
            G(u), A === ">" ? z(u) : u.state = m.ATTRIB;
            continue;
          case m.CLOSE_TAG:
            if (u.tagName)
              A === ">" ? Y(u) : C(b, A) ? u.tagName += A : u.script ? (u.script += "</" + u.tagName, u.tagName = "", u.state = m.SCRIPT) : (R(A) || O(u, "Invalid tagname in closing tag"), u.state = m.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(A))
                continue;
              $(S, A) ? u.script ? (u.script += "</" + A, u.state = m.SCRIPT) : O(u, "Invalid tagname in closing tag.") : u.tagName = A;
            }
            continue;
          case m.CLOSE_TAG_SAW_WHITE:
            if (R(A))
              continue;
            A === ">" ? Y(u) : O(u, "Invalid characters in closing tag");
            continue;
          case m.TEXT_ENTITY:
          case m.ATTRIB_VALUE_ENTITY_Q:
          case m.ATTRIB_VALUE_ENTITY_U:
            var ie, pe;
            switch (u.state) {
              case m.TEXT_ENTITY:
                ie = m.TEXT, pe = "textNode";
                break;
              case m.ATTRIB_VALUE_ENTITY_Q:
                ie = m.ATTRIB_VALUE_QUOTED, pe = "attribValue";
                break;
              case m.ATTRIB_VALUE_ENTITY_U:
                ie = m.ATTRIB_VALUE_UNQUOTED, pe = "attribValue";
                break;
            }
            if (A === ";") {
              var ye = J(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ye) ? (u.entity = "", u.state = ie, u.write(ye)) : (u[pe] += ye, u.entity = "", u.state = ie);
            } else C(u.entity.length ? T : y, A) ? u.entity += A : (O(u, "Invalid character in entity name"), u[pe] += "&" + u.entity + A, u.entity = "", u.state = ie);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var p = String.fromCharCode, u = Math.floor, N = function() {
        var A = 16384, K = [], ee, ie, pe = -1, ye = arguments.length;
        if (!ye)
          return "";
        for (var Qe = ""; ++pe < ye; ) {
          var ue = Number(arguments[pe]);
          if (!isFinite(ue) || // `NaN`, `+Infinity`, or `-Infinity`
          ue < 0 || // not a valid Unicode code point
          ue > 1114111 || // not a valid Unicode code point
          u(ue) !== ue)
            throw RangeError("Invalid code point: " + ue);
          ue <= 65535 ? K.push(ue) : (ue -= 65536, ee = (ue >> 10) + 55296, ie = ue % 1024 + 56320, K.push(ee, ie)), (pe + 1 === ye || K.length > A) && (Qe += p.apply(null, K), K.length = 0);
        }
        return Qe;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: N,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = N;
    }();
  })(e);
})(Ls);
var jo;
function of() {
  if (jo) return vt;
  jo = 1, Object.defineProperty(vt, "__esModule", { value: !0 }), vt.parseXml = vt.XElement = void 0;
  const e = Ls, t = ce();
  class r {
    constructor(l) {
      if (this.name = l, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !l)
        throw (0, t.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!i(l))
        throw (0, t.newError)(`Invalid element name: ${l}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(l) {
      const d = this.attributes === null ? null : this.attributes[l];
      if (d == null)
        throw (0, t.newError)(`No attribute "${l}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return d;
    }
    removeAttribute(l) {
      this.attributes !== null && delete this.attributes[l];
    }
    element(l, d = !1, f = null) {
      const c = this.elementOrNull(l, d);
      if (c === null)
        throw (0, t.newError)(f || `No element "${l}"`, "ERR_XML_MISSED_ELEMENT");
      return c;
    }
    elementOrNull(l, d = !1) {
      if (this.elements === null)
        return null;
      for (const f of this.elements)
        if (o(f, l, d))
          return f;
      return null;
    }
    getElements(l, d = !1) {
      return this.elements === null ? [] : this.elements.filter((f) => o(f, l, d));
    }
    elementValueOrEmpty(l, d = !1) {
      const f = this.elementOrNull(l, d);
      return f === null ? "" : f.value;
    }
  }
  vt.XElement = r;
  const n = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function i(s) {
    return n.test(s);
  }
  function o(s, l, d) {
    const f = s.name;
    return f === l || d === !0 && f.length === l.length && f.toLowerCase() === l.toLowerCase();
  }
  function a(s) {
    let l = null;
    const d = e.parser(!0, {}), f = [];
    return d.onopentag = (c) => {
      const h = new r(c.name);
      if (h.attributes = c.attributes, l === null)
        l = h;
      else {
        const g = f[f.length - 1];
        g.elements == null && (g.elements = []), g.elements.push(h);
      }
      f.push(h);
    }, d.onclosetag = () => {
      f.pop();
    }, d.ontext = (c) => {
      f.length > 0 && (f[f.length - 1].value = c);
    }, d.oncdata = (c) => {
      const h = f[f.length - 1];
      h.value = c, h.isCData = !0;
    }, d.onerror = (c) => {
      throw c;
    }, d.write(s), l;
  }
  return vt.parseXml = a, vt;
}
var Go;
function ce() {
  return Go || (Go = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.newError = e.asArray = e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0;
    var t = It;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
      return t.CancellationError;
    } });
    var r = Ju();
    Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
      return r.HttpError;
    } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
      return r.createHttpError;
    } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
      return r.HttpExecutor;
    } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
      return r.DigestTransform;
    } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
      return r.safeGetHeader;
    } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
      return r.configureRequestOptions;
    } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return r.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
      return r.safeStringifyJson;
    } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
      return r.parseJson;
    } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
      return r.configureRequestUrl;
    } });
    var n = Gt;
    Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return n.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
      return n.githubUrl;
    } });
    var i = Sn;
    Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
      return i.parseDn;
    } });
    var o = nf();
    Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
      return o.UUID;
    } });
    var a = Pr;
    Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return a.ProgressCallbackTransform;
    } });
    var s = of();
    Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
      return s.parseXml;
    } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
      return s.XElement;
    } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function l(f) {
      return f == null ? [] : Array.isArray(f) ? f : [f];
    }
    e.asArray = l;
    function d(f, c) {
      const h = new Error(f);
      return h.code = c, h;
    }
    e.newError = d;
  }(ei)), ei;
}
var $t = {}, Se = {};
Se.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((r, n) => {
        t.push((i, o) => i != null ? n(i) : r(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Se.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const r = t[t.length - 1];
    if (typeof r != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((n) => r(null, n), r);
  }, "name", { value: e.name });
};
var rt = Mu, af = process.cwd, fn = null, sf = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return fn || (fn = af.call(process)), fn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Vo = process.chdir;
  process.chdir = function(e) {
    fn = null, Vo.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Vo);
}
var lf = cf;
function cf(e) {
  rt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || r(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = n(e.chmod), e.fchmod = n(e.fchmod), e.lchmod = n(e.lchmod), e.chownSync = a(e.chownSync), e.fchownSync = a(e.fchownSync), e.lchownSync = a(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(f, c, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(f, c, h, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), sf === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(f) {
    function c(h, g, v) {
      var w = Date.now(), S = 0;
      f(h, g, function b(y) {
        if (y && (y.code === "EACCES" || y.code === "EPERM" || y.code === "EBUSY") && Date.now() - w < 6e4) {
          setTimeout(function() {
            e.stat(g, function(T, R) {
              T && T.code === "ENOENT" ? f(h, g, b) : v(y);
            });
          }, S), S < 100 && (S += 10);
          return;
        }
        v && v(y);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(c, f), c;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(f) {
    function c(h, g, v, w, S, b) {
      var y;
      if (b && typeof b == "function") {
        var T = 0;
        y = function(R, H, x) {
          if (R && R.code === "EAGAIN" && T < 10)
            return T++, f.call(e, h, g, v, w, S, y);
          b.apply(this, arguments);
        };
      }
      return f.call(e, h, g, v, w, S, y);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(c, f), c;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(f) {
    return function(c, h, g, v, w) {
      for (var S = 0; ; )
        try {
          return f.call(e, c, h, g, v, w);
        } catch (b) {
          if (b.code === "EAGAIN" && S < 10) {
            S++;
            continue;
          }
          throw b;
        }
    };
  }(e.readSync);
  function t(f) {
    f.lchmod = function(c, h, g) {
      f.open(
        c,
        rt.O_WRONLY | rt.O_SYMLINK,
        h,
        function(v, w) {
          if (v) {
            g && g(v);
            return;
          }
          f.fchmod(w, h, function(S) {
            f.close(w, function(b) {
              g && g(S || b);
            });
          });
        }
      );
    }, f.lchmodSync = function(c, h) {
      var g = f.openSync(c, rt.O_WRONLY | rt.O_SYMLINK, h), v = !0, w;
      try {
        w = f.fchmodSync(g, h), v = !1;
      } finally {
        if (v)
          try {
            f.closeSync(g);
          } catch {
          }
        else
          f.closeSync(g);
      }
      return w;
    };
  }
  function r(f) {
    rt.hasOwnProperty("O_SYMLINK") && f.futimes ? (f.lutimes = function(c, h, g, v) {
      f.open(c, rt.O_SYMLINK, function(w, S) {
        if (w) {
          v && v(w);
          return;
        }
        f.futimes(S, h, g, function(b) {
          f.close(S, function(y) {
            v && v(b || y);
          });
        });
      });
    }, f.lutimesSync = function(c, h, g) {
      var v = f.openSync(c, rt.O_SYMLINK), w, S = !0;
      try {
        w = f.futimesSync(v, h, g), S = !1;
      } finally {
        if (S)
          try {
            f.closeSync(v);
          } catch {
          }
        else
          f.closeSync(v);
      }
      return w;
    }) : f.futimes && (f.lutimes = function(c, h, g, v) {
      v && process.nextTick(v);
    }, f.lutimesSync = function() {
    });
  }
  function n(f) {
    return f && function(c, h, g) {
      return f.call(e, c, h, function(v) {
        d(v) && (v = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(f) {
    return f && function(c, h) {
      try {
        return f.call(e, c, h);
      } catch (g) {
        if (!d(g)) throw g;
      }
    };
  }
  function o(f) {
    return f && function(c, h, g, v) {
      return f.call(e, c, h, g, function(w) {
        d(w) && (w = null), v && v.apply(this, arguments);
      });
    };
  }
  function a(f) {
    return f && function(c, h, g) {
      try {
        return f.call(e, c, h, g);
      } catch (v) {
        if (!d(v)) throw v;
      }
    };
  }
  function s(f) {
    return f && function(c, h, g) {
      typeof h == "function" && (g = h, h = null);
      function v(w, S) {
        S && (S.uid < 0 && (S.uid += 4294967296), S.gid < 0 && (S.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return h ? f.call(e, c, h, v) : f.call(e, c, v);
    };
  }
  function l(f) {
    return f && function(c, h) {
      var g = h ? f.call(e, c, h) : f.call(e, c);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function d(f) {
    if (!f || f.code === "ENOSYS")
      return !0;
    var c = !process.getuid || process.getuid() !== 0;
    return !!(c && (f.code === "EINVAL" || f.code === "EPERM"));
  }
}
var Wo = Dr.Stream, uf = ff;
function ff(e) {
  return {
    ReadStream: t,
    WriteStream: r
  };
  function t(n, i) {
    if (!(this instanceof t)) return new t(n, i);
    Wo.call(this);
    var o = this;
    this.path = n, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var a = Object.keys(i), s = 0, l = a.length; s < l; s++) {
      var d = a[s];
      this[d] = i[d];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(f, c) {
      if (f) {
        o.emit("error", f), o.readable = !1;
        return;
      }
      o.fd = c, o.emit("open", c), o._read();
    });
  }
  function r(n, i) {
    if (!(this instanceof r)) return new r(n, i);
    Wo.call(this), this.path = n, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), a = 0, s = o.length; a < s; a++) {
      var l = o[a];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var df = pf, hf = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function pf(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: hf(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var ne = ft, mf = lf, gf = uf, Ef = df, en = qi, ge, pn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (ge = Symbol.for("graceful-fs.queue"), pn = Symbol.for("graceful-fs.previous")) : (ge = "___graceful-fs.queue", pn = "___graceful-fs.previous");
function yf() {
}
function Us(e, t) {
  Object.defineProperty(e, ge, {
    get: function() {
      return t;
    }
  });
}
var St = yf;
en.debuglog ? St = en.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (St = function() {
  var e = en.format.apply(en, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!ne[ge]) {
  var vf = Le[ge] || [];
  Us(ne, vf), ne.close = function(e) {
    function t(r, n) {
      return e.call(ne, r, function(i) {
        i || Yo(), typeof n == "function" && n.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, pn, {
      value: e
    }), t;
  }(ne.close), ne.closeSync = function(e) {
    function t(r) {
      e.apply(ne, arguments), Yo();
    }
    return Object.defineProperty(t, pn, {
      value: e
    }), t;
  }(ne.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    St(ne[ge]), Ds.equal(ne[ge].length, 0);
  });
}
Le[ge] || Us(Le, ne[ge]);
var Ce = Gi(Ef(ne));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !ne.__patched && (Ce = Gi(ne), ne.__patched = !0);
function Gi(e) {
  mf(e), e.gracefulify = Gi, e.createReadStream = H, e.createWriteStream = x;
  var t = e.readFile;
  e.readFile = r;
  function r(m, U, M) {
    return typeof U == "function" && (M = U, U = null), k(m, U, M);
    function k(W, D, I, L) {
      return t(W, D, function(O) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? Pt([k, [W, D, I], O, L || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var n = e.writeFile;
  e.writeFile = i;
  function i(m, U, M, k) {
    return typeof M == "function" && (k = M, M = null), W(m, U, M, k);
    function W(D, I, L, O, B) {
      return n(D, I, L, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? Pt([W, [D, I, L, O], F, B || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = a);
  function a(m, U, M, k) {
    return typeof M == "function" && (k = M, M = null), W(m, U, M, k);
    function W(D, I, L, O, B) {
      return o(D, I, L, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? Pt([W, [D, I, L, O], F, B || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = l);
  function l(m, U, M, k) {
    return typeof M == "function" && (k = M, M = 0), W(m, U, M, k);
    function W(D, I, L, O, B) {
      return s(D, I, L, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? Pt([W, [D, I, L, O], F, B || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var d = e.readdir;
  e.readdir = c;
  var f = /^v[0-5]\./;
  function c(m, U, M) {
    typeof U == "function" && (M = U, U = null);
    var k = f.test(process.version) ? function(I, L, O, B) {
      return d(I, W(
        I,
        L,
        O,
        B
      ));
    } : function(I, L, O, B) {
      return d(I, L, W(
        I,
        L,
        O,
        B
      ));
    };
    return k(m, U, M);
    function W(D, I, L, O) {
      return function(B, F) {
        B && (B.code === "EMFILE" || B.code === "ENFILE") ? Pt([
          k,
          [D, I, L],
          B,
          O || Date.now(),
          Date.now()
        ]) : (F && F.sort && F.sort(), typeof L == "function" && L.call(this, B, F));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = gf(e);
    b = h.ReadStream, T = h.WriteStream;
  }
  var g = e.ReadStream;
  g && (b.prototype = Object.create(g.prototype), b.prototype.open = y);
  var v = e.WriteStream;
  v && (T.prototype = Object.create(v.prototype), T.prototype.open = R), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return b;
    },
    set: function(m) {
      b = m;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return T;
    },
    set: function(m) {
      T = m;
    },
    enumerable: !0,
    configurable: !0
  });
  var w = b;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return w;
    },
    set: function(m) {
      w = m;
    },
    enumerable: !0,
    configurable: !0
  });
  var S = T;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return S;
    },
    set: function(m) {
      S = m;
    },
    enumerable: !0,
    configurable: !0
  });
  function b(m, U) {
    return this instanceof b ? (g.apply(this, arguments), this) : b.apply(Object.create(b.prototype), arguments);
  }
  function y() {
    var m = this;
    $(m.path, m.flags, m.mode, function(U, M) {
      U ? (m.autoClose && m.destroy(), m.emit("error", U)) : (m.fd = M, m.emit("open", M), m.read());
    });
  }
  function T(m, U) {
    return this instanceof T ? (v.apply(this, arguments), this) : T.apply(Object.create(T.prototype), arguments);
  }
  function R() {
    var m = this;
    $(m.path, m.flags, m.mode, function(U, M) {
      U ? (m.destroy(), m.emit("error", U)) : (m.fd = M, m.emit("open", M));
    });
  }
  function H(m, U) {
    return new e.ReadStream(m, U);
  }
  function x(m, U) {
    return new e.WriteStream(m, U);
  }
  var C = e.open;
  e.open = $;
  function $(m, U, M, k) {
    return typeof M == "function" && (k = M, M = null), W(m, U, M, k);
    function W(D, I, L, O, B) {
      return C(D, I, L, function(F, G) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? Pt([W, [D, I, L, O], F, B || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  return e;
}
function Pt(e) {
  St("ENQUEUE", e[0].name, e[1]), ne[ge].push(e), Vi();
}
var tn;
function Yo() {
  for (var e = Date.now(), t = 0; t < ne[ge].length; ++t)
    ne[ge][t].length > 2 && (ne[ge][t][3] = e, ne[ge][t][4] = e);
  Vi();
}
function Vi() {
  if (clearTimeout(tn), tn = void 0, ne[ge].length !== 0) {
    var e = ne[ge].shift(), t = e[0], r = e[1], n = e[2], i = e[3], o = e[4];
    if (i === void 0)
      St("RETRY", t.name, r), t.apply(null, r);
    else if (Date.now() - i >= 6e4) {
      St("TIMEOUT", t.name, r);
      var a = r.pop();
      typeof a == "function" && a.call(null, n);
    } else {
      var s = Date.now() - o, l = Math.max(o - i, 1), d = Math.min(l * 1.2, 100);
      s >= d ? (St("RETRY", t.name, r), t.apply(null, r.concat([i]))) : ne[ge].push(e);
    }
    tn === void 0 && (tn = setTimeout(Vi, 0));
  }
}
(function(e) {
  const t = Se.fromCallback, r = Ce, n = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof r[i] == "function");
  Object.assign(e, r), n.forEach((i) => {
    e[i] = t(r[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? r.exists(i, o) : new Promise((a) => r.exists(i, a));
  }, e.read = function(i, o, a, s, l, d) {
    return typeof d == "function" ? r.read(i, o, a, s, l, d) : new Promise((f, c) => {
      r.read(i, o, a, s, l, (h, g, v) => {
        if (h) return c(h);
        f({ bytesRead: g, buffer: v });
      });
    });
  }, e.write = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.write(i, o, ...a) : new Promise((s, l) => {
      r.write(i, o, ...a, (d, f, c) => {
        if (d) return l(d);
        s({ bytesWritten: f, buffer: c });
      });
    });
  }, typeof r.writev == "function" && (e.writev = function(i, o, ...a) {
    return typeof a[a.length - 1] == "function" ? r.writev(i, o, ...a) : new Promise((s, l) => {
      r.writev(i, o, ...a, (d, f, c) => {
        if (d) return l(d);
        s({ bytesWritten: f, buffers: c });
      });
    });
  }), typeof r.realpath.native == "function" ? e.realpath.native = t(r.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})($t);
var Wi = {}, ks = {};
const wf = se;
ks.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(wf.parse(t).root, ""))) {
    const n = new Error(`Path contains invalid characters: ${t}`);
    throw n.code = "EINVAL", n;
  }
};
const Ms = $t, { checkPath: Bs } = ks, Hs = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Wi.makeDir = async (e, t) => (Bs(e), Ms.mkdir(e, {
  mode: Hs(t),
  recursive: !0
}));
Wi.makeDirSync = (e, t) => (Bs(e), Ms.mkdirSync(e, {
  mode: Hs(t),
  recursive: !0
}));
const _f = Se.fromPromise, { makeDir: Af, makeDirSync: oi } = Wi, ai = _f(Af);
var Ve = {
  mkdirs: ai,
  mkdirsSync: oi,
  // alias
  mkdirp: ai,
  mkdirpSync: oi,
  ensureDir: ai,
  ensureDirSync: oi
};
const Tf = Se.fromPromise, qs = $t;
function Sf(e) {
  return qs.access(e).then(() => !0).catch(() => !1);
}
var Nt = {
  pathExists: Tf(Sf),
  pathExistsSync: qs.existsSync
};
const jt = Ce;
function Cf(e, t, r, n) {
  jt.open(e, "r+", (i, o) => {
    if (i) return n(i);
    jt.futimes(o, t, r, (a) => {
      jt.close(o, (s) => {
        n && n(a || s);
      });
    });
  });
}
function bf(e, t, r) {
  const n = jt.openSync(e, "r+");
  return jt.futimesSync(n, t, r), jt.closeSync(n);
}
var js = {
  utimesMillis: Cf,
  utimesMillisSync: bf
};
const Vt = $t, he = se, Rf = qi;
function If(e, t, r) {
  const n = r.dereference ? (i) => Vt.stat(i, { bigint: !0 }) : (i) => Vt.lstat(i, { bigint: !0 });
  return Promise.all([
    n(e),
    n(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function Of(e, t, r) {
  let n;
  const i = r.dereference ? (a) => Vt.statSync(a, { bigint: !0 }) : (a) => Vt.lstatSync(a, { bigint: !0 }), o = i(e);
  try {
    n = i(t);
  } catch (a) {
    if (a.code === "ENOENT") return { srcStat: o, destStat: null };
    throw a;
  }
  return { srcStat: o, destStat: n };
}
function $f(e, t, r, n, i) {
  Rf.callbackify(If)(e, t, n, (o, a) => {
    if (o) return i(o);
    const { srcStat: s, destStat: l } = a;
    if (l) {
      if (Fr(s, l)) {
        const d = he.basename(e), f = he.basename(t);
        return r === "move" && d !== f && d.toLowerCase() === f.toLowerCase() ? i(null, { srcStat: s, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (s.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!s.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return s.isDirectory() && Yi(e, t) ? i(new Error(Cn(e, t, r))) : i(null, { srcStat: s, destStat: l });
  });
}
function Nf(e, t, r, n) {
  const { srcStat: i, destStat: o } = Of(e, t, n);
  if (o) {
    if (Fr(i, o)) {
      const a = he.basename(e), s = he.basename(t);
      if (r === "move" && a !== s && a.toLowerCase() === s.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Yi(e, t))
    throw new Error(Cn(e, t, r));
  return { srcStat: i, destStat: o };
}
function Gs(e, t, r, n, i) {
  const o = he.resolve(he.dirname(e)), a = he.resolve(he.dirname(r));
  if (a === o || a === he.parse(a).root) return i();
  Vt.stat(a, { bigint: !0 }, (s, l) => s ? s.code === "ENOENT" ? i() : i(s) : Fr(t, l) ? i(new Error(Cn(e, r, n))) : Gs(e, t, a, n, i));
}
function Vs(e, t, r, n) {
  const i = he.resolve(he.dirname(e)), o = he.resolve(he.dirname(r));
  if (o === i || o === he.parse(o).root) return;
  let a;
  try {
    a = Vt.statSync(o, { bigint: !0 });
  } catch (s) {
    if (s.code === "ENOENT") return;
    throw s;
  }
  if (Fr(t, a))
    throw new Error(Cn(e, r, n));
  return Vs(e, t, o, n);
}
function Fr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Yi(e, t) {
  const r = he.resolve(e).split(he.sep).filter((i) => i), n = he.resolve(t).split(he.sep).filter((i) => i);
  return r.reduce((i, o, a) => i && n[a] === o, !0);
}
function Cn(e, t, r) {
  return `Cannot ${r} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Qt = {
  checkPaths: $f,
  checkPathsSync: Nf,
  checkParentPaths: Gs,
  checkParentPathsSync: Vs,
  isSrcSubdir: Yi,
  areIdentical: Fr
};
const Ie = Ce, Ar = se, Df = Ve.mkdirs, Pf = Nt.pathExists, Ff = js.utimesMillis, Tr = Qt;
function xf(e, t, r, n) {
  typeof r == "function" && !n ? (n = r, r = {}) : typeof r == "function" && (r = { filter: r }), n = n || function() {
  }, r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Tr.checkPaths(e, t, "copy", r, (i, o) => {
    if (i) return n(i);
    const { srcStat: a, destStat: s } = o;
    Tr.checkParentPaths(e, a, t, "copy", (l) => l ? n(l) : r.filter ? Ws(Xo, s, e, t, r, n) : Xo(s, e, t, r, n));
  });
}
function Xo(e, t, r, n, i) {
  const o = Ar.dirname(r);
  Pf(o, (a, s) => {
    if (a) return i(a);
    if (s) return mn(e, t, r, n, i);
    Df(o, (l) => l ? i(l) : mn(e, t, r, n, i));
  });
}
function Ws(e, t, r, n, i, o) {
  Promise.resolve(i.filter(r, n)).then((a) => a ? e(t, r, n, i, o) : o(), (a) => o(a));
}
function Lf(e, t, r, n, i) {
  return n.filter ? Ws(mn, e, t, r, n, i) : mn(e, t, r, n, i);
}
function mn(e, t, r, n, i) {
  (n.dereference ? Ie.stat : Ie.lstat)(t, (a, s) => a ? i(a) : s.isDirectory() ? jf(s, e, t, r, n, i) : s.isFile() || s.isCharacterDevice() || s.isBlockDevice() ? Uf(s, e, t, r, n, i) : s.isSymbolicLink() ? Wf(e, t, r, n, i) : s.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : s.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Uf(e, t, r, n, i, o) {
  return t ? kf(e, r, n, i, o) : Ys(e, r, n, i, o);
}
function kf(e, t, r, n, i) {
  if (n.overwrite)
    Ie.unlink(r, (o) => o ? i(o) : Ys(e, t, r, n, i));
  else return n.errorOnExist ? i(new Error(`'${r}' already exists`)) : i();
}
function Ys(e, t, r, n, i) {
  Ie.copyFile(t, r, (o) => o ? i(o) : n.preserveTimestamps ? Mf(e.mode, t, r, i) : bn(r, e.mode, i));
}
function Mf(e, t, r, n) {
  return Bf(e) ? Hf(r, e, (i) => i ? n(i) : zo(e, t, r, n)) : zo(e, t, r, n);
}
function Bf(e) {
  return (e & 128) === 0;
}
function Hf(e, t, r) {
  return bn(e, t | 128, r);
}
function zo(e, t, r, n) {
  qf(t, r, (i) => i ? n(i) : bn(r, e, n));
}
function bn(e, t, r) {
  return Ie.chmod(e, t, r);
}
function qf(e, t, r) {
  Ie.stat(e, (n, i) => n ? r(n) : Ff(t, i.atime, i.mtime, r));
}
function jf(e, t, r, n, i, o) {
  return t ? Xs(r, n, i, o) : Gf(e.mode, r, n, i, o);
}
function Gf(e, t, r, n, i) {
  Ie.mkdir(r, (o) => {
    if (o) return i(o);
    Xs(t, r, n, (a) => a ? i(a) : bn(r, e, i));
  });
}
function Xs(e, t, r, n) {
  Ie.readdir(e, (i, o) => i ? n(i) : zs(o, e, t, r, n));
}
function zs(e, t, r, n, i) {
  const o = e.pop();
  return o ? Vf(e, o, t, r, n, i) : i();
}
function Vf(e, t, r, n, i, o) {
  const a = Ar.join(r, t), s = Ar.join(n, t);
  Tr.checkPaths(a, s, "copy", i, (l, d) => {
    if (l) return o(l);
    const { destStat: f } = d;
    Lf(f, a, s, i, (c) => c ? o(c) : zs(e, r, n, i, o));
  });
}
function Wf(e, t, r, n, i) {
  Ie.readlink(t, (o, a) => {
    if (o) return i(o);
    if (n.dereference && (a = Ar.resolve(process.cwd(), a)), e)
      Ie.readlink(r, (s, l) => s ? s.code === "EINVAL" || s.code === "UNKNOWN" ? Ie.symlink(a, r, i) : i(s) : (n.dereference && (l = Ar.resolve(process.cwd(), l)), Tr.isSrcSubdir(a, l) ? i(new Error(`Cannot copy '${a}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Tr.isSrcSubdir(l, a) ? i(new Error(`Cannot overwrite '${l}' with '${a}'.`)) : Yf(a, r, i)));
    else
      return Ie.symlink(a, r, i);
  });
}
function Yf(e, t, r) {
  Ie.unlink(t, (n) => n ? r(n) : Ie.symlink(e, t, r));
}
var Xf = xf;
const we = Ce, Sr = se, zf = Ve.mkdirsSync, Kf = js.utimesMillisSync, Cr = Qt;
function Jf(e, t, r) {
  typeof r == "function" && (r = { filter: r }), r = r || {}, r.clobber = "clobber" in r ? !!r.clobber : !0, r.overwrite = "overwrite" in r ? !!r.overwrite : r.clobber, r.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: n, destStat: i } = Cr.checkPathsSync(e, t, "copy", r);
  return Cr.checkParentPathsSync(e, n, t, "copy"), Qf(i, e, t, r);
}
function Qf(e, t, r, n) {
  if (n.filter && !n.filter(t, r)) return;
  const i = Sr.dirname(r);
  return we.existsSync(i) || zf(i), Ks(e, t, r, n);
}
function Zf(e, t, r, n) {
  if (!(n.filter && !n.filter(t, r)))
    return Ks(e, t, r, n);
}
function Ks(e, t, r, n) {
  const o = (n.dereference ? we.statSync : we.lstatSync)(t);
  if (o.isDirectory()) return ad(o, e, t, r, n);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return ed(o, e, t, r, n);
  if (o.isSymbolicLink()) return cd(e, t, r, n);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function ed(e, t, r, n, i) {
  return t ? td(e, r, n, i) : Js(e, r, n, i);
}
function td(e, t, r, n) {
  if (n.overwrite)
    return we.unlinkSync(r), Js(e, t, r, n);
  if (n.errorOnExist)
    throw new Error(`'${r}' already exists`);
}
function Js(e, t, r, n) {
  return we.copyFileSync(t, r), n.preserveTimestamps && rd(e.mode, t, r), Xi(r, e.mode);
}
function rd(e, t, r) {
  return nd(e) && id(r, e), od(t, r);
}
function nd(e) {
  return (e & 128) === 0;
}
function id(e, t) {
  return Xi(e, t | 128);
}
function Xi(e, t) {
  return we.chmodSync(e, t);
}
function od(e, t) {
  const r = we.statSync(e);
  return Kf(t, r.atime, r.mtime);
}
function ad(e, t, r, n, i) {
  return t ? Qs(r, n, i) : sd(e.mode, r, n, i);
}
function sd(e, t, r, n) {
  return we.mkdirSync(r), Qs(t, r, n), Xi(r, e);
}
function Qs(e, t, r) {
  we.readdirSync(e).forEach((n) => ld(n, e, t, r));
}
function ld(e, t, r, n) {
  const i = Sr.join(t, e), o = Sr.join(r, e), { destStat: a } = Cr.checkPathsSync(i, o, "copy", n);
  return Zf(a, i, o, n);
}
function cd(e, t, r, n) {
  let i = we.readlinkSync(t);
  if (n.dereference && (i = Sr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = we.readlinkSync(r);
    } catch (a) {
      if (a.code === "EINVAL" || a.code === "UNKNOWN") return we.symlinkSync(i, r);
      throw a;
    }
    if (n.dereference && (o = Sr.resolve(process.cwd(), o)), Cr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (we.statSync(r).isDirectory() && Cr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return ud(i, r);
  } else
    return we.symlinkSync(i, r);
}
function ud(e, t) {
  return we.unlinkSync(t), we.symlinkSync(e, t);
}
var fd = Jf;
const dd = Se.fromCallback;
var zi = {
  copy: dd(Xf),
  copySync: fd
};
const Ko = Ce, Zs = se, Q = Ds, br = process.platform === "win32";
function el(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((r) => {
    e[r] = e[r] || Ko[r], r = r + "Sync", e[r] = e[r] || Ko[r];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Ki(e, t, r) {
  let n = 0;
  typeof t == "function" && (r = t, t = {}), Q(e, "rimraf: missing path"), Q.strictEqual(typeof e, "string", "rimraf: path should be a string"), Q.strictEqual(typeof r, "function", "rimraf: callback function required"), Q(t, "rimraf: invalid options argument provided"), Q.strictEqual(typeof t, "object", "rimraf: options should be object"), el(t), Jo(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && n < t.maxBusyTries) {
        n++;
        const a = n * 100;
        return setTimeout(() => Jo(e, t, i), a);
      }
      o.code === "ENOENT" && (o = null);
    }
    r(o);
  });
}
function Jo(e, t, r) {
  Q(e), Q(t), Q(typeof r == "function"), t.lstat(e, (n, i) => {
    if (n && n.code === "ENOENT")
      return r(null);
    if (n && n.code === "EPERM" && br)
      return Qo(e, t, n, r);
    if (i && i.isDirectory())
      return dn(e, t, n, r);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return r(null);
        if (o.code === "EPERM")
          return br ? Qo(e, t, o, r) : dn(e, t, o, r);
        if (o.code === "EISDIR")
          return dn(e, t, o, r);
      }
      return r(o);
    });
  });
}
function Qo(e, t, r, n) {
  Q(e), Q(t), Q(typeof n == "function"), t.chmod(e, 438, (i) => {
    i ? n(i.code === "ENOENT" ? null : r) : t.stat(e, (o, a) => {
      o ? n(o.code === "ENOENT" ? null : r) : a.isDirectory() ? dn(e, t, r, n) : t.unlink(e, n);
    });
  });
}
function Zo(e, t, r) {
  let n;
  Q(e), Q(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  try {
    n = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw r;
  }
  n.isDirectory() ? hn(e, t, r) : t.unlinkSync(e);
}
function dn(e, t, r, n) {
  Q(e), Q(t), Q(typeof n == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? hd(e, t, n) : i && i.code === "ENOTDIR" ? n(r) : n(i);
  });
}
function hd(e, t, r) {
  Q(e), Q(t), Q(typeof r == "function"), t.readdir(e, (n, i) => {
    if (n) return r(n);
    let o = i.length, a;
    if (o === 0) return t.rmdir(e, r);
    i.forEach((s) => {
      Ki(Zs.join(e, s), t, (l) => {
        if (!a) {
          if (l) return r(a = l);
          --o === 0 && t.rmdir(e, r);
        }
      });
    });
  });
}
function tl(e, t) {
  let r;
  t = t || {}, el(t), Q(e, "rimraf: missing path"), Q.strictEqual(typeof e, "string", "rimraf: path should be a string"), Q(t, "rimraf: missing options"), Q.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    r = t.lstatSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    n.code === "EPERM" && br && Zo(e, t, n);
  }
  try {
    r && r.isDirectory() ? hn(e, t, null) : t.unlinkSync(e);
  } catch (n) {
    if (n.code === "ENOENT")
      return;
    if (n.code === "EPERM")
      return br ? Zo(e, t, n) : hn(e, t, n);
    if (n.code !== "EISDIR")
      throw n;
    hn(e, t, n);
  }
}
function hn(e, t, r) {
  Q(e), Q(t);
  try {
    t.rmdirSync(e);
  } catch (n) {
    if (n.code === "ENOTDIR")
      throw r;
    if (n.code === "ENOTEMPTY" || n.code === "EEXIST" || n.code === "EPERM")
      pd(e, t);
    else if (n.code !== "ENOENT")
      throw n;
  }
}
function pd(e, t) {
  if (Q(e), Q(t), t.readdirSync(e).forEach((r) => tl(Zs.join(e, r), t)), br) {
    const r = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - r < 500);
  } else
    return t.rmdirSync(e, t);
}
var md = Ki;
Ki.sync = tl;
const gn = Ce, gd = Se.fromCallback, rl = md;
function Ed(e, t) {
  if (gn.rm) return gn.rm(e, { recursive: !0, force: !0 }, t);
  rl(e, t);
}
function yd(e) {
  if (gn.rmSync) return gn.rmSync(e, { recursive: !0, force: !0 });
  rl.sync(e);
}
var Rn = {
  remove: gd(Ed),
  removeSync: yd
};
const vd = Se.fromPromise, nl = $t, il = se, ol = Ve, al = Rn, ea = vd(async function(t) {
  let r;
  try {
    r = await nl.readdir(t);
  } catch {
    return ol.mkdirs(t);
  }
  return Promise.all(r.map((n) => al.remove(il.join(t, n))));
});
function ta(e) {
  let t;
  try {
    t = nl.readdirSync(e);
  } catch {
    return ol.mkdirsSync(e);
  }
  t.forEach((r) => {
    r = il.join(e, r), al.removeSync(r);
  });
}
var wd = {
  emptyDirSync: ta,
  emptydirSync: ta,
  emptyDir: ea,
  emptydir: ea
};
const _d = Se.fromCallback, sl = se, ot = Ce, ll = Ve;
function Ad(e, t) {
  function r() {
    ot.writeFile(e, "", (n) => {
      if (n) return t(n);
      t();
    });
  }
  ot.stat(e, (n, i) => {
    if (!n && i.isFile()) return t();
    const o = sl.dirname(e);
    ot.stat(o, (a, s) => {
      if (a)
        return a.code === "ENOENT" ? ll.mkdirs(o, (l) => {
          if (l) return t(l);
          r();
        }) : t(a);
      s.isDirectory() ? r() : ot.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function Td(e) {
  let t;
  try {
    t = ot.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const r = sl.dirname(e);
  try {
    ot.statSync(r).isDirectory() || ot.readdirSync(r);
  } catch (n) {
    if (n && n.code === "ENOENT") ll.mkdirsSync(r);
    else throw n;
  }
  ot.writeFileSync(e, "");
}
var Sd = {
  createFile: _d(Ad),
  createFileSync: Td
};
const Cd = Se.fromCallback, cl = se, it = Ce, ul = Ve, bd = Nt.pathExists, { areIdentical: fl } = Qt;
function Rd(e, t, r) {
  function n(i, o) {
    it.link(i, o, (a) => {
      if (a) return r(a);
      r(null);
    });
  }
  it.lstat(t, (i, o) => {
    it.lstat(e, (a, s) => {
      if (a)
        return a.message = a.message.replace("lstat", "ensureLink"), r(a);
      if (o && fl(s, o)) return r(null);
      const l = cl.dirname(t);
      bd(l, (d, f) => {
        if (d) return r(d);
        if (f) return n(e, t);
        ul.mkdirs(l, (c) => {
          if (c) return r(c);
          n(e, t);
        });
      });
    });
  });
}
function Id(e, t) {
  let r;
  try {
    r = it.lstatSync(t);
  } catch {
  }
  try {
    const o = it.lstatSync(e);
    if (r && fl(o, r)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const n = cl.dirname(t);
  return it.existsSync(n) || ul.mkdirsSync(n), it.linkSync(e, t);
}
var Od = {
  createLink: Cd(Rd),
  createLinkSync: Id
};
const at = se, Er = Ce, $d = Nt.pathExists;
function Nd(e, t, r) {
  if (at.isAbsolute(e))
    return Er.lstat(e, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), r(n)) : r(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const n = at.dirname(t), i = at.join(n, e);
    return $d(i, (o, a) => o ? r(o) : a ? r(null, {
      toCwd: i,
      toDst: e
    }) : Er.lstat(e, (s) => s ? (s.message = s.message.replace("lstat", "ensureSymlink"), r(s)) : r(null, {
      toCwd: e,
      toDst: at.relative(n, e)
    })));
  }
}
function Dd(e, t) {
  let r;
  if (at.isAbsolute(e)) {
    if (r = Er.existsSync(e), !r) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const n = at.dirname(t), i = at.join(n, e);
    if (r = Er.existsSync(i), r)
      return {
        toCwd: i,
        toDst: e
      };
    if (r = Er.existsSync(e), !r) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: at.relative(n, e)
    };
  }
}
var Pd = {
  symlinkPaths: Nd,
  symlinkPathsSync: Dd
};
const dl = Ce;
function Fd(e, t, r) {
  if (r = typeof t == "function" ? t : r, t = typeof t == "function" ? !1 : t, t) return r(null, t);
  dl.lstat(e, (n, i) => {
    if (n) return r(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", r(null, t);
  });
}
function xd(e, t) {
  let r;
  if (t) return t;
  try {
    r = dl.lstatSync(e);
  } catch {
    return "file";
  }
  return r && r.isDirectory() ? "dir" : "file";
}
var Ld = {
  symlinkType: Fd,
  symlinkTypeSync: xd
};
const Ud = Se.fromCallback, hl = se, xe = $t, pl = Ve, kd = pl.mkdirs, Md = pl.mkdirsSync, ml = Pd, Bd = ml.symlinkPaths, Hd = ml.symlinkPathsSync, gl = Ld, qd = gl.symlinkType, jd = gl.symlinkTypeSync, Gd = Nt.pathExists, { areIdentical: El } = Qt;
function Vd(e, t, r, n) {
  n = typeof r == "function" ? r : n, r = typeof r == "function" ? !1 : r, xe.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      xe.stat(e),
      xe.stat(t)
    ]).then(([a, s]) => {
      if (El(a, s)) return n(null);
      ra(e, t, r, n);
    }) : ra(e, t, r, n);
  });
}
function ra(e, t, r, n) {
  Bd(e, t, (i, o) => {
    if (i) return n(i);
    e = o.toDst, qd(o.toCwd, r, (a, s) => {
      if (a) return n(a);
      const l = hl.dirname(t);
      Gd(l, (d, f) => {
        if (d) return n(d);
        if (f) return xe.symlink(e, t, s, n);
        kd(l, (c) => {
          if (c) return n(c);
          xe.symlink(e, t, s, n);
        });
      });
    });
  });
}
function Wd(e, t, r) {
  let n;
  try {
    n = xe.lstatSync(t);
  } catch {
  }
  if (n && n.isSymbolicLink()) {
    const s = xe.statSync(e), l = xe.statSync(t);
    if (El(s, l)) return;
  }
  const i = Hd(e, t);
  e = i.toDst, r = jd(i.toCwd, r);
  const o = hl.dirname(t);
  return xe.existsSync(o) || Md(o), xe.symlinkSync(e, t, r);
}
var Yd = {
  createSymlink: Ud(Vd),
  createSymlinkSync: Wd
};
const { createFile: na, createFileSync: ia } = Sd, { createLink: oa, createLinkSync: aa } = Od, { createSymlink: sa, createSymlinkSync: la } = Yd;
var Xd = {
  // file
  createFile: na,
  createFileSync: ia,
  ensureFile: na,
  ensureFileSync: ia,
  // link
  createLink: oa,
  createLinkSync: aa,
  ensureLink: oa,
  ensureLinkSync: aa,
  // symlink
  createSymlink: sa,
  createSymlinkSync: la,
  ensureSymlink: sa,
  ensureSymlinkSync: la
};
function zd(e, { EOL: t = `
`, finalEOL: r = !0, replacer: n = null, spaces: i } = {}) {
  const o = r ? t : "";
  return JSON.stringify(e, n, i).replace(/\n/g, t) + o;
}
function Kd(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Ji = { stringify: zd, stripBom: Kd };
let Wt;
try {
  Wt = Ce;
} catch {
  Wt = ft;
}
const In = Se, { stringify: yl, stripBom: vl } = Ji;
async function Jd(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Wt, n = "throws" in t ? t.throws : !0;
  let i = await In.fromCallback(r.readFile)(e, t);
  i = vl(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (a) {
    if (n)
      throw a.message = `${e}: ${a.message}`, a;
    return null;
  }
  return o;
}
const Qd = In.fromPromise(Jd);
function Zd(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const r = t.fs || Wt, n = "throws" in t ? t.throws : !0;
  try {
    let i = r.readFileSync(e, t);
    return i = vl(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (n)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function eh(e, t, r = {}) {
  const n = r.fs || Wt, i = yl(t, r);
  await In.fromCallback(n.writeFile)(e, i, r);
}
const th = In.fromPromise(eh);
function rh(e, t, r = {}) {
  const n = r.fs || Wt, i = yl(t, r);
  return n.writeFileSync(e, i, r);
}
const nh = {
  readFile: Qd,
  readFileSync: Zd,
  writeFile: th,
  writeFileSync: rh
};
var ih = nh;
const rn = ih;
var oh = {
  // jsonfile exports
  readJson: rn.readFile,
  readJsonSync: rn.readFileSync,
  writeJson: rn.writeFile,
  writeJsonSync: rn.writeFileSync
};
const ah = Se.fromCallback, yr = Ce, wl = se, _l = Ve, sh = Nt.pathExists;
function lh(e, t, r, n) {
  typeof r == "function" && (n = r, r = "utf8");
  const i = wl.dirname(e);
  sh(i, (o, a) => {
    if (o) return n(o);
    if (a) return yr.writeFile(e, t, r, n);
    _l.mkdirs(i, (s) => {
      if (s) return n(s);
      yr.writeFile(e, t, r, n);
    });
  });
}
function ch(e, ...t) {
  const r = wl.dirname(e);
  if (yr.existsSync(r))
    return yr.writeFileSync(e, ...t);
  _l.mkdirsSync(r), yr.writeFileSync(e, ...t);
}
var Qi = {
  outputFile: ah(lh),
  outputFileSync: ch
};
const { stringify: uh } = Ji, { outputFile: fh } = Qi;
async function dh(e, t, r = {}) {
  const n = uh(t, r);
  await fh(e, n, r);
}
var hh = dh;
const { stringify: ph } = Ji, { outputFileSync: mh } = Qi;
function gh(e, t, r) {
  const n = ph(t, r);
  mh(e, n, r);
}
var Eh = gh;
const yh = Se.fromPromise, Te = oh;
Te.outputJson = yh(hh);
Te.outputJsonSync = Eh;
Te.outputJSON = Te.outputJson;
Te.outputJSONSync = Te.outputJsonSync;
Te.writeJSON = Te.writeJson;
Te.writeJSONSync = Te.writeJsonSync;
Te.readJSON = Te.readJson;
Te.readJSONSync = Te.readJsonSync;
var vh = Te;
const wh = Ce, Oi = se, _h = zi.copy, Al = Rn.remove, Ah = Ve.mkdirp, Th = Nt.pathExists, ca = Qt;
function Sh(e, t, r, n) {
  typeof r == "function" && (n = r, r = {}), r = r || {};
  const i = r.overwrite || r.clobber || !1;
  ca.checkPaths(e, t, "move", r, (o, a) => {
    if (o) return n(o);
    const { srcStat: s, isChangingCase: l = !1 } = a;
    ca.checkParentPaths(e, s, t, "move", (d) => {
      if (d) return n(d);
      if (Ch(t)) return ua(e, t, i, l, n);
      Ah(Oi.dirname(t), (f) => f ? n(f) : ua(e, t, i, l, n));
    });
  });
}
function Ch(e) {
  const t = Oi.dirname(e);
  return Oi.parse(t).root === t;
}
function ua(e, t, r, n, i) {
  if (n) return si(e, t, r, i);
  if (r)
    return Al(t, (o) => o ? i(o) : si(e, t, r, i));
  Th(t, (o, a) => o ? i(o) : a ? i(new Error("dest already exists.")) : si(e, t, r, i));
}
function si(e, t, r, n) {
  wh.rename(e, t, (i) => i ? i.code !== "EXDEV" ? n(i) : bh(e, t, r, n) : n());
}
function bh(e, t, r, n) {
  _h(e, t, {
    overwrite: r,
    errorOnExist: !0
  }, (o) => o ? n(o) : Al(e, n));
}
var Rh = Sh;
const Tl = Ce, $i = se, Ih = zi.copySync, Sl = Rn.removeSync, Oh = Ve.mkdirpSync, fa = Qt;
function $h(e, t, r) {
  r = r || {};
  const n = r.overwrite || r.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = fa.checkPathsSync(e, t, "move", r);
  return fa.checkParentPathsSync(e, i, t, "move"), Nh(t) || Oh($i.dirname(t)), Dh(e, t, n, o);
}
function Nh(e) {
  const t = $i.dirname(e);
  return $i.parse(t).root === t;
}
function Dh(e, t, r, n) {
  if (n) return li(e, t, r);
  if (r)
    return Sl(t), li(e, t, r);
  if (Tl.existsSync(t)) throw new Error("dest already exists.");
  return li(e, t, r);
}
function li(e, t, r) {
  try {
    Tl.renameSync(e, t);
  } catch (n) {
    if (n.code !== "EXDEV") throw n;
    return Ph(e, t, r);
  }
}
function Ph(e, t, r) {
  return Ih(e, t, {
    overwrite: r,
    errorOnExist: !0
  }), Sl(e);
}
var Fh = $h;
const xh = Se.fromCallback;
var Lh = {
  move: xh(Rh),
  moveSync: Fh
}, dt = {
  // Export promiseified graceful-fs:
  ...$t,
  // Export extra methods:
  ...zi,
  ...wd,
  ...Xd,
  ...vh,
  ...Ve,
  ...Lh,
  ...Qi,
  ...Nt,
  ...Rn
}, ar = {}, wt = {}, Ee = {}, Zi = {}, Ue = {};
function Cl(e) {
  return typeof e > "u" || e === null;
}
function Uh(e) {
  return typeof e == "object" && e !== null;
}
function kh(e) {
  return Array.isArray(e) ? e : Cl(e) ? [] : [e];
}
function Mh(e, t) {
  var r, n, i, o;
  if (t)
    for (o = Object.keys(t), r = 0, n = o.length; r < n; r += 1)
      i = o[r], e[i] = t[i];
  return e;
}
function Bh(e, t) {
  var r = "", n;
  for (n = 0; n < t; n += 1)
    r += e;
  return r;
}
function Hh(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Ue.isNothing = Cl;
Ue.isObject = Uh;
Ue.toArray = kh;
Ue.repeat = Bh;
Ue.isNegativeZero = Hh;
Ue.extend = Mh;
function bl(e, t) {
  var r = "", n = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (r += 'in "' + e.mark.name + '" '), r += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (r += `

` + e.mark.snippet), n + " " + r) : n;
}
function Rr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = bl(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Rr.prototype = Object.create(Error.prototype);
Rr.prototype.constructor = Rr;
Rr.prototype.toString = function(t) {
  return this.name + ": " + bl(this, t);
};
var xr = Rr, mr = Ue;
function ci(e, t, r, n, i) {
  var o = "", a = "", s = Math.floor(i / 2) - 1;
  return n - t > s && (o = " ... ", t = n - s + o.length), r - n > s && (a = " ...", r = n + s - a.length), {
    str: o + e.slice(t, r).replace(/\t/g, "→") + a,
    pos: n - t + o.length
    // relative position
  };
}
function ui(e, t) {
  return mr.repeat(" ", t - e.length) + e;
}
function qh(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  for (var r = /\r?\n|\r|\0/g, n = [0], i = [], o, a = -1; o = r.exec(e.buffer); )
    i.push(o.index), n.push(o.index + o[0].length), e.position <= o.index && a < 0 && (a = n.length - 2);
  a < 0 && (a = n.length - 1);
  var s = "", l, d, f = Math.min(e.line + t.linesAfter, i.length).toString().length, c = t.maxLength - (t.indent + f + 3);
  for (l = 1; l <= t.linesBefore && !(a - l < 0); l++)
    d = ci(
      e.buffer,
      n[a - l],
      i[a - l],
      e.position - (n[a] - n[a - l]),
      c
    ), s = mr.repeat(" ", t.indent) + ui((e.line - l + 1).toString(), f) + " | " + d.str + `
` + s;
  for (d = ci(e.buffer, n[a], i[a], e.position, c), s += mr.repeat(" ", t.indent) + ui((e.line + 1).toString(), f) + " | " + d.str + `
`, s += mr.repeat("-", t.indent + f + 3 + d.pos) + `^
`, l = 1; l <= t.linesAfter && !(a + l >= i.length); l++)
    d = ci(
      e.buffer,
      n[a + l],
      i[a + l],
      e.position - (n[a] - n[a + l]),
      c
    ), s += mr.repeat(" ", t.indent) + ui((e.line + l + 1).toString(), f) + " | " + d.str + `
`;
  return s.replace(/\n$/, "");
}
var jh = qh, da = xr, Gh = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], Vh = [
  "scalar",
  "sequence",
  "mapping"
];
function Wh(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(r) {
    e[r].forEach(function(n) {
      t[String(n)] = r;
    });
  }), t;
}
function Yh(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(r) {
    if (Gh.indexOf(r) === -1)
      throw new da('Unknown option "' + r + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(r) {
    return r;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Wh(t.styleAliases || null), Vh.indexOf(this.kind) === -1)
    throw new da('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var be = Yh, sr = xr, fi = be;
function ha(e, t) {
  var r = [];
  return e[t].forEach(function(n) {
    var i = r.length;
    r.forEach(function(o, a) {
      o.tag === n.tag && o.kind === n.kind && o.multi === n.multi && (i = a);
    }), r[i] = n;
  }), r;
}
function Xh() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  }, t, r;
  function n(i) {
    i.multi ? (e.multi[i.kind].push(i), e.multi.fallback.push(i)) : e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, r = arguments.length; t < r; t += 1)
    arguments[t].forEach(n);
  return e;
}
function Ni(e) {
  return this.extend(e);
}
Ni.prototype.extend = function(t) {
  var r = [], n = [];
  if (t instanceof fi)
    n.push(t);
  else if (Array.isArray(t))
    n = n.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (r = r.concat(t.implicit)), t.explicit && (n = n.concat(t.explicit));
  else
    throw new sr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  r.forEach(function(o) {
    if (!(o instanceof fi))
      throw new sr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new sr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new sr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), n.forEach(function(o) {
    if (!(o instanceof fi))
      throw new sr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  var i = Object.create(Ni.prototype);
  return i.implicit = (this.implicit || []).concat(r), i.explicit = (this.explicit || []).concat(n), i.compiledImplicit = ha(i, "implicit"), i.compiledExplicit = ha(i, "explicit"), i.compiledTypeMap = Xh(i.compiledImplicit, i.compiledExplicit), i;
};
var Rl = Ni, zh = be, Il = new zh("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), Kh = be, Ol = new Kh("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Jh = be, $l = new Jh("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Qh = Rl, Nl = new Qh({
  explicit: [
    Il,
    Ol,
    $l
  ]
}), Zh = be;
function ep(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function tp() {
  return null;
}
function rp(e) {
  return e === null;
}
var Dl = new Zh("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: ep,
  construct: tp,
  predicate: rp,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
}), np = be;
function ip(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function op(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function ap(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Pl = new np("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: ip,
  construct: op,
  predicate: ap,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), sp = Ue, lp = be;
function cp(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function up(e) {
  return 48 <= e && e <= 55;
}
function fp(e) {
  return 48 <= e && e <= 57;
}
function dp(e) {
  if (e === null) return !1;
  var t = e.length, r = 0, n = !1, i;
  if (!t) return !1;
  if (i = e[r], (i === "-" || i === "+") && (i = e[++r]), i === "0") {
    if (r + 1 === t) return !0;
    if (i = e[++r], i === "b") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "x") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!cp(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
    if (i === "o") {
      for (r++; r < t; r++)
        if (i = e[r], i !== "_") {
          if (!up(e.charCodeAt(r))) return !1;
          n = !0;
        }
      return n && i !== "_";
    }
  }
  if (i === "_") return !1;
  for (; r < t; r++)
    if (i = e[r], i !== "_") {
      if (!fp(e.charCodeAt(r)))
        return !1;
      n = !0;
    }
  return !(!n || i === "_");
}
function hp(e) {
  var t = e, r = 1, n;
  if (t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), n = t[0], (n === "-" || n === "+") && (n === "-" && (r = -1), t = t.slice(1), n = t[0]), t === "0") return 0;
  if (n === "0") {
    if (t[1] === "b") return r * parseInt(t.slice(2), 2);
    if (t[1] === "x") return r * parseInt(t.slice(2), 16);
    if (t[1] === "o") return r * parseInt(t.slice(2), 8);
  }
  return r * parseInt(t, 10);
}
function pp(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !sp.isNegativeZero(e);
}
var Fl = new lp("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: dp,
  construct: hp,
  predicate: pp,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), xl = Ue, mp = be, gp = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Ep(e) {
  return !(e === null || !gp.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function yp(e) {
  var t, r;
  return t = e.replace(/_/g, "").toLowerCase(), r = t[0] === "-" ? -1 : 1, "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? r === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : r * parseFloat(t, 10);
}
var vp = /^[-+]?[0-9]+e/;
function wp(e, t) {
  var r;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (xl.isNegativeZero(e))
    return "-0.0";
  return r = e.toString(10), vp.test(r) ? r.replace("e", ".e") : r;
}
function _p(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || xl.isNegativeZero(e));
}
var Ll = new mp("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Ep,
  construct: yp,
  predicate: _p,
  represent: wp,
  defaultStyle: "lowercase"
}), Ul = Nl.extend({
  implicit: [
    Dl,
    Pl,
    Fl,
    Ll
  ]
}), kl = Ul, Ap = be, Ml = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Bl = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Tp(e) {
  return e === null ? !1 : Ml.exec(e) !== null || Bl.exec(e) !== null;
}
function Sp(e) {
  var t, r, n, i, o, a, s, l = 0, d = null, f, c, h;
  if (t = Ml.exec(e), t === null && (t = Bl.exec(e)), t === null) throw new Error("Date resolve error");
  if (r = +t[1], n = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(r, n, i));
  if (o = +t[4], a = +t[5], s = +t[6], t[7]) {
    for (l = t[7].slice(0, 3); l.length < 3; )
      l += "0";
    l = +l;
  }
  return t[9] && (f = +t[10], c = +(t[11] || 0), d = (f * 60 + c) * 6e4, t[9] === "-" && (d = -d)), h = new Date(Date.UTC(r, n, i, o, a, s, l)), d && h.setTime(h.getTime() - d), h;
}
function Cp(e) {
  return e.toISOString();
}
var Hl = new Ap("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Tp,
  construct: Sp,
  instanceOf: Date,
  represent: Cp
}), bp = be;
function Rp(e) {
  return e === "<<" || e === null;
}
var ql = new bp("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Rp
}), Ip = be, eo = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Op(e) {
  if (e === null) return !1;
  var t, r, n = 0, i = e.length, o = eo;
  for (r = 0; r < i; r++)
    if (t = o.indexOf(e.charAt(r)), !(t > 64)) {
      if (t < 0) return !1;
      n += 6;
    }
  return n % 8 === 0;
}
function $p(e) {
  var t, r, n = e.replace(/[\r\n=]/g, ""), i = n.length, o = eo, a = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)), a = a << 6 | o.indexOf(n.charAt(t));
  return r = i % 4 * 6, r === 0 ? (s.push(a >> 16 & 255), s.push(a >> 8 & 255), s.push(a & 255)) : r === 18 ? (s.push(a >> 10 & 255), s.push(a >> 2 & 255)) : r === 12 && s.push(a >> 4 & 255), new Uint8Array(s);
}
function Np(e) {
  var t = "", r = 0, n, i, o = e.length, a = eo;
  for (n = 0; n < o; n++)
    n % 3 === 0 && n && (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]), r = (r << 8) + e[n];
  return i = o % 3, i === 0 ? (t += a[r >> 18 & 63], t += a[r >> 12 & 63], t += a[r >> 6 & 63], t += a[r & 63]) : i === 2 ? (t += a[r >> 10 & 63], t += a[r >> 4 & 63], t += a[r << 2 & 63], t += a[64]) : i === 1 && (t += a[r >> 2 & 63], t += a[r << 4 & 63], t += a[64], t += a[64]), t;
}
function Dp(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var jl = new Ip("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Op,
  construct: $p,
  predicate: Dp,
  represent: Np
}), Pp = be, Fp = Object.prototype.hasOwnProperty, xp = Object.prototype.toString;
function Lp(e) {
  if (e === null) return !0;
  var t = [], r, n, i, o, a, s = e;
  for (r = 0, n = s.length; r < n; r += 1) {
    if (i = s[r], a = !1, xp.call(i) !== "[object Object]") return !1;
    for (o in i)
      if (Fp.call(i, o))
        if (!a) a = !0;
        else return !1;
    if (!a) return !1;
    if (t.indexOf(o) === -1) t.push(o);
    else return !1;
  }
  return !0;
}
function Up(e) {
  return e !== null ? e : [];
}
var Gl = new Pp("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Lp,
  construct: Up
}), kp = be, Mp = Object.prototype.toString;
function Bp(e) {
  if (e === null) return !0;
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1) {
    if (n = a[t], Mp.call(n) !== "[object Object]" || (i = Object.keys(n), i.length !== 1)) return !1;
    o[t] = [i[0], n[i[0]]];
  }
  return !0;
}
function Hp(e) {
  if (e === null) return [];
  var t, r, n, i, o, a = e;
  for (o = new Array(a.length), t = 0, r = a.length; t < r; t += 1)
    n = a[t], i = Object.keys(n), o[t] = [i[0], n[i[0]]];
  return o;
}
var Vl = new kp("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Bp,
  construct: Hp
}), qp = be, jp = Object.prototype.hasOwnProperty;
function Gp(e) {
  if (e === null) return !0;
  var t, r = e;
  for (t in r)
    if (jp.call(r, t) && r[t] !== null)
      return !1;
  return !0;
}
function Vp(e) {
  return e !== null ? e : {};
}
var Wl = new qp("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Gp,
  construct: Vp
}), to = kl.extend({
  implicit: [
    Hl,
    ql
  ],
  explicit: [
    jl,
    Gl,
    Vl,
    Wl
  ]
}), At = Ue, Yl = xr, Wp = jh, Yp = to, lt = Object.prototype.hasOwnProperty, En = 1, Xl = 2, zl = 3, yn = 4, di = 1, Xp = 2, pa = 3, zp = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Kp = /[\x85\u2028\u2029]/, Jp = /[,\[\]\{\}]/, Kl = /^(?:!|!!|![a-z\-]+!)$/i, Jl = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ma(e) {
  return Object.prototype.toString.call(e);
}
function Ge(e) {
  return e === 10 || e === 13;
}
function Ct(e) {
  return e === 9 || e === 32;
}
function Oe(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Mt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Qp(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function Zp(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function em(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function ga(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function tm(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
var Ql = new Array(256), Zl = new Array(256);
for (var Ft = 0; Ft < 256; Ft++)
  Ql[Ft] = ga(Ft) ? 1 : 0, Zl[Ft] = ga(Ft);
function rm(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Yp, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
}
function ec(e, t) {
  var r = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return r.snippet = Wp(r), new Yl(t, r);
}
function j(e, t) {
  throw ec(e, t);
}
function vn(e, t) {
  e.onWarning && e.onWarning.call(null, ec(e, t));
}
var Ea = {
  YAML: function(t, r, n) {
    var i, o, a;
    t.version !== null && j(t, "duplication of %YAML directive"), n.length !== 1 && j(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(n[0]), i === null && j(t, "ill-formed argument of the YAML directive"), o = parseInt(i[1], 10), a = parseInt(i[2], 10), o !== 1 && j(t, "unacceptable YAML version of the document"), t.version = n[0], t.checkLineBreaks = a < 2, a !== 1 && a !== 2 && vn(t, "unsupported YAML version of the document");
  },
  TAG: function(t, r, n) {
    var i, o;
    n.length !== 2 && j(t, "TAG directive accepts exactly two arguments"), i = n[0], o = n[1], Kl.test(i) || j(t, "ill-formed tag handle (first argument) of the TAG directive"), lt.call(t.tagMap, i) && j(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Jl.test(o) || j(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      o = decodeURIComponent(o);
    } catch {
      j(t, "tag prefix is malformed: " + o);
    }
    t.tagMap[i] = o;
  }
};
function st(e, t, r, n) {
  var i, o, a, s;
  if (t < r) {
    if (s = e.input.slice(t, r), n)
      for (i = 0, o = s.length; i < o; i += 1)
        a = s.charCodeAt(i), a === 9 || 32 <= a && a <= 1114111 || j(e, "expected valid JSON character");
    else zp.test(s) && j(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function ya(e, t, r, n) {
  var i, o, a, s;
  for (At.isObject(r) || j(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(r), a = 0, s = i.length; a < s; a += 1)
    o = i[a], lt.call(t, o) || (t[o] = r[o], n[o] = !0);
}
function Bt(e, t, r, n, i, o, a, s, l) {
  var d, f;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), d = 0, f = i.length; d < f; d += 1)
      Array.isArray(i[d]) && j(e, "nested arrays are not supported inside keys"), typeof i == "object" && ma(i[d]) === "[object Object]" && (i[d] = "[object Object]");
  if (typeof i == "object" && ma(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), n === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (d = 0, f = o.length; d < f; d += 1)
        ya(e, t, o[d], r);
    else
      ya(e, t, o, r);
  else
    !e.json && !lt.call(r, i) && lt.call(t, i) && (e.line = a || e.line, e.lineStart = s || e.lineStart, e.position = l || e.position, j(e, "duplicated mapping key")), i === "__proto__" ? Object.defineProperty(t, i, {
      configurable: !0,
      enumerable: !0,
      writable: !0,
      value: o
    }) : t[i] = o, delete r[i];
  return t;
}
function ro(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : j(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function le(e, t, r) {
  for (var n = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; Ct(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Ge(i))
      for (ro(e), i = e.input.charCodeAt(e.position), n++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return r !== -1 && n !== 0 && e.lineIndent < r && vn(e, "deficient indentation"), n;
}
function On(e) {
  var t = e.position, r;
  return r = e.input.charCodeAt(t), !!((r === 45 || r === 46) && r === e.input.charCodeAt(t + 1) && r === e.input.charCodeAt(t + 2) && (t += 3, r = e.input.charCodeAt(t), r === 0 || Oe(r)));
}
function no(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += At.repeat(`
`, t - 1));
}
function nm(e, t, r) {
  var n, i, o, a, s, l, d, f, c = e.kind, h = e.result, g;
  if (g = e.input.charCodeAt(e.position), Oe(g) || Mt(g) || g === 35 || g === 38 || g === 42 || g === 33 || g === 124 || g === 62 || g === 39 || g === 34 || g === 37 || g === 64 || g === 96 || (g === 63 || g === 45) && (i = e.input.charCodeAt(e.position + 1), Oe(i) || r && Mt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", o = a = e.position, s = !1; g !== 0; ) {
    if (g === 58) {
      if (i = e.input.charCodeAt(e.position + 1), Oe(i) || r && Mt(i))
        break;
    } else if (g === 35) {
      if (n = e.input.charCodeAt(e.position - 1), Oe(n))
        break;
    } else {
      if (e.position === e.lineStart && On(e) || r && Mt(g))
        break;
      if (Ge(g))
        if (l = e.line, d = e.lineStart, f = e.lineIndent, le(e, !1, -1), e.lineIndent >= t) {
          s = !0, g = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = a, e.line = l, e.lineStart = d, e.lineIndent = f;
          break;
        }
    }
    s && (st(e, o, a, !1), no(e, e.line - l), o = a = e.position, s = !1), Ct(g) || (a = e.position + 1), g = e.input.charCodeAt(++e.position);
  }
  return st(e, o, a, !1), e.result ? !0 : (e.kind = c, e.result = h, !1);
}
function im(e, t) {
  var r, n, i;
  if (r = e.input.charCodeAt(e.position), r !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = i = e.position; (r = e.input.charCodeAt(e.position)) !== 0; )
    if (r === 39)
      if (st(e, n, e.position, !0), r = e.input.charCodeAt(++e.position), r === 39)
        n = e.position, e.position++, i = e.position;
      else
        return !0;
    else Ge(r) ? (st(e, n, i, !0), no(e, le(e, !1, t)), n = i = e.position) : e.position === e.lineStart && On(e) ? j(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  j(e, "unexpected end of the stream within a single quoted scalar");
}
function om(e, t) {
  var r, n, i, o, a, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = n = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return st(e, r, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (st(e, r, e.position, !0), s = e.input.charCodeAt(++e.position), Ge(s))
        le(e, !1, t);
      else if (s < 256 && Ql[s])
        e.result += Zl[s], e.position++;
      else if ((a = Zp(s)) > 0) {
        for (i = a, o = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (a = Qp(s)) >= 0 ? o = (o << 4) + a : j(e, "expected hexadecimal character");
        e.result += tm(o), e.position++;
      } else
        j(e, "unknown escape sequence");
      r = n = e.position;
    } else Ge(s) ? (st(e, r, n, !0), no(e, le(e, !1, t)), r = n = e.position) : e.position === e.lineStart && On(e) ? j(e, "unexpected end of the document within a double quoted scalar") : (e.position++, n = e.position);
  }
  j(e, "unexpected end of the stream within a double quoted scalar");
}
function am(e, t) {
  var r = !0, n, i, o, a = e.tag, s, l = e.anchor, d, f, c, h, g, v = /* @__PURE__ */ Object.create(null), w, S, b, y;
  if (y = e.input.charCodeAt(e.position), y === 91)
    f = 93, g = !1, s = [];
  else if (y === 123)
    f = 125, g = !0, s = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = s), y = e.input.charCodeAt(++e.position); y !== 0; ) {
    if (le(e, !0, t), y = e.input.charCodeAt(e.position), y === f)
      return e.position++, e.tag = a, e.anchor = l, e.kind = g ? "mapping" : "sequence", e.result = s, !0;
    r ? y === 44 && j(e, "expected the node content, but found ','") : j(e, "missed comma between flow collection entries"), S = w = b = null, c = h = !1, y === 63 && (d = e.input.charCodeAt(e.position + 1), Oe(d) && (c = h = !0, e.position++, le(e, !0, t))), n = e.line, i = e.lineStart, o = e.position, Yt(e, t, En, !1, !0), S = e.tag, w = e.result, le(e, !0, t), y = e.input.charCodeAt(e.position), (h || e.line === n) && y === 58 && (c = !0, y = e.input.charCodeAt(++e.position), le(e, !0, t), Yt(e, t, En, !1, !0), b = e.result), g ? Bt(e, s, v, S, w, b, n, i, o) : c ? s.push(Bt(e, null, v, S, w, b, n, i, o)) : s.push(w), le(e, !0, t), y = e.input.charCodeAt(e.position), y === 44 ? (r = !0, y = e.input.charCodeAt(++e.position)) : r = !1;
  }
  j(e, "unexpected end of the stream within a flow collection");
}
function sm(e, t) {
  var r, n, i = di, o = !1, a = !1, s = t, l = 0, d = !1, f, c;
  if (c = e.input.charCodeAt(e.position), c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      di === i ? i = c === 43 ? pa : Xp : j(e, "repeat of a chomping mode identifier");
    else if ((f = em(c)) >= 0)
      f === 0 ? j(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : a ? j(e, "repeat of an indentation width identifier") : (s = t + f - 1, a = !0);
    else
      break;
  if (Ct(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (Ct(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!Ge(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (ro(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!a || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!a && e.lineIndent > s && (s = e.lineIndent), Ge(c)) {
      l++;
      continue;
    }
    if (e.lineIndent < s) {
      i === pa ? e.result += At.repeat(`
`, o ? 1 + l : l) : i === di && o && (e.result += `
`);
      break;
    }
    for (n ? Ct(c) ? (d = !0, e.result += At.repeat(`
`, o ? 1 + l : l)) : d ? (d = !1, e.result += At.repeat(`
`, l + 1)) : l === 0 ? o && (e.result += " ") : e.result += At.repeat(`
`, l) : e.result += At.repeat(`
`, o ? 1 + l : l), o = !0, a = !0, l = 0, r = e.position; !Ge(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    st(e, r, e.position, !1);
  }
  return !0;
}
function va(e, t) {
  var r, n = e.tag, i = e.anchor, o = [], a, s = !1, l;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = o), l = e.input.charCodeAt(e.position); l !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, j(e, "tab characters must not be used in indentation")), !(l !== 45 || (a = e.input.charCodeAt(e.position + 1), !Oe(a)))); ) {
    if (s = !0, e.position++, le(e, !0, -1) && e.lineIndent <= t) {
      o.push(null), l = e.input.charCodeAt(e.position);
      continue;
    }
    if (r = e.line, Yt(e, t, zl, !1, !0), o.push(e.result), le(e, !0, -1), l = e.input.charCodeAt(e.position), (e.line === r || e.lineIndent > t) && l !== 0)
      j(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = n, e.anchor = i, e.kind = "sequence", e.result = o, !0) : !1;
}
function lm(e, t, r) {
  var n, i, o, a, s, l, d = e.tag, f = e.anchor, c = {}, h = /* @__PURE__ */ Object.create(null), g = null, v = null, w = null, S = !1, b = !1, y;
  if (e.firstTabInLine !== -1) return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = c), y = e.input.charCodeAt(e.position); y !== 0; ) {
    if (!S && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, j(e, "tab characters must not be used in indentation")), n = e.input.charCodeAt(e.position + 1), o = e.line, (y === 63 || y === 58) && Oe(n))
      y === 63 ? (S && (Bt(e, c, h, g, v, null, a, s, l), g = v = w = null), b = !0, S = !0, i = !0) : S ? (S = !1, i = !0) : j(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = n;
    else {
      if (a = e.line, s = e.lineStart, l = e.position, !Yt(e, r, Xl, !1, !0))
        break;
      if (e.line === o) {
        for (y = e.input.charCodeAt(e.position); Ct(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), Oe(y) || j(e, "a whitespace character is expected after the key-value separator within a block mapping"), S && (Bt(e, c, h, g, v, null, a, s, l), g = v = w = null), b = !0, S = !1, i = !1, g = e.tag, v = e.result;
        else if (b)
          j(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = d, e.anchor = f, !0;
      } else if (b)
        j(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = d, e.anchor = f, !0;
    }
    if ((e.line === o || e.lineIndent > t) && (S && (a = e.line, s = e.lineStart, l = e.position), Yt(e, t, yn, !0, i) && (S ? v = e.result : w = e.result), S || (Bt(e, c, h, g, v, w, a, s, l), g = v = w = null), le(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === o || e.lineIndent > t) && y !== 0)
      j(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return S && Bt(e, c, h, g, v, null, a, s, l), b && (e.tag = d, e.anchor = f, e.kind = "mapping", e.result = c), b;
}
function cm(e) {
  var t, r = !1, n = !1, i, o, a;
  if (a = e.input.charCodeAt(e.position), a !== 33) return !1;
  if (e.tag !== null && j(e, "duplication of a tag property"), a = e.input.charCodeAt(++e.position), a === 60 ? (r = !0, a = e.input.charCodeAt(++e.position)) : a === 33 ? (n = !0, i = "!!", a = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, r) {
    do
      a = e.input.charCodeAt(++e.position);
    while (a !== 0 && a !== 62);
    e.position < e.length ? (o = e.input.slice(t, e.position), a = e.input.charCodeAt(++e.position)) : j(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; a !== 0 && !Oe(a); )
      a === 33 && (n ? j(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Kl.test(i) || j(e, "named tag handle cannot contain such characters"), n = !0, t = e.position + 1)), a = e.input.charCodeAt(++e.position);
    o = e.input.slice(t, e.position), Jp.test(o) && j(e, "tag suffix cannot contain flow indicator characters");
  }
  o && !Jl.test(o) && j(e, "tag name cannot contain such characters: " + o);
  try {
    o = decodeURIComponent(o);
  } catch {
    j(e, "tag name is malformed: " + o);
  }
  return r ? e.tag = o : lt.call(e.tagMap, i) ? e.tag = e.tagMap[i] + o : i === "!" ? e.tag = "!" + o : i === "!!" ? e.tag = "tag:yaml.org,2002:" + o : j(e, 'undeclared tag handle "' + i + '"'), !0;
}
function um(e) {
  var t, r;
  if (r = e.input.charCodeAt(e.position), r !== 38) return !1;
  for (e.anchor !== null && j(e, "duplication of an anchor property"), r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !Oe(r) && !Mt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && j(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function fm(e) {
  var t, r, n;
  if (n = e.input.charCodeAt(e.position), n !== 42) return !1;
  for (n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !Oe(n) && !Mt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && j(e, "name of an alias node must contain at least one character"), r = e.input.slice(t, e.position), lt.call(e.anchorMap, r) || j(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], le(e, !0, -1), !0;
}
function Yt(e, t, r, n, i) {
  var o, a, s, l = 1, d = !1, f = !1, c, h, g, v, w, S;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, o = a = s = yn === r || zl === r, n && le(e, !0, -1) && (d = !0, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)), l === 1)
    for (; cm(e) || um(e); )
      le(e, !0, -1) ? (d = !0, s = o, e.lineIndent > t ? l = 1 : e.lineIndent === t ? l = 0 : e.lineIndent < t && (l = -1)) : s = !1;
  if (s && (s = d || i), (l === 1 || yn === r) && (En === r || Xl === r ? w = t : w = t + 1, S = e.position - e.lineStart, l === 1 ? s && (va(e, S) || lm(e, S, w)) || am(e, w) ? f = !0 : (a && sm(e, w) || im(e, w) || om(e, w) ? f = !0 : fm(e) ? (f = !0, (e.tag !== null || e.anchor !== null) && j(e, "alias node should not have any properties")) : nm(e, w, En === r) && (f = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : l === 0 && (f = s && va(e, S))), e.tag === null)
    e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
  else if (e.tag === "?") {
    for (e.result !== null && e.kind !== "scalar" && j(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), c = 0, h = e.implicitTypes.length; c < h; c += 1)
      if (v = e.implicitTypes[c], v.resolve(e.result)) {
        e.result = v.construct(e.result), e.tag = v.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (lt.call(e.typeMap[e.kind || "fallback"], e.tag))
      v = e.typeMap[e.kind || "fallback"][e.tag];
    else
      for (v = null, g = e.typeMap.multi[e.kind || "fallback"], c = 0, h = g.length; c < h; c += 1)
        if (e.tag.slice(0, g[c].tag.length) === g[c].tag) {
          v = g[c];
          break;
        }
    v || j(e, "unknown tag !<" + e.tag + ">"), e.result !== null && v.kind !== e.kind && j(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + v.kind + '", not "' + e.kind + '"'), v.resolve(e.result, e.tag) ? (e.result = v.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : j(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || f;
}
function dm(e) {
  var t = e.position, r, n, i, o = !1, a;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (a = e.input.charCodeAt(e.position)) !== 0 && (le(e, !0, -1), a = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || a !== 37)); ) {
    for (o = !0, a = e.input.charCodeAt(++e.position), r = e.position; a !== 0 && !Oe(a); )
      a = e.input.charCodeAt(++e.position);
    for (n = e.input.slice(r, e.position), i = [], n.length < 1 && j(e, "directive name must not be less than one character in length"); a !== 0; ) {
      for (; Ct(a); )
        a = e.input.charCodeAt(++e.position);
      if (a === 35) {
        do
          a = e.input.charCodeAt(++e.position);
        while (a !== 0 && !Ge(a));
        break;
      }
      if (Ge(a)) break;
      for (r = e.position; a !== 0 && !Oe(a); )
        a = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(r, e.position));
    }
    a !== 0 && ro(e), lt.call(Ea, n) ? Ea[n](e, n, i) : vn(e, 'unknown document directive "' + n + '"');
  }
  if (le(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, le(e, !0, -1)) : o && j(e, "directives end mark is expected"), Yt(e, e.lineIndent - 1, yn, !1, !0), le(e, !0, -1), e.checkLineBreaks && Kp.test(e.input.slice(t, e.position)) && vn(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && On(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, le(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    j(e, "end of the stream or a document separator is expected");
  else
    return;
}
function tc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var r = new rm(e, t), n = e.indexOf("\0");
  for (n !== -1 && (r.position = n, j(r, "null byte is not allowed in input")), r.input += "\0"; r.input.charCodeAt(r.position) === 32; )
    r.lineIndent += 1, r.position += 1;
  for (; r.position < r.length - 1; )
    dm(r);
  return r.documents;
}
function hm(e, t, r) {
  t !== null && typeof t == "object" && typeof r > "u" && (r = t, t = null);
  var n = tc(e, r);
  if (typeof t != "function")
    return n;
  for (var i = 0, o = n.length; i < o; i += 1)
    t(n[i]);
}
function pm(e, t) {
  var r = tc(e, t);
  if (r.length !== 0) {
    if (r.length === 1)
      return r[0];
    throw new Yl("expected a single document in the stream, but found more");
  }
}
Zi.loadAll = hm;
Zi.load = pm;
var rc = {}, $n = Ue, Lr = xr, mm = to, nc = Object.prototype.toString, ic = Object.prototype.hasOwnProperty, io = 65279, gm = 9, Ir = 10, Em = 13, ym = 32, vm = 33, wm = 34, Di = 35, _m = 37, Am = 38, Tm = 39, Sm = 42, oc = 44, Cm = 45, wn = 58, bm = 61, Rm = 62, Im = 63, Om = 64, ac = 91, sc = 93, $m = 96, lc = 123, Nm = 124, cc = 125, Ae = {};
Ae[0] = "\\0";
Ae[7] = "\\a";
Ae[8] = "\\b";
Ae[9] = "\\t";
Ae[10] = "\\n";
Ae[11] = "\\v";
Ae[12] = "\\f";
Ae[13] = "\\r";
Ae[27] = "\\e";
Ae[34] = '\\"';
Ae[92] = "\\\\";
Ae[133] = "\\N";
Ae[160] = "\\_";
Ae[8232] = "\\L";
Ae[8233] = "\\P";
var Dm = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], Pm = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Fm(e, t) {
  var r, n, i, o, a, s, l;
  if (t === null) return {};
  for (r = {}, n = Object.keys(t), i = 0, o = n.length; i < o; i += 1)
    a = n[i], s = String(t[a]), a.slice(0, 2) === "!!" && (a = "tag:yaml.org,2002:" + a.slice(2)), l = e.compiledTypeMap.fallback[a], l && ic.call(l.styleAliases, s) && (s = l.styleAliases[s]), r[a] = s;
  return r;
}
function xm(e) {
  var t, r, n;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    r = "x", n = 2;
  else if (e <= 65535)
    r = "u", n = 4;
  else if (e <= 4294967295)
    r = "U", n = 8;
  else
    throw new Lr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + r + $n.repeat("0", n - t.length) + t;
}
var Lm = 1, Or = 2;
function Um(e) {
  this.schema = e.schema || mm, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = $n.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Fm(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Or : Lm, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function wa(e, t) {
  for (var r = $n.repeat(" ", t), n = 0, i = -1, o = "", a, s = e.length; n < s; )
    i = e.indexOf(`
`, n), i === -1 ? (a = e.slice(n), n = s) : (a = e.slice(n, i + 1), n = i + 1), a.length && a !== `
` && (o += r), o += a;
  return o;
}
function Pi(e, t) {
  return `
` + $n.repeat(" ", e.indent * t);
}
function km(e, t) {
  var r, n, i;
  for (r = 0, n = e.implicitTypes.length; r < n; r += 1)
    if (i = e.implicitTypes[r], i.resolve(t))
      return !0;
  return !1;
}
function _n(e) {
  return e === ym || e === gm;
}
function $r(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== io || 65536 <= e && e <= 1114111;
}
function _a(e) {
  return $r(e) && e !== io && e !== Em && e !== Ir;
}
function Aa(e, t, r) {
  var n = _a(e), i = n && !_n(e);
  return (
    // ns-plain-safe
    (r ? (
      // c = flow-in
      n
    ) : n && e !== oc && e !== ac && e !== sc && e !== lc && e !== cc) && e !== Di && !(t === wn && !i) || _a(t) && !_n(t) && e === Di || t === wn && i
  );
}
function Mm(e) {
  return $r(e) && e !== io && !_n(e) && e !== Cm && e !== Im && e !== wn && e !== oc && e !== ac && e !== sc && e !== lc && e !== cc && e !== Di && e !== Am && e !== Sm && e !== vm && e !== Nm && e !== bm && e !== Rm && e !== Tm && e !== wm && e !== _m && e !== Om && e !== $m;
}
function Bm(e) {
  return !_n(e) && e !== wn;
}
function gr(e, t) {
  var r = e.charCodeAt(t), n;
  return r >= 55296 && r <= 56319 && t + 1 < e.length && (n = e.charCodeAt(t + 1), n >= 56320 && n <= 57343) ? (r - 55296) * 1024 + n - 56320 + 65536 : r;
}
function uc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var fc = 1, Fi = 2, dc = 3, hc = 4, kt = 5;
function Hm(e, t, r, n, i, o, a, s) {
  var l, d = 0, f = null, c = !1, h = !1, g = n !== -1, v = -1, w = Mm(gr(e, 0)) && Bm(gr(e, e.length - 1));
  if (t || a)
    for (l = 0; l < e.length; d >= 65536 ? l += 2 : l++) {
      if (d = gr(e, l), !$r(d))
        return kt;
      w = w && Aa(d, f, s), f = d;
    }
  else {
    for (l = 0; l < e.length; d >= 65536 ? l += 2 : l++) {
      if (d = gr(e, l), d === Ir)
        c = !0, g && (h = h || // Foldable line = too long, and not more-indented.
        l - v - 1 > n && e[v + 1] !== " ", v = l);
      else if (!$r(d))
        return kt;
      w = w && Aa(d, f, s), f = d;
    }
    h = h || g && l - v - 1 > n && e[v + 1] !== " ";
  }
  return !c && !h ? w && !a && !i(e) ? fc : o === Or ? kt : Fi : r > 9 && uc(e) ? kt : a ? o === Or ? kt : Fi : h ? hc : dc;
}
function qm(e, t, r, n, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Or ? '""' : "''";
    if (!e.noCompatMode && (Dm.indexOf(t) !== -1 || Pm.test(t)))
      return e.quotingType === Or ? '"' + t + '"' : "'" + t + "'";
    var o = e.indent * Math.max(1, r), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), s = n || e.flowLevel > -1 && r >= e.flowLevel;
    function l(d) {
      return km(e, d);
    }
    switch (Hm(
      t,
      s,
      e.indent,
      a,
      l,
      e.quotingType,
      e.forceQuotes && !n,
      i
    )) {
      case fc:
        return t;
      case Fi:
        return "'" + t.replace(/'/g, "''") + "'";
      case dc:
        return "|" + Ta(t, e.indent) + Sa(wa(t, o));
      case hc:
        return ">" + Ta(t, e.indent) + Sa(wa(jm(t, a), o));
      case kt:
        return '"' + Gm(t) + '"';
      default:
        throw new Lr("impossible error: invalid scalar style");
    }
  }();
}
function Ta(e, t) {
  var r = uc(e) ? String(t) : "", n = e[e.length - 1] === `
`, i = n && (e[e.length - 2] === `
` || e === `
`), o = i ? "+" : n ? "" : "-";
  return r + o + `
`;
}
function Sa(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function jm(e, t) {
  for (var r = /(\n+)([^\n]*)/g, n = function() {
    var d = e.indexOf(`
`);
    return d = d !== -1 ? d : e.length, r.lastIndex = d, Ca(e.slice(0, d), t);
  }(), i = e[0] === `
` || e[0] === " ", o, a; a = r.exec(e); ) {
    var s = a[1], l = a[2];
    o = l[0] === " ", n += s + (!i && !o && l !== "" ? `
` : "") + Ca(l, t), i = o;
  }
  return n;
}
function Ca(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var r = / [^ ]/g, n, i = 0, o, a = 0, s = 0, l = ""; n = r.exec(e); )
    s = n.index, s - i > t && (o = a > i ? a : s, l += `
` + e.slice(i, o), i = o + 1), a = s;
  return l += `
`, e.length - i > t && a > i ? l += e.slice(i, a) + `
` + e.slice(a + 1) : l += e.slice(i), l.slice(1);
}
function Gm(e) {
  for (var t = "", r = 0, n, i = 0; i < e.length; r >= 65536 ? i += 2 : i++)
    r = gr(e, i), n = Ae[r], !n && $r(r) ? (t += e[i], r >= 65536 && (t += e[i + 1])) : t += n || xm(r);
  return t;
}
function Vm(e, t, r) {
  var n = "", i = e.tag, o, a, s;
  for (o = 0, a = r.length; o < a; o += 1)
    s = r[o], e.replacer && (s = e.replacer.call(r, String(o), s)), (Je(e, t, s, !1, !1) || typeof s > "u" && Je(e, t, null, !1, !1)) && (n !== "" && (n += "," + (e.condenseFlow ? "" : " ")), n += e.dump);
  e.tag = i, e.dump = "[" + n + "]";
}
function ba(e, t, r, n) {
  var i = "", o = e.tag, a, s, l;
  for (a = 0, s = r.length; a < s; a += 1)
    l = r[a], e.replacer && (l = e.replacer.call(r, String(a), l)), (Je(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Je(e, t + 1, null, !0, !0, !1, !0)) && ((!n || i !== "") && (i += Pi(e, t)), e.dump && Ir === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = o, e.dump = i || "[]";
}
function Wm(e, t, r) {
  var n = "", i = e.tag, o = Object.keys(r), a, s, l, d, f;
  for (a = 0, s = o.length; a < s; a += 1)
    f = "", n !== "" && (f += ", "), e.condenseFlow && (f += '"'), l = o[a], d = r[l], e.replacer && (d = e.replacer.call(r, l, d)), Je(e, t, l, !1, !1) && (e.dump.length > 1024 && (f += "? "), f += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Je(e, t, d, !1, !1) && (f += e.dump, n += f));
  e.tag = i, e.dump = "{" + n + "}";
}
function Ym(e, t, r, n) {
  var i = "", o = e.tag, a = Object.keys(r), s, l, d, f, c, h;
  if (e.sortKeys === !0)
    a.sort();
  else if (typeof e.sortKeys == "function")
    a.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Lr("sortKeys must be a boolean or a function");
  for (s = 0, l = a.length; s < l; s += 1)
    h = "", (!n || i !== "") && (h += Pi(e, t)), d = a[s], f = r[d], e.replacer && (f = e.replacer.call(r, d, f)), Je(e, t + 1, d, !0, !0, !0) && (c = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, c && (e.dump && Ir === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, c && (h += Pi(e, t)), Je(e, t + 1, f, !0, c) && (e.dump && Ir === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h));
  e.tag = o, e.dump = i || "{}";
}
function Ra(e, t, r) {
  var n, i, o, a, s, l;
  for (i = r ? e.explicitTypes : e.implicitTypes, o = 0, a = i.length; o < a; o += 1)
    if (s = i[o], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (r ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        if (l = e.styleMap[s.tag] || s.defaultStyle, nc.call(s.represent) === "[object Function]")
          n = s.represent(t, l);
        else if (ic.call(s.represent, l))
          n = s.represent[l](t, l);
        else
          throw new Lr("!<" + s.tag + '> tag resolver accepts not "' + l + '" style');
        e.dump = n;
      }
      return !0;
    }
  return !1;
}
function Je(e, t, r, n, i, o, a) {
  e.tag = null, e.dump = r, Ra(e, r, !1) || Ra(e, r, !0);
  var s = nc.call(e.dump), l = n, d;
  n && (n = e.flowLevel < 0 || e.flowLevel > t);
  var f = s === "[object Object]" || s === "[object Array]", c, h;
  if (f && (c = e.duplicates.indexOf(r), h = c !== -1), (e.tag !== null && e.tag !== "?" || h || e.indent !== 2 && t > 0) && (i = !1), h && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (f && h && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), s === "[object Object]")
      n && Object.keys(e.dump).length !== 0 ? (Ym(e, t, e.dump, i), h && (e.dump = "&ref_" + c + e.dump)) : (Wm(e, t, e.dump), h && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object Array]")
      n && e.dump.length !== 0 ? (e.noArrayIndent && !a && t > 0 ? ba(e, t - 1, e.dump, i) : ba(e, t, e.dump, i), h && (e.dump = "&ref_" + c + e.dump)) : (Vm(e, t, e.dump), h && (e.dump = "&ref_" + c + " " + e.dump));
    else if (s === "[object String]")
      e.tag !== "?" && qm(e, e.dump, t, o, l);
    else {
      if (s === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Lr("unacceptable kind of an object to dump " + s);
    }
    e.tag !== null && e.tag !== "?" && (d = encodeURI(
      e.tag[0] === "!" ? e.tag.slice(1) : e.tag
    ).replace(/!/g, "%21"), e.tag[0] === "!" ? d = "!" + d : d.slice(0, 18) === "tag:yaml.org,2002:" ? d = "!!" + d.slice(18) : d = "!<" + d + ">", e.dump = d + " " + e.dump);
  }
  return !0;
}
function Xm(e, t) {
  var r = [], n = [], i, o;
  for (xi(e, r, n), i = 0, o = n.length; i < o; i += 1)
    t.duplicates.push(r[n[i]]);
  t.usedDuplicates = new Array(o);
}
function xi(e, t, r) {
  var n, i, o;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      r.indexOf(i) === -1 && r.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, o = e.length; i < o; i += 1)
        xi(e[i], t, r);
    else
      for (n = Object.keys(e), i = 0, o = n.length; i < o; i += 1)
        xi(e[n[i]], t, r);
}
function zm(e, t) {
  t = t || {};
  var r = new Um(t);
  r.noRefs || Xm(e, r);
  var n = e;
  return r.replacer && (n = r.replacer.call({ "": n }, "", n)), Je(r, 0, n, !0, !0) ? r.dump + `
` : "";
}
rc.dump = zm;
var pc = Zi, Km = rc;
function oo(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ee.Type = be;
Ee.Schema = Rl;
Ee.FAILSAFE_SCHEMA = Nl;
Ee.JSON_SCHEMA = Ul;
Ee.CORE_SCHEMA = kl;
Ee.DEFAULT_SCHEMA = to;
Ee.load = pc.load;
Ee.loadAll = pc.loadAll;
Ee.dump = Km.dump;
Ee.YAMLException = xr;
Ee.types = {
  binary: jl,
  float: Ll,
  map: $l,
  null: Dl,
  pairs: Vl,
  set: Wl,
  timestamp: Hl,
  bool: Pl,
  int: Fl,
  merge: ql,
  omap: Gl,
  seq: Ol,
  str: Il
};
Ee.safeLoad = oo("safeLoad", "load");
Ee.safeLoadAll = oo("safeLoadAll", "loadAll");
Ee.safeDump = oo("safeDump", "dump");
var Nn = {};
Object.defineProperty(Nn, "__esModule", { value: !0 });
Nn.Lazy = void 0;
class Jm {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Nn.Lazy = Jm;
var Li = { exports: {} };
const Qm = "2.0.0", mc = 256, Zm = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, e0 = 16, t0 = mc - 6, r0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Dn = {
  MAX_LENGTH: mc,
  MAX_SAFE_COMPONENT_LENGTH: e0,
  MAX_SAFE_BUILD_LENGTH: t0,
  MAX_SAFE_INTEGER: Zm,
  RELEASE_TYPES: r0,
  SEMVER_SPEC_VERSION: Qm,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const n0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Pn = n0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: i
  } = Dn, o = Pn;
  t = e.exports = {};
  const a = t.re = [], s = t.safeRe = [], l = t.src = [], d = t.t = {};
  let f = 0;
  const c = "[a-zA-Z0-9-]", h = [
    ["\\s", 1],
    ["\\d", i],
    [c, n]
  ], g = (w) => {
    for (const [S, b] of h)
      w = w.split(`${S}*`).join(`${S}{0,${b}}`).split(`${S}+`).join(`${S}{1,${b}}`);
    return w;
  }, v = (w, S, b) => {
    const y = g(S), T = f++;
    o(w, T, S), d[w] = T, l[T] = S, a[T] = new RegExp(S, b ? "g" : void 0), s[T] = new RegExp(y, b ? "g" : void 0);
  };
  v("NUMERICIDENTIFIER", "0|[1-9]\\d*"), v("NUMERICIDENTIFIERLOOSE", "\\d+"), v("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${c}*`), v("MAINVERSION", `(${l[d.NUMERICIDENTIFIER]})\\.(${l[d.NUMERICIDENTIFIER]})\\.(${l[d.NUMERICIDENTIFIER]})`), v("MAINVERSIONLOOSE", `(${l[d.NUMERICIDENTIFIERLOOSE]})\\.(${l[d.NUMERICIDENTIFIERLOOSE]})\\.(${l[d.NUMERICIDENTIFIERLOOSE]})`), v("PRERELEASEIDENTIFIER", `(?:${l[d.NUMERICIDENTIFIER]}|${l[d.NONNUMERICIDENTIFIER]})`), v("PRERELEASEIDENTIFIERLOOSE", `(?:${l[d.NUMERICIDENTIFIERLOOSE]}|${l[d.NONNUMERICIDENTIFIER]})`), v("PRERELEASE", `(?:-(${l[d.PRERELEASEIDENTIFIER]}(?:\\.${l[d.PRERELEASEIDENTIFIER]})*))`), v("PRERELEASELOOSE", `(?:-?(${l[d.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[d.PRERELEASEIDENTIFIERLOOSE]})*))`), v("BUILDIDENTIFIER", `${c}+`), v("BUILD", `(?:\\+(${l[d.BUILDIDENTIFIER]}(?:\\.${l[d.BUILDIDENTIFIER]})*))`), v("FULLPLAIN", `v?${l[d.MAINVERSION]}${l[d.PRERELEASE]}?${l[d.BUILD]}?`), v("FULL", `^${l[d.FULLPLAIN]}$`), v("LOOSEPLAIN", `[v=\\s]*${l[d.MAINVERSIONLOOSE]}${l[d.PRERELEASELOOSE]}?${l[d.BUILD]}?`), v("LOOSE", `^${l[d.LOOSEPLAIN]}$`), v("GTLT", "((?:<|>)?=?)"), v("XRANGEIDENTIFIERLOOSE", `${l[d.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), v("XRANGEIDENTIFIER", `${l[d.NUMERICIDENTIFIER]}|x|X|\\*`), v("XRANGEPLAIN", `[v=\\s]*(${l[d.XRANGEIDENTIFIER]})(?:\\.(${l[d.XRANGEIDENTIFIER]})(?:\\.(${l[d.XRANGEIDENTIFIER]})(?:${l[d.PRERELEASE]})?${l[d.BUILD]}?)?)?`), v("XRANGEPLAINLOOSE", `[v=\\s]*(${l[d.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[d.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[d.XRANGEIDENTIFIERLOOSE]})(?:${l[d.PRERELEASELOOSE]})?${l[d.BUILD]}?)?)?`), v("XRANGE", `^${l[d.GTLT]}\\s*${l[d.XRANGEPLAIN]}$`), v("XRANGELOOSE", `^${l[d.GTLT]}\\s*${l[d.XRANGEPLAINLOOSE]}$`), v("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), v("COERCE", `${l[d.COERCEPLAIN]}(?:$|[^\\d])`), v("COERCEFULL", l[d.COERCEPLAIN] + `(?:${l[d.PRERELEASE]})?(?:${l[d.BUILD]})?(?:$|[^\\d])`), v("COERCERTL", l[d.COERCE], !0), v("COERCERTLFULL", l[d.COERCEFULL], !0), v("LONETILDE", "(?:~>?)"), v("TILDETRIM", `(\\s*)${l[d.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", v("TILDE", `^${l[d.LONETILDE]}${l[d.XRANGEPLAIN]}$`), v("TILDELOOSE", `^${l[d.LONETILDE]}${l[d.XRANGEPLAINLOOSE]}$`), v("LONECARET", "(?:\\^)"), v("CARETTRIM", `(\\s*)${l[d.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", v("CARET", `^${l[d.LONECARET]}${l[d.XRANGEPLAIN]}$`), v("CARETLOOSE", `^${l[d.LONECARET]}${l[d.XRANGEPLAINLOOSE]}$`), v("COMPARATORLOOSE", `^${l[d.GTLT]}\\s*(${l[d.LOOSEPLAIN]})$|^$`), v("COMPARATOR", `^${l[d.GTLT]}\\s*(${l[d.FULLPLAIN]})$|^$`), v("COMPARATORTRIM", `(\\s*)${l[d.GTLT]}\\s*(${l[d.LOOSEPLAIN]}|${l[d.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", v("HYPHENRANGE", `^\\s*(${l[d.XRANGEPLAIN]})\\s+-\\s+(${l[d.XRANGEPLAIN]})\\s*$`), v("HYPHENRANGELOOSE", `^\\s*(${l[d.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[d.XRANGEPLAINLOOSE]})\\s*$`), v("STAR", "(<|>)?=?\\s*\\*"), v("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), v("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Li, Li.exports);
var Ur = Li.exports;
const i0 = Object.freeze({ loose: !0 }), o0 = Object.freeze({}), a0 = (e) => e ? typeof e != "object" ? i0 : e : o0;
var ao = a0;
const Ia = /^[0-9]+$/, gc = (e, t) => {
  const r = Ia.test(e), n = Ia.test(t);
  return r && n && (e = +e, t = +t), e === t ? 0 : r && !n ? -1 : n && !r ? 1 : e < t ? -1 : 1;
}, s0 = (e, t) => gc(t, e);
var Ec = {
  compareIdentifiers: gc,
  rcompareIdentifiers: s0
};
const nn = Pn, { MAX_LENGTH: Oa, MAX_SAFE_INTEGER: on } = Dn, { safeRe: $a, t: Na } = Ur, l0 = ao, { compareIdentifiers: xt } = Ec;
let c0 = class qe {
  constructor(t, r) {
    if (r = l0(r), t instanceof qe) {
      if (t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Oa)
      throw new TypeError(
        `version is longer than ${Oa} characters`
      );
    nn("SemVer", t, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = t.trim().match(r.loose ? $a[Na.LOOSE] : $a[Na.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > on || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > on || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > on || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < on)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (nn("SemVer.compare", this.version, this.options, t), !(t instanceof qe)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new qe(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof qe || (t = new qe(t, this.options)), xt(this.major, t.major) || xt(this.minor, t.minor) || xt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof qe || (t = new qe(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], i = t.prerelease[r];
      if (nn("prerelease compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return xt(n, i);
    } while (++r);
  }
  compareBuild(t) {
    t instanceof qe || (t = new qe(t, this.options));
    let r = 0;
    do {
      const n = this.build[r], i = t.build[r];
      if (nn("build compare", r, n, i), n === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === i)
        continue;
      return xt(n, i);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, r, n) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(n) ? 1 : 0;
        if (!r && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (r) {
          let o = [r, i];
          n === !1 && (o = [r]), xt(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Re = c0;
const Da = Re, u0 = (e, t, r = !1) => {
  if (e instanceof Da)
    return e;
  try {
    return new Da(e, t);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Zt = u0;
const f0 = Zt, d0 = (e, t) => {
  const r = f0(e, t);
  return r ? r.version : null;
};
var h0 = d0;
const p0 = Zt, m0 = (e, t) => {
  const r = p0(e.trim().replace(/^[=v]+/, ""), t);
  return r ? r.version : null;
};
var g0 = m0;
const Pa = Re, E0 = (e, t, r, n, i) => {
  typeof r == "string" && (i = n, n = r, r = void 0);
  try {
    return new Pa(
      e instanceof Pa ? e.version : e,
      r
    ).inc(t, n, i).version;
  } catch {
    return null;
  }
};
var y0 = E0;
const Fa = Zt, v0 = (e, t) => {
  const r = Fa(e, null, !0), n = Fa(t, null, !0), i = r.compare(n);
  if (i === 0)
    return null;
  const o = i > 0, a = o ? r : n, s = o ? n : r, l = !!a.prerelease.length;
  if (!!s.prerelease.length && !l)
    return !s.patch && !s.minor ? "major" : a.patch ? "patch" : a.minor ? "minor" : "major";
  const f = l ? "pre" : "";
  return r.major !== n.major ? f + "major" : r.minor !== n.minor ? f + "minor" : r.patch !== n.patch ? f + "patch" : "prerelease";
};
var w0 = v0;
const _0 = Re, A0 = (e, t) => new _0(e, t).major;
var T0 = A0;
const S0 = Re, C0 = (e, t) => new S0(e, t).minor;
var b0 = C0;
const R0 = Re, I0 = (e, t) => new R0(e, t).patch;
var O0 = I0;
const $0 = Zt, N0 = (e, t) => {
  const r = $0(e, t);
  return r && r.prerelease.length ? r.prerelease : null;
};
var D0 = N0;
const xa = Re, P0 = (e, t, r) => new xa(e, r).compare(new xa(t, r));
var ke = P0;
const F0 = ke, x0 = (e, t, r) => F0(t, e, r);
var L0 = x0;
const U0 = ke, k0 = (e, t) => U0(e, t, !0);
var M0 = k0;
const La = Re, B0 = (e, t, r) => {
  const n = new La(e, r), i = new La(t, r);
  return n.compare(i) || n.compareBuild(i);
};
var so = B0;
const H0 = so, q0 = (e, t) => e.sort((r, n) => H0(r, n, t));
var j0 = q0;
const G0 = so, V0 = (e, t) => e.sort((r, n) => G0(n, r, t));
var W0 = V0;
const Y0 = ke, X0 = (e, t, r) => Y0(e, t, r) > 0;
var Fn = X0;
const z0 = ke, K0 = (e, t, r) => z0(e, t, r) < 0;
var lo = K0;
const J0 = ke, Q0 = (e, t, r) => J0(e, t, r) === 0;
var yc = Q0;
const Z0 = ke, eg = (e, t, r) => Z0(e, t, r) !== 0;
var vc = eg;
const tg = ke, rg = (e, t, r) => tg(e, t, r) >= 0;
var co = rg;
const ng = ke, ig = (e, t, r) => ng(e, t, r) <= 0;
var uo = ig;
const og = yc, ag = vc, sg = Fn, lg = co, cg = lo, ug = uo, fg = (e, t, r, n) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e === r;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof r == "object" && (r = r.version), e !== r;
    case "":
    case "=":
    case "==":
      return og(e, r, n);
    case "!=":
      return ag(e, r, n);
    case ">":
      return sg(e, r, n);
    case ">=":
      return lg(e, r, n);
    case "<":
      return cg(e, r, n);
    case "<=":
      return ug(e, r, n);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var wc = fg;
const dg = Re, hg = Zt, { safeRe: an, t: sn } = Ur, pg = (e, t) => {
  if (e instanceof dg)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let r = null;
  if (!t.rtl)
    r = e.match(t.includePrerelease ? an[sn.COERCEFULL] : an[sn.COERCE]);
  else {
    const l = t.includePrerelease ? an[sn.COERCERTLFULL] : an[sn.COERCERTL];
    let d;
    for (; (d = l.exec(e)) && (!r || r.index + r[0].length !== e.length); )
      (!r || d.index + d[0].length !== r.index + r[0].length) && (r = d), l.lastIndex = d.index + d[1].length + d[2].length;
    l.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], i = r[3] || "0", o = r[4] || "0", a = t.includePrerelease && r[5] ? `-${r[5]}` : "", s = t.includePrerelease && r[6] ? `+${r[6]}` : "";
  return hg(`${n}.${i}.${o}${a}${s}`, t);
};
var mg = pg;
class gg {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const r = this.map.get(t);
    if (r !== void 0)
      return this.map.delete(t), this.map.set(t, r), r;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, r) {
    if (!this.delete(t) && r !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, r);
    }
    return this;
  }
}
var Eg = gg, hi, Ua;
function Me() {
  if (Ua) return hi;
  Ua = 1;
  const e = /\s+/g;
  class t {
    constructor(I, L) {
      if (L = i(L), I instanceof t)
        return I.loose === !!L.loose && I.includePrerelease === !!L.includePrerelease ? I : new t(I.raw, L);
      if (I instanceof o)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = L, this.loose = !!L.loose, this.includePrerelease = !!L.includePrerelease, this.raw = I.trim().replace(e, " "), this.set = this.raw.split("||").map((O) => this.parseRange(O.trim())).filter((O) => O.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const O = this.set[0];
        if (this.set = this.set.filter((B) => !w(B[0])), this.set.length === 0)
          this.set = [O];
        else if (this.set.length > 1) {
          for (const B of this.set)
            if (B.length === 1 && S(B[0])) {
              this.set = [B];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let I = 0; I < this.set.length; I++) {
          I > 0 && (this.formatted += "||");
          const L = this.set[I];
          for (let O = 0; O < L.length; O++)
            O > 0 && (this.formatted += " "), this.formatted += L[O].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(I) {
      const O = ((this.options.includePrerelease && g) | (this.options.loose && v)) + ":" + I, B = n.get(O);
      if (B)
        return B;
      const F = this.options.loose, G = F ? l[d.HYPHENRANGELOOSE] : l[d.HYPHENRANGE];
      I = I.replace(G, k(this.options.includePrerelease)), a("hyphen replace", I), I = I.replace(l[d.COMPARATORTRIM], f), a("comparator trim", I), I = I.replace(l[d.TILDETRIM], c), a("tilde trim", I), I = I.replace(l[d.CARETTRIM], h), a("caret trim", I);
      let z = I.split(" ").map((V) => y(V, this.options)).join(" ").split(/\s+/).map((V) => M(V, this.options));
      F && (z = z.filter((V) => (a("loose invalid filter", V, this.options), !!V.match(l[d.COMPARATORLOOSE])))), a("range list", z);
      const Y = /* @__PURE__ */ new Map(), J = z.map((V) => new o(V, this.options));
      for (const V of J) {
        if (w(V))
          return [V];
        Y.set(V.value, V);
      }
      Y.size > 1 && Y.has("") && Y.delete("");
      const fe = [...Y.values()];
      return n.set(O, fe), fe;
    }
    intersects(I, L) {
      if (!(I instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((O) => b(O, L) && I.set.some((B) => b(B, L) && O.every((F) => B.every((G) => F.intersects(G, L)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(I) {
      if (!I)
        return !1;
      if (typeof I == "string")
        try {
          I = new s(I, this.options);
        } catch {
          return !1;
        }
      for (let L = 0; L < this.set.length; L++)
        if (W(this.set[L], I, this.options))
          return !0;
      return !1;
    }
  }
  hi = t;
  const r = Eg, n = new r(), i = ao, o = xn(), a = Pn, s = Re, {
    safeRe: l,
    t: d,
    comparatorTrimReplace: f,
    tildeTrimReplace: c,
    caretTrimReplace: h
  } = Ur, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: v } = Dn, w = (D) => D.value === "<0.0.0-0", S = (D) => D.value === "", b = (D, I) => {
    let L = !0;
    const O = D.slice();
    let B = O.pop();
    for (; L && O.length; )
      L = O.every((F) => B.intersects(F, I)), B = O.pop();
    return L;
  }, y = (D, I) => (a("comp", D, I), D = x(D, I), a("caret", D), D = R(D, I), a("tildes", D), D = $(D, I), a("xrange", D), D = U(D, I), a("stars", D), D), T = (D) => !D || D.toLowerCase() === "x" || D === "*", R = (D, I) => D.trim().split(/\s+/).map((L) => H(L, I)).join(" "), H = (D, I) => {
    const L = I.loose ? l[d.TILDELOOSE] : l[d.TILDE];
    return D.replace(L, (O, B, F, G, z) => {
      a("tilde", D, O, B, F, G, z);
      let Y;
      return T(B) ? Y = "" : T(F) ? Y = `>=${B}.0.0 <${+B + 1}.0.0-0` : T(G) ? Y = `>=${B}.${F}.0 <${B}.${+F + 1}.0-0` : z ? (a("replaceTilde pr", z), Y = `>=${B}.${F}.${G}-${z} <${B}.${+F + 1}.0-0`) : Y = `>=${B}.${F}.${G} <${B}.${+F + 1}.0-0`, a("tilde return", Y), Y;
    });
  }, x = (D, I) => D.trim().split(/\s+/).map((L) => C(L, I)).join(" "), C = (D, I) => {
    a("caret", D, I);
    const L = I.loose ? l[d.CARETLOOSE] : l[d.CARET], O = I.includePrerelease ? "-0" : "";
    return D.replace(L, (B, F, G, z, Y) => {
      a("caret", D, B, F, G, z, Y);
      let J;
      return T(F) ? J = "" : T(G) ? J = `>=${F}.0.0${O} <${+F + 1}.0.0-0` : T(z) ? F === "0" ? J = `>=${F}.${G}.0${O} <${F}.${+G + 1}.0-0` : J = `>=${F}.${G}.0${O} <${+F + 1}.0.0-0` : Y ? (a("replaceCaret pr", Y), F === "0" ? G === "0" ? J = `>=${F}.${G}.${z}-${Y} <${F}.${G}.${+z + 1}-0` : J = `>=${F}.${G}.${z}-${Y} <${F}.${+G + 1}.0-0` : J = `>=${F}.${G}.${z}-${Y} <${+F + 1}.0.0-0`) : (a("no pr"), F === "0" ? G === "0" ? J = `>=${F}.${G}.${z}${O} <${F}.${G}.${+z + 1}-0` : J = `>=${F}.${G}.${z}${O} <${F}.${+G + 1}.0-0` : J = `>=${F}.${G}.${z} <${+F + 1}.0.0-0`), a("caret return", J), J;
    });
  }, $ = (D, I) => (a("replaceXRanges", D, I), D.split(/\s+/).map((L) => m(L, I)).join(" ")), m = (D, I) => {
    D = D.trim();
    const L = I.loose ? l[d.XRANGELOOSE] : l[d.XRANGE];
    return D.replace(L, (O, B, F, G, z, Y) => {
      a("xRange", D, O, B, F, G, z, Y);
      const J = T(F), fe = J || T(G), V = fe || T(z), Be = V;
      return B === "=" && Be && (B = ""), Y = I.includePrerelease ? "-0" : "", J ? B === ">" || B === "<" ? O = "<0.0.0-0" : O = "*" : B && Be ? (fe && (G = 0), z = 0, B === ">" ? (B = ">=", fe ? (F = +F + 1, G = 0, z = 0) : (G = +G + 1, z = 0)) : B === "<=" && (B = "<", fe ? F = +F + 1 : G = +G + 1), B === "<" && (Y = "-0"), O = `${B + F}.${G}.${z}${Y}`) : fe ? O = `>=${F}.0.0${Y} <${+F + 1}.0.0-0` : V && (O = `>=${F}.${G}.0${Y} <${F}.${+G + 1}.0-0`), a("xRange return", O), O;
    });
  }, U = (D, I) => (a("replaceStars", D, I), D.trim().replace(l[d.STAR], "")), M = (D, I) => (a("replaceGTE0", D, I), D.trim().replace(l[I.includePrerelease ? d.GTE0PRE : d.GTE0], "")), k = (D) => (I, L, O, B, F, G, z, Y, J, fe, V, Be) => (T(O) ? L = "" : T(B) ? L = `>=${O}.0.0${D ? "-0" : ""}` : T(F) ? L = `>=${O}.${B}.0${D ? "-0" : ""}` : G ? L = `>=${L}` : L = `>=${L}${D ? "-0" : ""}`, T(J) ? Y = "" : T(fe) ? Y = `<${+J + 1}.0.0-0` : T(V) ? Y = `<${J}.${+fe + 1}.0-0` : Be ? Y = `<=${J}.${fe}.${V}-${Be}` : D ? Y = `<${J}.${fe}.${+V + 1}-0` : Y = `<=${Y}`, `${L} ${Y}`.trim()), W = (D, I, L) => {
    for (let O = 0; O < D.length; O++)
      if (!D[O].test(I))
        return !1;
    if (I.prerelease.length && !L.includePrerelease) {
      for (let O = 0; O < D.length; O++)
        if (a(D[O].semver), D[O].semver !== o.ANY && D[O].semver.prerelease.length > 0) {
          const B = D[O].semver;
          if (B.major === I.major && B.minor === I.minor && B.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return hi;
}
var pi, ka;
function xn() {
  if (ka) return pi;
  ka = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(f, c) {
      if (c = r(c), f instanceof t) {
        if (f.loose === !!c.loose)
          return f;
        f = f.value;
      }
      f = f.trim().split(/\s+/).join(" "), a("comparator", f, c), this.options = c, this.loose = !!c.loose, this.parse(f), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(f) {
      const c = this.options.loose ? n[i.COMPARATORLOOSE] : n[i.COMPARATOR], h = f.match(c);
      if (!h)
        throw new TypeError(`Invalid comparator: ${f}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new s(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(f) {
      if (a("Comparator.test", f, this.options.loose), this.semver === e || f === e)
        return !0;
      if (typeof f == "string")
        try {
          f = new s(f, this.options);
        } catch {
          return !1;
        }
      return o(f, this.operator, this.semver, this.options);
    }
    intersects(f, c) {
      if (!(f instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(f.value, c).test(this.value) : f.operator === "" ? f.value === "" ? !0 : new l(this.value, c).test(f.semver) : (c = r(c), c.includePrerelease && (this.value === "<0.0.0-0" || f.value === "<0.0.0-0") || !c.includePrerelease && (this.value.startsWith("<0.0.0") || f.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && f.operator.startsWith(">") || this.operator.startsWith("<") && f.operator.startsWith("<") || this.semver.version === f.semver.version && this.operator.includes("=") && f.operator.includes("=") || o(this.semver, "<", f.semver, c) && this.operator.startsWith(">") && f.operator.startsWith("<") || o(this.semver, ">", f.semver, c) && this.operator.startsWith("<") && f.operator.startsWith(">")));
    }
  }
  pi = t;
  const r = ao, { safeRe: n, t: i } = Ur, o = wc, a = Pn, s = Re, l = Me();
  return pi;
}
const yg = Me(), vg = (e, t, r) => {
  try {
    t = new yg(t, r);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Ln = vg;
const wg = Me(), _g = (e, t) => new wg(e, t).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var Ag = _g;
const Tg = Re, Sg = Me(), Cg = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new Sg(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === -1) && (n = a, i = new Tg(n, r));
  }), n;
};
var bg = Cg;
const Rg = Re, Ig = Me(), Og = (e, t, r) => {
  let n = null, i = null, o = null;
  try {
    o = new Ig(t, r);
  } catch {
    return null;
  }
  return e.forEach((a) => {
    o.test(a) && (!n || i.compare(a) === 1) && (n = a, i = new Rg(n, r));
  }), n;
};
var $g = Og;
const mi = Re, Ng = Me(), Ma = Fn, Dg = (e, t) => {
  e = new Ng(e, t);
  let r = new mi("0.0.0");
  if (e.test(r) || (r = new mi("0.0.0-0"), e.test(r)))
    return r;
  r = null;
  for (let n = 0; n < e.set.length; ++n) {
    const i = e.set[n];
    let o = null;
    i.forEach((a) => {
      const s = new mi(a.semver.version);
      switch (a.operator) {
        case ">":
          s.prerelease.length === 0 ? s.patch++ : s.prerelease.push(0), s.raw = s.format();
        case "":
        case ">=":
          (!o || Ma(s, o)) && (o = s);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${a.operator}`);
      }
    }), o && (!r || Ma(r, o)) && (r = o);
  }
  return r && e.test(r) ? r : null;
};
var Pg = Dg;
const Fg = Me(), xg = (e, t) => {
  try {
    return new Fg(e, t).range || "*";
  } catch {
    return null;
  }
};
var Lg = xg;
const Ug = Re, _c = xn(), { ANY: kg } = _c, Mg = Me(), Bg = Ln, Ba = Fn, Ha = lo, Hg = uo, qg = co, jg = (e, t, r, n) => {
  e = new Ug(e, n), t = new Mg(t, n);
  let i, o, a, s, l;
  switch (r) {
    case ">":
      i = Ba, o = Hg, a = Ha, s = ">", l = ">=";
      break;
    case "<":
      i = Ha, o = qg, a = Ba, s = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Bg(e, t, n))
    return !1;
  for (let d = 0; d < t.set.length; ++d) {
    const f = t.set[d];
    let c = null, h = null;
    if (f.forEach((g) => {
      g.semver === kg && (g = new _c(">=0.0.0")), c = c || g, h = h || g, i(g.semver, c.semver, n) ? c = g : a(g.semver, h.semver, n) && (h = g);
    }), c.operator === s || c.operator === l || (!h.operator || h.operator === s) && o(e, h.semver))
      return !1;
    if (h.operator === l && a(e, h.semver))
      return !1;
  }
  return !0;
};
var fo = jg;
const Gg = fo, Vg = (e, t, r) => Gg(e, t, ">", r);
var Wg = Vg;
const Yg = fo, Xg = (e, t, r) => Yg(e, t, "<", r);
var zg = Xg;
const qa = Me(), Kg = (e, t, r) => (e = new qa(e, r), t = new qa(t, r), e.intersects(t, r));
var Jg = Kg;
const Qg = Ln, Zg = ke;
var eE = (e, t, r) => {
  const n = [];
  let i = null, o = null;
  const a = e.sort((f, c) => Zg(f, c, r));
  for (const f of a)
    Qg(f, t, r) ? (o = f, i || (i = f)) : (o && n.push([i, o]), o = null, i = null);
  i && n.push([i, null]);
  const s = [];
  for (const [f, c] of n)
    f === c ? s.push(f) : !c && f === a[0] ? s.push("*") : c ? f === a[0] ? s.push(`<=${c}`) : s.push(`${f} - ${c}`) : s.push(`>=${f}`);
  const l = s.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < d.length ? l : t;
};
const ja = Me(), ho = xn(), { ANY: gi } = ho, lr = Ln, po = ke, tE = (e, t, r = {}) => {
  if (e === t)
    return !0;
  e = new ja(e, r), t = new ja(t, r);
  let n = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const a = nE(i, o, r);
      if (n = n || a !== null, a)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, rE = [new ho(">=0.0.0-0")], Ga = [new ho(">=0.0.0")], nE = (e, t, r) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === gi) {
    if (t.length === 1 && t[0].semver === gi)
      return !0;
    r.includePrerelease ? e = rE : e = Ga;
  }
  if (t.length === 1 && t[0].semver === gi) {
    if (r.includePrerelease)
      return !0;
    t = Ga;
  }
  const n = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = Va(i, g, r) : g.operator === "<" || g.operator === "<=" ? o = Wa(o, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let a;
  if (i && o) {
    if (a = po(i.semver, o.semver, r), a > 0)
      return null;
    if (a === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (i && !lr(g, String(i), r) || o && !lr(g, String(o), r))
      return null;
    for (const v of t)
      if (!lr(g, String(v), r))
        return !1;
    return !0;
  }
  let s, l, d, f, c = o && !r.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !r.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  c && c.prerelease.length === 1 && o.operator === "<" && c.prerelease[0] === 0 && (c = !1);
  for (const g of t) {
    if (f = f || g.operator === ">" || g.operator === ">=", d = d || g.operator === "<" || g.operator === "<=", i) {
      if (h && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === h.major && g.semver.minor === h.minor && g.semver.patch === h.patch && (h = !1), g.operator === ">" || g.operator === ">=") {
        if (s = Va(i, g, r), s === g && s !== i)
          return !1;
      } else if (i.operator === ">=" && !lr(i.semver, String(g), r))
        return !1;
    }
    if (o) {
      if (c && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === c.major && g.semver.minor === c.minor && g.semver.patch === c.patch && (c = !1), g.operator === "<" || g.operator === "<=") {
        if (l = Wa(o, g, r), l === g && l !== o)
          return !1;
      } else if (o.operator === "<=" && !lr(o.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (o || i) && a !== 0)
      return !1;
  }
  return !(i && d && !o && a !== 0 || o && f && !i && a !== 0 || h || c);
}, Va = (e, t, r) => {
  if (!e)
    return t;
  const n = po(e.semver, t.semver, r);
  return n > 0 ? e : n < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Wa = (e, t, r) => {
  if (!e)
    return t;
  const n = po(e.semver, t.semver, r);
  return n < 0 ? e : n > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var iE = tE;
const Ei = Ur, Ya = Dn, oE = Re, Xa = Ec, aE = Zt, sE = h0, lE = g0, cE = y0, uE = w0, fE = T0, dE = b0, hE = O0, pE = D0, mE = ke, gE = L0, EE = M0, yE = so, vE = j0, wE = W0, _E = Fn, AE = lo, TE = yc, SE = vc, CE = co, bE = uo, RE = wc, IE = mg, OE = xn(), $E = Me(), NE = Ln, DE = Ag, PE = bg, FE = $g, xE = Pg, LE = Lg, UE = fo, kE = Wg, ME = zg, BE = Jg, HE = eE, qE = iE;
var Ac = {
  parse: aE,
  valid: sE,
  clean: lE,
  inc: cE,
  diff: uE,
  major: fE,
  minor: dE,
  patch: hE,
  prerelease: pE,
  compare: mE,
  rcompare: gE,
  compareLoose: EE,
  compareBuild: yE,
  sort: vE,
  rsort: wE,
  gt: _E,
  lt: AE,
  eq: TE,
  neq: SE,
  gte: CE,
  lte: bE,
  cmp: RE,
  coerce: IE,
  Comparator: OE,
  Range: $E,
  satisfies: NE,
  toComparators: DE,
  maxSatisfying: PE,
  minSatisfying: FE,
  minVersion: xE,
  validRange: LE,
  outside: UE,
  gtr: kE,
  ltr: ME,
  intersects: BE,
  simplifyRange: HE,
  subset: qE,
  SemVer: oE,
  re: Ei.re,
  src: Ei.src,
  tokens: Ei.t,
  SEMVER_SPEC_VERSION: Ya.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ya.RELEASE_TYPES,
  compareIdentifiers: Xa.compareIdentifiers,
  rcompareIdentifiers: Xa.rcompareIdentifiers
}, Xt = {}, An = { exports: {} };
An.exports;
(function(e, t) {
  var r = 200, n = "__lodash_hash_undefined__", i = 1, o = 2, a = 9007199254740991, s = "[object Arguments]", l = "[object Array]", d = "[object AsyncFunction]", f = "[object Boolean]", c = "[object Date]", h = "[object Error]", g = "[object Function]", v = "[object GeneratorFunction]", w = "[object Map]", S = "[object Number]", b = "[object Null]", y = "[object Object]", T = "[object Promise]", R = "[object Proxy]", H = "[object RegExp]", x = "[object Set]", C = "[object String]", $ = "[object Symbol]", m = "[object Undefined]", U = "[object WeakMap]", M = "[object ArrayBuffer]", k = "[object DataView]", W = "[object Float32Array]", D = "[object Float64Array]", I = "[object Int8Array]", L = "[object Int16Array]", O = "[object Int32Array]", B = "[object Uint8Array]", F = "[object Uint8ClampedArray]", G = "[object Uint16Array]", z = "[object Uint32Array]", Y = /[\\^$.*+?()[\]{}|]/g, J = /^\[object .+?Constructor\]$/, fe = /^(?:0|[1-9]\d*)$/, V = {};
  V[W] = V[D] = V[I] = V[L] = V[O] = V[B] = V[F] = V[G] = V[z] = !0, V[s] = V[l] = V[M] = V[f] = V[k] = V[c] = V[h] = V[g] = V[w] = V[S] = V[y] = V[H] = V[x] = V[C] = V[U] = !1;
  var Be = typeof Le == "object" && Le && Le.Object === Object && Le, p = typeof self == "object" && self && self.Object === Object && self, u = Be || p || Function("return this")(), N = t && !t.nodeType && t, A = N && !0 && e && !e.nodeType && e, K = A && A.exports === N, ee = K && Be.process, ie = function() {
    try {
      return ee && ee.binding && ee.binding("util");
    } catch {
    }
  }(), pe = ie && ie.isTypedArray;
  function ye(E, _) {
    for (var P = -1, q = E == null ? 0 : E.length, Z = 0, X = []; ++P < q; ) {
      var oe = E[P];
      _(oe, P, E) && (X[Z++] = oe);
    }
    return X;
  }
  function Qe(E, _) {
    for (var P = -1, q = _.length, Z = E.length; ++P < q; )
      E[Z + P] = _[P];
    return E;
  }
  function ue(E, _) {
    for (var P = -1, q = E == null ? 0 : E.length; ++P < q; )
      if (_(E[P], P, E))
        return !0;
    return !1;
  }
  function Pe(E, _) {
    for (var P = -1, q = Array(E); ++P < E; )
      q[P] = _(P);
    return q;
  }
  function Vn(E) {
    return function(_) {
      return E(_);
    };
  }
  function qr(E, _) {
    return E.has(_);
  }
  function tr(E, _) {
    return E == null ? void 0 : E[_];
  }
  function jr(E) {
    var _ = -1, P = Array(E.size);
    return E.forEach(function(q, Z) {
      P[++_] = [Z, q];
    }), P;
  }
  function Fc(E, _) {
    return function(P) {
      return E(_(P));
    };
  }
  function xc(E) {
    var _ = -1, P = Array(E.size);
    return E.forEach(function(q) {
      P[++_] = q;
    }), P;
  }
  var Lc = Array.prototype, Uc = Function.prototype, Gr = Object.prototype, Wn = u["__core-js_shared__"], Eo = Uc.toString, He = Gr.hasOwnProperty, yo = function() {
    var E = /[^.]+$/.exec(Wn && Wn.keys && Wn.keys.IE_PROTO || "");
    return E ? "Symbol(src)_1." + E : "";
  }(), vo = Gr.toString, kc = RegExp(
    "^" + Eo.call(He).replace(Y, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), wo = K ? u.Buffer : void 0, Vr = u.Symbol, _o = u.Uint8Array, Ao = Gr.propertyIsEnumerable, Mc = Lc.splice, ht = Vr ? Vr.toStringTag : void 0, To = Object.getOwnPropertySymbols, Bc = wo ? wo.isBuffer : void 0, Hc = Fc(Object.keys, Object), Yn = Dt(u, "DataView"), rr = Dt(u, "Map"), Xn = Dt(u, "Promise"), zn = Dt(u, "Set"), Kn = Dt(u, "WeakMap"), nr = Dt(Object, "create"), qc = gt(Yn), jc = gt(rr), Gc = gt(Xn), Vc = gt(zn), Wc = gt(Kn), So = Vr ? Vr.prototype : void 0, Jn = So ? So.valueOf : void 0;
  function pt(E) {
    var _ = -1, P = E == null ? 0 : E.length;
    for (this.clear(); ++_ < P; ) {
      var q = E[_];
      this.set(q[0], q[1]);
    }
  }
  function Yc() {
    this.__data__ = nr ? nr(null) : {}, this.size = 0;
  }
  function Xc(E) {
    var _ = this.has(E) && delete this.__data__[E];
    return this.size -= _ ? 1 : 0, _;
  }
  function zc(E) {
    var _ = this.__data__;
    if (nr) {
      var P = _[E];
      return P === n ? void 0 : P;
    }
    return He.call(_, E) ? _[E] : void 0;
  }
  function Kc(E) {
    var _ = this.__data__;
    return nr ? _[E] !== void 0 : He.call(_, E);
  }
  function Jc(E, _) {
    var P = this.__data__;
    return this.size += this.has(E) ? 0 : 1, P[E] = nr && _ === void 0 ? n : _, this;
  }
  pt.prototype.clear = Yc, pt.prototype.delete = Xc, pt.prototype.get = zc, pt.prototype.has = Kc, pt.prototype.set = Jc;
  function We(E) {
    var _ = -1, P = E == null ? 0 : E.length;
    for (this.clear(); ++_ < P; ) {
      var q = E[_];
      this.set(q[0], q[1]);
    }
  }
  function Qc() {
    this.__data__ = [], this.size = 0;
  }
  function Zc(E) {
    var _ = this.__data__, P = Yr(_, E);
    if (P < 0)
      return !1;
    var q = _.length - 1;
    return P == q ? _.pop() : Mc.call(_, P, 1), --this.size, !0;
  }
  function eu(E) {
    var _ = this.__data__, P = Yr(_, E);
    return P < 0 ? void 0 : _[P][1];
  }
  function tu(E) {
    return Yr(this.__data__, E) > -1;
  }
  function ru(E, _) {
    var P = this.__data__, q = Yr(P, E);
    return q < 0 ? (++this.size, P.push([E, _])) : P[q][1] = _, this;
  }
  We.prototype.clear = Qc, We.prototype.delete = Zc, We.prototype.get = eu, We.prototype.has = tu, We.prototype.set = ru;
  function mt(E) {
    var _ = -1, P = E == null ? 0 : E.length;
    for (this.clear(); ++_ < P; ) {
      var q = E[_];
      this.set(q[0], q[1]);
    }
  }
  function nu() {
    this.size = 0, this.__data__ = {
      hash: new pt(),
      map: new (rr || We)(),
      string: new pt()
    };
  }
  function iu(E) {
    var _ = Xr(this, E).delete(E);
    return this.size -= _ ? 1 : 0, _;
  }
  function ou(E) {
    return Xr(this, E).get(E);
  }
  function au(E) {
    return Xr(this, E).has(E);
  }
  function su(E, _) {
    var P = Xr(this, E), q = P.size;
    return P.set(E, _), this.size += P.size == q ? 0 : 1, this;
  }
  mt.prototype.clear = nu, mt.prototype.delete = iu, mt.prototype.get = ou, mt.prototype.has = au, mt.prototype.set = su;
  function Wr(E) {
    var _ = -1, P = E == null ? 0 : E.length;
    for (this.__data__ = new mt(); ++_ < P; )
      this.add(E[_]);
  }
  function lu(E) {
    return this.__data__.set(E, n), this;
  }
  function cu(E) {
    return this.__data__.has(E);
  }
  Wr.prototype.add = Wr.prototype.push = lu, Wr.prototype.has = cu;
  function Ze(E) {
    var _ = this.__data__ = new We(E);
    this.size = _.size;
  }
  function uu() {
    this.__data__ = new We(), this.size = 0;
  }
  function fu(E) {
    var _ = this.__data__, P = _.delete(E);
    return this.size = _.size, P;
  }
  function du(E) {
    return this.__data__.get(E);
  }
  function hu(E) {
    return this.__data__.has(E);
  }
  function pu(E, _) {
    var P = this.__data__;
    if (P instanceof We) {
      var q = P.__data__;
      if (!rr || q.length < r - 1)
        return q.push([E, _]), this.size = ++P.size, this;
      P = this.__data__ = new mt(q);
    }
    return P.set(E, _), this.size = P.size, this;
  }
  Ze.prototype.clear = uu, Ze.prototype.delete = fu, Ze.prototype.get = du, Ze.prototype.has = hu, Ze.prototype.set = pu;
  function mu(E, _) {
    var P = zr(E), q = !P && $u(E), Z = !P && !q && Qn(E), X = !P && !q && !Z && Po(E), oe = P || q || Z || X, de = oe ? Pe(E.length, String) : [], me = de.length;
    for (var te in E)
      He.call(E, te) && !(oe && // Safari 9 has enumerable `arguments.length` in strict mode.
      (te == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      Z && (te == "offset" || te == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      X && (te == "buffer" || te == "byteLength" || te == "byteOffset") || // Skip index properties.
      Cu(te, me))) && de.push(te);
    return de;
  }
  function Yr(E, _) {
    for (var P = E.length; P--; )
      if (Oo(E[P][0], _))
        return P;
    return -1;
  }
  function gu(E, _, P) {
    var q = _(E);
    return zr(E) ? q : Qe(q, P(E));
  }
  function ir(E) {
    return E == null ? E === void 0 ? m : b : ht && ht in Object(E) ? Tu(E) : Ou(E);
  }
  function Co(E) {
    return or(E) && ir(E) == s;
  }
  function bo(E, _, P, q, Z) {
    return E === _ ? !0 : E == null || _ == null || !or(E) && !or(_) ? E !== E && _ !== _ : Eu(E, _, P, q, bo, Z);
  }
  function Eu(E, _, P, q, Z, X) {
    var oe = zr(E), de = zr(_), me = oe ? l : et(E), te = de ? l : et(_);
    me = me == s ? y : me, te = te == s ? y : te;
    var $e = me == y, Fe = te == y, ve = me == te;
    if (ve && Qn(E)) {
      if (!Qn(_))
        return !1;
      oe = !0, $e = !1;
    }
    if (ve && !$e)
      return X || (X = new Ze()), oe || Po(E) ? Ro(E, _, P, q, Z, X) : _u(E, _, me, P, q, Z, X);
    if (!(P & i)) {
      var Ne = $e && He.call(E, "__wrapped__"), De = Fe && He.call(_, "__wrapped__");
      if (Ne || De) {
        var tt = Ne ? E.value() : E, Ye = De ? _.value() : _;
        return X || (X = new Ze()), Z(tt, Ye, P, q, X);
      }
    }
    return ve ? (X || (X = new Ze()), Au(E, _, P, q, Z, X)) : !1;
  }
  function yu(E) {
    if (!Do(E) || Ru(E))
      return !1;
    var _ = $o(E) ? kc : J;
    return _.test(gt(E));
  }
  function vu(E) {
    return or(E) && No(E.length) && !!V[ir(E)];
  }
  function wu(E) {
    if (!Iu(E))
      return Hc(E);
    var _ = [];
    for (var P in Object(E))
      He.call(E, P) && P != "constructor" && _.push(P);
    return _;
  }
  function Ro(E, _, P, q, Z, X) {
    var oe = P & i, de = E.length, me = _.length;
    if (de != me && !(oe && me > de))
      return !1;
    var te = X.get(E);
    if (te && X.get(_))
      return te == _;
    var $e = -1, Fe = !0, ve = P & o ? new Wr() : void 0;
    for (X.set(E, _), X.set(_, E); ++$e < de; ) {
      var Ne = E[$e], De = _[$e];
      if (q)
        var tt = oe ? q(De, Ne, $e, _, E, X) : q(Ne, De, $e, E, _, X);
      if (tt !== void 0) {
        if (tt)
          continue;
        Fe = !1;
        break;
      }
      if (ve) {
        if (!ue(_, function(Ye, Et) {
          if (!qr(ve, Et) && (Ne === Ye || Z(Ne, Ye, P, q, X)))
            return ve.push(Et);
        })) {
          Fe = !1;
          break;
        }
      } else if (!(Ne === De || Z(Ne, De, P, q, X))) {
        Fe = !1;
        break;
      }
    }
    return X.delete(E), X.delete(_), Fe;
  }
  function _u(E, _, P, q, Z, X, oe) {
    switch (P) {
      case k:
        if (E.byteLength != _.byteLength || E.byteOffset != _.byteOffset)
          return !1;
        E = E.buffer, _ = _.buffer;
      case M:
        return !(E.byteLength != _.byteLength || !X(new _o(E), new _o(_)));
      case f:
      case c:
      case S:
        return Oo(+E, +_);
      case h:
        return E.name == _.name && E.message == _.message;
      case H:
      case C:
        return E == _ + "";
      case w:
        var de = jr;
      case x:
        var me = q & i;
        if (de || (de = xc), E.size != _.size && !me)
          return !1;
        var te = oe.get(E);
        if (te)
          return te == _;
        q |= o, oe.set(E, _);
        var $e = Ro(de(E), de(_), q, Z, X, oe);
        return oe.delete(E), $e;
      case $:
        if (Jn)
          return Jn.call(E) == Jn.call(_);
    }
    return !1;
  }
  function Au(E, _, P, q, Z, X) {
    var oe = P & i, de = Io(E), me = de.length, te = Io(_), $e = te.length;
    if (me != $e && !oe)
      return !1;
    for (var Fe = me; Fe--; ) {
      var ve = de[Fe];
      if (!(oe ? ve in _ : He.call(_, ve)))
        return !1;
    }
    var Ne = X.get(E);
    if (Ne && X.get(_))
      return Ne == _;
    var De = !0;
    X.set(E, _), X.set(_, E);
    for (var tt = oe; ++Fe < me; ) {
      ve = de[Fe];
      var Ye = E[ve], Et = _[ve];
      if (q)
        var Fo = oe ? q(Et, Ye, ve, _, E, X) : q(Ye, Et, ve, E, _, X);
      if (!(Fo === void 0 ? Ye === Et || Z(Ye, Et, P, q, X) : Fo)) {
        De = !1;
        break;
      }
      tt || (tt = ve == "constructor");
    }
    if (De && !tt) {
      var Kr = E.constructor, Jr = _.constructor;
      Kr != Jr && "constructor" in E && "constructor" in _ && !(typeof Kr == "function" && Kr instanceof Kr && typeof Jr == "function" && Jr instanceof Jr) && (De = !1);
    }
    return X.delete(E), X.delete(_), De;
  }
  function Io(E) {
    return gu(E, Pu, Su);
  }
  function Xr(E, _) {
    var P = E.__data__;
    return bu(_) ? P[typeof _ == "string" ? "string" : "hash"] : P.map;
  }
  function Dt(E, _) {
    var P = tr(E, _);
    return yu(P) ? P : void 0;
  }
  function Tu(E) {
    var _ = He.call(E, ht), P = E[ht];
    try {
      E[ht] = void 0;
      var q = !0;
    } catch {
    }
    var Z = vo.call(E);
    return q && (_ ? E[ht] = P : delete E[ht]), Z;
  }
  var Su = To ? function(E) {
    return E == null ? [] : (E = Object(E), ye(To(E), function(_) {
      return Ao.call(E, _);
    }));
  } : Fu, et = ir;
  (Yn && et(new Yn(new ArrayBuffer(1))) != k || rr && et(new rr()) != w || Xn && et(Xn.resolve()) != T || zn && et(new zn()) != x || Kn && et(new Kn()) != U) && (et = function(E) {
    var _ = ir(E), P = _ == y ? E.constructor : void 0, q = P ? gt(P) : "";
    if (q)
      switch (q) {
        case qc:
          return k;
        case jc:
          return w;
        case Gc:
          return T;
        case Vc:
          return x;
        case Wc:
          return U;
      }
    return _;
  });
  function Cu(E, _) {
    return _ = _ ?? a, !!_ && (typeof E == "number" || fe.test(E)) && E > -1 && E % 1 == 0 && E < _;
  }
  function bu(E) {
    var _ = typeof E;
    return _ == "string" || _ == "number" || _ == "symbol" || _ == "boolean" ? E !== "__proto__" : E === null;
  }
  function Ru(E) {
    return !!yo && yo in E;
  }
  function Iu(E) {
    var _ = E && E.constructor, P = typeof _ == "function" && _.prototype || Gr;
    return E === P;
  }
  function Ou(E) {
    return vo.call(E);
  }
  function gt(E) {
    if (E != null) {
      try {
        return Eo.call(E);
      } catch {
      }
      try {
        return E + "";
      } catch {
      }
    }
    return "";
  }
  function Oo(E, _) {
    return E === _ || E !== E && _ !== _;
  }
  var $u = Co(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Co : function(E) {
    return or(E) && He.call(E, "callee") && !Ao.call(E, "callee");
  }, zr = Array.isArray;
  function Nu(E) {
    return E != null && No(E.length) && !$o(E);
  }
  var Qn = Bc || xu;
  function Du(E, _) {
    return bo(E, _);
  }
  function $o(E) {
    if (!Do(E))
      return !1;
    var _ = ir(E);
    return _ == g || _ == v || _ == d || _ == R;
  }
  function No(E) {
    return typeof E == "number" && E > -1 && E % 1 == 0 && E <= a;
  }
  function Do(E) {
    var _ = typeof E;
    return E != null && (_ == "object" || _ == "function");
  }
  function or(E) {
    return E != null && typeof E == "object";
  }
  var Po = pe ? Vn(pe) : vu;
  function Pu(E) {
    return Nu(E) ? mu(E) : wu(E);
  }
  function Fu() {
    return [];
  }
  function xu() {
    return !1;
  }
  e.exports = Du;
})(An, An.exports);
var jE = An.exports;
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.createTempUpdateFile = Xt.DownloadedUpdateHelper = void 0;
const GE = Nr, VE = ft, za = jE, _t = dt, vr = se;
class WE {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return vr.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, r, n, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return za(this.versionInfo, r) && za(this.fileInfo.info, n.info) && await (0, _t.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(n, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, r, n, i, o, a) {
    this._file = t, this._packageFile = r, this.versionInfo = n, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, a && await (0, _t.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, _t.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, r) {
    var n;
    const i = this.getUpdateInfoFile();
    if (!await (0, _t.pathExists)(i))
      return null;
    let a;
    try {
      a = await (0, _t.readJson)(i);
    } catch (f) {
      let c = "No cached update info available";
      return f.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${f.message})`), r.info(c), null;
    }
    if (!((n = (a == null ? void 0 : a.fileName) !== null) !== null && n !== void 0 ? n : !1))
      return r.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== a.sha512)
      return r.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${a.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const l = vr.join(this.cacheDirForPendingUpdate, a.fileName);
    if (!await (0, _t.pathExists)(l))
      return r.info("Cached update file doesn't exist"), null;
    const d = await YE(l);
    return t.info.sha512 !== d ? (r.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${d}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = a, l);
  }
  getUpdateInfoFile() {
    return vr.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Xt.DownloadedUpdateHelper = WE;
function YE(e, t = "sha512", r = "base64", n) {
  return new Promise((i, o) => {
    const a = (0, GE.createHash)(t);
    a.on("error", o).setEncoding(r), (0, VE.createReadStream)(e, {
      ...n,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      a.end(), i(a.read());
    }).pipe(a, { end: !1 });
  });
}
async function XE(e, t, r) {
  let n = 0, i = vr.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, _t.unlink)(i), i;
    } catch (a) {
      if (a.code === "ENOENT")
        return i;
      r.warn(`Error on remove temp update file: ${a}`), i = vr.join(t, `${n++}-${e}`);
    }
  return i;
}
Xt.createTempUpdateFile = XE;
var Un = {}, kn = {};
Object.defineProperty(kn, "__esModule", { value: !0 });
kn.getAppCacheDir = void 0;
const yi = se, zE = ji;
function KE() {
  const e = (0, zE.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || yi.join(e, "AppData", "Local") : process.platform === "darwin" ? t = yi.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || yi.join(e, ".cache"), t;
}
kn.getAppCacheDir = KE;
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.ElectronAppAdapter = void 0;
const Ka = se, JE = kn;
class QE {
  constructor(t = bt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Ka.join(process.resourcesPath, "app-update.yml") : Ka.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, JE.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (r, n) => t(n));
  }
}
Un.ElectronAppAdapter = QE;
var Tc = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.getNetSession = e.NET_SESSION_NAME = void 0;
  const t = ce();
  e.NET_SESSION_NAME = "electron-updater";
  function r() {
    return bt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  e.getNetSession = r;
  class n extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, a, s) {
      return await s.cancellationToken.createPromise((l, d, f) => {
        const c = {
          headers: s.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, c), (0, t.configureRequestOptions)(c), this.doDownload(c, {
          destination: a,
          options: s,
          onCancel: f,
          callback: (h) => {
            h == null ? l(a) : d(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, a) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = r());
      const s = bt.net.request({
        ...o,
        session: this.cachedSession
      });
      return s.on("response", a), this.proxyLoginCallback != null && s.on("login", this.proxyLoginCallback), s;
    }
    addRedirectHandlers(o, a, s, l, d) {
      o.on("redirect", (f, c, h) => {
        o.abort(), l > this.maxRedirects ? s(this.createMaxRedirectError()) : d(t.HttpExecutor.prepareRedirectUrlOptions(h, a));
      });
    }
  }
  e.ElectronHttpExecutor = n;
})(Tc);
var kr = {}, _e = {}, ZE = 1 / 0, ey = "[object Symbol]", Sc = /[\\^$.*+?()[\]{}|]/g, ty = RegExp(Sc.source), ry = typeof Le == "object" && Le && Le.Object === Object && Le, ny = typeof self == "object" && self && self.Object === Object && self, iy = ry || ny || Function("return this")(), oy = Object.prototype, ay = oy.toString, Ja = iy.Symbol, Qa = Ja ? Ja.prototype : void 0, Za = Qa ? Qa.toString : void 0;
function sy(e) {
  if (typeof e == "string")
    return e;
  if (cy(e))
    return Za ? Za.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -ZE ? "-0" : t;
}
function ly(e) {
  return !!e && typeof e == "object";
}
function cy(e) {
  return typeof e == "symbol" || ly(e) && ay.call(e) == ey;
}
function uy(e) {
  return e == null ? "" : sy(e);
}
function fy(e) {
  return e = uy(e), e && ty.test(e) ? e.replace(Sc, "\\$&") : e;
}
var dy = fy;
Object.defineProperty(_e, "__esModule", { value: !0 });
_e.blockmapFiles = _e.getChannelFilename = _e.newUrlFromBase = _e.newBaseUrl = void 0;
const Cc = Jt, hy = dy;
function py(e) {
  const t = new Cc.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
_e.newBaseUrl = py;
function Ui(e, t, r = !1) {
  const n = new Cc.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? n.search = i : r && (n.search = `noCache=${Date.now().toString(32)}`), n;
}
_e.newUrlFromBase = Ui;
function my(e) {
  return `${e}.yml`;
}
_e.getChannelFilename = my;
function gy(e, t, r) {
  const n = Ui(`${e.pathname}.blockmap`, e);
  return [Ui(`${e.pathname.replace(new RegExp(hy(r), "g"), t)}.blockmap`, e), n];
}
_e.blockmapFiles = gy;
var ae = {};
Object.defineProperty(ae, "__esModule", { value: !0 });
ae.resolveFiles = ae.getFileList = ae.parseUpdateInfo = ae.findFile = ae.Provider = void 0;
const ct = ce(), Ey = Ee, es = _e;
class yy {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, r, n) {
    return this.executor.request(this.createRequestOptions(t, r), n);
  }
  createRequestOptions(t, r) {
    const n = {};
    return this.requestHeaders == null ? r != null && (n.headers = r) : n.headers = r == null ? this.requestHeaders : { ...this.requestHeaders, ...r }, (0, ct.configureRequestUrl)(t, n), n;
  }
}
ae.Provider = yy;
function vy(e, t, r) {
  if (e.length === 0)
    throw (0, ct.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const n = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return n ?? (r == null ? e[0] : e.find((i) => !r.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
ae.findFile = vy;
function wy(e, t, r) {
  if (e == null)
    throw (0, ct.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let n;
  try {
    n = (0, Ey.load)(e);
  } catch (i) {
    throw (0, ct.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${r}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return n;
}
ae.parseUpdateInfo = wy;
function bc(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, ct.newError)(`No files provided: ${(0, ct.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
ae.getFileList = bc;
function _y(e, t, r = (n) => n) {
  const i = bc(e).map((s) => {
    if (s.sha2 == null && s.sha512 == null)
      throw (0, ct.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, ct.safeStringifyJson)(s)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, es.newUrlFromBase)(r(s.url), t),
      info: s
    };
  }), o = e.packages, a = o == null ? null : o[process.arch] || o.ia32;
  return a != null && (i[0].packageInfo = {
    ...a,
    path: (0, es.newUrlFromBase)(r(a.path), t).href
  }), i;
}
ae.resolveFiles = _y;
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.GenericProvider = void 0;
const ts = ce(), vi = _e, wi = ae;
class Ay extends wi.Provider {
  constructor(t, r, n) {
    super(n), this.configuration = t, this.updater = r, this.baseUrl = (0, vi.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, vi.getChannelFilename)(this.channel), r = (0, vi.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let n = 0; ; n++)
      try {
        return (0, wi.parseUpdateInfo)(await this.httpRequest(r), t, r);
      } catch (i) {
        if (i instanceof ts.HttpError && i.statusCode === 404)
          throw (0, ts.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && n < 3) {
          await new Promise((o, a) => {
            try {
              setTimeout(o, 1e3 * n);
            } catch (s) {
              a(s);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, wi.resolveFiles)(t, this.baseUrl);
  }
}
kr.GenericProvider = Ay;
var zt = {}, Mn = {};
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.BitbucketProvider = void 0;
const rs = ce(), _i = _e, Ai = ae;
class Ty extends Ai.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, _i.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new rs.CancellationToken(), r = (0, _i.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, _i.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, void 0, t);
      return (0, Ai.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, rs.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ai.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: r } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${r}, channel: ${this.channel})`;
  }
}
Mn.BitbucketProvider = Ty;
var Ke = {};
Object.defineProperty(Ke, "__esModule", { value: !0 });
Ke.computeReleaseNotes = Ke.GitHubProvider = Ke.BaseGitHubProvider = void 0;
const ze = ce(), wr = Ac, Sy = Jt, Ht = _e, ki = ae, Ti = /\/tag\/([^/]+)$/;
class Rc extends ki.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Ht.newBaseUrl)((0, ze.githubUrl)(t, r));
    const i = r === "github.com" ? "api.github.com" : r;
    this.baseApiUrl = (0, Ht.newBaseUrl)((0, ze.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const r = this.options.host;
    return r && !["github.com", "api.github.com"].includes(r) ? `/api/v3${t}` : t;
  }
}
Ke.BaseGitHubProvider = Rc;
class Cy extends Rc {
  constructor(t, r, n) {
    super(t, "github.com", n), this.options = t, this.updater = r;
  }
  async getLatestVersion() {
    var t, r, n, i;
    const o = new ze.CancellationToken(), a = await this.httpRequest((0, Ht.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, o), s = (0, ze.parseXml)(a);
    let l = s.element("entry", !1, "No published versions on GitHub"), d = null;
    try {
      if (this.updater.allowPrerelease) {
        const w = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((r = wr.prerelease(this.updater.currentVersion)) === null || r === void 0 ? void 0 : r[0]) || null;
        if (w === null)
          d = Ti.exec(l.element("link").attribute("href"))[1];
        else
          for (const S of s.getElements("entry")) {
            const b = Ti.exec(S.element("link").attribute("href"));
            if (b === null)
              continue;
            const y = b[1], T = ((n = wr.prerelease(y)) === null || n === void 0 ? void 0 : n[0]) || null, R = !w || ["alpha", "beta"].includes(w), H = T !== null && !["alpha", "beta"].includes(String(T));
            if (R && !H && !(w === "beta" && T === "alpha")) {
              d = y;
              break;
            }
            if (T && T === w) {
              d = y;
              break;
            }
          }
      } else {
        d = await this.getLatestTagName(o);
        for (const w of s.getElements("entry"))
          if (Ti.exec(w.element("link").attribute("href"))[1] === d) {
            l = w;
            break;
          }
      }
    } catch (w) {
      throw (0, ze.newError)(`Cannot parse releases feed: ${w.stack || w.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (d == null)
      throw (0, ze.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, c = "", h = "";
    const g = async (w) => {
      c = (0, Ht.getChannelFilename)(w), h = (0, Ht.newUrlFromBase)(this.getBaseDownloadPath(String(d), c), this.baseUrl);
      const S = this.createRequestOptions(h);
      try {
        return await this.executor.request(S, o);
      } catch (b) {
        throw b instanceof ze.HttpError && b.statusCode === 404 ? (0, ze.newError)(`Cannot find ${c} in the latest release artifacts (${h}): ${b.stack || b.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : b;
      }
    };
    try {
      const w = this.updater.allowPrerelease ? this.getCustomChannelName(String(((i = wr.prerelease(d)) === null || i === void 0 ? void 0 : i[0]) || "latest")) : this.getDefaultChannelName();
      f = await g(w);
    } catch (w) {
      if (this.updater.allowPrerelease)
        f = await g(this.getDefaultChannelName());
      else
        throw w;
    }
    const v = (0, ki.parseUpdateInfo)(f, c, h);
    return v.releaseName == null && (v.releaseName = l.elementValueOrEmpty("title")), v.releaseNotes == null && (v.releaseNotes = Ic(this.updater.currentVersion, this.updater.fullChangelog, s, l)), {
      tag: d,
      ...v
    };
  }
  async getLatestTagName(t) {
    const r = this.options, n = r.host == null || r.host === "github.com" ? (0, Ht.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Sy.URL(`${this.computeGithubBasePath(`/repos/${r.owner}/${r.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(n, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, ze.newError)(`Unable to find latest version on GitHub (${n}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, ki.resolveFiles)(t, this.baseUrl, (r) => this.getBaseDownloadPath(t.tag, r.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, r) {
    return `${this.basePath}/download/${t}/${r}`;
  }
}
Ke.GitHubProvider = Cy;
function ns(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Ic(e, t, r, n) {
  if (!t)
    return ns(n);
  const i = [];
  for (const o of r.getElements("entry")) {
    const a = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    wr.lt(e, a) && i.push({
      version: a,
      note: ns(o)
    });
  }
  return i.sort((o, a) => wr.rcompare(o.version, a.version));
}
Ke.computeReleaseNotes = Ic;
var Bn = {};
Object.defineProperty(Bn, "__esModule", { value: !0 });
Bn.KeygenProvider = void 0;
const is = ce(), Si = _e, Ci = ae;
class by extends Ci.Provider {
  constructor(t, r, n) {
    super({
      ...n,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = r, this.baseUrl = (0, Si.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new is.CancellationToken(), r = (0, Si.getChannelFilename)(this.getCustomChannelName(this.channel)), n = (0, Si.newUrlFromBase)(r, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(n, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Ci.parseUpdateInfo)(i, r, n);
    } catch (i) {
      throw (0, is.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ci.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: r, platform: n } = this.configuration;
    return `Keygen (account: ${t}, product: ${r}, platform: ${n}, channel: ${this.channel})`;
  }
}
Bn.KeygenProvider = by;
var Hn = {};
Object.defineProperty(Hn, "__esModule", { value: !0 });
Hn.PrivateGitHubProvider = void 0;
const Lt = ce(), Ry = Ee, Iy = se, os = Jt, as = _e, Oy = Ke, $y = ae;
class Ny extends Oy.BaseGitHubProvider {
  constructor(t, r, n, i) {
    super(t, "api.github.com", i), this.updater = r, this.token = n;
  }
  createRequestOptions(t, r) {
    const n = super.createRequestOptions(t, r);
    return n.redirect = "manual", n;
  }
  async getLatestVersion() {
    const t = new Lt.CancellationToken(), r = (0, as.getChannelFilename)(this.getDefaultChannelName()), n = await this.getLatestVersionInfo(t), i = n.assets.find((s) => s.name === r);
    if (i == null)
      throw (0, Lt.newError)(`Cannot find ${r} in the release ${n.html_url || n.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new os.URL(i.url);
    let a;
    try {
      a = (0, Ry.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (s) {
      throw s instanceof Lt.HttpError && s.statusCode === 404 ? (0, Lt.newError)(`Cannot find ${r} in the latest release artifacts (${o}): ${s.stack || s.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : s;
    }
    return a.assets = n.assets, a;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const r = this.updater.allowPrerelease;
    let n = this.basePath;
    r || (n = `${n}/latest`);
    const i = (0, as.newUrlFromBase)(n, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return r ? o.find((a) => a.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, Lt.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, $y.getFileList)(t).map((r) => {
      const n = Iy.posix.basename(r.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === n);
      if (i == null)
        throw (0, Lt.newError)(`Cannot find asset "${n}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new os.URL(i.url),
        info: r
      };
    });
  }
}
Hn.PrivateGitHubProvider = Ny;
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.createClient = zt.isUrlProbablySupportMultiRangeRequests = void 0;
const ln = ce(), Dy = Mn, ss = kr, Py = Ke, Fy = Bn, xy = Hn;
function Oc(e) {
  return !e.includes("s3.amazonaws.com");
}
zt.isUrlProbablySupportMultiRangeRequests = Oc;
function Ly(e, t, r) {
  if (typeof e == "string")
    throw (0, ln.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const n = e.provider;
  switch (n) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new Py.GitHubProvider(i, t, r) : new xy.PrivateGitHubProvider(i, t, o, r);
    }
    case "bitbucket":
      return new Dy.BitbucketProvider(e, t, r);
    case "keygen":
      return new Fy.KeygenProvider(e, t, r);
    case "s3":
    case "spaces":
      return new ss.GenericProvider({
        provider: "generic",
        url: (0, ln.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...r,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new ss.GenericProvider(i, t, {
        ...r,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Oc(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, ln.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, r);
    }
    default:
      throw (0, ln.newError)(`Unsupported provider: ${n}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
zt.createClient = Ly;
var ls;
function mo() {
  if (ls) return wt;
  ls = 1, Object.defineProperty(wt, "__esModule", { value: !0 }), wt.NoOpLogger = wt.AppUpdater = void 0;
  const e = ce(), t = Nr, r = Ns, n = dt, i = Ee, o = Nn, a = se, s = Ac, l = Xt, d = Un, f = Tc, c = kr, h = er(), g = zt;
  let v = class $c extends r.EventEmitter {
    /**
     * Get the update channel. Not applicable for GitHub. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Not applicable for GitHub. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(y) {
      if (this._channel != null) {
        if (typeof y != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${y}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (y.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = y, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(y) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: y
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, f.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(y) {
      this._logger = y ?? new S();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(y) {
      this.clientPromise = null, this._appUpdateConfigPath = y, this.configOnDisk = new o.Lazy(() => this.loadUpdateConfig());
    }
    constructor(y, T) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new h.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new o.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new o.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (x) => {
        this._logger.error(`Error: ${x.stack || x.message}`);
      }), T == null ? (this.app = new d.ElectronAppAdapter(), this.httpExecutor = new f.ElectronHttpExecutor((x, C) => this.emit("login", x, C))) : (this.app = T, this.httpExecutor = null);
      const R = this.app.version, H = (0, s.parse)(R);
      if (H == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${R}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = H, this.allowPrerelease = w(H), y != null && (this.setFeedURL(y), typeof y != "string" && y.requestHeaders && (this.requestHeaders = y.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](/configuration/publish#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(y) {
      const T = this.createProviderRuntimeOptions();
      let R;
      typeof y == "string" ? R = new c.GenericProvider({ provider: "generic", url: y }, this, {
        ...T,
        isUseMultipleRangeRequest: (0, g.isUrlProbablySupportMultiRangeRequests)(y)
      }) : R = (0, g.createClient)(y, this, T), this.clientPromise = Promise.resolve(R);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let y = this.checkForUpdatesPromise;
      if (y != null)
        return this._logger.info("Checking for update (already in progress)"), y;
      const T = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), y = this.doCheckForUpdates().then((R) => (T(), R)).catch((R) => {
        throw T(), this.emit("error", R, `Cannot check for updates: ${(R.stack || R).toString()}`), R;
      }), this.checkForUpdatesPromise = y, y;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(y) {
      return this.checkForUpdates().then((T) => T != null && T.downloadPromise ? (T.downloadPromise.then(() => {
        const R = $c.formatDownloadNotification(T.updateInfo.version, this.app.name, y);
        new bt.Notification(R).show();
      }), T) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), T));
    }
    static formatDownloadNotification(y, T, R) {
      return R == null && (R = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), R = {
        title: R.title.replace("{appName}", T).replace("{version}", y),
        body: R.body.replace("{appName}", T).replace("{version}", y)
      }, R;
    }
    async isStagingMatch(y) {
      const T = y.stagingPercentage;
      let R = T;
      if (R == null)
        return !0;
      if (R = parseInt(R, 10), isNaN(R))
        return this._logger.warn(`Staging percentage is NaN: ${T}`), !0;
      R = R / 100;
      const H = await this.stagingUserIdPromise.value, C = e.UUID.parse(H).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${R}, percentage: ${C}, user id: ${H}`), C < R;
    }
    computeFinalHeaders(y) {
      return this.requestHeaders != null && Object.assign(y, this.requestHeaders), y;
    }
    async isUpdateAvailable(y) {
      const T = (0, s.parse)(y.version);
      if (T == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${y.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const R = this.currentVersion;
      if ((0, s.eq)(T, R) || !await this.isStagingMatch(y))
        return !1;
      const x = (0, s.gt)(T, R), C = (0, s.lt)(T, R);
      return x ? !0 : this.allowDowngrade && C;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((R) => (0, g.createClient)(R, this, this.createProviderRuntimeOptions())));
      const y = await this.clientPromise, T = await this.stagingUserIdPromise.value;
      return y.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": T })), {
        info: await y.getLatestVersion(),
        provider: y
      };
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const y = await this.getUpdateInfoAndProvider(), T = y.info;
      if (!await this.isUpdateAvailable(T))
        return this._logger.info(`Update for version ${this.currentVersion} is not available (latest version: ${T.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", T), {
          versionInfo: T,
          updateInfo: T
        };
      this.updateInfoAndProvider = y, this.onUpdateAvailable(T);
      const R = new e.CancellationToken();
      return {
        versionInfo: T,
        updateInfo: T,
        cancellationToken: R,
        downloadPromise: this.autoDownload ? this.downloadUpdate(R) : null
      };
    }
    onUpdateAvailable(y) {
      this._logger.info(`Found version ${y.version} (url: ${(0, e.asArray)(y.files).map((T) => T.url).join(", ")})`), this.emit("update-available", y);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(y = new e.CancellationToken()) {
      const T = this.updateInfoAndProvider;
      if (T == null) {
        const H = new Error("Please check update first");
        return this.dispatchError(H), Promise.reject(H);
      }
      this._logger.info(`Downloading update from ${(0, e.asArray)(T.info.files).map((H) => H.url).join(", ")}`);
      const R = (H) => {
        if (!(H instanceof e.CancellationError))
          try {
            this.dispatchError(H);
          } catch (x) {
            this._logger.warn(`Cannot dispatch error event: ${x.stack || x}`);
          }
        return H;
      };
      try {
        return this.doDownloadUpdate({
          updateInfoAndProvider: T,
          requestHeaders: this.computeRequestHeaders(T.provider),
          cancellationToken: y,
          disableWebInstaller: this.disableWebInstaller,
          disableDifferentialDownload: this.disableDifferentialDownload
        }).catch((H) => {
          throw R(H);
        });
      } catch (H) {
        return Promise.reject(R(H));
      }
    }
    dispatchError(y) {
      this.emit("error", y, (y.stack || y).toString());
    }
    dispatchUpdateDownloaded(y) {
      this.emit(h.UPDATE_DOWNLOADED, y);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, i.load)(await (0, n.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(y) {
      const T = y.fileExtraDownloadHeaders;
      if (T != null) {
        const R = this.requestHeaders;
        return R == null ? T : {
          ...T,
          ...R
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const y = a.join(this.app.userDataPath, ".updaterId");
      try {
        const R = await (0, n.readFile)(y, "utf-8");
        if (e.UUID.check(R))
          return R;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${R}`);
      } catch (R) {
        R.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${R}`);
      }
      const T = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${T}`);
      try {
        await (0, n.outputFile)(y, T);
      } catch (R) {
        this._logger.warn(`Couldn't write out staging user ID: ${R}`);
      }
      return T;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const y = this.requestHeaders;
      if (y == null)
        return !0;
      for (const T of Object.keys(y)) {
        const R = T.toLowerCase();
        if (R === "authorization" || R === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let y = this.downloadedUpdateHelper;
      if (y == null) {
        const T = (await this.configOnDisk.value).updaterCacheDirName, R = this._logger;
        T == null && R.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const H = a.join(this.app.baseCachePath, T || this.app.name);
        R.debug != null && R.debug(`updater cache dir: ${H}`), y = new l.DownloadedUpdateHelper(H), this.downloadedUpdateHelper = y;
      }
      return y;
    }
    async executeDownload(y) {
      const T = y.fileInfo, R = {
        headers: y.downloadUpdateOptions.requestHeaders,
        cancellationToken: y.downloadUpdateOptions.cancellationToken,
        sha2: T.info.sha2,
        sha512: T.info.sha512
      };
      this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (R.onProgress = (F) => this.emit(h.DOWNLOAD_PROGRESS, F));
      const H = y.downloadUpdateOptions.updateInfoAndProvider.info, x = H.version, C = T.packageInfo;
      function $() {
        const F = decodeURIComponent(y.fileInfo.url.pathname);
        return F.endsWith(`.${y.fileExtension}`) ? a.basename(F) : y.fileInfo.info.url;
      }
      const m = await this.getOrCreateDownloadHelper(), U = m.cacheDirForPendingUpdate;
      await (0, n.mkdir)(U, { recursive: !0 });
      const M = $();
      let k = a.join(U, M);
      const W = C == null ? null : a.join(U, `package-${x}${a.extname(C.path) || ".7z"}`), D = async (F) => (await m.setDownloadedFile(k, W, H, T, M, F), await y.done({
        ...H,
        downloadedFile: k
      }), W == null ? [k] : [k, W]), I = this._logger, L = await m.validateDownloadedPath(k, H, T, I);
      if (L != null)
        return k = L, await D(!1);
      const O = async () => (await m.clear().catch(() => {
      }), await (0, n.unlink)(k).catch(() => {
      })), B = await (0, l.createTempUpdateFile)(`temp-${M}`, U, I);
      try {
        await y.task(B, R, W, O), await (0, n.rename)(B, k);
      } catch (F) {
        throw await O(), F instanceof e.CancellationError && (I.info("cancelled"), this.emit("update-cancelled", H)), F;
      }
      return I.info(`New version ${x} has been downloaded to ${k}`), await D(!0);
    }
  };
  wt.AppUpdater = v;
  function w(b) {
    const y = (0, s.prerelease)(b);
    return y != null && y.length > 0;
  }
  class S {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(y) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(y) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(y) {
    }
  }
  return wt.NoOpLogger = S, wt;
}
var cs;
function Mr() {
  if (cs) return ar;
  cs = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.BaseUpdater = void 0;
  const e = Tn, t = mo();
  let r = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        bt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (o) => (this.dispatchUpdateDownloaded(o), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, o = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, s = a == null ? null : a.file, l = a == null ? null : a.downloadedFileInfo;
      if (s == null || l == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: s,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: l.isAdminRightsRequired
        });
      } catch (d) {
        return this.dispatchError(d), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, o = `"${i} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), s = [a];
      return /kdesudo/i.test(a) ? (s.push("--comment", o), s.push("-c")) : /gksudo/i.test(a) ? s.push("--message", o) : /pkexec/i.test(a) && s.push("--disable-internal-agent"), s.join(" ");
    }
    spawnSyncLog(i, o = [], a = {}) {
      return this._logger.info(`Executing: ${i} with args: ${o}`), (0, e.spawnSync)(i, o, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, o = [], a = void 0, s = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((l, d) => {
        try {
          const f = { stdio: s, env: a, detached: !0 }, c = (0, e.spawn)(i, o, f);
          c.on("error", (h) => {
            d(h);
          }), c.unref(), c.pid !== void 0 && l(!0);
        } catch (f) {
          d(f);
        }
      });
    }
  };
  return ar.BaseUpdater = r, ar;
}
var cr = {}, Br = {}, Hr = {}, Ot = {}, ut = {};
Object.defineProperty(ut, "__esModule", { value: !0 });
ut.computeOperations = ut.OperationKind = void 0;
var Tt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Tt || (ut.OperationKind = Tt = {}));
function Uy(e, t, r) {
  const n = fs(e.files), i = fs(t.files);
  let o = null;
  const a = t.files[0], s = [], l = a.name, d = n.get(l);
  if (d == null)
    throw new Error(`no file ${l} in old blockmap`);
  const f = i.get(l);
  let c = 0;
  const { checksumToOffset: h, checksumToOldSize: g } = My(n.get(l), d.offset, r);
  let v = a.offset;
  for (let w = 0; w < f.checksums.length; v += f.sizes[w], w++) {
    const S = f.sizes[w], b = f.checksums[w];
    let y = h.get(b);
    y != null && g.get(b) !== S && (r.warn(`Checksum ("${b}") matches, but size differs (old: ${g.get(b)}, new: ${S})`), y = void 0), y === void 0 ? (c++, o != null && o.kind === Tt.DOWNLOAD && o.end === v ? o.end += S : (o = {
      kind: Tt.DOWNLOAD,
      start: v,
      end: v + S
      // oldBlocks: null,
    }, us(o, s, b, w))) : o != null && o.kind === Tt.COPY && o.end === y ? o.end += S : (o = {
      kind: Tt.COPY,
      start: y,
      end: y + S
      // oldBlocks: [checksum]
    }, us(o, s, b, w));
  }
  return c > 0 && r.info(`File${a.name === "file" ? "" : " " + a.name} has ${c} changed blocks`), s;
}
ut.computeOperations = Uy;
const ky = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function us(e, t, r, n) {
  if (ky && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((a, s) => a < s ? a : s);
      throw new Error(`operation (block index: ${n}, checksum: ${r}, kind: ${Tt[e.kind]}) overlaps previous operation (checksum: ${r}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function My(e, t, r) {
  const n = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let a = 0; a < e.checksums.length; a++) {
    const s = e.checksums[a], l = e.sizes[a], d = i.get(s);
    if (d === void 0)
      n.set(s, o), i.set(s, l);
    else if (r.debug != null) {
      const f = d === l ? "(same size)" : `(size: ${d}, this size: ${l})`;
      r.debug(`${s} duplicated in blockmap ${f}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: n, checksumToOldSize: i };
}
function fs(e) {
  const t = /* @__PURE__ */ new Map();
  for (const r of e)
    t.set(r.name, r);
  return t;
}
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.DataSplitter = Ot.copyData = void 0;
const cn = ce(), By = ft, Hy = Dr, qy = ut, ds = Buffer.from(`\r
\r
`);
var nt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(nt || (nt = {}));
function Nc(e, t, r, n, i) {
  const o = (0, By.createReadStream)("", {
    fd: r,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", n), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
Ot.copyData = Nc;
class jy extends Hy.Writable {
  constructor(t, r, n, i, o, a) {
    super(), this.out = t, this.options = r, this.partIndexToTaskIndex = n, this.partIndexToLength = o, this.finishHandler = a, this.partIndex = -1, this.headerListBuffer = null, this.readState = nt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, r, n) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(n).catch(n);
  }
  async handleData(t) {
    let r = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, cn.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const n = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= n, r = n;
    } else if (this.remainingPartDataCount > 0) {
      const n = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= n, await this.processPartData(t, 0, n), r = n;
    }
    if (r !== t.length) {
      if (this.readState === nt.HEADER) {
        const n = this.searchHeaderListEnd(t, r);
        if (n === -1)
          return;
        r = n, this.readState = nt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === nt.BODY)
          this.readState = nt.INIT;
        else {
          this.partIndex++;
          let a = this.partIndexToTaskIndex.get(this.partIndex);
          if (a == null)
            if (this.isFinished)
              a = this.options.end;
            else
              throw (0, cn.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const s = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (s < a)
            await this.copyExistingData(s, a);
          else if (s > a)
            throw (0, cn.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (r = this.searchHeaderListEnd(t, r), r === -1) {
            this.readState = nt.HEADER;
            return;
          }
        }
        const n = this.partIndexToLength[this.partIndex], i = r + n, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, r, o), this.remainingPartDataCount = n - (o - r), this.remainingPartDataCount > 0)
          return;
        if (r = i + this.boundaryLength, r >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, r) {
    return new Promise((n, i) => {
      const o = () => {
        if (t === r) {
          n();
          return;
        }
        const a = this.options.tasks[t];
        if (a.kind !== qy.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Nc(a, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, r) {
    const n = t.indexOf(ds, r);
    if (n !== -1)
      return n + ds.length;
    const i = r === 0 ? t : t.slice(r);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, cn.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, r, n) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, r, n);
  }
  processPartData(t, r, n) {
    this.actualPartLength += n - r;
    const i = this.out;
    return i.write(r === 0 && t.length === n ? t : t.slice(r, n)) ? Promise.resolve() : new Promise((o, a) => {
      i.on("error", a), i.once("drain", () => {
        i.removeListener("error", a), o();
      });
    });
  }
}
Ot.DataSplitter = jy;
var Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.checkIsRangesSupported = Kt.executeTasksUsingMultipleRangeRequests = void 0;
const Mi = ce(), hs = Ot, ps = ut;
function Gy(e, t, r, n, i) {
  const o = (a) => {
    if (a >= t.length) {
      e.fileMetadataBuffer != null && r.write(e.fileMetadataBuffer), r.end();
      return;
    }
    const s = a + 1e3;
    Vy(e, {
      tasks: t,
      start: a,
      end: Math.min(t.length, s),
      oldFileFd: n
    }, r, () => o(s), i);
  };
  return o;
}
Kt.executeTasksUsingMultipleRangeRequests = Gy;
function Vy(e, t, r, n, i) {
  let o = "bytes=", a = 0;
  const s = /* @__PURE__ */ new Map(), l = [];
  for (let c = t.start; c < t.end; c++) {
    const h = t.tasks[c];
    h.kind === ps.OperationKind.DOWNLOAD && (o += `${h.start}-${h.end - 1}, `, s.set(a, c), a++, l.push(h.end - h.start));
  }
  if (a <= 1) {
    const c = (h) => {
      if (h >= t.end) {
        n();
        return;
      }
      const g = t.tasks[h++];
      if (g.kind === ps.OperationKind.COPY)
        (0, hs.copyData)(g, r, t.oldFileFd, i, () => c(h));
      else {
        const v = e.createRequestOptions();
        v.headers.Range = `bytes=${g.start}-${g.end - 1}`;
        const w = e.httpExecutor.createRequest(v, (S) => {
          Bi(S, i) && (S.pipe(r, {
            end: !1
          }), S.once("end", () => c(h)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(w, i), w.end();
      }
    };
    c(t.start);
    return;
  }
  const d = e.createRequestOptions();
  d.headers.Range = o.substring(0, o.length - 2);
  const f = e.httpExecutor.createRequest(d, (c) => {
    if (!Bi(c, i))
      return;
    const h = (0, Mi.safeGetHeader)(c, "content-type"), g = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(h);
    if (g == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${h}"`));
      return;
    }
    const v = new hs.DataSplitter(r, t, s, g[1] || g[2], l, n);
    v.on("error", i), c.pipe(v), c.on("end", () => {
      setTimeout(() => {
        f.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(f, i), f.end();
}
function Bi(e, t) {
  if (e.statusCode >= 400)
    return t((0, Mi.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const r = (0, Mi.safeGetHeader)(e, "accept-ranges");
    if (r == null || r === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
Kt.checkIsRangesSupported = Bi;
var qn = {};
Object.defineProperty(qn, "__esModule", { value: !0 });
qn.ProgressDifferentialDownloadCallbackTransform = void 0;
const Wy = Dr;
var qt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(qt || (qt = {}));
class Yy extends Wy.Transform {
  constructor(t, r, n) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = r, this.onProgress = n, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = qt.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, r, n) {
    if (this.cancellationToken.cancelled) {
      n(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == qt.COPY) {
      n(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), n(null, t);
  }
  beginFileCopy() {
    this.operationType = qt.COPY;
  }
  beginRangeDownload() {
    this.operationType = qt.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
qn.ProgressDifferentialDownloadCallbackTransform = Yy;
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.DifferentialDownloader = void 0;
const ur = ce(), bi = dt, Xy = ft, zy = Ot, Ky = Jt, un = ut, ms = Kt, Jy = qn;
class Qy {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, r, n) {
    this.blockAwareFileInfo = t, this.httpExecutor = r, this.options = n, this.fileMetadataBuffer = null, this.logger = n.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, ur.configureRequestUrl)(this.options.newUrl, t), (0, ur.configureRequestOptions)(t), t;
  }
  doDownload(t, r) {
    if (t.version !== r.version)
      throw new Error(`version is different (${t.version} - ${r.version}), full download is required`);
    const n = this.logger, i = (0, un.computeOperations)(t, r, n);
    n.debug != null && n.debug(JSON.stringify(i, null, 2));
    let o = 0, a = 0;
    for (const l of i) {
      const d = l.end - l.start;
      l.kind === un.OperationKind.DOWNLOAD ? o += d : a += d;
    }
    const s = this.blockAwareFileInfo.size;
    if (o + a + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== s)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${a}, newSize: ${s}`);
    return n.info(`Full: ${gs(s)}, To download: ${gs(o)} (${Math.round(o / (s / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const r = [], n = () => Promise.all(r.map((i) => (0, bi.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, r).then(n).catch((i) => n().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (a) {
        try {
          console.error(a);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, r) {
    const n = await (0, bi.open)(this.options.oldFile, "r");
    r.push({ descriptor: n, path: this.options.oldFile });
    const i = await (0, bi.open)(this.options.newFile, "w");
    r.push({ descriptor: i, path: this.options.newFile });
    const o = (0, Xy.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((a, s) => {
      const l = [];
      let d;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const b = [];
        let y = 0;
        for (const R of t)
          R.kind === un.OperationKind.DOWNLOAD && (b.push(R.end - R.start), y += R.end - R.start);
        const T = {
          expectedByteCounts: b,
          grandTotal: y
        };
        d = new Jy.ProgressDifferentialDownloadCallbackTransform(T, this.options.cancellationToken, this.options.onProgress), l.push(d);
      }
      const f = new ur.DigestTransform(this.blockAwareFileInfo.sha512);
      f.isValidateOnEnd = !1, l.push(f), o.on("finish", () => {
        o.close(() => {
          r.splice(1, 1);
          try {
            f.validate();
          } catch (b) {
            s(b);
            return;
          }
          a(void 0);
        });
      }), l.push(o);
      let c = null;
      for (const b of l)
        b.on("error", s), c == null ? c = b : c = c.pipe(b);
      const h = l[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, ms.executeTasksUsingMultipleRangeRequests)(this, t, h, n, s), g(0);
        return;
      }
      let v = 0, w = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const S = this.createRequestOptions();
      S.redirect = "manual", g = (b) => {
        var y, T;
        if (b >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const R = t[b++];
        if (R.kind === un.OperationKind.COPY) {
          d && d.beginFileCopy(), (0, zy.copyData)(R, h, n, s, () => g(b));
          return;
        }
        const H = `bytes=${R.start}-${R.end - 1}`;
        S.headers.range = H, (T = (y = this.logger) === null || y === void 0 ? void 0 : y.debug) === null || T === void 0 || T.call(y, `download range: ${H}`), d && d.beginRangeDownload();
        const x = this.httpExecutor.createRequest(S, (C) => {
          C.on("error", s), C.on("abort", () => {
            s(new Error("response has been aborted by the server"));
          }), C.statusCode >= 400 && s((0, ur.createHttpError)(C)), C.pipe(h, {
            end: !1
          }), C.once("end", () => {
            d && d.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => g(b), 1e3)) : g(b);
          });
        });
        x.on("redirect", (C, $, m) => {
          this.logger.info(`Redirect to ${Zy(m)}`), w = m, (0, ur.configureRequestUrl)(new Ky.URL(w), S), x.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(x, s), x.end();
      }, g(0);
    });
  }
  async readRemoteBytes(t, r) {
    const n = Buffer.allocUnsafe(r + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${r}`;
    let o = 0;
    if (await this.request(i, (a) => {
      a.copy(n, o), o += a.length;
    }), o !== n.length)
      throw new Error(`Received data length ${o} is not equal to expected ${n.length}`);
    return n;
  }
  request(t, r) {
    return new Promise((n, i) => {
      const o = this.httpExecutor.createRequest(t, (a) => {
        (0, ms.checkIsRangesSupported)(a, i) && (a.on("data", r), a.on("end", () => n()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Hr.DifferentialDownloader = Qy;
function gs(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function Zy(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Br, "__esModule", { value: !0 });
Br.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Ut = dt, ev = Hr, tv = Ps;
class rv extends ev.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, r = t.size, n = r - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(n, r - 1);
    const i = Dc(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await nv(this.options.oldFile), i);
  }
}
Br.FileWithEmbeddedBlockMapDifferentialDownloader = rv;
function Dc(e) {
  return JSON.parse((0, tv.inflateRawSync)(e).toString());
}
async function nv(e) {
  const t = await (0, Ut.open)(e, "r");
  try {
    const r = (await (0, Ut.fstat)(t)).size, n = Buffer.allocUnsafe(4);
    await (0, Ut.read)(t, n, 0, n.length, r - n.length);
    const i = Buffer.allocUnsafe(n.readUInt32BE(0));
    return await (0, Ut.read)(t, i, 0, i.length, r - n.length - i.length), await (0, Ut.close)(t), Dc(i);
  } catch (r) {
    throw await (0, Ut.close)(t), r;
  }
}
var Es;
function ys() {
  if (Es) return cr;
  Es = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.AppImageUpdater = void 0;
  const e = ce(), t = Tn, r = dt, n = ft, i = se, o = Mr(), a = Br, s = er(), l = ae;
  let d = class extends o.BaseUpdater {
    constructor(c, h) {
      super(c, h);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(c) {
      const h = c.updateInfoAndProvider.provider, g = (0, l.findFile)(h.resolveFiles(c.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: g,
        downloadUpdateOptions: c,
        task: async (v, w) => {
          const S = process.env.APPIMAGE;
          if (S == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let b = !1;
          try {
            const y = {
              newUrl: g.url,
              oldFile: S,
              logger: this._logger,
              newFile: v,
              isUseMultipleRangeRequest: h.isUseMultipleRangeRequest,
              requestHeaders: c.requestHeaders,
              cancellationToken: c.cancellationToken
            };
            this.listenerCount(s.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (T) => this.emit(s.DOWNLOAD_PROGRESS, T)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(g.info, this.httpExecutor, y).download();
          } catch (y) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), b = process.platform === "linux";
          }
          b && await this.httpExecutor.download(g.url, v, w), await (0, r.chmod)(v, 493);
        }
      });
    }
    doInstall(c) {
      const h = process.env.APPIMAGE;
      if (h == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, n.unlinkSync)(h);
      let g;
      const v = i.basename(h);
      i.basename(c.installerPath) === v || !/\d+\.\d+\.\d+/.test(v) ? g = h : g = i.join(i.dirname(h), i.basename(c.installerPath)), (0, t.execFileSync)("mv", ["-f", c.installerPath, g]), g !== h && this.emit("appimage-filename-updated", g);
      const w = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return c.isForceRunAfter ? this.spawnLog(g, [], w) : (w.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(g, [], { env: w })), !0;
    }
  };
  return cr.AppImageUpdater = d, cr;
}
var fr = {}, vs;
function ws() {
  if (vs) return fr;
  vs = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.DebUpdater = void 0;
  const e = Mr(), t = er(), r = ae;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (l, d) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (d.onProgress = (f) => this.emit(t.DOWNLOAD_PROGRESS, f)), await this.httpExecutor.download(s.url, l, d);
        }
      });
    }
    doInstall(o) {
      const a = this.wrapSudo(), s = /pkexec/i.test(a) ? "" : '"', l = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${s}/bin/bash`, "-c", `'${l.join(" ")}'${s}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return fr.DebUpdater = n, fr;
}
var dr = {}, _s;
function As() {
  if (_s) return dr;
  _s = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.RpmUpdater = void 0;
  const e = Mr(), t = er(), r = ae;
  let n = class extends e.BaseUpdater {
    constructor(o, a) {
      super(o, a);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const a = o.updateInfoAndProvider.provider, s = (0, r.findFile)(a.resolveFiles(o.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: s,
        downloadUpdateOptions: o,
        task: async (l, d) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (d.onProgress = (f) => this.emit(t.DOWNLOAD_PROGRESS, f)), await this.httpExecutor.download(s.url, l, d);
        }
      });
    }
    doInstall(o) {
      const a = o.installerPath, s = this.wrapSudo(), l = /pkexec/i.test(s) ? "" : '"', d = this.spawnSyncLog("which zypper");
      let f;
      if (d)
        f = [
          d,
          "remove",
          "-y",
          `'${this.app.name}'`,
          ";",
          d,
          "clean",
          "--all",
          ";",
          d,
          "--no-refresh",
          "install",
          "--allow-unsigned-rpm",
          "-y",
          "-f",
          a
        ];
      else {
        const c = this.spawnSyncLog("which dnf || which yum");
        f = [c, "-y", "remove", `'${this.app.name}'`, ";", c, "-y", "install", a];
      }
      return this.spawnSyncLog(s, [`${l}/bin/bash`, "-c", `'${f.join(" ")}'${l}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return dr.RpmUpdater = n, dr;
}
var hr = {}, Ts;
function Ss() {
  if (Ts) return hr;
  Ts = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.MacUpdater = void 0;
  const e = ce(), t = dt, r = ft, n = Bu, i = mo(), o = ae, a = Tn, s = Nr;
  let l = class extends i.AppUpdater {
    constructor(f, c) {
      super(f, c), this.nativeUpdater = bt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (h) => {
        this._logger.warn(h), this.emit("error", h);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0;
      });
    }
    debug(f) {
      this._logger.debug != null && this._logger.debug(f);
    }
    async doDownloadUpdate(f) {
      let c = f.updateInfoAndProvider.provider.resolveFiles(f.updateInfoAndProvider.info);
      const h = this._logger, g = "sysctl.proc_translated";
      let v = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), v = (0, a.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), h.info(`Checked for macOS Rosetta environment (isRosetta=${v})`);
      } catch (y) {
        h.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${y}`);
      }
      let w = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const T = (0, a.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        h.info(`Checked 'uname -a': arm64=${T}`), w = w || T;
      } catch (y) {
        h.warn(`uname shell command to check for arm64 failed: ${y}`);
      }
      w = w || process.arch === "arm64" || v;
      const S = (y) => {
        var T;
        return y.url.pathname.includes("arm64") || ((T = y.info.url) === null || T === void 0 ? void 0 : T.includes("arm64"));
      };
      w && c.some(S) ? c = c.filter((y) => w === S(y)) : c = c.filter((y) => !S(y));
      const b = (0, o.findFile)(c, "zip", ["pkg", "dmg"]);
      if (b == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(c)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: b,
        downloadUpdateOptions: f,
        task: (y, T) => this.httpExecutor.download(b.url, y, T),
        done: (y) => this.updateDownloaded(b, y)
      });
    }
    async updateDownloaded(f, c) {
      var h, g;
      const v = c.downloadedFile, w = (h = f.info.size) !== null && h !== void 0 ? h : (await (0, t.stat)(v)).size, S = this._logger, b = `fileToProxy=${f.url.href}`;
      this.debug(`Creating proxy server for native Squirrel.Mac (${b})`), (g = this.server) === null || g === void 0 || g.close(), this.server = (0, n.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${b})`), this.server.on("close", () => {
        S.info(`Proxy server for native Squirrel.Mac is closed (${b})`);
      });
      const y = (T) => {
        const R = T.address();
        return typeof R == "string" ? R : `http://127.0.0.1:${R == null ? void 0 : R.port}`;
      };
      return await new Promise((T, R) => {
        const H = (0, s.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), x = Buffer.from(`autoupdater:${H}`, "ascii"), C = `/${(0, s.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", ($, m) => {
          const U = $.url;
          if (S.info(`${U} requested`), U === "/") {
            if (!$.headers.authorization || $.headers.authorization.indexOf("Basic ") === -1) {
              m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), S.warn("No authenthication info");
              return;
            }
            const W = $.headers.authorization.split(" ")[1], D = Buffer.from(W, "base64").toString("ascii"), [I, L] = D.split(":");
            if (I !== "autoupdater" || L !== H) {
              m.statusCode = 401, m.statusMessage = "Invalid Authentication Credentials", m.end(), S.warn("Invalid authenthication credentials");
              return;
            }
            const O = Buffer.from(`{ "url": "${y(this.server)}${C}" }`);
            m.writeHead(200, { "Content-Type": "application/json", "Content-Length": O.length }), m.end(O);
            return;
          }
          if (!U.startsWith(C)) {
            S.warn(`${U} requested, but not supported`), m.writeHead(404), m.end();
            return;
          }
          S.info(`${C} requested by Squirrel.Mac, pipe ${v}`);
          let M = !1;
          m.on("finish", () => {
            M || (this.nativeUpdater.removeListener("error", R), T([]));
          });
          const k = (0, r.createReadStream)(v);
          k.on("error", (W) => {
            try {
              m.end();
            } catch (D) {
              S.warn(`cannot end response: ${D}`);
            }
            M = !0, this.nativeUpdater.removeListener("error", R), R(new Error(`Cannot pipe "${v}": ${W}`));
          }), m.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": w
          }), k.pipe(m);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${b})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${y(this.server)}, ${b})`), this.nativeUpdater.setFeedURL({
            url: y(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${x.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(c), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", R), this.nativeUpdater.checkForUpdates()) : T([]);
        });
      });
    }
    quitAndInstall() {
      var f;
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), (f = this.server) === null || f === void 0 || f.close()) : (this.nativeUpdater.on("update-downloaded", () => {
        var c;
        this.nativeUpdater.quitAndInstall(), (c = this.server) === null || c === void 0 || c.close();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return hr.MacUpdater = l, hr;
}
var pr = {}, jn = {};
Object.defineProperty(jn, "__esModule", { value: !0 });
jn.GenericDifferentialDownloader = void 0;
const iv = Hr;
class ov extends iv.DifferentialDownloader {
  download(t, r) {
    return this.doDownload(t, r);
  }
}
jn.GenericDifferentialDownloader = ov;
var Gn = {};
Object.defineProperty(Gn, "__esModule", { value: !0 });
Gn.verifySignature = void 0;
const Cs = ce(), Pc = Tn, av = ji;
function sv(e, t, r) {
  return new Promise((n, i) => {
    const o = t.replace(/'/g, "''");
    (0, Pc.execFile)("chcp 65001 >NUL & powershell.exe", ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (a, s, l) => {
      try {
        if (a != null || l) {
          bs(r, a, l, i), n(null);
          return;
        }
        const d = lv(s);
        if (d.Status === 0) {
          const c = (0, Cs.parseDn)(d.SignerCertificate.Subject);
          let h = !1;
          for (const g of e) {
            const v = (0, Cs.parseDn)(g);
            if (v.size ? h = Array.from(v.keys()).every((S) => v.get(S) === c.get(S)) : g === c.get("CN") && (r.warn(`Signature validated using only CN ${g}. Please add your full Distinguished Name (DN) to publisherNames configuration`), h = !0), h) {
              n(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(d, (c, h) => c === "RawData" ? void 0 : h, 2);
        r.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), n(f);
      } catch (d) {
        bs(r, d, null, i), n(null);
        return;
      }
    });
  });
}
Gn.verifySignature = sv;
function lv(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const r = t.SignerCertificate;
  return r != null && (delete r.Archived, delete r.Extensions, delete r.Handle, delete r.HasPrivateKey, delete r.SubjectName), delete t.Path, t;
}
function bs(e, t, r, n) {
  if (cv()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || r}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Pc.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && n(t), r && n(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${r}. Failing signature validation due to unknown stderr.`));
}
function cv() {
  const e = av.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var Rs;
function Is() {
  if (Rs) return pr;
  Rs = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.NsisUpdater = void 0;
  const e = ce(), t = se, r = Mr(), n = Br, i = jn, o = er(), a = _e, s = ae, l = dt, d = Gn, f = Jt, c = Ps;
  let h = class extends r.BaseUpdater {
    constructor(v, w) {
      super(v, w), this._verifyUpdateCodeSignature = (S, b) => (0, d.verifySignature)(S, b, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(v) {
      v && (this._verifyUpdateCodeSignature = v);
    }
    /*** @private */
    doDownloadUpdate(v) {
      const w = v.updateInfoAndProvider.provider, S = (0, s.findFile)(w.resolveFiles(v.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: v,
        fileInfo: S,
        task: async (b, y, T, R) => {
          const H = S.packageInfo, x = H != null && T != null;
          if (x && v.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${v.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !x && !v.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (x || v.disableDifferentialDownload || await this.differentialDownloadInstaller(S, v, b, w)) && await this.httpExecutor.download(S.url, b, y);
          const C = await this.verifySignature(b);
          if (C != null)
            throw await R(), (0, e.newError)(`New version ${v.updateInfoAndProvider.info.version} is not signed by the application owner: ${C}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (x && await this.differentialDownloadWebPackage(v, H, T, w))
            try {
              await this.httpExecutor.download(new f.URL(H.path), T, {
                headers: v.requestHeaders,
                cancellationToken: v.cancellationToken,
                sha512: H.sha512
              });
            } catch ($) {
              try {
                await (0, l.unlink)(T);
              } catch {
              }
              throw $;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(v) {
      let w;
      try {
        if (w = (await this.configOnDisk.value).publisherName, w == null)
          return null;
      } catch (S) {
        if (S.code === "ENOENT")
          return null;
        throw S;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(w) ? w : [w], v);
    }
    doInstall(v) {
      const w = ["--updated"];
      v.isSilent && w.push("/S"), v.isForceRunAfter && w.push("--force-run"), this.installDirectory && w.push(`/D=${this.installDirectory}`);
      const S = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      S != null && w.push(`--package-file=${S}`);
      const b = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [v.installerPath].concat(w)).catch((y) => this.dispatchError(y));
      };
      return v.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), b(), !0) : (this.spawnLog(v.installerPath, w).catch((y) => {
        const T = y.code;
        this._logger.info(`Cannot run installer: error code: ${T}, error message: "${y.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), T === "UNKNOWN" || T === "EACCES" ? b() : T === "ENOENT" ? bt.shell.openPath(v.installerPath).catch((R) => this.dispatchError(R)) : this.dispatchError(y);
      }), !0);
    }
    async differentialDownloadInstaller(v, w, S, b) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const y = (0, a.blockmapFiles)(v.url, this.app.version, w.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${y[0]}", new: ${y[1]})`);
        const T = async (x) => {
          const C = await this.httpExecutor.downloadToBuffer(x, {
            headers: w.requestHeaders,
            cancellationToken: w.cancellationToken
          });
          if (C == null || C.length === 0)
            throw new Error(`Blockmap "${x.href}" is empty`);
          try {
            return JSON.parse((0, c.gunzipSync)(C).toString());
          } catch ($) {
            throw new Error(`Cannot parse blockmap "${x.href}", error: ${$}`);
          }
        }, R = {
          newUrl: v.url,
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_INSTALLER_FILE_NAME),
          logger: this._logger,
          newFile: S,
          isUseMultipleRangeRequest: b.isUseMultipleRangeRequest,
          requestHeaders: w.requestHeaders,
          cancellationToken: w.cancellationToken
        };
        this.listenerCount(o.DOWNLOAD_PROGRESS) > 0 && (R.onProgress = (x) => this.emit(o.DOWNLOAD_PROGRESS, x));
        const H = await Promise.all(y.map((x) => T(x)));
        return await new i.GenericDifferentialDownloader(v.info, this.httpExecutor, R).download(H[0], H[1]), !1;
      } catch (y) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), this._testOnlyOptions != null)
          throw y;
        return !0;
      }
    }
    async differentialDownloadWebPackage(v, w, S, b) {
      if (w.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new f.URL(w.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: S,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: b.isUseMultipleRangeRequest,
          cancellationToken: v.cancellationToken
        };
        this.listenerCount(o.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (T) => this.emit(o.DOWNLOAD_PROGRESS, T)), await new n.FileWithEmbeddedBlockMapDifferentialDownloader(w, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return pr.NsisUpdater = h, pr;
}
var Os;
function er() {
  return Os || (Os = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = ce();
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const r = dt, n = se;
    var i = Mr();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = mo();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var a = ae;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return a.Provider;
    } });
    var s = ys();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return s.AppImageUpdater;
    } });
    var l = ws();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var d = As();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return d.RpmUpdater;
    } });
    var f = Ss();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return f.MacUpdater;
    } });
    var c = Is();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return c.NsisUpdater;
    } });
    let h;
    function g() {
      if (process.platform === "win32")
        h = new (Is()).NsisUpdater();
      else if (process.platform === "darwin")
        h = new (Ss()).MacUpdater();
      else {
        h = new (ys()).AppImageUpdater();
        try {
          const S = n.join(process.resourcesPath, "package-type");
          if (!(0, r.existsSync)(S))
            return h;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const b = (0, r.readFileSync)(S).toString().trim();
          switch (console.info("Found package-type:", b), b) {
            case "deb":
              h = new (ws()).DebUpdater();
              break;
            case "rpm":
              h = new (As()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (S) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", S.message);
        }
      }
      return h;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => h || g()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class v {
      constructor(b) {
        this.emitter = b;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(b) {
        w(this.emitter, "login", b);
      }
      progress(b) {
        w(this.emitter, e.DOWNLOAD_PROGRESS, b);
      }
      updateDownloaded(b) {
        w(this.emitter, e.UPDATE_DOWNLOADED, b);
      }
      updateCancelled(b) {
        w(this.emitter, "update-cancelled", b);
      }
    }
    e.UpdaterSignal = v;
    function w(S, b, y) {
      S.on(b, y);
    }
  }(Zn)), Zn;
}
var uv = er();
const _r = je.dirname(Lu(import.meta.url));
process.env.APP_ROOT = je.join(_r, "..");
const $s = process.env.VITE_DEV_SERVER_URL, xv = je.join(process.env.APP_ROOT, "dist-electron"), Lv = je.join(process.env.APP_ROOT, "dist");
process.env.DIST = je.join(_r, "../dist");
process.env.VITE_PUBLIC = Rt.isPackaged ? process.env.DIST : je.join(process.env.DIST, "../public");
let Xe;
function go() {
  Xe = new Hi({
    width: 1200,
    height: 800,
    autoHideMenuBar: !0,
    icon: je.join(
      _r,
      "..",
      "public",
      process.platform === "win32" ? "medexer-logo.ico" : process.platform === "darwin" ? "medexer-logo.icns" : "medexer-logo.png"
    ),
    webPreferences: {
      // devTools: false,
      nodeIntegration: !0,
      contextIsolation: !1,
      preload: je.join(_r, "preload.js")
    },
    ...process.platform === "darwin" && {
      dockOptions: {
        icon: je.join(_r, "..", "public", "medexer-logo.icns"),
        iconSize: 32
      }
    }
  }), Xe.webContents.on("did-finish-load", () => {
    Xe == null || Xe.webContents.send(
      "main-process-message",
      (/* @__PURE__ */ new Date()).toLocaleString()
    );
  }), $s ? Xe.loadURL($s) : Xe.loadURL(`file://${je.resolve(process.env.DIST, "index.html")}`), Xe.webContents.setWindowOpenHandler(({ url: e }) => (require("electron").shell.openExternal(e), { action: "deny" }));
}
Rt.on("window-all-closed", () => {
  process.platform !== "darwin" && (Rt.quit(), Xe = null);
});
Rt.on("activate", () => {
  Hi.getAllWindows().length === 0 && go();
});
Rt.on("ready", () => {
  uv.autoUpdater.checkForUpdatesAndNotify(), console.log("checking for updates");
});
Rt.on("activate", () => {
  Hi.getAllWindows().length === 0 && go();
});
Rt.whenReady().then(go);
export {
  xv as MAIN_DIST,
  Lv as RENDERER_DIST,
  $s as VITE_DEV_SERVER_URL
};
