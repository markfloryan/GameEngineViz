var editor = ace.edit("editor");
var Range = ace.require("../ace/range").Range;
var Anchor = ace.require("../ace/anchor").Anchor;
var activeAnchors = [];
var currentFile = "";
editor.setTheme("../ace/theme/twilight");
editor.setFontSize(15);
editor.session.setMode("../ace/mode/javascript");
editor.session.setUseWrapMode(true);
// editor.setKeyboardHandler("../ace/keyboard/vim");

/* DUPLICATE CODE */
    var loc = window.location.pathname;
    var index = loc.indexOf("lesson") + 6;
    var lessonNumber = loc.substring(index, loc.indexOf("/", index));
    console.log("lesson number: " + lessonNumber);

    // storage methods
    function storageSave(fileName, fileInfo) {
        sessionStorage.setItem(fileName + lessonNumber, JSON.stringify(fileInfo));
    };

    function storageLoad(fileName) {
        return JSON.parse(sessionStorage.getItem(fileName + lessonNumber));
    };
    
    function storageHas(fileName) {
        return sessionStorage.hasOwnProperty(fileName + lessonNumber);
    };
/* END DUPLICATE CODE */


document.getElementById("execute").onclick = function () {
    // refresh game iframe
    // this is so strange
    // TODO: disabling execute button?
    // TODO: save anchors
    // save opened file to storage (other files are saved upon context switch)
    // currfile scope?
    if (currentFile) {
        var oldinfo = storageLoad(currentFile);
        oldinfo.text = editor.getValue();
        oldinfo.undo = editor.getSession().getUndoManager();
        storageSave(currentFile, oldinfo);
    }
    document.getElementById('gameframe').src += '';
};

document.getElementById("reset").onclick = function() {
    // prompt the system to reload data in storage
    // how to delete appropriate files?
    // TODO: potentially move every lesson into their own storage file? eg. Lesson1 has each file as property etc.

    // method:
    // get DOM of iframe
    // to get all filenames, read through every script tag except loader/jquery
    // get id, append lessonNumber
    // storage.removeItem

};

// save undomanager and text
// set other undomanager and text in the editor
// and maybe also read-only based on filename
// TODO: UNDOMANAGER AAAAAAA
// EDIT SESSION WITH STRINGIFY? HANDLING CIRCULAR STUFF
editor.switchContext = function(currfile, newfile) {
    // if currfile != ""
    if (currfile) {
        var oldinfo = storageLoad(currfile);
        oldinfo.text = this.getValue();
        oldinfo.undo = this.getSession().getUndoManager();
        var newAnchors = [];
        activeAnchors.forEach(function(e) {
            // return array of anchor pairs to array of integer pairs
            var newPair = [e[0].getPosition().row, e[1].getPosition().row];
            newAnchors.push(newPair);
        });
        oldinfo.anchors = newAnchors;
        storageSave(currfile, oldinfo);
    }
    
    var newinfo = storageLoad(newfile);
    this.setValue(newinfo.text, 1);
    if (newinfo.hasOwnProperty("undo")) {
        this.getSession().setUndoManager(newinfo.undo);
    } else {
        this.getSession().setUndoManager(new ace.UndoManager());
    }
    // this is gross
    if (newinfo.readonly === "false") {
        this.setReadOnly(false);
    } else {
        this.setReadOnly(true);
    }

    // refactor the text file stuff please
    if (newinfo.filetype == "text") {
        this.session.setMode("../ace/mode/text");
    } else {
        this.session.setMode("../ace/mode/javascript");
    }

    if (newinfo.hasOwnProperty("anchors")) {
        // clear array
        activeAnchors.length = 0;

        newinfo.anchors.forEach(function(e) {
            // anchors are read in pairs
            // column is thus assumed to always be 0
            // push new anchors
            var start = Number(e[0]);
            var start_anchor = editor.session.getDocument().createAnchor(start, 0);
            var end = Number(e[1]);
            var end_anchor = editor.session.getDocument().createAnchor(end, 0);
            var pair = [start_anchor, end_anchor];

            activeAnchors.push(pair);
        });
    }
    
    // don't forget to set currentFile rip
};

$(document).ready(function() {

    // is this where we might mark read-only?
    // store sessionStorage item as object with both text and read-only flag
    // as well as undomanager?
    $(".nav-link").each(function() {
        //TODO: fix all of this. init unnecessary except for text files
        var filename = $(this).text();
        if (filename == "help.txt") {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // GOTTA BE STRINGS WHEE
                    var fileinfo = { 
                        text: this.responseText,
                        readonly: true,
                        filetype: "text"
                    };
                    storageSave(filename, fileinfo);
                }
            };
            xhttp.open("GET", filename, true);
            xhttp.send();
        }
    });
    
    /*
     * setting initial to help.txt...
     * concerns:
     *      different localStorage variables -help.txt + lesson number etc.
     *      loading in the localStorage variable - ajax
     *
    editor.session.setMode("../ace/mode/text");
    editor.setReadOnly(true);
    editor.setValue(sessionStorage.getItem("help.txt").text, 1);
    $("#help").addClass("active");
    */



    // SHOULD STORE UNDOMANAGER FOR CONVENIENCE
    $(".nav-link").on("click", function() {
        // *** marking files as read-only?
        // **** periodic saving
        // setInterval(--function--, 60000);

        editor.switchContext(currentFile, $(this).text());
        currentFile = $(this).text();

        // set active/inactive pills
        $(".nav-link.active").removeClass("active");
        $(this).addClass("active");
    });

    // reset button to overwrite sessionStorage with originals

});

editor.commands.on("exec", function(e) { 
    var select = editor.selection.getRange();
    var rowCol = editor.selection.getCursor();
    // also must check if selection intersects with range
    // for each range:
    //      prevent read-only disabled commands
    //      allow insertstring at the END of each range and only with \n
    activeAnchors.forEach(function(pair) {
        console.log(pair[0].getPosition().row + ", " + pair[1].getPosition().row);
    });
    var ranges = new Array();
    ranges.push(new Range(0, 0, 5, 0));
    ranges.push(new Range(editor.session.getLength() - 1, 0, editor.session.getLength(), 0));
    ranges.forEach(function(range) {
        if (select.intersects(range)) {
            if (!e.command.readOnly) {
                // TODO: allow undo
                if (e.command.name === "insertstring" && e.args === "\n" && 
                    (select.isStart(select.end.row, select.end.column)) &&
                    range.isEnd(rowCol.row, rowCol.column)) {
                } else {
                    // maybe just have to disable delete at edge of range
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    });
});
