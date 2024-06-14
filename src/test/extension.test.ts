import * as assert from 'assert';
import * as vscode from 'vscode';
import { ColorsViewProvider } from '../extension';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Webview provider is registered', async () => {
        const provider = new ColorsViewProvider(vscode.Uri.file(''));
        const viewType = ColorsViewProvider.viewType;

        await vscode.window.registerWebviewViewProvider(viewType, provider);

        const webview = vscode.window.createWebviewPanel(viewType, 'Test', vscode.ViewColumn.One, {});
        assert.strictEqual(webview.viewType, viewType);
    });

		test('Webview HTML content is correct', () => {
			const provider = new ColorsViewProvider(vscode.Uri.file(''));
			const webview = { 
					asWebviewUri: (uri: vscode.Uri) => uri.toString(),
			} as unknown as vscode.Webview;

			const htmlContent = provider['_getHtmlForWebview'](webview);

			assert.ok(htmlContent.includes('<!DOCTYPE html>'), 'HTML should start with <!DOCTYPE html>');
			assert.ok(htmlContent.includes('<div id="rain">'), 'HTML should contain a div with id="rain"');
			assert.ok(htmlContent.includes('<input type="range" id="speedRange"'), 'HTML should contain an input element with id="speedRange"');
	});
});
