/**
 * Created by Matt on 2015-10-14.
 */
var colors = require("colors");

colors.setTheme({
    info: 'grey',
    success: 'green',
    error: 'red'
});

function Utilities(){
    /*
     * This function returns a randomly generated color
     */
    this.getRandomColor = function() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /*
     * Validates that an expected value is strictly equal to the actual value.
     */
    this.assert = function(expected, actual, message, errMessage) {
        if (expected === actual) {
            console.log("Expected : " + expected);
            console.log("Actual : " + actual);
            console.log(("Success" + (typeof(message) !== 'undefined' ? " : " + message : "")).success);
            return true;
        } else {
            console.error("Expected : " + expected);
            console.error("Actual : " + actual);
            console.error(("Failure"+ (typeof(errMessage) !== 'undefined' ? " : " + errMessage : "")).error);
            return false;
        }
    };

    /*
     * Validates the truth of an expression, successful if expression returns true.
     */
    this.assertExpression = function(expression, message, errMessage){
      if(eval(expression)){
          console.log("Expected : " + expression);
          console.log(("Success" + (typeof(message) !== 'undefined' ? " : " + message : "")).success);
          return true;
      } else {
          console.error("Expected : " + expression);
          console.error(("Failure"+ (typeof(errMessage) !== 'undefined' ? " : " + errMessage : "")).error);
          return false;
      }
    };

    /*
     * Validates multiple expressions, returns true if all expressions returned true.
     */
    this.multipleAssertExpression = function(){
        for(var i=0; i < arguments.length; i++){
            var success = false;
            var simpleExpression = arguments[i].simpleExpression;
            var errMessage = arguments[i].errMessage;
            var message = arguments[i].message;

            console.log(("~~~assert "+ (i + 1) +"~~~").info);

            if (eval(simpleExpression)) {
                console.log("Validating : " + simpleExpression);
                console.log(("Success" + (typeof(message) !== 'undefined' ? " : " + message : "")).success);
                success = true;
            } else {
                console.error("Validating : " + simpleExpression);
                console.error(("Failure" + (typeof(errMessage) !== 'undefined' ? " : " + errMessage : "")).error);
                success = false;
            }
        }

        return success;
    }

    /*
     * Validates that an expected value is strictly equal to the actual value for multiple times.
     * Receives a JSON Object like {expected: expected, actual: actual, message: successMessage, errMessage: errorMessage}
     */
    this.multipleAssert = function(){
        for(var i=0; i < arguments.length; i++){
            var success = false;
            var expected = arguments[i].expected;
            var actual = arguments[i].actual;
            var errMessage = arguments[i].errMessage;
            var message = arguments[i].message;

            console.log(("~~~assert "+ (i + 1) +"~~~").info);

            if (expected === actual) {
                console.log("Expected : " + expected);
                console.log("Actual : " + actual);
                console.log(("Success" + (typeof(message) !== 'undefined' ? " : " + message : "")).success);
                success = true;
            } else {
                console.error("Expected : " + expected);
                console.error("Actual : " + actual);
                console.error(("Failure" + (typeof(errMessage) !== 'undefined' ? " : " + errMessage : "")).error);
                success = false;
            }
        }

        return success;
    }
}

module.exports.Utilities = Utilities;