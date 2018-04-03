<!-- bootstrap stuff -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>GameEngineViz</title>
        <style type="text/css" media="screen">
            html, 
            body {
                height: 100%;
                margin: 0;
                overflow: hidden;
            }

                #editor {
                    margin: 0;
                    top: 0;
                    bottom: 0;
                    left: -15px;
                    right: 0;
                    height: 93%;
                    overflow: hidden;
                }
            .col {
            }
        </style>
    </head>

    <body>
        <div class="container-fluid h-100">
            <div class="row h-100">
                <div class="col">
<iframe id="gameframe" src="canvas.html" width="800" height="600" scrolling="no"></iframe>
                </div>

                <div class="col" style="background-color: #232323;">
                    <pre id="editor"></pre>

                    <script src="../src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
                    <div class="container-fluid mt-2">
                        <div class="row float-left ml-2">
                            <ul class="nav nav-pills">
                                <li class="nav-item">
                                    <a id="help" class="nav-link" href="#">help.txt</a>
                                </li>
                            </ul> 
                        </div>
                        <div class="row float-right mr-1"> 
                            <ul class="nav nav-pills mr-1">
                              <!-- should insert dynamic amount of nav-items via PHP?-->
                              <!-- this would need to include dynamic numbering (eg. btn1, btn2, etc.) for jquery setting active status -->
                              <!-- OR use jquery "on" - buttons differentiated by file name (eg. via jquery get())) -->
                              
<?php 
foreach (glob("*.js") as $filename) {
    if ($filename == "CanvasLoader.js") {
    } else {
    echo '
<li class="nav-item">
    <a class="nav-link" href="#">' . $filename . '</a>
</li>
';
}
}
?>
                            </ul>
                            <button id="execute" type="button" class="btn btn-success float-right">Execute</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
                    <script type="text/javascript" src="../gameviz.js"> </script>
                    <!-- game engine stuff -->
    </body>


</html>

