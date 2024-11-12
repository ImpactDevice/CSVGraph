const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreference: {
			preload: path.join("CSVElectionTest", 'preload.js'),
			nodeIntegration: true,
			contextIsolation: false
		}
	});
	
	win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if(BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
