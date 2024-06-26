import * as vscode from "vscode";

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export class ColorsViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "raindrops.rainView";
  private _view?: vscode.WebviewView;
  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken,
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "resources", "main.css"),
    );
    const scriptMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "resources", "main.js"),
    );

    const nonce = getNonce();

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Raindrops</title>
            <link href="${styleMainUri}" rel="stylesheet">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
        </head>
        <body>
            <div id="rain">
              <div class="controls">
                <label for="speedRange">Raindrop Speed:</label>
                <input type="range" id="speedRange" min="0.1" max="2" step="0.1" value="0.5">
              </div>
            </div>
            <script nonce="${nonce}" src="${scriptMainUri}"></script>
        </body>
        </html>
    `;
  }
}

export function activate(context: vscode.ExtensionContext) {
  const provider = new ColorsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      ColorsViewProvider.viewType,
      provider,
    ),
  );
  vscode.window.showInformationMessage(
    "Time to grab your umbrella! Raindrops are on their way! 🌧️",
  );
}

export function deactivate() {}
