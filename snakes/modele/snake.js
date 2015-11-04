/**
 * Created by Matt on 2015-10-14.
 */
var point = require("./point");
var Point = point.Point;

function Snake(headCenter, tailSize, color) {
    var i, previousSegmentPosition;
    this.head = new Point(headCenter.x, headCenter.y);
    this.tail = [];
    this.color = (typeof(color) !== 'undefined' ? color : '#000000');
    for (i = 0; i < tailSize; i++) {
        previousSegmentPosition = (i === 0 ? this.head : this.tail[i - 1]);
        this.tail[i] = new Point(previousSegmentPosition.x, previousSegmentPosition.y + 25);
    }

    this.direction = new Point(0, 0);
    this.headUnitVecX = 0;
    this.headUnitVecY = 0;
    this.directionModified = false;
    this.update = function () {
        var unitVectorX, unitVectorY, vectorX, vectorY, magnitude;
        if (this.direction.x != 0 && this.direction.y != 0) {
            for (i = this.tail.length - 1; i >= 0; i--) {
                previousSegmentPosition = (i === 0 ? this.head : this.tail[i - 1]);
                vectorX = previousSegmentPosition.x - this.tail[i].x;
                vectorY = previousSegmentPosition.y - this.tail[i].y;
                magnitude = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
                unitVectorX = (vectorX / magnitude);
                unitVectorY = (vectorY / magnitude);
                this.tail[i].x += unitVectorX * 2;
                this.tail[i].y += unitVectorY * 2;
            }

            if (this.directionModified) {
                vectorX = this.direction.x  - this.head.x;
                vectorY = this.direction.y - this.head.y;
                magnitude = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
                this.headUnitVecX = (vectorX / magnitude);
                this.headUnitVecY = (vectorY / magnitude);
                this.directionModified = false;
            }

            this.head.x += this.headUnitVecX * 2;
            this.head.y += this.headUnitVecY * 2;
        }
    };
}

module.exports.Snake = Snake;