/**
 * Created by Matt on 2015-10-14.
 */
var point = require("./point");
var Point = point.Point;

function Snake(headCenter, tailSize, color){
    this.head = new Point(headCenter.x, headCenter.y);
    this.tail = [];
    this.color = (typeof(color) !== 'undefined' ? color : '#000000');
    for(var i=0; i < tailSize; i++){
        var previousSegmentPosition = (i == 0 ? this.head : this.tail[i-1]);
        this.tail[i] = new Point(previousSegmentPosition.x, previousSegmentPosition.y + 25);
    }

    this.direction = new Point(0,0);
    this.update = function(){
        var unitVectorX;
        var unitVectorY;
        var vectorX;
        var vectorY;
        var magnitude;
        for(var i=this.tail.length -1;i >= 0; i--){
            var previousSegmentPosition = (i == 0 ? this.head : this.tail[i-1]);

            vectorX = previousSegmentPosition.x - this.tail[i].x;
            vectorY = previousSegmentPosition.y - this.tail[i].y;

            magnitude = Math.sqrt(Math.pow(vectorX,2) + Math.pow(vectorY, 2));
            unitVectorX = (vectorX/magnitude);
            unitVectorY = (vectorY/magnitude);

            this.tail[i].x += unitVectorX * 2;
            this.tail[i].y += unitVectorY * 2;
        }
        this.head.x += this.direction.x * 2;
        this.head.y += this.direction.y * 2;
    };
}

module.exports.Snake = Snake;