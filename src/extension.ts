import openExplorer from 'open-file-explorer';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const config = vscode.workspace.getConfiguration('RevealExtFolder');

    context.subscriptions.push(
        vscode.commands.registerCommand('extension.openExtFolder', async (extId: string) => await openExtFolder(extId, config)),
        vscode.commands.registerCommand('extension.revealExtFolder', async (e) => await openExtFolder(e.path.replace('/extension', ''), config)),
    );
}

async function openExtFolder(extId: string, config: vscode.WorkspaceConfiguration) {
    const p: any = vscode.extensions.getExtension(extId)?.extensionPath;

    await config.openAsProject
        ? vscode.commands.executeCommand('vscode.openFolder', vscode.Uri.parse(p))
        : openExplorer(p);
}

export function deactivate() {
}
