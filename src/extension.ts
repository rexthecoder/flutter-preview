"use strict";

import { exec as execCall } from 'child_process';
import * as net from 'net';
import * as path from 'path';
import { promisify } from 'util';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let portaflutter: any;
  let hostflutter: any;
  let backgroundColor: any;

  var portNotInUse = function (port: any, host: any, callback: any) {
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
        } else {
          callback(false);
        }
      } else {
        callback(false);
      }
    });
  };

  var portNotInUse0000 = function (porta: any): boolean {
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

  const runApp = async () => {
    try {
      await exec(`flutter run -d web-server --web-port 5555`);
    } catch (e: any) {
      return vscode.window.showErrorMessage(e.message);
    }
  };
  var lerConf = function () {
    let config = vscode.workspace.getConfiguration("flutter-preview");
    portaflutter = config.get("port");
    hostflutter = config.get("host");
    backgroundColor = config.get("background-color");
  };

  const onDiskPath = vscode.Uri.file(
    path.join(context.extensionPath, "styles.css")
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.flutter-preview-android", () => {
      lerConf();
      runApp();
      const panel = vscode.window.createWebviewPanel(
        "flutterAndroid",
        "flutter Preview - Android",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath)),
          ],
        }
      );
      const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
      let htmlAndroid = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><aside id="platform-preview-2" class="platform-preview-2"><div id="demo-device-android" class="android"><iframe src="http://localhost:5555/?flutterplatform=android" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></div></aside> </body><link rel="stylesheet" type="text/css" href="${styleCssSrc}"><style>html, body { width: 100% !important; height: 100% !important; margin-top: 0px; margin: 0}.platform-preview-2 { min-width: 360px !important; margin: 0 auto !important; text-align: center; }</style></html>`;
      panel.webview.html = htmlAndroid;
      console.log(htmlAndroid);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.flutter-preview-ios", () => {
      lerConf();
      const panel = vscode.window.createWebviewPanel(
        "flutterIOS",
        "flutter Preview - iOS",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath)),
          ],
        }
      );
      const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
      let htmlIOS = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><aside id="platform-preview-2" class="platform-preview-2"><div id="demo-device-ios" class="ios"><iframe src="http://localhost:${portaflutter}/?flutterplatform=ios" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></div></aside> </body><link rel="stylesheet" type="text/css" href="${styleCssSrc}"><style>html, body { width: 100% !important; height: 100% !important; margin-top: 0px; margin: 0}.platform-preview-2 { min-width: 360px !important; margin: 0 auto !important; text-align: center; }</style></html>`;
      panel.webview.html = htmlIOS;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.flutter-preview-windows", () => {
      lerConf();
      runApp();
      const panel = vscode.window.createWebviewPanel(
        "flutterWindows",
        "flutter Preview - Windows",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath)),
          ],
        }
      );
      const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
      let htmlWindows = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><aside id="platform-preview-2" class="platform-preview-2"><div id="demo-device-windows" class="windows"><iframe src="http://localhost:${portaflutter}/?flutterplatform=windows" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></div></aside> </body><link rel="stylesheet" type="text/css" href="${styleCssSrc}"><style>html, body { width: 100% !important; height: 100% !important; margin-top: 0px; margin: 0}.platform-preview-2 { min-width: 360px !important; margin: 0 auto !important; text-align: center; }</style></html>`;
      panel.webview.html = htmlWindows;
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "extension.flutter-preview-undefined",
      () => {
        lerConf();
        runApp();
        const panel = vscode.window.createWebviewPanel(
          "flutterUndefined",
          "flutter Preview - Without Frame",
          vscode.ViewColumn.Two,
          {
            enableScripts: true,
            localResourceRoots: [
              vscode.Uri.file(path.join(context.extensionPath)),
            ],
          }
        );
        const styleCssSrc = panel.webview.asWebviewUri(onDiskPath);
        let htmlUndefined = `<!DOCTYPE html><html lang="en"><head><title></title><meta charset="UTF-8"></head><body style="background-color: ${backgroundColor}"><iframe id="t1" src="http://localhost:${portaflutter}" width="360" height="640" frameborder="0" scrolling="no" style="pointer-events: auto;"> </iframe></body></html>`;
        panel.webview.html = htmlUndefined;
      }
    )
  );
}

export function deactivate() {}

export const exec = promisify(execCall);