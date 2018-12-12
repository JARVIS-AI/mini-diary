const { app, BrowserWindow } = require('electron');
require('electron-debug')();

const { getWindow, setWindow } = require('./main/window');


function onClosed() {
	// Dereference the window
	setWindow(null);
}

function createMainWindow() {
	const window = new BrowserWindow({
		width: 1100,
		height: 600,
		show: false,
		titleBarStyle: 'hiddenInset'
	});
	window.loadURL(`file://${__dirname}/index.html`);
	window.once('ready-to-show', () => {
		window.show();
	});
	window.on('closed', onClosed);

	// Load listeners and menu items
	require('./main/ipcMain/listeners');
	require('./main/menu/menu');

	return window;
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate', () => {
	if (!getWindow()) {
		const window = createMainWindow();
		setWindow(window);
	}
});

app.on('ready', () => {
	const window = createMainWindow();
	setWindow(window);
});
