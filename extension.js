const vscode = require('vscode');

function* getDachshundLines(text) {

    var length = text.length;
    var spaces = ' '.repeat(length);
    var dashes = '-'.repeat(length);
    var underscores = '_'.repeat(length);

    yield `,     ` + spaces + `     ," e\`--o`;
    yield `((    ` + spaces + `     (  | __,'`;
    yield ` \\~--` + dashes + `----' \_;/`;
    yield ` (    ` + text + `        /`;
    yield ` /) ._` + underscores + `____.  )`;
    yield `(( (  ` + spaces + `   (( (`;
    yield `\`\`-'` + spaces + `     \`\`-'`;

    //     var dachshund = `
    // ,                    ," e\`--o
    // ((                   (  | __,'
    //  \\~----------------' \_;/
    //  (                      /
    //  /) ._______________.  )
    // (( (               (( (
    //  \`\`-'               \`\`-' `;

}

function activate(context) {

    console.log('Congratulations, your extension "dachshundize" is now active!');

    let disposable = vscode.commands.registerCommand('extension.toDachshund', function() {

        var editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        editor.edit(function(editBuilder) {
            const cursor = editor.selection.active;
            const lineNum = cursor.line
            var text = editor.document.lineAt(lineNum).text

            editBuilder.delete(new vscode.Range(lineNum, 0, lineNum, text.length))

            for (let line of getDachshundLines(text)) {
                editBuilder.insert(new vscode.Position(lineNum, 0), line + "\n");
            }
        })

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;;