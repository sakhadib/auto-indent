# Auto Indent - Smart Code Formatting for VS Code

A lightweight VS Code extension that automatically fixes code indentation for any programming language while respecting your editor preferences.

## Features ✨

- **Smart Indentation**: Automatically adjusts the indentation of your code based on your editor settings.
- **Multi-Language Support**: Works with any programming language that VS Code supports.
- **Batch Formatting**: Format multiple selections at once.
- **Customizable**: Uses your editor settings for tab size, spaces, and indentation detection.
- **Lightweight**: No external dependencies or complex configurations.
- **Cross-Platform**: Works on Windows, macOS, and Linux.
- **Open Source**: [MIT License](LICENSE)
- **Privacy-Focused**: No data collection or telemetry.

## Functionality 🚀

1. Indent your code based on your editor settings:
   - Tab size
   - Insert spaces
   - Detect indentation
2. Detects missplaced brackets, braces, and parentheses and fixes them.
3. Add white lines between code blocks for better readability after
   - blocks of code like `if`, `else`, `for`, `while`, `switch`, etc.
   - function definitions
   - class definitions

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
```

## Demo 🎥

A messy `C` code snippet before formatting:
```c
#include<stdio.h>
int add(int a, int b){
return a + b;
}
int Main(){
int MyVariable = 5;
float FloatingPointVariable = 3.14;
for(int i=0; i<10; i++){
printf("i = %d\n", i); 
if(i==5){ 
printf("i is 5\n");
}
}
if(5>10){
printf("5 is grater");
}
while(1){
printf("Infinite loop\n");
}
}
```

after pressing `Ctrl+Alt+I`:
```c
#include<stdio.h>

int add(int a, int b)
{
    return a + b;
}

int Main()
{
    int MyVariable = 5;
    float FloatingPointVariable = 3.14;
    
    for(int i=0; i<10; i++)
    {
        printf("i = %d\n", i); 
        
        if(i==5)
        {
            printf("i is 5\n");
        }
    }
    
    if(5>10)
    {
        printf("5 is grater");
    }
    
    while(1)
    {
        printf("Infinite loop\n");
    }
}
```

## Contributing 🤝

Contributions are welcome! Feel free to open an issue or submit a pull request.


## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
MIT License

Copyright (c) [2025] [Adib Sakhawat]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
