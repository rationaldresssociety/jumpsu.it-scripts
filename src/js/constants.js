const patternURL = 'https://raw.githubusercontent.com/rclabough/jumpsu.it-scripts/master/patterns.json';

function findBodyType(patterns, isFitted, chestDiff, seatDiff) {
    const patternsThatAreTooBig = patterns.filter(k => k.type === (isFitted ? 'fitted' : 'unfitted'))
            .filter(k => k.chestDiff.max >= chestDiff)
            .filter(k => k.seatDiff.max >= seatDiff)
            .reduce((prev, k) => {
                prev[k.chestDiff.max] = prev[k.chestDiff.max] || [];
                prev[k.chestDiff.max].push(k);
                return prev;
        }, {})
    const minChest = Math.min.apply(Math, Object.keys(patternsThatAreTooBig).map(k => Number(k)));
    const minChestPatterns = patternsThatAreTooBig[minChest];
    const pattern = minChestPatterns.reduce((prev, cur) => Number(prev.seatDiff.max) < Number(cur.seatDiff.max) ? prev : cur);
    return pattern;
}

function findPattern(allPatterns, isFitted, chestDiff, seatDiff, chest, seat, height) {
    const bodyType = findBodyType(allPatterns, isFitted, chestDiff, seatDiff);
    if (!bodyType) {
        return null;
    }
    const patternsThatAreTooBig = bodyType.patterns
        .filter(k => Number(k.conditions.seat.max) > seat)
        .filter(k => Number(k.conditions.height.max) > height)
        .filter(k => Number(k.conditions.chest.max) > chest)
        .reduce((prev, k) => {
               prev[k.conditions.chest.max] = prev[k.conditions.chest.max] || [];
               prev[k.conditions.chest.max].push(k);
               return prev;
        }, {}) // Returns an object like { 44: [pattern, pattern, pattern]}
    const minChest = Math.min.apply(Math, Object.keys(patternsThatAreTooBig).map(k => Number(k)));
    const minChestPatterns = patternsThatAreTooBig[minChest];

    const pattern = minChestPatterns.reduce((prev, cur) => Number(prev.conditions.height.max) < Number(cur.conditions.height.max) ? prev : cur);
    
    return {
        bodyType: bodyType,
        pattern: pattern
    }
}

module.exports = {
    findPattern: findPattern,
    allPatterns: () => patterns,
    patternURL: patternURL
}