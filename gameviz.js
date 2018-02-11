var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.setFontSize(15);
editor.session.setMode("ace/mode/javascript");
// editor.setKeyboardHandler("ace/keyboard/vim");

document.getElementById("execute").onclick = function () {
    eval(editor.getValue());
};

editor.commands.addCommand({
    name: 'execute',
    bindKey: {win: 'Ctrl-Shift-E',  mac: 'Command-Shift-E'},
    exec: function(editor) {
        eval(editor.getValue());
    },
    readOnly: true // false if this command should not apply in readOnly mode
}); 

