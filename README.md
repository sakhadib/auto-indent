# Auto Indent - Smart Code Formatting for VS Code

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/your-username.auto-indent?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-username.auto-indent)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/your-username.auto-indent?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-username.auto-indent)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/your-username.auto-indent?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=your-username.auto-indent)

A lightweight VS Code extension that automatically fixes code indentation for any programming language while respecting your editor preferences.

![Demo](https://via.placeholder.com/800x400.png?text=Indentation+Fix+Demo+GIF+Placeholder)

## Features ✨

- 🧹 **Automatic Indentation Correction** for entire files or selected text
- 🌐 **Language Agnostic** - Works with any programming language
- ⚙️ **Configurable** - Respects VS Code indentation settings (spaces/tabs, tab size)
- 📋 **Smart Format Preservation** - Maintains meaningful alignment
- 🚀 **Instant Feedback** - Success/error notifications
- ⌨️ **Keyboard Shortcut** - Quick formatting with `Ctrl+Alt+I` / `Cmd+Opt+I`

## Installation 📦

1. Download the vcix file from the releases page
2. Open VS Code
3. Go to Extensions (Ctrl+Shift+X)
4. Click on the 3 dots in the top right corner
5. Click on Install from VSIX
6. Select the vcix file you downloaded
7. Reload VS Code


## Usage 🛠️

### Basic Commands
- **Command Palette** (`Ctrl+Shift+P`/`Cmd+Shift+P`):
  - Type "Fix Indentation" and press Enter
- **Keyboard Shortcut**:
  - `Ctrl+Alt+I` (Windows/Linux)
  - `Cmd+Opt+I` (Mac)
- **Context Menu**:
  - Right-click in editor → "Fix Indentation"

### Supported Scenarios
- Format entire document (when no text selected)
- Format specific selection (highlight text first)
- Batch format multiple selections

## Configuration ⚙️

The extension automatically uses your VS Code settings:
```json
{
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.detectIndentation": true
}