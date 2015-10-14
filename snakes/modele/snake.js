/**
 * Created by Matt on 2015-10-14.
 */
var point = require("./point");
var Point = point.Point;

function Snake(headCenter, tailSize){
    this.head = headCenter;
    this.tail = [];
    for(var i=0; i < tailSize; i++){
        var previousSegmentPosition = (i == 0 ? this.head : this.tail[i-1]);
        this.tail[i] = new Point(previousSegmentPosition.x, previousSegmentPosition.y + 25);
    }

    this.direction = new Point(0,0);
    this.update = function(){
        for(var i=this.tail.length -1;i >= 0; i--){
            var previousSegmentPosition = (i == 0 ? this.head : this.tail[i-1]);
            this.tail[i].x += previousSegmentPosition.x * 2;
            this.tail[i].y += previousSegmentPosition.y * 2;
        }
        this.head.x += this.direction.x * 2;
        this.head.y += this.direction.y * 2;
    };
}

module.exports.Snake = Snake;