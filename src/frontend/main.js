const { app, BrowserWindow } = require("electron");
const path = require("path");

if (process.env.NODE_ENV === "development") {
  require("electron-reload")(__dirname);
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "../../img/Logo-AstralTrail.png"),
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
    },
  });

  mainWindow.loadFile("pages/tempat-wisata/TempatWisata.html");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});