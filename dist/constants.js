(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])