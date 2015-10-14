var point = require("../modele/point");
var snake = require("../modele/snake");
var storage = require("../modele/snakeStorage");
var utilities = require("./utilities");
var colors = require("colors");
colors.setTheme({
    obj: 'blue',
    method: 'yellow',
    attribute: 'cyan'
});

var Point = point.Point;
var Snake = snake.Snake;
var Storage = storage.SnakeStorage;
var Util = utilities.Utilities;
var util = new Util();

//Tests pour les points
console.log("-------Point--------".obj);
var p = new Point(3, 4);

console.log("test length".method);
util.assert(5, p.length());

//Tests pour les serpents
console.log("-------Snake--------".obj);
var s = new Snake(p,9);
console.log("*****test constructor*****".method);
console.log("  head".attribute);
util.multipleAssert({expected : 3,actual: s.head.x, message: " value of x"},{expected : 4,actual: s.head.y, message: " value of y"});
console.log("  tail".attribute);
util.assert(true,
            util.multipleAssert({expected : 3,actual: s.tail[0].x, message: " value of x for first segment"},
                                {expected : 4 + 25,actual: s.tail[0].y, message: " value of y for first segment"},
                                {expected : 3,actual: s.tail[8].x, message: " value of x for last segment"},
                                {expected : 4 + 225,actual: s.tail[8].y, message: " value of y for last segment"}),
            "first and last segment work therefore all segment works.");

console.log("*****test update*****".method);
var originalHeadX = s.head.x;
var originalHeadY = s.head.y;
s.direction = new Point(1,1);
s.update();
util.multipleAssert({expected : originalHeadX + 2,actual: s.head.x, message: "x"}, {expected :originalHeadY + 2,actual:s.head.y, message:"y"});

//Tests pour les stockages de serpents
console.log("-------Storage--------".obj);
var store = new Storage();

console.log("*****test add*****".method);
var storeSize = store.storage.length;
store.add(1,s);
util.assert(storeSize + 1, store.storage.length);

console.log("*****test remove*****".method);
store.add(2,new Snake(1,2));
store.add(3,new Snake(2,3));

var fullStore = store.storage.length;
console.log("  storage size adjusted".attribute);
store.remove(2);
util.assert(fullStore - 1, store.storage.length);
console.log("  snake 2 removed".attribute);
util.assert(false, store.contains(2),"snake with id 2 is no longer in store","snake with id 2 was found in store");