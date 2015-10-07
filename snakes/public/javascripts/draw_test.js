var socket = io();

var head = new Path.RegularPolygon(new Point(80, 70), 3, 50);
head.fillColor = 'black';
head.strokeColor = 'black';
head.center = view.center;
head.smooth();

var tail = [];
for (var i = 0; i < 10; i++){
    tail[i] = new Path.Circle({
        center: (tail.length <= 0 ? new Point(head.center._x, head.center._y + 25) : new Point(tail[i -1].position.x, tail[i -1].position.y + 25)),
        radius: 25,
        strokeColor: 'black',
        fillColor: 'black'
    });
}

var target;

function onMouseDown(event) {
    target = event.point;

    var tailCenters = [];
    for(var i=0; i < tail.length; i++){
        tailCenters[i] = {'x':tail[i].position._x, 'y':tail[i].position._y}
    }

    socket.emit('snake',{'target':{x:target.x, y:target.y}, 'head':{x:head.position._x, y:head.position._y}, 'tail':tailCenters});
}

socket.on('instruction',function(instruction){
   var temp = instruction.newSnake;
   console.log("received instruction for head -> x : " + temp.head.x + " y : " + temp.head.y);
   head.position = new Point(temp.head.x, temp.head.y);
   console.log("received instruction for tail : ");
   temp.tail.forEach(function(part){
       console.log("before -> " + part.index + " x : " + tail[part.index].position._x + " y : " + tail[part.index].position._y);
       tail[part.index].position = new Point(part.x, part.y);
       console.log(part.index + " x : " + part.x + " y : " + part.y);
   });
});

function onResize(event) {
    console.log("recentering the path.");
    head.position = view.center;
}