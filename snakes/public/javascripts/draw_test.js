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

<<<<<<< HEAD
<<<<<<< HEAD
function onFrame(event){
    if(target != null) {
        var vector = target - head.position;
        for(var i = tail.length - 1; i >= 0; i--){
            var previousSegmentPosition = (i == 0 ? head.position : tail[i-1].position);
            if(Math.abs((tail[i].position - previousSegmentPosition).length) > deltaSegment){
                    tail[i].position = previousSegmentPosition;
            }
        }
        head.position += vector / 15;
        if(vector.length <= 3){
              target = null;
        }
=======
=======
>>>>>>> parent of f204681... creation dun serpent qui se deplace graduellement plutot quinstantanement comme avant. Problemes pour faire suivre sa queue de facon normale
function move(distance){
    if(distance.length > 1){
        console.log("current distance : " + distance.length);
        path.position += distance / 15;
        move(distance - (distance / 15));
    } else {
        path.position += distance;
<<<<<<< HEAD
>>>>>>> parent of f204681... creation dun serpent qui se deplace graduellement plutot quinstantanement comme avant. Problemes pour faire suivre sa queue de facon normale
=======
>>>>>>> parent of f204681... creation dun serpent qui se deplace graduellement plutot quinstantanement comme avant. Problemes pour faire suivre sa queue de facon normale
    }
}

function onResize(event) {
    console.log("recentering the path.");
    // Whenever the window is resized, recenter the path:
    path.position = view.center;
}
