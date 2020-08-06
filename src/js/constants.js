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
    const patternsThatAreTooBig = bodyType.patterns
        .filter(k => Number(k.conditions.seat.max) >= seat)
        .filter(k => Number(k.conditions.height.max) >= height)
        .filter(k => Number(k.conditions.chest.max) >= chest)
        .reduce((prev, k) => {
               prev[k.conditions.chest.max] = prev[k.conditions.chest.max] || [];
               prev[k.conditions.chest.max].push(k);
               return prev;
        }, {}) // Returns an object like { 44: [pattern, pattern, pattern]}
    const minChest = Math.min.apply(Math, Object.keys(patternsThatAreTooBig).map(k => Number(k)));
    const minChestPatterns = patternsThatAreTooBig[minHeight];

    const pattern = minChestPatterns.reduce((prev, cur) => prev.conditions.height.max < cur.conditions.height.max ? prev : cur);
    
    return {
        bodyType: bodyType,
        pattern: pattern
    }
}

module.exports = {
    findPattern: findPattern,
    allPatterns: () => patterns
}