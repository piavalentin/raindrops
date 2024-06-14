"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
function activate(context) {
    const provider = new ColorsViewProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider(ColorsViewProvider.viewType, provider));
}
exports.activate = activate;
class ColorsViewProvider {
    _extensionUri;
    static viewType = 'raindrops.rainView';
    _view;
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, _token) {
        this._view = webviewView;
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                this._extensionUri
            ]
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }
    _getHtmlForWebview(webview) {
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'main.css'));
        const scriptMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'resources', 'main.js'));
        return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Raindrops</title>
				    <link href="${styleMainUri}" rel="stylesheet">
        </head>
        <body>
            <div id="rain">
              <div class="controls">
                <label for="speedRange">Raindrop Speed:</label>
                <input type="range" id="speedRange" min="0.1" max="2" step="0.1" value="0.5">
              </div>
            </div>
            <script src="${scriptMainUri}"></script>
        </body>
        </html>
    `;
    }
}
//# sourceMappingURL=extension.js.map