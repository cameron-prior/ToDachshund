const vscode = require('vscode');

function* getDachshundLines(text) {

    var length = text.length;
    var spaces = ' '.repeat(length);
    var dashes = '-'.repeat(length);
    var underscores = '_'.repeat(length);

    yield `,     ` + spaces + `     ," e\`--o`;
    yield `((    ` + spaces + `     (  | __,'`;
    yield ` \\~--` + dashes + `------' \_;/`;
    yield ` (    ` + text + `        /`;
    yield ` /) ._` + underscores + `____.  )`;
    yield `(( (  ` + spaces + `   (( (`;
    yield `\`\`-'` + spaces + `     \`\`-'`;

    // A lovely pristine dachshund, for reference
    //     var dachshund = `
    // ,                    ," e\`--o
    // ((                   (  | __,'
    //  \\~----------------' \_;/
    //  (                      /
    //  /) ._______________.  )
    // (( (               (( (
    //  \`\`-'               \`\`-'   `;
}

function activate(context) {

    console.log('"dachshundize" is now active');

    let disposable = vscode.commands.registerCommand('extension.toDachshund', function() {

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        editor.edit(function(editBuilder) {
            const lineNum = editor.selection.active.line
            var text = editor.document.lineAt(lineNum).text
            var lineComment = "//  ";

            editBuilder.delete(new vscode.Range(lineNum, 0, lineNum, text.length))

            for (let line of getDachshundLines(text)) {
                var output = lineComment + line + "\n"
                editBuilder.insert(new vscode.Position(lineNum, 0), output);
            }
        })

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;