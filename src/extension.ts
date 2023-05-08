import * as vscode from 'vscode';
const openExplorer = require('open-file-explorer');

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('RevealExtFolder');

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.revealExtFolder', async () => {
            const res = await vscode.window.showInputBox({
                placeHolder: 'Enter the extensionId ex."publisher.name"',
            });

            if (res) {
                const p: any = vscode.extensions.getExtension(res)?.extensionUri.path;

                await config.openAsProject
                    ? vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(p))
                    : openExplorer(p);
            }
        }),
    );
}

export function deactivate() {
}
