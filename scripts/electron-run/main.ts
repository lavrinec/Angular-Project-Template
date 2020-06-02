import { app, BrowserWindow, screen, Menu, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';

const {autoUpdater} = require('electron-updater');

let win, serve, lastCheck, menu;
const args = process.argv.slice(1);
const electronLocalshortcut = require('electron-localshortcut');
serve = args.some(val => val === '--serve');

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, we should focus our window.
    if (win) {
      if (win.isMinimized()) { win.restore(); }
      win.focus();
    }
  });
}

function createWindow() {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    // icon: path.join(__dirname, '../www/assets/icons/icon.png'),
    webPreferences: {
      nodeIntegration: true,
      // webviewTag : true,
      // devTools: false,
    },
  });
  win.maximize();

  menu = Menu.getApplicationMenu();

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/../../node_modules/electron`)
    });
    win.webContents.openDevTools();
  } else {
    void checkUpdate();
    win.on('focus', () => {
      void checkUpdate();
    });

  }

  setWindow(win);
  win.removeMenu();

  // set variable to mainWindow
  win.webContents.on('did-finish-load', () => {
    void executeInWindow('window.isMinElectronWindow=true;');
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  console.log('Exception in electron', e);
  sendStatusToWindow('Exception in electron' + JSON.stringify(e));
  // Catch Error
  // throw e;
}

autoUpdater.on('error', message => {
  console.error('There was a problem updating the application');
  console.error(message);
  sendStatusToWindow('Err: ' + message);
});

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (ev) => {
  sendStatusToWindow('Update available.' + JSON.stringify(ev));
});
autoUpdater.on('update-not-available', (ev) => {
  sendStatusToWindow('Update not available.' + JSON.stringify(ev));
});
// if there was error, than sooner repeat update request
autoUpdater.on('error', (ev) => {
  sendStatusToWindow('Error in auto-updater.' + JSON.stringify(ev));
  lastCheck -= 30000;
});
autoUpdater.on('download-progress', (ev) => {
  sendStatusToWindow('Download progress... ' + JSON.stringify(ev));
});

autoUpdater.on('update-downloaded', (ev) => {
  sendStatusToWindow('Installing ... ' + JSON.stringify(ev));
  win.webContents.send('update-downloaded', true);
});

function restartPage(window) {
  window.reload();
}

async function checkUpdate() {
  const now = Date.now();
  if (!lastCheck || lastCheck + 60000 < now) {
    lastCheck = now;
    const protocol = await getFromStorage('protocol');
    const angularUrl = await getFromStorage('angular');
    sendStatusToWindow(angularUrl);
    if (angularUrl && protocol && angularUrl.length > 2 && protocol.length > 1) {
      autoUpdater.setFeedURL({provider: 'generic', 'url': protocol + '://' + angularUrl + '/update'});
      void autoUpdater.checkForUpdates();
    } else {
      sendStatusToWindow('Error update check ' + JSON.stringify(protocol) + JSON.stringify(angularUrl));
    }
  } else {
    sendStatusToWindow('Ni še čas za preverjanje posodobitev. ' + lastCheck);
  }
}

// this function execute JS in main window (win)
async function executeInWindow(command, fallback = null) {
  return executeInSelectedWindow(win, command, fallback);
}

// this function execute JS in optional window (win)
async function executeInSelectedWindow(window: {webContents: any}, command, fallback = null) {
  return window.webContents.executeJavaScript(command).then(fallback);
}

// returns value from storage
async function getFromStorage(key) {
  return executeInWindow('localStorage.getItem(\'ng2-webstorage|' + key + '\')', (value) => {
    sendStatusToWindow(value);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  });
}

// register default electronLocalShortcuts
function setWindowShortcuts(window: any) {
  // Test status to window
  electronLocalshortcut.register(window, 'Ctrl+Shift+H', (async () => {
    sendStatusToWindow(window);
    sendStatusToWindow(window.storage);
    // execute in window
    void executeInWindow('localStorage.getItem(\'ng2-webstorage|angular\')', (value) => {
      sendStatusToWindow(value);
    });
    void executeInWindow('localStorage', (value) => {
      sendStatusToWindow(value);
    });
  }));

  // show search
  electronLocalshortcut.register(window, 'Ctrl+F', (async () => {
    window.webContents.send('finder-visible', true);
  }));

  // show menu
  electronLocalshortcut.register(window, 'Ctrl+Shift+A', (async () => {
    if (window.isMenuBarVisible()) {
      window.removeMenu();
    } else {
      window.setMenu(menu);
    }
  }));

  // restart
  electronLocalshortcut.register(window, 'Ctrl+Shift+R', (async () => {
    restartPage(window);
  }));

  // restart
  electronLocalshortcut.register(window, 'Ctrl+R', (async () => {
    restartPage(window);
  }));

  // restart
  electronLocalshortcut.register(window, 'F5', (async () => {
    restartPage(window);
  }));

  // check for updates
  electronLocalshortcut.register(window, 'Ctrl+U', (async () => {
    void checkUpdate();
  }));

  // open dev tools
  electronLocalshortcut.register(window, 'Ctrl+Shift+I', (async () => {
    console.log('Ctrl+Shift+I pressed. open dev tools');
    window.webContents.openDevTools();
  }));

  // bellow code is now implemented in app.component.ts
  // // go back in history
  // electronLocalshortcut.register(window, 'Alt+Left', (async () => {
  //   void executeInSelectedWindow(window, 'history.back();');
  // }));
  //
  // // go forward in history
  // electronLocalshortcut.register(window, 'Alt+Right', (async () => {
  //   void executeInSelectedWindow(window, 'history.forward();');
  // }));
}

// set window settings
function setWindow(window, newUrl = null) {
  const hash = (newUrl ? newUrl.split('#')[1] : '');
  if (serve) {
    window.loadURL('http://localhost:4200#' + hash);
  } else {
    window.loadURL(url.format({
      // TODO fix url
      pathname: path.join(__dirname, '../www/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: hash
    }));

  }

  window.removeMenu();

  // Emited when shift+click is pressed
  window.webContents.on('new-window', (event, clickedUrl, frameName, disposition, options) => {
    sendStatusToWindow(clickedUrl);
    if (!clickedUrl.includes('/api/dashboard/data/PerformExportAction')) {
      event.preventDefault();
      if (clickedUrl.includes('#')) {
        const newWindow = new BrowserWindow(options);
        setWindow(newWindow, clickedUrl);
        event.newGuest = newWindow;
      } else {
        sendStatusToWindow('Brez #');
        void shell.openExternal(clickedUrl);
      }
    }
  });

  window.webContents.on('found-in-page', (event, params) => {
    window.webContents.send('found-in-page', params);
  });
  window.webContents.on('ipc-message', (event, chanel, ...params) => {
    switch (chanel) {
      case 'stopFindInPage':
        window.webContents.stopFindInPage(params[0]);
        break;
      case 'findInPage':
        window.webContents.findInPage(...params);
        break;
      case 'updateApp':
        autoUpdater.quitAndInstall();
        break;
    }
  });

  setWindowShortcuts(window);


  // Emitted when the window is closed.
  window.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    window = null;
  });
}

// console log in main window (win)
function sendStatusToWindow(text) {
  const cache = [];
  text = JSON.stringify(text, function(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Duplicate reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  win.webContents.send('message', text);
  void executeInWindow('console.log(' + text + ')');
}
