import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (process.platform === "linux") {
  app.commandLine.appendSwitch("ozone-platform-hint", "x11");
}

process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

let mainWindow: BrowserWindow | null = null;

const createWindow = (): void => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 960,
    minHeight: 640,
    icon: path.join(process.env.APP_ROOT!, "build/icon.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
    return;
  }

  mainWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
};

app.on("window-all-closed", () => {
  if (process.platform === "darwin") return;
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length > 0) return;
  createWindow();
});

app.whenReady().then(createWindow);
