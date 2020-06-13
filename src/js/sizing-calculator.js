const $ = require('jquery');
const constants = require('./constants.js');
if (!$) {
    throw new Error(`jQuery not initialized or found!`);
}

$(document).ready(() => {
    var isFitted = false;
    var height = 0;
    var chest = 0;
    var waist = 0;
    var seat = 0;
    var wearingLayers = false;
    var lowCrotch = false;
    var muscularThighs = false;

    /** Events */


    /** Logic */
    function calculate() {
        // Determining your body type, I, V, or A
        var chestDifference = chest - waist;
        var seatDifference = seat - waist;
        const pattern = constants.findPattern(isFitted, chestDifference, seatDifference);
        if (!pattern) {
            hidePattern();
            console.log(`Fitted: ${isFitted}; ChestDiff: ${chestDifference}; seatDiff: ${seatDifference}`);
            return displayError(`Could not find a pattern for the requested measurements`);
        }
        displayPattern(pattern);
    }



    /** Actions */
    function displayError(errorMsg) {
        console.error(errorMsg);
    }

    function hidePattern() {

    }

    function displayPattern(pattern) {
        
    }


})