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

var deltaSegment = Math.abs((tail[1].position - tail[0].position).length);

var target;

function onMouseDown(event) {
    target = event.point;
    //var vector = target - head.position;
    //head.rotate((vector.angle > 180 ? vector.angle : -(vector.angle)));

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
       tail[part.index].position = new Point(part.x, part.y);
       console.log("x : " + part.x + " y : " + part.y);
   });

});

//function onFrame(event){
//    if(target != null) {
//        var vector = target - head.position;
//        for(var i = tail.length - 1; i >= 0; i--){
//            var previousSegmentPosition = (i == 0 ? head.position : tail[i-1].position);
//            if(Math.abs((tail[i].position - previousSegmentPosition).length) > deltaSegment){
//                tail[i].position = previousSegmentPosition;
//            }
//        }
//        head.position += vector / 15;
//        if(vector.length <= 3){
//            target = null;
//        }
//    }
//}

function onResize(event) {
    console.log("recentering the path.");
    head.position = view.center;
}