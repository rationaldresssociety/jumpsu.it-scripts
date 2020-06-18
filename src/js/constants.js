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
        .filter(k => k.conditions.seat.min <= seat && k.conditions.seat.max >= seat)
        .filter(k => k.conditions.height.min <= height && k.conditions.height.max >= height)
        .filter(k => k.conditions.chest.min <= chest && k.conditions.chest.max >= chest);
    if (!patterns || patterns.length === 0) {
        return null;
    }
    return patterns[0];
}

module.exports = {
    findPattern: findPattern
}