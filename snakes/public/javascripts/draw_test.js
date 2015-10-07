//Dessin d'un disque avec Paper.js
var path = new Path.Circle({
    center: view.center,
    radius: 100,
    strokeColor: 'black',
    fillColor: 'black'
});

function onMouseDown(event) {
}

function onMouseUp(event) {
    var vector = event.point - path.position;
    console.log(vector);
    //path.position += vector;
    move(vector);
}

function onFrame(event) {
    if (target != null) {
        var vector = target - head.position;
        for (var i = tail.length - 1; i >= 0; i--) {
            var previousSegmentPosition = (i == 0 ? head.position : tail[i - 1].position);
            if (Math.abs((tail[i].position - previousSegmentPosition).length) > deltaSegment) {
                tail[i].position = previousSegmentPosition;
            }
        }
        head.position += vector / 15;
        if (vector.length <= 3) {
            target = null;
        }
    }
}

function onResize(event) {
    console.log("recentering the path.");
    // Whenever the window is resized, recenter the path:
    path.position = view.center;
}
