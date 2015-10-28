/**
 * Created by Matt on 2015-10-14.
 */
var Util = require("../test/utilities").Utilities;
var util = new Util();

function SnakeStorage(){
    this.storage = [];
    /*
     * This function will add a new snake to the storage.
     * WARNING: Duplicates will also be added to the store.
     */
    this.add = function(ownerId, snake){
        this.storage.push({ownerId : ownerId, snake :snake});
    };
    /*
     * This function changes the current direction a snake is heading by his ownerId
     * Will update any and all snakes with the received ID if there are more than one.
     */
    this.changeDirection = function(ownerId, direction){
        for (var i in this.storage)
        {
            if (this.storage[i].ownerId == ownerId && typeof(direction) !== 'undefined') {
                this.storage[i].snake.direction = direction;
            }
        }
    };

    /*
     * This function will return true if the desired snake is found. Will work with either the OwnerId or the actual Snake object.
     * WARNING: It has to be the exact same Snake in memory, otherwise it will return false regardless of the values of the attributes for the snake
     */
    this.contains = function(id){
        for (var i in this.storage)
        {
            if (this.storage[i].ownerId == id || this.storage[i].snake == id) return true;
        }
        return false;
    };

    /*
     *  This function returns the snake that corresponds to the received ownerId or null if it doesn't exist
     *  WARNING: This will NOT remove the snake from the store!
     *  ownerId : id of the owner of the desired snake
     */
    this.get = function (ownerId) {
        for (var i in this.storage)
        {
            if (this.storage[i].ownerId == ownerId) return this.storage[i].snake;
        }
        return null;
    };

    /*
     * This function will remove from the storage any and all snakes who have the ownerId received in parameter.
     */
    this.remove = function(ownerId){
      this.storage = this.storage.filter(function(snake){
          return snake.ownerId !== ownerId;
      });
    };

    /*
     * This function will update all the snakes in the storage.
     * Argument format : {ownerId : id, direction : {x:x, y:y}}
     */
    this.update = function(){
        this.storage.forEach(function(storedItem){
            storedItem.snake.update();
        });
    };

    /*
     * This function generates a random color and validates that it is available for a new snake in this storage
     * before returning it.
     */
    this.getNewSnakeColor = function(){
        var newColor = null;
        var colorAvailable = false;
        while(!colorAvailable){
            newColor = util.getRandomColor();
            if(this.storage.length > 0){
                for(var i=0; i < this.storage.length; i++){
                    if(this.storage[i].snake.color != newColor){
                        colorAvailable = true;
                    } else {
                        colorAvailable = false;
                    }
                }
            } else {
                colorAvailable = true;
            }
        }
        return newColor;
    };
}

module.exports.SnakeStorage = SnakeStorage;