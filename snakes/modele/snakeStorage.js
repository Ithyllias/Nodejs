/**
 * Created by Matt on 2015-10-14.
 */
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
     * This function will remove from the storage any and all snakes who have the ownerId received in parameter.
     */
    this.remove = function(ownerId){
      this.storage = this.storage.filter(function(snake){
          return snake.ownerId !== ownerId;
      });
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
}

module.exports.SnakeStorage = SnakeStorage;