const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // frame: false, // Disable default frame (custom titlebar)
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'), // Corrected key + quotes
      contextIsolation: true, // Enable context isolation for security
      nodeIntegration: false, // Disable Node.js integration in renderer process
    },
  });

  win.loadFile('index.html');
  win.menuBarVisible = false; // Hide the menu bar

  // Open the DevTools (optional)
  // win.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // macOS behavior: recreate window if none exists
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow(); // fixed typo from createnindow
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, apps generally stay open until the user quits explicitly
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
