"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var url = require("url");
var autoUpdater = require('electron-updater').autoUpdater;
var win, serve, lastCheck, menu;
var args = process.argv.slice(1);
var electronLocalshortcut = require('electron-localshortcut');
serve = args.some(function (val) { return val === '--serve'; });
var gotTheLock = electron_1.app.requestSingleInstanceLock();
if (!gotTheLock) {
    electron_1.app.quit();
}
else {
    electron_1.app.on('second-instance', function () {
        // Someone tried to run a second instance, we should focus our window.
        if (win) {
            if (win.isMinimized()) {
                win.restore();
            }
            win.focus();
        }
    });
}
function createWindow() {
    var size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        // icon: path.join(__dirname, '../www/assets/icons/icon.png'),
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.maximize();
    menu = electron_1.Menu.getApplicationMenu();
    if (serve) {
        require('electron-reload')(__dirname, {
            electron: require(__dirname + "/../../node_modules/electron")
        });
        win.webContents.openDevTools();
    }
    else {
        void checkUpdate();
        win.on('focus', function () {
            void checkUpdate();
        });
    }
    setWindow(win);
    win.removeMenu();
    // set variable to mainWindow
    win.webContents.on('did-finish-load', function () {
        void executeInWindow('window.isMinElectronWindow=true;');
    });
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    electron_1.app.on('ready', createWindow);
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', function () {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    console.log('Exception in electron', e);
    sendStatusToWindow('Exception in electron' + JSON.stringify(e));
    // Catch Error
    // throw e;
}
autoUpdater.on('error', function (message) {
    console.error('There was a problem updating the application');
    console.error(message);
    sendStatusToWindow('Err: ' + message);
});
autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', function (ev) {
    sendStatusToWindow('Update available.' + JSON.stringify(ev));
});
autoUpdater.on('update-not-available', function (ev) {
    sendStatusToWindow('Update not available.' + JSON.stringify(ev));
});
// if there was error, than sooner repeat update request
autoUpdater.on('error', function (ev) {
    sendStatusToWindow('Error in auto-updater.' + JSON.stringify(ev));
    lastCheck -= 30000;
});
autoUpdater.on('download-progress', function (ev) {
    sendStatusToWindow('Download progress... ' + JSON.stringify(ev));
});
autoUpdater.on('update-downloaded', function (ev) {
    sendStatusToWindow('Installing ... ' + JSON.stringify(ev));
    win.webContents.send('update-downloaded', true);
});
function restartPage(window) {
    window.reload();
}
function checkUpdate() {
    return __awaiter(this, void 0, void 0, function () {
        var now, protocol, angularUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = Date.now();
                    if (!(!lastCheck || lastCheck + 60000 < now)) return [3 /*break*/, 3];
                    lastCheck = now;
                    return [4 /*yield*/, getFromStorage('protocol')];
                case 1:
                    protocol = _a.sent();
                    return [4 /*yield*/, getFromStorage('angular')];
                case 2:
                    angularUrl = _a.sent();
                    sendStatusToWindow(angularUrl);
                    if (angularUrl && protocol && angularUrl.length > 2 && protocol.length > 1) {
                        autoUpdater.setFeedURL({ provider: 'generic', 'url': protocol + '://' + angularUrl + '/update' });
                        void autoUpdater.checkForUpdates();
                    }
                    else {
                        sendStatusToWindow('Error update check ' + JSON.stringify(protocol) + JSON.stringify(angularUrl));
                    }
                    return [3 /*break*/, 4];
                case 3:
                    sendStatusToWindow('Ni še čas za preverjanje posodobitev. ' + lastCheck);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
// this function execute JS in main window (win)
function executeInWindow(command, fallback) {
    if (fallback === void 0) { fallback = null; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, executeInSelectedWindow(win, command, fallback)];
        });
    });
}
// this function execute JS in optional window (win)
function executeInSelectedWindow(window, command, fallback) {
    if (fallback === void 0) { fallback = null; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, window.webContents.executeJavaScript(command).then(fallback)];
        });
    });
}
// returns value from storage
function getFromStorage(key) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, executeInWindow('localStorage.getItem(\'ng2-webstorage|' + key + '\')', function (value) {
                    sendStatusToWindow(value);
                    try {
                        return JSON.parse(value);
                    }
                    catch (e) {
                        return value;
                    }
                })];
        });
    });
}
// register default electronLocalShortcuts
function setWindowShortcuts(window) {
    var _this = this;
    // Test status to window
    electronLocalshortcut.register(window, 'Ctrl+Shift+H', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            sendStatusToWindow(window);
            sendStatusToWindow(window.storage);
            // execute in window
            void executeInWindow('localStorage.getItem(\'ng2-webstorage|angular\')', function (value) {
                sendStatusToWindow(value);
            });
            void executeInWindow('localStorage', function (value) {
                sendStatusToWindow(value);
            });
            return [2 /*return*/];
        });
    }); }));
    // show search
    electronLocalshortcut.register(window, 'Ctrl+F', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            window.webContents.send('finder-visible', true);
            return [2 /*return*/];
        });
    }); }));
    // show menu
    electronLocalshortcut.register(window, 'Ctrl+Shift+A', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (window.isMenuBarVisible()) {
                window.removeMenu();
            }
            else {
                window.setMenu(menu);
            }
            return [2 /*return*/];
        });
    }); }));
    // restart
    electronLocalshortcut.register(window, 'Ctrl+Shift+R', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            restartPage(window);
            return [2 /*return*/];
        });
    }); }));
    // restart
    electronLocalshortcut.register(window, 'Ctrl+R', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            restartPage(window);
            return [2 /*return*/];
        });
    }); }));
    // restart
    electronLocalshortcut.register(window, 'F5', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            restartPage(window);
            return [2 /*return*/];
        });
    }); }));
    // check for updates
    electronLocalshortcut.register(window, 'Ctrl+U', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            void checkUpdate();
            return [2 /*return*/];
        });
    }); }));
    // open dev tools
    electronLocalshortcut.register(window, 'Ctrl+Shift+I', (function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log('Ctrl+Shift+I pressed. open dev tools');
            window.webContents.openDevTools();
            return [2 /*return*/];
        });
    }); }));
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
function setWindow(window, newUrl) {
    if (newUrl === void 0) { newUrl = null; }
    var hash = (newUrl ? newUrl.split('#')[1] : '');
    if (serve) {
        window.loadURL('http://localhost:4200#' + hash);
    }
    else {
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
    window.webContents.on('new-window', function (event, clickedUrl, frameName, disposition, options) {
        sendStatusToWindow(clickedUrl);
        if (!clickedUrl.includes('/api/dashboard/data/PerformExportAction')) {
            event.preventDefault();
            if (clickedUrl.includes('#')) {
                var newWindow = new electron_1.BrowserWindow(options);
                setWindow(newWindow, clickedUrl);
                event.newGuest = newWindow;
            }
            else {
                sendStatusToWindow('Brez #');
                void electron_1.shell.openExternal(clickedUrl);
            }
        }
    });
    window.webContents.on('found-in-page', function (event, params) {
        window.webContents.send('found-in-page', params);
    });
    window.webContents.on('ipc-message', function (event, chanel) {
        var _a;
        var params = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            params[_i - 2] = arguments[_i];
        }
        switch (chanel) {
            case 'stopFindInPage':
                window.webContents.stopFindInPage(params[0]);
                break;
            case 'findInPage':
                (_a = window.webContents).findInPage.apply(_a, params);
                break;
            case 'updateApp':
                autoUpdater.quitAndInstall();
                break;
        }
    });
    setWindowShortcuts(window);
    // Emitted when the window is closed.
    window.on('closed', function () {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        window = null;
    });
}
// console log in main window (win)
function sendStatusToWindow(text) {
    var cache = [];
    text = JSON.stringify(text, function (key, value) {
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
//# sourceMappingURL=main.js.map