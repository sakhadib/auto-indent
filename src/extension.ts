import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('auto-indent.fix', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const document = editor.document;
            const selections = editor.selections;

            try {
                await normalizeWhitespace(editor);
                await reindentCode(editor);
                vscode.window.showInformationMessage('Indentation fixed successfully');
            } catch (error) {
                vscode.window.showErrorMessage('Failed to fix indentation: ' + error);
            }
        })
    );
}

async function normalizeWhitespace(editor: vscode.TextEditor) {
    const doc = editor.document;
    const tabSize = Number(editor.options.tabSize);
    const insertSpaces = Boolean(editor.options.insertSpaces);

    await editor.edit(editBuilder => {
        for (let line = 0; line < doc.lineCount; line++) {
            const textLine = doc.lineAt(line);
            const original = textLine.text;
            const whitespace = getLeadingWhitespace(original);
            
            if (!whitespace) continue;

            const visualLength = calculateVisualLength(whitespace, tabSize);
            const normalized = insertSpaces 
                ? ' '.repeat(visualLength)
                : '\t'.repeat(visualLength / tabSize) + ' '.repeat(visualLength % tabSize);

            if (normalized !== whitespace) {
                const range = new vscode.Range(
                    textLine.range.start,
                    textLine.range.start.translate(0, whitespace.length)
                );
                editBuilder.replace(range, normalized);
            }
        }
    });
}

async function reindentCode(editor: vscode.TextEditor) {
    await vscode.commands.executeCommand('editor.action.reindentselectedlines');
}

function getLeadingWhitespace(text: string): string {
    return text.match(/^\s*/)?.[0] || '';
}

function calculateVisualLength(whitespace: string, tabSize: number): number {
    let length = 0;
    for (const char of whitespace) {
        length += char === '\t' ? tabSize - (length % tabSize) : 1;
    }
    return length;
}

export function deactivate() {}