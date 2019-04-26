$(document).ready(function() {
    // lesson number from url
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

    // ajax function
    function saveFile(filename, scriptholder, result) {
        var fileinfo = {
            text: result,
        };
        var thing = scriptholder.attr("data-readonly");
        if (thing) {
            fileinfo.readonly = true;
        }
        storageSave(filename, fileinfo);
    };

    // request help.txt from server
    $.ajax({ 
        url: "help.txt",
        async: true,
        dataType: "text",
        success: function(result) {
            storageSave("help.txt", {
                text: result,
                readonly: true,
                filetype: "text"
            });
        }
    });

    // if not already in user storage,
    // request files from server
    $("script").each(function() {
        var scriptholder = $(this);
        var filename = $(this).attr('id');
        // console.log("" + filename);
        if ((filename == "loader") || (filename == "jquery")){
            // do nothing
        } else {
            $.ajax({
                url: filename,
                async: false, //TODO: promises?
                dataType: "text", // otherwise will auto-execute code
                success: function(result) {
                    // if file is in storage, don't load anything from server
                    if (storageHas(filename)) {
                    } else {
                        saveFile(filename, scriptholder, result);
                    }
                },
                error: function(xhr) {
                    // find file in engine directory
                    $.ajax({
                        url: "../engine/" + filename,
                        async: false, //TODO: promises?
                        dataType: "text", // otherwise will auto-execute code
                        success: function(result) {
                            if (storageHas(filename)) {
                                // nothing
                            } else {
                                saveFile(filename, scriptholder, result);
                            }                          
                        }
                    });
                }
            }).always(function() {
                // after request
                scriptholder.text(storageLoad(filename, lessonNumber).text);
            });
        }
    });

    // loading from config.txt into storage
    // this is after loading the initial texts
    // otherwise it interferes with avoiding overwriting existing files
    $("meta").each(function() {
        var filename = $(this).attr('data-filename');
        var anchor_array = JSON.parse($(this).attr('data-anchors'));
        var read = $(this).attr('data-readonly');
        var invis = $(this).attr('data-invisible');

        var object = storageLoad(filename);
        if (object == null) {
            // not yet in storage
            // requests are currently synchronous so should not occur?
            var newobject = {
                anchors: anchor_array,
                readonly: read,
                invisible: invis
            };
            storageSave(filename, newobject);
        } else {
            // modify existing object
            // ONLY if these parameters do not already exist
            // ie. should not overwrite anchors if they have moved
            if (!object.hasOwnProperty("anchors")) object.anchors = anchor_array;
            object.readonly = read;
            object.invisible = invis;
            // do i need this save?
            storageSave(filename, object);
        }
    });
});
