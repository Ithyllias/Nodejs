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

function move(distance){
    if(distance.length > 1){
        console.log("current distance : " + distance.length);
        path.position += distance / 15;
        move(distance - (distance / 15));
    } else {
        path.position += distance;
    }
}

function onResize(event) {
    console.log("recentering the path.");
    // Whenever the window is resized, recenter the path:
    path.position = view.center;
}
