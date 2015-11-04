var socket = io();
var snakes = [];

function onMouseDown(event) {
    socket.emit('snake', {'id': socket.id, 'direction': {x: event.point.x, y: event.point.y}});
}

socket.on('snakes', function (store) {
    var j, i;
    for (j = 0; j < store.cages.length; j++) {
        snakes[j] = [];
        for (i = 0; i < store.cages[j].snake.tail.length; i++) {
            snakes[j][i] = {x: store.cages[j].snake.tail[i].x,
                            y: store.cages[j].snake.tail[i].y,
                            color: store.cages[j].snake.color};
        }
        snakes[j][i] = {x: store.cages[j].snake.head.x,
                        y: store.cages[j].snake.head.y,
                        color: store.cages[j].snake.color};
    }
});

function onFrame() {
    project.clear();
    snakes.forEach(function (snake) {
        var i;
        for (i = 0; i < snake.length - 1; i++) {
            new Path.Circle({
                center: new Point(snake[i].x, snake[i].y),
                radius: 25,
                strokeColor: 'black',
                fillColor: snake[i].color
            });
        }
        new Path.Circle({
            center: new Point(snake[i].x, snake[i].y),
            radius: 40,
            strokeColor: 'black',
            fillColor: snake[i].color
        });
    });
    snakes = [];
}