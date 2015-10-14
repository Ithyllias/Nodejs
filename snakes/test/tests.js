// <editor-fold desc="Imports">
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
// </editor-fold>
// <editor-fold desc="Objects">
var Point = point.Point;
var Snake = snake.Snake;
var Storage = storage.SnakeStorage;
var Util = utilities.Utilities;
var util = new Util();
// </editor-fold>

// <editor-fold desc="Constants">
var TEST_TAIL_SIZE = 9;
var TEST_POINT_X = 3;
var TEST_POINT_Y = 4;
var DEFAULT_BODY_DIST = 25;
var THRUST = 2;
// </editor-fold>

// <editor-fold desc="Point tests">
console.log("-------Point--------".obj);
var p = new Point(TEST_POINT_X, TEST_POINT_Y);

console.log("test length".method);
util.assert(5, p.length());
// </editor-fold>

// <editor-fold desc="Snake tests">
console.log("-------Snake--------".obj);
var s = new Snake(p,TEST_TAIL_SIZE);
//Constructor for a single snake
console.log("*****test constructor*****".method);
console.log("  head".attribute);
util.multipleAssert({expected : TEST_POINT_X,actual: s.head.x, message: " value of x"},{expected : TEST_POINT_Y,actual: s.head.y, message: " value of y"});
console.log("  tail".attribute);
util.assert(true,
            util.multipleAssert({expected : TEST_POINT_X,actual: s.tail[0].x, message: " value of x for first segment"},
                                {expected : TEST_POINT_Y + DEFAULT_BODY_DIST,actual: s.tail[0].y, message: " value of y for first segment"},
                                {expected : TEST_POINT_X,actual: s.tail[8].x, message: " value of x for last segment"},
                                {expected : TEST_POINT_Y + (DEFAULT_BODY_DIST * TEST_TAIL_SIZE),actual: s.tail[8].y, message: " value of y for last segment"}),
            "first and last segment work therefore all segment works.", "One or more of the head tests failed");

//Update method for a single snake
console.log("*****test update*****".method);
console.log("  head".attribute);
var originalHeadX = s.head.x;
var originalHeadY = s.head.y;
var originalTailX = s.tail[TEST_TAIL_SIZE - 2].x;
var originalTailY = s.tail[TEST_TAIL_SIZE - 2].y
s.direction = new Point(1,1);
s.update();
util.multipleAssert({expected : originalHeadX + 2,actual: s.head.x, message: "value of x"}, {expected :originalHeadY + 2,actual:s.head.y, message:"value of y"});
console.log("  tail".attribute);
util.assert(true,
    util.multipleAssert({expected : TEST_POINT_X + (originalHeadX * THRUST),actual: s.tail[0].x, message: "value of x for first segment", errMessage:"value of x for first segment"},
        {expected : TEST_POINT_Y + DEFAULT_BODY_DIST + (originalHeadY * THRUST),actual: s.tail[0].y, message: "value of y for first segment", errMessage:"value of y for first segment"},
        {expected : TEST_POINT_X + (originalTailX * THRUST),actual: s.tail[TEST_TAIL_SIZE - 1].x, message: " value of x for last segment", errMessage:"value of x for last segment"},
        {expected : TEST_POINT_Y + (DEFAULT_BODY_DIST * TEST_TAIL_SIZE) + (originalTailY * THRUST),actual: s.tail[TEST_TAIL_SIZE - 1].y, message: " value of y for last segment", errMessage:"value of y for last segment"}),
    "first and last segment work therefore all segment works.", "One or more of the tail tests failed");
// </editor-fold>

// <editor-fold desc="Snake storage tests">
console.log("-------Storage--------".obj);
var store = new Storage();

//Add a snake method
console.log("*****test add*****".method);
var storeSize = store.storage.length;
store.add(1,s);
util.assert(storeSize + 1, store.storage.length);

//Contains a given snake by the id of the owner
util.assert(true,store.contains(1), "this store contains a snake with the owner id 1","this store doesn't contain a snake with the owner id 1");
//Contains returns false when a non-existing id is searched
util.assert(false,store.contains(11), "this store doesn't contain a snake with the owner id 1","this store contains a snake with the owner id 11");
//contains returns true when searching for the snake itself
util.assert(true, store.contains(s), "this store contains the snake 's'","this store does not contain the snake 's'");
//Contains returns false when looking for a non-existing snake
util.assert(false, store.contains(new Snake(p,9)),"this store does not contain the new snake","this store contains the new snake");

//Remove a snake method
console.log("*****test remove*****".method);
store.add(2,new Snake(1,2));
store.add(3,new Snake(2,3));

var fullStore = store.storage.length;
//checking an item has been removed
console.log("  array size adjusted".attribute);
store.remove(2);
util.assert(fullStore - 1, store.storage.length);
//Checking that the removed item was the desired one
console.log("  the desired snake removed".attribute);
util.assert(false, store.contains(2),"snake with id 2 is no longer in store","snake with id 2 was found in store");
// </editor-fold>