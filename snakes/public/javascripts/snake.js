var socket = io();

function onMouseDown(event) {
    socket.emit('snake',{'id':socket.id, 'direction':{x:event.point.x, y:event.point.y}});
}

socket.on('snakes',function(snakes){
    snakes.forEach(function(snake){
        var head = new Path.RegularPolygon(new Point(80, 70), 3, 50);
        head.center = new Point(snake.head.x, snake.head.y);
        head.strokeColor = 'black';
        head.fillColor = snake.color;
        head.smooth();
        for(var i=0; i < snake.tail.length; i++){
            new Path.Circle({
                center: new Point(snake.tail[i].x,snake.tail[i].y) ,
                radius: 25,
                strokeColor: 'black',
                fillColor: snake.color
            });
        }
    });
});