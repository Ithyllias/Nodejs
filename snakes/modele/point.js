/**
 * Created by Matt on 2015-10-14.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
    this.length = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
}

module.exports.Point = Point;
