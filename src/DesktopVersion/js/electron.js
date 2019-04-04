const {app, BrowserWindow} = require('electron')
var width = 830;
var height = 680;

function createWindow() {
  let win = new BrowserWindow({width: width, height: height})

  win.loadFile('index.html')
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  app.quit()
})
