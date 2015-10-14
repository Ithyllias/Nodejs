/**
 * Created by Matt on 2015-10-14.
 */
function SnakeStorage(){
    this.storage = [];
    this.add = function(id, snake){
        this.storage.push({id : id, snake :snake});
    };
    this.remove = function(id){
      this.storage = this.storage.filter(function(snake){
          return snake.id !== id;
      });
    };
    this.contains = function(id){
        for (var i in this.storage)
        {
            if (this.storage[i].id == id || this.storage[i].snake == id) return true;
        }
        return false;
    };
}

module.exports.SnakeStorage = SnakeStorage;