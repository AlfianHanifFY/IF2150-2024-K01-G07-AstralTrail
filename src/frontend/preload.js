const { contextBridge, ipcRenderer } = require("electron");

// Expose safe API for Renderer Process
contextBridge.exposeInMainWorld("electronAPI", {
  fetchData: (endpoint) => ipcRenderer.invoke("fetch-data", endpoint),
  postData: (data) => ipcRenderer.invoke("post-data", data),
  deleteData: (data) => ipcRenderer.invoke("delete-data", data),
});
