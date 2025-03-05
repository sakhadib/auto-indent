import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand('auto-indent.fix', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {return;}

            const document = editor.document;

            try {
                await normalizeWhitespace(editor);
                await fixBracePositions(editor);
                await addWhitespaceBeforeBlocks(editor);
                await addWhitespaceBeforeTypes(editor);
                await reindentCode(editor);

                vscode.window.showInformationMessage('Formatted Successfully');
            } catch (error) {
                vscode.window.showErrorMessage('Failed to fix indentation: ' + error);
            }
        })
    );
}




/**
 * Normalizes the leading whitespace of each line in the given text editor.
 * Converts leading whitespace to either spaces or tabs based on the editor's settings.
 *
 * @param editor - The text editor whose content will be normalized.
 * @returns A promise that resolves when the normalization is complete.
 */
async function normalizeWhitespace(editor: vscode.TextEditor) {
    const doc = editor.document;
    const tabSize = Number(editor.options.tabSize);
    const insertSpaces = Boolean(editor.options.insertSpaces);

    await editor.edit(editBuilder => {
        for (let line = 0; line < doc.lineCount; line++) {
            const textLine = doc.lineAt(line);
            const original = textLine.text;
            const whitespace = getLeadingWhitespace(original);
            
            if (!whitespace) {continue;}

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



/**
 * Fixes common indentation issues in the given text editor.
 * This function corrects misplaced braces and adds missing whitespace before blocks and types.
 *
 * @param editor - The text editor to fix indentation in.
 * @returns A promise that resolves when the indentation is fixed.
 */
async function fixBracePositions(editor: vscode.TextEditor) {
    const doc = editor.document;
    await editor.edit(editBuilder => {
        for (let line = 0; line < doc.lineCount - 1; line++) {
            const textLine = doc.lineAt(line);
            const nextLine = doc.lineAt(line + 1);
            
            // Match function definitions and misplaced opening braces
            if (/\b(?:class|struct|if|else|for|while|switch|do|namespace|int|void|float|double|char|bool|string)\b.*\)\s*\{/.test(textLine.text)) {
                const updatedText = textLine.text.replace(/\s*\{\s*$/, '');
                editBuilder.replace(textLine.range, updatedText);
                editBuilder.insert(new vscode.Position(line + 1, 0), '{\n');
            }
            
            // Match improperly indented closing braces
            if (/^\s*\}/.test(nextLine.text)) {
                editBuilder.replace(nextLine.range, '}');
            }
        }
    });
}



/**
 * Adds a blank line before blocks of code such as loops, conditionals, classes, and functions
 * in a given text editor. This function scans through the document and inserts a newline
 * before lines that start with block keywords or C/C++ style function definitions, provided
 * the previous line is not already blank.
 *
 * @param editor - The VS Code text editor instance where the whitespace will be added.
 * @returns A promise that resolves when the edit operation is complete.
 */
async function addWhitespaceBeforeBlocks(editor: vscode.TextEditor) {
    const doc = editor.document;
    await editor.edit(editBuilder => {
        for (let line = 1; line < doc.lineCount; line++) {
            const textLine = doc.lineAt(line);
            const prevLine = doc.lineAt(line - 1);

            // Match block starting keywords and C/C++ style functions
            if (/^\s*(for|while|if|else|class|switch|do|[a-zA-Z_][a-zA-Z0-9_]*\s*\([^)]*\)\s*\{)/.test(textLine.text) && !/^\s*$/.test(prevLine.text)) {
                editBuilder.insert(new vscode.Position(line, 0), '\n');
            }
        }
    });
}



/**
 * Adds a newline before function declarations in a TypeScript or JavaScript file.
 * 
 * This function scans through the lines of the active editor and inserts a newline
 * before lines that match the pattern of a function declaration with parameters.
 * It excludes lines that are variable assignments, type assignments, or empty lines.
 * 
 * @param editor - The active text editor in which the function will operate.
 * 
 * The function specifically looks for lines that:
 * - Start with optional visibility modifiers (private, public, protected).
 * - Followed by a type (int, float, double, char, void, bool, string, or custom types).
 * - Followed by a function name and parameters.
 * 
 * The function ensures that:
 * - The line is not a variable assignment.
 * - The line is not a type assignment or variable.
 * - The previous line is not empty.
 */
async function addWhitespaceBeforeTypes(editor: vscode.TextEditor) {
    const doc = editor.document;
    await editor.edit(editBuilder => {
        for (let line = 1; line < doc.lineCount; line++) {
            const textLine = doc.lineAt(line);
            const prevLine = doc.lineAt(line - 1);

            // Match lines that start with visibility modifiers followed by a type (int, float, custom type, etc.)
            // Exclude variable assignments and include function declarations with parameters
            if (
                /^\s*(private|public|protected)?\s*(int|float|double|char|void|bool|string|\w+)\s+\w+\s*\(/.test(textLine.text) // function declaration with parameters
                && !/^\s*[\w\d_]+\s*=\s*.*;/.test(textLine.text) // Exclude variable assignments
                && !/^\s*type\b.*;\s*$/.test(textLine.text) // Exclude type assignments or variables
                && !/^\s*$/.test(prevLine.text) // Ensure it's not the first line or an empty line before
            ) {
                // Insert a newline before the function declaration
                editBuilder.insert(new vscode.Position(line, 0), '\n');
            }
        }
    });
}




/**
 * Reindents the selected lines in the given text editor.
 *
 * @param editor - The text editor whose selected lines will be reindented.
 * @returns A promise that resolves when the reindentation is complete.
 */
async function reindentCode(editor: vscode.TextEditor) {
    await vscode.commands.executeCommand('editor.action.reindentselectedlines');
}



/**
 * Returns the leading whitespace of a given string.
 *
 * @param text - The string to extract leading whitespace from.
 * @returns The leading whitespace characters at the beginning of the string.
 */
function getLeadingWhitespace(text: string): string {
    return text.match(/^\s*/)?.[0] || '';
}




/**
 * Calculates the visual length of a whitespace string, taking into account tab characters.
 *
 * @param whitespace - The whitespace string to calculate the visual length of.
 * @param tabSize - The number of spaces in a tab character.
 * @returns The visual length of the whitespace string.
 */
function calculateVisualLength(whitespace: string, tabSize: number): number {
    let length = 0;
    for (const char of whitespace) {
        length += char === '\t' ? tabSize - (length % tabSize) : 1;
    }
    return length;
}



// this method is called when your extension is deactivated
export function deactivate() {}


