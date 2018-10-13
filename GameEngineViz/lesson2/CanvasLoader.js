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

    $("script").each(function() {
        var scriptholder = $(this);
        var filename = $(this).attr('id');
        console.log("" + filename);
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
                        // store found file
                        // TODO: different lesson numbers
                        // should store read-only attribute
                        var fileinfo = { text: result };
                        var thing = scriptholder.attr("data-readonly");
                        if (thing) {
                            fileinfo.readonly = true;
                        }
                        // sessionStorage.setItem(filename, JSON.stringify(fileinfo));
                        storageSave(filename, fileinfo);
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
                                // store found file
                                var fileinfo = { text: result };
                                if (scriptholder.attr("data-readonly")) {
                                    fileinfo.readonly = true;
                                }
                                // sessionStorage.setItem(filename, JSON.stringify(fileinfo));
                                storageSave(filename, fileinfo);
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


});
