const $ = require('jquery');
const constants = require('./constants.js');
if (!$) {
    throw new Error(`jQuery not initialized or found!`);
}

$(document).ready(() => {
    console.log('Loaded');
    var isFitted = false;
    var height = 0;
    var chest = 0;
    var waist = 0;
    var seat = 0;
    var wearingLayers = false;
    var lowCrotch = false;
    var muscularThighs = false;

    /** Events */
    function loadValues() {
        isFitted = $('#calc_isFitted').val();
        height = (Number($('#calc_feet').val()) * 12) + Number($('#calc_inches').val());
        chest = Number($('#calc_chest').val());
        waist = Number($('#calc_waist').val());
        seat = Number($('#calc_seat').val());
        wearingLayers = $('#calc_opt_layers').prop("checked");
        lowCrotch = $('#calc_opt_crotch').prop("checked");
        muscularThighs = $('#calc_opt_seat').prop("checked");
    }

    $('#calc_btn_submit').on('click', () => {
        loadValues();
        calculate();
    })

    /** Logic */
    function calculate() {
        // Determining your body type, I, V, or A
        var chestDifference = chest - waist;
        var seatDifference = seat - waist;
        const pattern = constants.findPattern(isFitted, chestDifference, seatDifference, chest, seat, height);
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
        console.log(`Found pattern ${pattern}`);
    }


})