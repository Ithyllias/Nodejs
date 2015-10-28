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
// <editor-fold desc="Constructor">
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
//</editor-fold>

//<editor-fold desc="Update">
console.log("*****test update*****".method);
console.log("  head".attribute);
var originalHeadX = s.head.x;
var originalHeadY = s.head.y;
var firstTailY = s.tail[0].y;
var lastTailY = s.tail[TEST_TAIL_SIZE - 1].y;
var originalTailX = s.tail[TEST_TAIL_SIZE - 2].x;
var originalTailY = s.tail[TEST_TAIL_SIZE - 2].y

s.direction = new Point(1,1);
s.update();

util.multipleAssert({expected : originalHeadX + 2,actual: s.head.x, message: "value of x"}, {expected :originalHeadY + 2,actual:s.head.y, message:"value of y"});

console.log("  tail".attribute);
util.assert(true,
    util.multipleAssertExpression({simpleExpression : originalHeadX + "===" + s.tail[0].x, message: "value of x for first segment has not changed", errMessage:"value of x for first segment has changed"},
        {simpleExpression : originalHeadY + " < " + s.tail[0].y + " && " + + s.tail[0].y + " < " + firstTailY, message: "value of y for first segment moved towards the desired position", errMessage:"value of y for first segment has not changed appropriately"},
        {simpleExpression : originalTailX + "===" + s.tail[TEST_TAIL_SIZE - 1].x, message: " value of x for last segment has not changed", errMessage:"value of x for last segment has changed and shouldn't have"},
        {simpleExpression : originalTailY + " < " + s.tail[TEST_TAIL_SIZE - 1].y + " && " + s.tail[TEST_TAIL_SIZE - 1].y + " < " + lastTailY, message: " value of y for last segment moved towards desired position", errMessage:"value of y for last segment has not changed appropriately"}),
    "first and last segment work therefore all segment works.", "One or more of the tail tests failed");
// </editor-fold>
// </editor-fold>

// <editor-fold desc="Snake storage tests">
console.log("-------Storage--------".obj);
var store = new Storage();

//<editor-fold desc="Add">
console.log("*****test add*****".method);
var storeSize = store.storage.length;
store.add(1,s);
util.assert(storeSize + 1, store.storage.length);
//</editor-fold>

//<editor-fold desc="Contains">
console.log("*****test contains*****".method);
//Contains a given snake by the id of the owner
util.assert(true,store.contains(1), "this store contains a snake with the owner id 1","this store doesn't contain a snake with the owner id 1");
//Contains returns false when a non-existing id is searched
util.assert(false,store.contains(11), "this store doesn't contain a snake with the owner id 11","this store contains a snake with the owner id 11");
//contains returns true when searching for the snake itself
util.assert(true, store.contains(s), "this store contains the snake 's'","this store does not contain the snake 's'");
//Contains returns false when looking for a non-existing snake
util.assert(false, store.contains(new Snake(p,9)),"this store does not contain the new snake","this store contains the new snake");
//</editor-fold>

//<editor-fold desc="Get">
console.log("*****test get*****".method);
var gottenSnake = store.get(1);
//Checking the gotten snake is really number 2
util.assert(store.storage[0].snake, gottenSnake,"The fetched snake is the same one as the stored snake", "the fetched snake is " + gottenSnake + " and should've been " + store.storage[0].snake);
var nullSnake = store.get(56);
//Checking that no snake could be fetched
util.assert(null, nullSnake, "No snake could be fetched for id 56", "Fetched result was " + nullSnake + "but should've been null");
//</editor-fold>

//<editor-fold desc="Remove">
console.log("*****test remove*****".method);
store.add(2,new Snake(new Point(1,2),TEST_TAIL_SIZE));
store.add(3,new Snake(new Point(2,3),TEST_TAIL_SIZE));

var fullStore = store.storage.length;
//checking an item has been removed
console.log("  array size adjusted".attribute);
store.remove(2);
util.assert(fullStore - 1, store.storage.length);
//Checking that the removed item was the desired one
console.log("  the desired snake removed".attribute);
util.assert(false, store.contains(2),"snake with id 2 is no longer in store","snake with id 2 was found in store");
//</editor-fold>

//<editor-fold desc="Update">
console.log("*****test update*****".method);
store.remove(1);
store.add(1,new Snake(p,TEST_TAIL_SIZE));
var s1 = store.get(1);
var s3 = store.get(3);

var originalHeadX1 = s1.head.x;
var originalHeadY1 = s1.head.y;
var originalTailX1 = s1.tail[TEST_TAIL_SIZE - 2].x;
var originalTailY1 = s1.tail[TEST_TAIL_SIZE - 2].y;
var firstTailY1 = s1.tail[0].y;
var lastTailY1 = s1.tail[TEST_TAIL_SIZE - 1].y;

