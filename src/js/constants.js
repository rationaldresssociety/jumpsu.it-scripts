const patterns = [
    {
        type: 'fitted',
        pattern: 'I',
        chest: {
            min: 6,
            max: 9
        },
        seat: {
            min: 9,
            max: 12
        }
    },
    {
        type: 'fitted',
        pattern: 'V',
        chest: {
            min: 9.5,
            max: 12.5
        },
        seat: {
            min: 9,
            max: 12
        }
    },
    {
        type: 'fitted',
        pattern: 'A',
        chest: {
            min: 6,
            max: 9
        },
        seat: {
            min: 12.5,
            max: 15.6
        }
    },
    {
        type: 'unfitted',
        pattern: 'I',
        chest: {
            min: 5,
            max: 7
        },
        seat: {
            min: 5,
            max: 7
        }
    },
    {
        type: 'unfitted',
        pattern: 'V',
        chest: {
            min: 7.5,
            max: 10.5
        },
        seat: {
            min: 5,
            max: 7
        }
    },
    {
        type: 'unfitted',
        pattern: 'A',
        chest: {
            min: 5,
            max: 7
        },
        seat: {
            min: 7.5,
            max: 10.5
        }
    }
]



function findPattern(isFitted, chestDiff, seatDiff) {
    const foundPatterns = patterns.filter(k => k === (isFitted ? 'fitted' : 'unfitted'))
        .filter(k => k.seat.max >= seatDiff)
        .filter(k => k.chest.max >= chestDiff)
        .filter(k => k.seat.min <= seatDiff)
        .filter(k => k.chest.min <= chestDiff);
    if (foundPatterns.length > 0) {
        return foundPatterns[0];
    }
    return null;
}

module.exports = {
    findPattern: findPattern
}