const { app, BrowserWindow, ipcMain } = require("electron");
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
      preload: path.join(__dirname, "preload.js"),
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

// IPC Handlers
ipcMain.handle("fetch-data", async (event, endpoint) => {
  const response = await fetch(`http://127.0.0.1:5000/${endpoint}`);
  return response.json();
});

ipcMain.handle("post-data", async (event, { endpoint, data }) => {
  const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
});

ipcMain.handle("delete-data", async (event, { endpoint, id }) => {
  const response = await fetch(`http://127.0.0.1:5000/${endpoint}/${id}`, {
    method: "DELETE",
  });
  return response.json();
});
