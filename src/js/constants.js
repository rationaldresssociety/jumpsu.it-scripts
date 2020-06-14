const patterns = require('./patterns.json')

function findPattern(isFitted, chestDiff, seatDiff) {
    const foundPatterns = patterns.filter(k => k === (isFitted ? 'fitted' : 'unfitted'))
        .filter(k => k.seatDiff.max >= seatDiff)
        .filter(k => k.chestDiff.max >= chestDiff)
        .filter(k => k.seatDiff.min <= seatDiff)
        .filter(k => k.chestDiff.min <= chestDiff);
    if (foundPatterns.length > 0) {
        return foundPatterns[0];
    }
    return null;
}

module.exports = {
    findPattern: findPattern
}