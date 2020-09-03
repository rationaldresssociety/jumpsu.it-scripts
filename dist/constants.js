"use strict";

(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
            }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
        s(r[o]);
    }return s;
})({ 1: [function (require, module, exports) {
        var patternURL = 'https://rationaldresssociety.github.io/jumpsu.it-scripts/patterns.json';

        function findBodyType(patterns, isFitted, chestDiff, seatDiff) {
            var patternsThatAreTooBig = patterns.filter(function (k) {
                return k.type === (isFitted ? 'fitted' : 'unfitted');
            }).filter(function (k) {
                return k.chestDiff.max >= chestDiff;
            }).filter(function (k) {
                return k.seatDiff.max >= seatDiff;
            }).reduce(function (prev, k) {
                prev[k.chestDiff.max] = prev[k.chestDiff.max] || [];
                prev[k.chestDiff.max].push(k);
                return prev;
            }, {});
            var minChest = Math.min.apply(Math, Object.keys(patternsThatAreTooBig).map(function (k) {
                return Number(k);
            }));
            var minChestPatterns = patternsThatAreTooBig[minChest];
            var pattern = minChestPatterns.reduce(function (prev, cur) {
                return Number(prev.seatDiff.max) < Number(cur.seatDiff.max) ? prev : cur;
            });
            return pattern;
        }

        function findPattern(allPatterns, isFitted, chestDiff, seatDiff, chest, seat, height) {
            var bodyType = findBodyType(allPatterns, isFitted, chestDiff, seatDiff);
            if (!bodyType) {
                return null;
            }
            var patternsThatAreTooBig = bodyType.patterns.filter(function (k) {
                return Number(k.conditions.seat.max) >= seat;
            }).filter(function (k) {
                return Number(k.conditions.height.max) > height;
            }) // Take the exclusive for the height
            .filter(function (k) {
                return Number(k.conditions.chest.max) >= chest;
            }).reduce(function (prev, k) {
                prev[k.conditions.chest.max] = prev[k.conditions.chest.max] || [];
                prev[k.conditions.chest.max].push(k);
                return prev;
            }, {}); // Returns an object like { 44: [pattern, pattern, pattern]}
            var minChest = Math.min.apply(Math, Object.keys(patternsThatAreTooBig).map(function (k) {
                return Number(k);
            }));
            var minChestPatterns = patternsThatAreTooBig[minChest];

            var pattern = minChestPatterns.reduce(function (prev, cur) {
                return Number(prev.conditions.height.max) < Number(cur.conditions.height.max) ? prev : cur;
            });

            return {
                bodyType: bodyType,
                pattern: pattern
            };
        }

        module.exports = {
            findPattern: findPattern,
            allPatterns: function allPatterns() {
                return patterns;
            },
            patternURL: patternURL
        };
    }, {}] }, {}, [1]);