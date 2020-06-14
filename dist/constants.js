(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./patterns.json":2}],2:[function(require,module,exports){
module.exports=[
    {
        "type": "fitted",
        "bodyType": "I",
        "chestDiff": {
            "min": 6,
            "max": 9
        },
        "seatDiff": {
            "min": 9,
            "max": 12
        },
        "patterns": [
            {
                "name": "tango",
                "displayName": "tango",
                "link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1896def950b771bd98c017/1545115358985/JUMPSUIT-size-Tango-pattern.pdf",
                "conditions": {
                    "chest": {
                        "min": 32,
                        "max": 34
                    },
                    "seat": {
                        "min": 35,
                        "max": 37
                    },
                    "height": {
                        "min": 59,
                        "max": 62
                    }
                }
            },
            {
                "name": "echo",
                "displayName": "echo",
                "link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189718aa4a99481a172c14/1545115416842/JUMPSUIT-size-Echo-pattern.pdf",
                "conditions": {
                    "chest": {
                        "min": 34,
                        "max": 36
                    },
                    "seat": {
                        "min": 37,
                        "max": 39
                    },
                    "height": {
                        "min": 59,
                        "max": 62
                    }
                }
            }
        ]
    },
    {
        "type": "fitted",
        "bodyType": "V",
        "chestDiff": {
            "min": 9.5,
            "max": 12.5
        },
        "seatDiff": {
            "min": 9,
            "max": 12
        }
    },
    {
        "type": "fitted",
        "bodyType": "A",
        "chestDiff": {
            "min": 6,
            "max": 9
        },
        "seatDiff": {
            "min": 12.5,
            "max": 15.6
        }
    },
    {
        "type": "unfitted",
        "bodyType": "I",
        "chestDiff": {
            "min": 5,
            "max": 7
        },
        "seatDiff": {
            "min": 5,
            "max": 7
        }
    },
    {
        "type": "unfitted",
        "bodyType": "V",
        "chestDiff": {
            "min": 7.5,
            "max": 10.5
        },
        "seatDiff": {
            "min": 5,
            "max": 7
        }
    },
    {
        "type": "unfitted",
        "bodyType": "A",
        "chestDiff": {
            "min": 5,
            "max": 7
        },
        "seatDiff": {
            "min": 7.5,
            "max": 10.5
        }
    }
]

},{}]},{},[1])