const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
require("electron-reload")(__dirname + "/app-view");

let wind;

const createAppWindow = async () => {
    wind = new BrowserWindow(
    {
        minWidth: 900,
        minHeight: 580,
        width: 1024,
        height: 800,
        roundedCorners: true,
        autoHideMenuBar: true,
        frame: false,
        show: false,
        webPreferences:
        {
            devTools: true,
            contextIsolation: true,
            nodeIntegration: true,
            webSecurity: true,
            preload: path.join(__dirname + "/preload.js"),
        }
    });

    wind.setAutoHideMenuBar(null);

    wind.loadFile(__dirname + '/app-view/index.html');

    wind.on("ready-to-show", ()=>{wind.show()});
}
  
app.whenReady().then(() => {
    createAppWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) 
        {
            createAppWindow();
        }
    })
})
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') 
    {
        app.quit()
    }
})

ipcMain.on("app/close", () => {
    app.quit();
});

ipcMain.on("app/maximize", () => {
    if(wind.isMaximized() == true)
    {
        wind.unmaximize();
    }
    else if(wind.isMaximized() == false)
    {
        wind.maximize();
    }
});

ipcMain.on("app/minimize", () => {
    wind.minimize();
});

ipcMain.handle("max_state/get", async (_, data) => {
    if(wind.isMaximized() == true)
    {
        return "MAXIMIZED";
    }
    else if(wind.isMaximized() == false)
    {
        return "NOT_MAXIMIZED";
    }
});