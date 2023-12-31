const path = require('node:path')
const { app, BrowserWindow, ipcMain } = require('electron')

process.env.GITHUB_TOKEN = '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'

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('./index.html')
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    console.log('window-all-closed')
    app.quit()
})