var originalHeadX3 = s3.head.x;
var originalHeadY3 = s3.head.y;
var originalTailX3 = s3.tail[TEST_TAIL_SIZE - 2].x;
var originalTailY3 = s3.tail[TEST_TAIL_SIZE - 2].y;
var firstTailY3 = s3.tail[0].y;
var lastTailY3 = s3.tail[TEST_TAIL_SIZE - 1].y;

s1.direction = new Point(1,1);
s3.direction = new Point(-1,-1);
store.update();
console.log("  head snake 1".attribute);
util.multipleAssert({expected : originalHeadX1 + 2,actual: s1.head.x, message: "value of x"}, {expected :originalHeadY1 + 2,actual:s1.head.y, message:"value of y"});
console.log("  tail snake 1".attribute);
var upS1 = util.assert(true,
                        util.multipleAssertExpression({simpleExpression : originalHeadX1 + "===" + s1.tail[0].x, message: "value of x for first segment has not changed", errMessage:"value of x for first segment has changed"},
                            {simpleExpression : originalHeadY1 + " < " + s1.tail[0].y + " && " + + s1.tail[0].y + " < " + firstTailY1, message: "value of y for first segment moved towards the desired position", errMessage:"value of y for first segment has not changed appropriately"},
                            {simpleExpression : originalTailX1 + "===" + s1.tail[TEST_TAIL_SIZE - 1].x, message: " value of x for last segment has not changed", errMessage:"value of x for last segment has changed and shouldn't have"},
                            {simpleExpression : originalTailY1 + " < " + s1.tail[TEST_TAIL_SIZE - 1].y + " && " + s1.tail[TEST_TAIL_SIZE - 1].y + " < " + lastTailY1, message: " value of y for last segment moved towards desired position", errMessage:"value of y for last segment has not changed appropriately"}),
                        "first and last segment work therefore all segment works.", "One or more of the tail tests failed");
console.log("~~~~~~~~~~~".grey);
console.log("  head snake 3".attribute);
util.multipleAssert({expected : originalHeadX3 - 2,actual: s3.head.x, message: "value of x"}, {expected :originalHeadY3 - 2,actual:s3.head.y, message:"value of y"});
console.log("  tail snake 3".attribute);
var upS3 = util.assert(true,
                        util.multipleAssertExpression({simpleExpression : originalHeadX3 + "===" + s3.tail[0].x, message: "value of x for first segment has not changed", errMessage:"value of x for first segment has changed"},
                            {simpleExpression : originalHeadY3 + " < " + s3.tail[0].y + " && " + + s3.tail[0].y + " < " + firstTailY3, message: "value of y for first segment moved towards the desired position", errMessage:"value of y for first segment has not changed appropriately"},
                            {simpleExpression : originalTailX3 + "===" + s3.tail[TEST_TAIL_SIZE - 1].x, message: " value of x for last segment has not changed", errMessage:"value of x for last segment has changed and shouldn't have"},
                            {simpleExpression : originalTailY3 + " < " + s3.tail[TEST_TAIL_SIZE - 1].y + " && " + s3.tail[TEST_TAIL_SIZE - 1].y + " < " + lastTailY3, message: " value of y for last segment moved towards desired position", errMessage:"value of y for last segment has not changed appropriately"}),
                        "first and last segment work therefore all segment works.", "One or more of the tail tests failed");
util.multipleAssert({expected : true, actual : upS1, errMessage : "tests for update of S1 with direction (1,1) failed"},
                    {expected : true, actual : upS3, errMessage : "tests for update of S3 with direction (-1,-1) failed"});
//</editor-fold>

//<editor-fold desc="ChangeDirection">
console.log("*****test changeDirection*****".method);
//Pre validation
util.multipleAssert({expected:1, actual: store.get(1).direction.x}, {expected:1, actual: store.get(1).direction.y});
store.changeDirection(1, new Point(2,2));
//Validation that the direction was updated
util.multipleAssert({expected:2, actual: store.get(1).direction.x, message : "the direction was updated in x"}, {expected:2, actual: store.get(1).direction.y, message : "the direction was updated in y"});
//Validation that undefined will not modify nor throw and error
store.changeDirection(1);
util.multipleAssert({expected:2, actual: store.get(1).direction.x, message : "the direction wasn't updated in x and no errors were thrown"}, {expected:2, actual: store.get(1).direction.y, message : "the direction wasn't updated in y and no errors were thrown"});
//</editor-fold>

// </editor-fold>