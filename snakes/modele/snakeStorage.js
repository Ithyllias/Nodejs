/**
 * Created by Matt on 2015-10-14.
 */
var point = require("./point");
var Point = point.Point;
var Util = require("../test/utilities").Utilities;
var util = new Util();

function SnakeStorage() {
    this.storage = [];
    /*
     * This function will add a new snake to the storage.
     * WARNING: Duplicates will also be added to the store.
     */
    this.add = function (ownerId, snake) {
        this.storage.push({ownerId: ownerId, snake: snake});
    };

    /*
     * This function changes the current direction a snake is heading by his ownerId
     * Will update any and all snakes with the received ID if there are more than one.
     */
    this.changeDirection = function (ownerId, direction) {
        //TODO check how to implement unit vector for the head direction as well
        //var magnitude = Math.sqrt(Math.pow(direction.x,2) + Math.pow(direction.y, 2));
        //var unitVectorX = (direction.x/magnitude);
        //var unitVectorY = (direction.y/magnitude);
        this.storage.forEach(function (cage) {
            if (cage.ownerId == ownerId && direction !== 'undefined') { cage.snake.direction = direction; }
        });
    };

    /*
     * This function checks if any snakes have entered in collision, and removes the snake who's head collided
     */
    this.checkCollision = function (snakeToCheckId) {
        var collided = false, snakeToCheck = this.get(snakeToCheckId), snakesHeadsDistance, snakesDistance, i, j;
        for (i = 0; i < this.storage.length; i++) {
            if (snakeToCheckId != this.storage[i].ownerId) {
                snakesHeadsDistance = Math.sqrt(Math.pow(snakeToCheck.head.x - this.storage[i].snake.head.x, 2) + Math.pow((snakeToCheck.head.y - this.storage[i].snake.head.y), 2));
                if (snakesHeadsDistance < 50) {
                    collided = true;
                    this.remove(snakeToCheckId);
                    break;
                }
                for (j = 0; j < this.storage[i].snake.tail.length; j++) {
                    snakesDistance = Math.sqrt(Math.pow(snakeToCheck.head.x - this.storage[i].snake.tail[j].x, 2) + Math.pow((snakeToCheck.head.y - this.storage[i].snake.tail[j].y), 2));
                    if (snakesDistance < 50) {
                        collided = true;
                        this.remove(snakeToCheckId);
                        break;
                    }
                }
            }
        }

        return {collided: collided, removedId: snakeToCheckId};
    };

    /*
     * This function will return true if the desired snake is found. Will work with either the OwnerId or the actual Snake object.
     * WARNING: It has to be the exact same Snake in memory, otherwise it will return false regardless of the values of the attributes for the snake
     */
    this.contains = function (id) {
        this.storage.forEach(function (cage) {
            if (cage.ownerId == id || cage.snake == id) { return true; }
        });
        return false;
    };

    /*
     *  This function returns the snake that corresponds to the received ownerId or null if it doesn't exist
     *  WARNING: This will NOT remove the snake from the store!
     *  ownerId : id of the owner of the desired snake
     */
    this.get = function (ownerId) {
        this.storage.forEach(function (cage) {
            if (cage.ownerId == ownerId) { return cage.snake; }
        });
        return null;
    };

    /*
     * This function generates a random color and validates that it is available for a new snake in this storage
     * before returning it.
     */
    this.getNewSnakeColor = function () {
        var newColor = null, colorAvailable = false, i;
        while (!colorAvailable) {
            newColor = util.getRandomColor();
            if (this.storage.length > 0) {
                for (i = 0; i < this.storage.length; i++) {
                    colorAvailable = this.storage[i].snake.color != newColor;
                }
            } else {
                colorAvailable = true;
            }
        }
        return newColor;
    };

    /*
     * This function will remove from the storage any and all snakes who have the ownerId received in parameter.
     */
    this.remove = function (ownerId) {
        this.storage = this.storage.filter(function (snake) {
            return snake.ownerId !== ownerId;
        });
    };

    /*
     * This function will update all the snakes in the storage.
     * Argument format : {ownerId : id, direction : {x:x, y:y}}
     */
    this.update = function () {
        this.storage.forEach(function (storedItem) {
            storedItem.snake.update();
        });
    };
}

module.exports.SnakeStorage = SnakeStorage;