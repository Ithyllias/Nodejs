var socket = io();
//emitter.setMaxListeners(500);
function onMouseDown(event) {
    socket.emit('snake', {'id': socket.id, 'direction': {x: event.point.x, y: event.point.y}});
}

socket.on('snakes', function (store) {
    console.log(store.cages);
    store.cages.forEach(function (cage) {
        var head = new Path.Circle({
            center: new Point(cage.snake.head.x, cage.snake.head.y),
            radius: 40,
            strokeColor: 'black',
            fillColor: cage.snake.color
        }), i;
        head.smooth();
        for (i = 0; i < cage.snake.tail.length; i++) {
            new Path.Circle({
                center: new Point(cage.snake.tail[i].x, cage.snake.tail[i].y),
                radius: 25,
                strokeColor: 'black',
                fillColor: cage.snake.color
            });
        }
    });
});