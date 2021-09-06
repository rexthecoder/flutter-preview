"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = exports.deactivate = exports.activate = void 0;
const child_process_1 = require("child_process");
const net = require("net");
const path = require("path");
const util_1 = require("util");
const vscode = require("vscode");
function activate(context) {
    let portaflutter;
    let hostflutter;
    let backgroundColor;
    var portNotInUse = function (port, host, callback) {
        var server = net.createServer(function (socket) {
            socket.write("Echo server\r\n");
            socket.pipe(socket);
        });
        server.listen(port, host);
        server.on("error", function () {
            callback(true);
        });
        server.on("listening", function () {
            server.close();
            if (host === "localhost") {
                if (portNotInUse0000(port)) {
                    callback(true);
                }
                else {
                    callback(false);
                }
            }
            else {
                callback(false);
            }
        });
    };
    var portNotInUse0000 = function (porta) {
        var server = net.createServer(function (socket) {
            socket.write("Echo server\r\n");
            socket.pipe(socket);
        });
        server.listen(porta, "0.0.0.0");
        server.on("error", function () {
            return true;
        });
        server.on("listening", function () {
            server.close();
            return false;
        });
        return false;
    };
    const runApp = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.exec(`flutter run -d web-server --web-port 5555`);
        }
        catch (e) {
            return vscode.window.showErrorMessage(e.message);
        }
    });
    var lerConf = function () {
        let config = vscode.workspace.getConfiguration("flutter-preview");
        portaflutter = config.get("port");
        hostflutter = config.get("host");
        backgroundColor = config.get("background-color");
    };
    const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, "styles.css"));
    context.subscriptions.push(vscode.commands.registerCommand("extension.flutter-preview-android", () => {
        lerConf();
        runApp();
        const panel = vscode.window.createWebviewPanel("flutterAndroid", "flutter Preview - Android", vscode.ViewColumn.Two, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath)),
            ],
        });
        const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
        let htmlAndroid = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><aside id="platform-preview-2" class="platform-preview-2"><div id="demo-device-android" class="android"><iframe src="http://localhost:5555/?flutterplatform=android" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></div></aside> </body><link rel="stylesheet" type="text/css" href="${styleCssSrc}"><style>html, body { width: 100% !important; height: 100% !important; margin-top: 0px; margin: 0}.platform-preview-2 { min-width: 360px !important; margin: 0 auto !important; text-align: center; }</style></html>`;
        panel.webview.html = htmlAndroid;
        console.log(htmlAndroid);
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.flutter-preview-ios", () => {
        lerConf();
        const panel = vscode.window.createWebviewPanel("flutterIOS", "flutter Preview - iOS", vscode.ViewColumn.Two, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath)),
            ],
        });
        const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
        let htmlIOS = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><aside id="platform-preview-2" class="platform-preview-2"><div id="demo-device-ios" class="ios"><iframe src="http://localhost:${portaflutter}/?flutterplatform=ios" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></div></aside> </body><link rel="stylesheet" type="text/css" href="${styleCssSrc}"><style>html, body { width: 100% !important; height: 100% !important; margin-top: 0px; margin: 0}.platform-preview-2 { min-width: 360px !important; margin: 0 auto !important; text-align: center; }</style></html>`;
        panel.webview.html = htmlIOS;
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.flutter-preview-windows", () => {
        lerConf();
        runApp();
        const panel = vscode.window.createWebviewPanel("flutterWindows", "flutter Preview - Windows", vscode.ViewColumn.Two, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath)),
            ],
        });
        const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
        let htmlWindows = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><aside id="platform-preview-2" class="platform-preview-2"><div id="demo-device-windows" class="windows"><iframe src="http://localhost:${portaflutter}/?flutterplatform=windows" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></div></aside> </body><link rel="stylesheet" type="text/css" href="${styleCssSrc}"><style>html, body { width: 100% !important; height: 100% !important; margin-top: 0px; margin: 0}.platform-preview-2 { min-width: 360px !important; margin: 0 auto !important; text-align: center; }</style></html>`;
        panel.webview.html = htmlWindows;
    }));
    context.subscriptions.push(vscode.commands.registerCommand("extension.flutter-preview-undefined", () => {
        lerConf();
        runApp();
        const panel = vscode.window.createWebviewPanel("flutterUndefined", "flutter Preview - Without Frame", vscode.ViewColumn.Two, {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath)),
            ],
        });
        const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
        let htmlUndefined = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><iframe id="t1" src="http://localhost:${portaflutter}" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></body></html>`;
        panel.webview.html = htmlUndefined;
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
exports.exec = util_1.promisify(child_process_1.exec);
//# sourceMappingURL=extension.js.map