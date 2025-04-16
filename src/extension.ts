import * as vscode from 'vscode';

// Define the target website URL as a constant
const TARGET_URL = 'https://pavelfalta.github.io/'; // Or your specific traffic light URL

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "webview-website-opener" is now active!');

	// Register the command defined in package.json
	let disposable = vscode.commands.registerCommand('extension.showTrafficLight', () => {
		// Create and show a new webview panel in a split view
		const panel = vscode.window.createWebviewPanel(
			'trafficLightWebView', // Identifies the type of the webview. Used internally
			'Traffic Light', // Title of the panel displayed to the user
			vscode.ViewColumn.Beside, // Open view beside current editor
			{
				// Enable scripts in the webview
				enableScripts: true // Set to false if scripts aren't needed
				// localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'media')] // Only needed if loading local resources
			}
		);

		// Set the HTML content for the webview
		panel.webview.html = getWebviewContent(panel.webview, TARGET_URL);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

// Generate the HTML content for the Webview Panel
function getWebviewContent(webview: vscode.Webview, url: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Security-Policy" content="default-src 'none'; frame-src ${url}; style-src ${webview.cspSource} 'unsafe-inline';">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Traffic Light</title>
	<style>
		body, html {
			margin: 0; padding: 0; height: 100%;
		}
		iframe {
			border: none;
			width: 100%;
			height: 100%;
		}
		/* Removed scrollbar styling for webview body */
	</style>
</head>
<body>
	<iframe src="${url}"></iframe>
</body>
</html>`;
} 