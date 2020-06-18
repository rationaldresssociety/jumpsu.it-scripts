const patterns = require('./patterns.json')

function findBodyType(isFitted, chestDiff, seatDiff) {
    const foundPatterns = patterns.filter(k => k.type === (isFitted ? 'fitted' : 'unfitted'))
        .filter(k => k.seatDiff.max >= seatDiff)
        .filter(k => k.chestDiff.max >= chestDiff)
        .filter(k => k.seatDiff.min <= seatDiff)
        .filter(k => k.chestDiff.min <= chestDiff);
    if (foundPatterns.length > 0) {
        return foundPatterns[0];
    }
    return null;
}

function findPattern(isFitted, chestDiff, seatDiff, chest, seat, height) {
    const bodyType = findBodyType(isFitted, chestDiff, seatDiff);
    if (!bodyType) {
        return null;
    }
    const patterns = bodyType.patterns
        .filter(k => k.seat.min <= seat && k.seat.max >= seat)
        .filter(k => k.height.min <= height && k.height.max >= height)
        .filter(k => k.chest.min <= chest && k.chest.max >= chest);
    if (!patterns || patterns.length === 0) {
        return null;
    }
    return patterns[0];
}

module.exports = {
    findPattern: findPattern
}