var socket = io();
var clientId = null;

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
    socket.emit('snake',{'id':clientId, 'direction':{x:target.x, y:target.y}});
}

socket.on('snakes',function(snakes){

});