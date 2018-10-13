<!DOCTYPE html>
<script src="https://code.jquery.com/jquery-3.1.1.min.js" id="jquery"></script>
<html>
    <head>
    <!-- lesson number here! -->
        <title id="lessonNumber">1</title>
<?php
$config = file_get_contents('config.txt');
$fileitems = explode("\n", $config);

function mapExp($e) {
    return explode(",", $e);
}

foreach($fileitems as $fileitem) {

    $attribute = explode("/", $fileitem);
    // $attribute[0] is filename
    // $attribute[1] is anchor array
    // !! assume that anchor column is always 0
    // thus each pair is start/end of a single range
    // $attribute[2] is read-only
    // $attribute[3] is invisible

    $length = count($attribute);
    if ($length != 4) {
        continue;
    }
    
    // should end up 2D array
    $anchorarray = array_map("mapExp", explode(";", $attribute[1]));

    echo '
    <meta data-filename="' . $attribute[0] . '" data-anchors=\'' . JSON_encode($anchorarray) . '\' data-readonly="' . $attribute[2] . '" data-invisible="' . $attribute[3] . '" </meta>
    ';
}
?>
    </head>
    <body>
        <canvas id="game" width="800" height="600">
            <p>Your browser doesn't support canvas.</p>
        </canvas>

<script type="text/javascript" id="ArrayList.js"></script>
<script type="text/javascript" id="Tuple.js"></script>
<script type="text/javascript" id="EventEmitter.js"></script>
<script type="text/javascript" id="GameClock.js"></script>
<script type="text/javascript" id="Gamepad.js"></script>
<script type="text/javascript" id="DisplayObject.js"></script>
<script type="text/javascript" id="DisplayObjectContainer.js"></script>
<script type="text/javascript" id="Sprite.js"></script>
<script type="text/javascript" id="particleEmitter.js"></script>
<script type="text/javascript" id="AnimatedSprite.js"></script>
<script type="text/javascript" id="Tween.js"></script>
<script type="text/javascript" id="Game.js"></script>


<script type="text/javascript" id="PumpkinHead.js"></script>
<script type="text/javascript" id="Lesson.js"></script>

<script type="text/javascript" id="loader" src="CanvasLoader.js"></script>


    </body>
</html>
