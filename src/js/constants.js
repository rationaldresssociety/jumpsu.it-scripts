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
        .filter(k => Number(k.conditions.seat.min) <= seat && Number(k.conditions.seat.max) >= seat)
        .filter(k => Number(k.conditions.height.min) <= height && Number(k.conditions.height.max) >= height)
        .filter(k => Number(k.conditions.chest.min) <= chest && Number(k.conditions.chest.max) >= chest);
    if (!patterns || patterns.length === 0) {
        return null;
    }
    return {
        bodyType: bodyType,
        pattern: patterns[0]
    }
}

module.exports = {
    findPattern: findPattern
}