const { contextBridge, ipcRenderer} = require('electron')

const API = {
    window: {
        close: () => ipcRenderer.send("app/close"),
        maximize: () => ipcRenderer.send("app/maximize"),
        minimize: () => ipcRenderer.send("app/minimize"),
    },
    maximizeState: (data) => ipcRenderer.invoke("max_state/get", data),
    fetchURL: (data) => ipcRenderer.invoke("cli_url/get", data),
};


contextBridge.exposeInMainWorld("app", API);