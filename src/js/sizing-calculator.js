const $ = require('jquery');
const constants = require('./constants.js');
if (!$) {
    throw new Error(`jQuery not initialized or found!`);
}

$(document).ready(() => {
    console.log('Document Ready');
    $.getJSON(constants.patternURL, patterns => {
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
            isFitted = $('#calc_isFitted').val() === 'true';
            height = (Number($('#calc_feet').val()) * 12) + Number($('#calc_inches').val());
            chest = Number($('#calc_chest').val());
            waist = Number($('#calc_waist').val());
            seat = Number($('#calc_seat').val());
            wearingLayers = $('#calc_opt_layers').prop("checked");
            if (wearingLayers) {
                chest += 2;
                waist += 2;
                seat += 2;
            }
            lowCrotch = $('#calc_opt_crotch').prop("checked");
            if (lowCrotch) {
                height += 2;
            }
            muscularThighs = $('#calc_opt_seat').prop("checked");
            if (muscularThighs) {
                seat += 2;
            }
        }

        $('#calc_btn_submit').on('click', () => {
            loadValues();
            calculate();
        })

        /** Logic */
        function calculate() {
            // Determining your body type, I, V, or A
            debugger;
            var chestDifference = chest - waist;
            var seatDifference = seat - waist;
            const pattern = constants.findPattern(patterns, isFitted, chestDifference, seatDifference, chest, seat, height);
            if (!pattern) {
                hidePattern();
                console.log(`Fitted: ${isFitted}; ChestDiff: ${chestDifference}; seatDiff: ${seatDifference}; seat: ${seat}; height: ${height}; chest: ${chest}; waist: ${waist}`);
                return displayError(`Could not find a pattern for the requested measurements`);
            }
            displayPattern(pattern);
        }



        /** Actions */
        function displayError(errorMsg) {
            console.error(errorMsg);
            $('#div_noPatternFound').show();
        }

        function hidePattern() {
            $('#div_noPatternFound').hide();
            $('#div_patternFound').hide();
        }

        function displayPattern(pattern) {
            console.log(`Found pattern`, pattern);
            $('#div_noPatternFound').hide();
            $('#div_patternFound').show();
            $('#patternFound_name').text(pattern.pattern.displayName);
            $('#patternFound_link').attr('href', pattern.pattern.link);
        }
        hidePattern();

    })
})