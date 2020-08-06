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
		var patterns = require('./patterns.json');

		function findBodyType(isFitted, chestDiff, seatDiff) {
			var foundPatterns = patterns.filter(function (k) {
				return k.type === (isFitted ? 'fitted' : 'unfitted');
			}).filter(function (k) {
				return k.seatDiff.max >= seatDiff;
			}).filter(function (k) {
				return k.chestDiff.max >= chestDiff;
			}).filter(function (k) {
				return k.seatDiff.min <= seatDiff;
			}).filter(function (k) {
				return k.chestDiff.min <= chestDiff;
			});
			if (foundPatterns.length > 0) {
				return foundPatterns[0];
			}
			return null;
		}

		function findPattern(isFitted, chestDiff, seatDiff, chest, seat, height) {
			var bodyType = findBodyType(isFitted, chestDiff, seatDiff);
			if (!bodyType) {
				return null;
			}
			var patternsThatAreTooBig = bodyType.patterns.filter(function (k) {
				return Number(k.conditions.seat.max) >= seat;
			}).filter(function (k) {
				return Number(k.conditions.height.max) >= height;
			}).filter(function (k) {
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
				return prev.conditions.height.max < cur.conditions.height.max ? prev : cur;
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
			}
		};
	}, { "./patterns.json": 2 }], 2: [function (require, module, exports) {
		module.exports = [{
			"type": "fitted",
			"bodyType": "I",
			"chestDiff": {
				"min": "6",
				"max": "9"
			},
			"seatDiff": {
				"min": "9",
				"max": "12"
			},
			"patterns": [{
				"name": "tango",
				"displayName": "tango",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1896def950b771bd98c017/1545115358985/JUMPSUIT-size-Tango-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "december",
				"displayName": "december",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189863032be4e5c9e16136/1545115747806/JUMPSUIT-size-December-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "alpha",
				"displayName": "alpha",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1899c40ebbe8dc93ec23a0/1545116101537/JUMPSUIT-size-Alpha-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "bravo",
				"displayName": "bravo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5d27ffa11636a90001b4762f/1562902434228/JUMPSUIT+size+Bravo+Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "spring",
				"displayName": "spring",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189c892b6a289b447c3570/1545116811915/JUMPSUIT-size-Spring-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "echo",
				"displayName": "echo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189718aa4a99481a172c14/1545115416842/JUMPSUIT-size-Echo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "delta",
				"displayName": "delta",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1898ad4d7a9cc4a781bd4f/1545115822807/JUMPSUIT-size-Delta-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "hotel",
				"displayName": "hotel",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1899dc1ae6cfd531e35599/1545116124918/JUMPSUIT-size-Hotel-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "charlie",
				"displayName": "charlie",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189b12352f539a97f70812/1545116434996/JUMPSUIT-size-Charlie-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "november",
				"displayName": "november",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ca00ebbe8dc93ec3a5d/1545116832841/JUMPSUIT-size-November-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "golf",
				"displayName": "golf",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18973c03ce640e052b5ae8/1545115453246/JUMPSUIT-size-Golf-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "robey",
				"displayName": "robey",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1898c41ae6cfd531e34c0b/1545115844698/JUMPSUIT-size-Robey-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "x-ray",
				"displayName": "x-ray",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1899f303ce640e052b7047/1545116148993/JUMPSUIT-size-X-Ray-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "herschel",
				"displayName": "herschel",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189b280ebbe8dc93ec2f6a/1545116456349/JUMPSUIT-size-Herschel-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "mike",
				"displayName": "mike",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189cf74fa51aab1a05d71a/1545116919934/JUMPSUIT-size-Mike-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "nootas",
				"displayName": "nootas",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c47912cb91c915700163642/1548194093040/JUMPSUIT-size-Nootas-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "wallace",
				"displayName": "wallace",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1898dc1ae6cfd531e34cc2/1545115869495/JUMPSUIT-size-Wallace-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "george",
				"displayName": "george",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189a0821c67cd254c24deb/1545116168949/JUMPSUIT-size-George-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "jasper",
				"displayName": "jasper",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189b40575d1fb7959899da/1545116481657/JUMPSUIT-size-Jasper-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "grecko",
				"displayName": "grecko",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189d0d4fa51aab1a05d7ba/1545116942236/JUMPSUIT-size-Grecko-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "omega",
				"displayName": "omega",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1897771ae6cfd531e34191/1545115511955/JUMPSUIT-size-Omega-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "romeo",
				"displayName": "romeo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18991f0e2e724de16a212c/1545115936557/JUMPSUIT-size-Romeo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "uniform",
				"displayName": "uniform",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189a330ebbe8dc93ec27d2/1545116211495/JUMPSUIT-size-Uniform-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "north",
				"displayName": "north",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189b570ebbe8dc93ec30d4/1545116504072/JUMPSUIT-size-North-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "cairo",
				"displayName": "cairo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189d22898583f8a402db60/1545116962759/JUMPSUIT-size-Cairo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "january",
				"displayName": "january",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1897986d2a73ec9d39853a/1545115545418/JUMPSUIT-size-January-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "victor",
				"displayName": "victor",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189935898583f8a402bc1c/1545115958531/JUMPSUIT-size-Victor-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "orion",
				"displayName": "orion",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189aa82b6a289b447c275c/1545116328861/JUMPSUIT-size-Orion-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "daisy",
				"displayName": "daisy",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189b676d2a73ec9d39a4af/1545116519354/JUMPSUIT-size-Daisy-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "salt",
				"displayName": "salt",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189d3721c67cd254c26823/1545116984178/JUMPSUIT-size-Salt-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "rán",
				"displayName": "rán",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18981e898583f8a402b2c9/1545115679679/JUMPSUIT-size-Ran-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "tesseract",
				"displayName": "tesseract",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1899531ae6cfd531e3512e/1545115989413/JUMPSUIT-size-Tesseract-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "sköll",
				"displayName": "sköll",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ab9898583f8a402c845/1545116346094/JUMPSUIT-size-Skoll-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "quasar",
				"displayName": "quasar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189bb94ae2373aab15a557/1545116602445/JUMPSUIT-size-Quasar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "suzhou",
				"displayName": "suzhou",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5d40a80a98c8e9000152086a/1564518410499/JUMPSUIT+size+Suzhou+Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "beta",
				"displayName": "beta",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1898324fa51aab1a05aef0/1545115699286/JUMPSUIT-size-Beta-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "tori",
				"displayName": "tori",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1899676d2a73ec9d3992ca/1545116008476/JUMPSUIT-size-Tori-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "jakarta",
				"displayName": "jakarta",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ace4fa51aab1a05c6d4/1545116367292/JUMPSUIT-size-Jakarta-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "winter",
				"displayName": "winter",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189bcc758d46c88fd382e9/1545116621267/JUMPSUIT-size-Winter-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "finch",
				"displayName": "finch",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189d6b032be4e5c9e18a16/1545117036073/JUMPSUIT-size-Finch-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}]
		}, {
			"type": "fitted",
			"bodyType": "V",
			"chestDiff": {
				"min": "9.5",
				"max": "12.5"
			},
			"seatDiff": {
				"min": "9",
				"max": "12"
			},
			"patterns": [{
				"name": "honor",
				"displayName": "honor",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189e2e758d46c88fd39442/1545117230690/JUMPSUIT-size-Honor-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35",
						"max": "37"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "love",
				"displayName": "love",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ee5898583f8a402e7ec/1545117413979/JUMPSUIT-size-Love-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35",
						"max": "37"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "auto",
				"displayName": "auto",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f8f4ae2373aab15c31d/1545117583746/JUMPSUIT-size-Auto-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35",
						"max": "37"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "shell",
				"displayName": "shell",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a0284d7a9cc4a781f930/1545117739639/JUMPSUIT-size-Shell-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35",
						"max": "37"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "jacuzzi",
				"displayName": "jacuzzi",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a13c4ae2373aab15d228/1545118013927/JUMPSUIT-size-Jacuzzi-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35",
						"max": "37"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "star",
				"displayName": "star",
				"conditions": {
					"chest": {
						"min": "35",
						"max": "37"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "location",
				"displayName": "location",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189e42352f539a97f72160/1545117251225/JUMPSUIT-size-Location-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37",
						"max": "39"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "beijing",
				"displayName": "beijing",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ef4562fa7f0c0e25e51/1545117428338/JUMPSUIT-size-Beijing-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37",
						"max": "39"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "eclipse",
				"displayName": "eclipse",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f9f032be4e5c9e199f3/1545117600200/JUMPSUIT-size-Eclipse-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37",
						"max": "39"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "equinox",
				"displayName": "equinox",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a03a352f539a97f73f50/1545117755284/JUMPSUIT-size-Equinox-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37",
						"max": "39"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "bloomer",
				"displayName": "bloomer",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a163562fa7f0c0e270b3/1545118052976/JUMPSUIT-size-Bloomer-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37",
						"max": "39"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "gulp",
				"displayName": "gulp",
				"conditions": {
					"chest": {
						"min": "37",
						"max": "39"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "tile",
				"displayName": "tile",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189e62352f539a97f7222a/1545117282375/JUMPSUIT-size-Tile-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "40.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "friend",
				"displayName": "friend",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f048a922d56143076d5/1545117445089/JUMPSUIT-size-Friend-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "40.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "salad",
				"displayName": "salad",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189fb170a6adf77171f00f/1545117618310/JUMPSUIT-size-Salad-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "40.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "knife",
				"displayName": "knife",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a04d4fa51aab1a060dc0/1545117775255/JUMPSUIT-size-Knife-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "40.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "seed",
				"displayName": "seed",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a1df40ec9a753963273c/1545118177220/JUMPSUIT-size-Seed-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "40.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "companion",
				"displayName": "companion",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "40.5"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "infinite",
				"displayName": "infinite",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189e78aa4a99481a1768b0/1545117305213/JUMPSUIT-size-Infinite-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40.5",
						"max": "42"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "union",
				"displayName": "union",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f19b8a04514c3e82f70/1545117466485/JUMPSUIT-size-Union-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40.5",
						"max": "42"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "phone",
				"displayName": "phone",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189fc30ebbe8dc93ec535d/1545117635445/JUMPSUIT-size-Phone-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40.5",
						"max": "42"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "atlas",
				"displayName": "atlas",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a0608a922d5614307f92/1545117794906/JUMPSUIT-size-Atlas-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40.5",
						"max": "42"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "neptune",
				"displayName": "neptune",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a1f1cd8366551dbd3975/1545118195328/JUMPSUIT-size-Neptune-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40.5",
						"max": "42"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "index",
				"displayName": "index",
				"conditions": {
					"chest": {
						"min": "40.5",
						"max": "42"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "brave",
				"displayName": "brave",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189e8e575d1fb79598b31e/1545117327237/JUMPSUIT-size-Brave-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "42",
						"max": "44"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "glitter",
				"displayName": "glitter",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f30898583f8a402e9c4/1545117489651/JUMPSUIT-size-Glitter-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "42",
						"max": "44"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "propeller",
				"displayName": "propeller",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189fd64fa51aab1a05f03c/1545117655285/JUMPSUIT-size-Propeller-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "42",
						"max": "44"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "positive",
				"displayName": "positive",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a077f950b771bd990bf2/1545117815912/JUMPSUIT-size-Positive-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "42",
						"max": "44"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "mars",
				"displayName": "mars",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a2088a922d5614308d3d/1545118218980/JUMPSUIT-size-Mars-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "42",
						"max": "44"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "doxa",
				"displayName": "doxa",
				"conditions": {
					"chest": {
						"min": "42",
						"max": "44"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "coffee",
				"displayName": "coffee",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ea3f950b771bd98fe5e/1545117348044/JUMPSUIT-size-Coffee-Pattern-2.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "spoon",
				"displayName": "spoon",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f438a922d561430784f/1545117507543/JUMPSUIT-size-Spoon-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "feline",
				"displayName": "feline",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189fe56d2a73ec9d39c606/1545117670303/JUMPSUIT-size-Feline-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "asteroid",
				"displayName": "asteroid",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a09a40ec9a7539631d3f/1545117852541/JUMPSUIT-size-Asteroid-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "accent",
				"displayName": "accent",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "mimas",
				"displayName": "mimas",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "drive",
				"displayName": "drive",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189eb11ae6cfd531e37a5f/1545117362189/JUMPSUIT-size-Drive-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "lamp",
				"displayName": "lamp",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f56758d46c88fd39c7c/1545117526467/JUMPSUIT-size-Lamp-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "goblet",
				"displayName": "goblet",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ff588251b7ea830fed4/1545117686124/JUMPSUIT-size-Goblet-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "hubble",
				"displayName": "hubble",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a0c04ae2373aab15ceee/1545117890054/JUMPSUIT-size-Hubble-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "phoebe",
				"displayName": "phoebe",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "spiral",
				"displayName": "spiral",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "72",
						"max": "76"
					}
				}
			}, {
				"name": "truth",
				"displayName": "truth",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189ec56d2a73ec9d39bdbd/1545117381340/JUMPSUIT-size-Truth-Pattern-2.pdf",
				"conditions": {
					"chest": {
						"min": "50",
						"max": "53"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "amphibian",
				"displayName": "amphibian",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189f65352f539a97f72a83/1545117541853/JUMPSUIT-size-Amphibian-Pattern-3.pdf",
				"conditions": {
					"chest": {
						"min": "50",
						"max": "53"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "rational",
				"displayName": "rational",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a00921c67cd254c27d99/1545117705776/JUMPSUIT-size-Rational-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "50",
						"max": "53"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "parrot",
				"displayName": "parrot",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18a0d84ae2373aab15cf7f/1545117912789/JUMPSUIT-size-Parrot-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "50",
						"max": "53"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}]
		}, {
			"type": "fitted",
			"bodyType": "A",
			"chestDiff": {
				"min": "6",
				"max": "9"
			},
			"seatDiff": {
				"min": "12.5",
				"max": "15.6"
			},
			"patterns": [{
				"name": "august",
				"displayName": "august",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c188846aa4a99481a16a8f7/1545111623385/JUMPSUIT-size-August-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "kilo",
				"displayName": "kilo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1890ceb8a04514c3e7bbbf/1545113807144/JUMPSUIT-size-Kilo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "july",
				"displayName": "july",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18927fc2241b769b0e146c/1545114239841/JUMPSUIT-size-July-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "mu",
				"displayName": "mu",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189332758d46c88fd33b5c/1545114419187/JUMPSUIT-size-Mu-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "newton",
				"displayName": "newton",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1894aac2241b769b0e282a/1545114796756/JUMPSUIT-size-Newton-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "32",
						"max": "34"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "pi",
				"displayName": "pi",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18886a1ae6cfd531e2b415/1545111658823/JUMPSUIT-size-Pi-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "yankee",
				"displayName": "yankee",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1890e1c2241b769b0e0645/1545113826256/JUMPSUIT-size-Yankee-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "lambda",
				"displayName": "lambda",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1892942b6a289b447be798/1545114261466/JUMPSUIT-size-Lambda-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "iota",
				"displayName": "iota",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18934b032be4e5c9e1363a/1545114444748/JUMPSUIT-size-Iota-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "zeus",
				"displayName": "zeus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1894fd70a6adf771719d7c/1545114877942/JUMPSUIT-size-Zeus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34",
						"max": "36"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "lima",
				"displayName": "lima",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1889834ae2373aab1503c4/1545111941269/JUMPSUIT-size-Lima-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "whiskey",
				"displayName": "whiskey",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189123758d46c88fd3295c/1545113892436/JUMPSUIT-size-Whiskey-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "hi",
				"displayName": "hi",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1892a98a922d56143013c0/1545114282812/JUMPSUIT-size-Hi-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "umlat",
				"displayName": "umlat",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18936e4ae2373aab15608e/1545114478616/JUMPSUIT-size-Umlat-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "sailboat",
				"displayName": "sailboat",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189512898583f8a4029a10/1545114899452/JUMPSUIT-size-Sailboat-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36",
						"max": "37.5"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "willow",
				"displayName": "willow",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18899740ec9a7539625807/1545111959496/JUMPSUIT-size-Willow-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "quebec",
				"displayName": "quebec",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18913321c67cd254c204db/1545113908133/JUMPSUIT-size-Quebec-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "nu",
				"displayName": "nu",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1892bc0e2e724de169ec60/1545114300978/JUMPSUIT-size-Nu-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "virgo",
				"displayName": "virgo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189381352f539a97f6c059/1545114498246/JUMPSUIT-size-Virgo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "curry",
				"displayName": "curry",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1895254ae2373aab156f7c/1545114917805/JUMPSUIT-size-Curry-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "37.5",
						"max": "39"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "cactus",
				"displayName": "cactus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1889b5562fa7f0c0e1a508/1545111989516/JUMPSUIT-size-Cactus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "oscar",
				"displayName": "oscar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189149562fa7f0c0e1efa3/1545113930014/JUMPSUIT-size-Oscar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "leo",
				"displayName": "leo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1892d46d2a73ec9d395e60/1545114324901/JUMPSUIT-size-Leo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "libra",
				"displayName": "libra",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1893978a922d5614301b6f/1545114520250/JUMPSUIT-size-Libra-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "quito",
				"displayName": "quito",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189558f950b771bd98b3f0/1545114969198/JUMPSUIT-size-Quito-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39",
						"max": "41"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "september",
				"displayName": "september",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1889c46d2a73ec9d3907f5/1545112004969/JUMPSUIT-size-September-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "sierra",
				"displayName": "sierra",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1891618a922d56143009fb/1545113954491/JUMPSUIT-size-Sierra-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "latin",
				"displayName": "latin",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1892e76d2a73ec9d395ee7/1545114343855/JUMPSUIT-size-Latin-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "togo",
				"displayName": "togo",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1893e0575d1fb79598591f/1545114592712/JUMPSUIT-size-Togo-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "fancy",
				"displayName": "fancy",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18956a352f539a97f6d0c1/1545114987386/JUMPSUIT-size-Fancy-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "44"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "xander",
				"displayName": "xander",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1889f20e2e724de1699a5a/1545112050660/JUMPSUIT-size-Xander-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "california",
				"displayName": "california",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1891734d7a9cc4a7816ef6/1545113971988/JUMPSUIT-size-California-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "dakar",
				"displayName": "dakar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1892facd8366551dbcc247/1545114363141/JUMPSUIT-size-Dakar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "curie",
				"displayName": "curie",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1893f31ae6cfd531e322ed/1545114611595/JUMPSUIT-size-Curie-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "legrende",
				"displayName": "legrende",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18957b4ae2373aab1572f3/1545115005729/JUMPSUIT-size-Legrende-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44",
						"max": "47"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}, {
				"name": "carmen",
				"displayName": "carmen",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c188a120e2e724de1699bd2/1545112083573/JUMPSUIT-size-Carmen-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "59",
						"max": "62"
					}
				}
			}, {
				"name": "rio",
				"displayName": "rio",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c189185b8a04514c3e7c121/1545113990009/JUMPSUIT-size-Rio-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "62",
						"max": "64"
					}
				}
			}, {
				"name": "hera",
				"displayName": "hera",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18930b70a6adf771716f09/1545114380031/JUMPSUIT-size-Hera-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "64",
						"max": "66"
					}
				}
			}, {
				"name": "keano",
				"displayName": "keano",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c18940903ce640e052b3fe7/1545114634178/JUMPSUIT-size-Keano-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "66",
						"max": "69"
					}
				}
			}, {
				"name": "feather",
				"displayName": "feather",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1895940e2e724de16a04aa/1545115029853/JUMPSUIT-size-Feather-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "47",
						"max": "50"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "69",
						"max": "72"
					}
				}
			}]
		}, {
			"type": "unfitted",
			"bodyType": "I",
			"chestDiff": {
				"min": "5",
				"max": "7"
			},
			"seatDiff": {
				"min": "5",
				"max": "7"
			},
			"patterns": [{
				"name": "gravity",
				"displayName": "gravity",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197a3b0e2e72a6489711ac/1545173563986/JUMPSUIT-size-Gravity-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "march",
				"displayName": "march",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e2eaa4a99b7ff61a38f/1545174575187/JUMPSUIT-size-March-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "corvus",
				"displayName": "corvus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e9070a6ad66257aedba/1545174672675/JUMPSUIT-size-Corvus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "cloud",
				"displayName": "cloud",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f11aa4a99b7ff61b070/1545174802298/JUMPSUIT-size-Cloud-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "sombrero ",
				"displayName": "sombrero ",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f7740ec9adb5112847a/1545174903984/JUMPSUIT-size-Sombrero-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "october",
				"displayName": "october",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197fe84d7a9c3f61d0c846/1545175016970/JUMPSUIT-size-October-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "neutral",
				"displayName": "neutral",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197a0e4fa51a29086520e1/1545173519075/JUMPSUIT-size-Neutral-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "gamma",
				"displayName": "gamma",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e40758d461bb712fe24/1545174593070/JUMPSUIT-size-Gamma-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "titus",
				"displayName": "titus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e9f4fa51a29086568c0/1545174688007/JUMPSUIT-size-Titus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "epsilon",
				"displayName": "epsilon",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f22562fa783d99eb38d/1545174818724/JUMPSUIT-size-Epsilon-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "draco",
				"displayName": "draco",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f8c352f53fd9f2f365a/1545174924749/JUMPSUIT-size-Draco-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "tadpole",
				"displayName": "tadpole",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197ffa0ebbe865b39bada5/1545175034558/JUMPSUIT-size-Tadpole-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "autumn",
				"displayName": "autumn",
				"link": "https://www.jumpsu.it/wp-content/uploads/2017/10/JUMPSUIT-size-Autumn-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "uranus",
				"displayName": "uranus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e524d7a9c3f61d0ae5e/1545174611257/JUMPSUIT-size-Uranus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "argos",
				"displayName": "argos",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197eb00ebbe865b39b9b2f/1545174704659/JUMPSUIT-size-Argos-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "aquarius",
				"displayName": "aquarius",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f318a922db47774d960/1545174833928/JUMPSUIT-size-Aquarius-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "canus",
				"displayName": "canus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f9e03ce64a7563899ee/1545174943304/JUMPSUIT-size-Canus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "lynx",
				"displayName": "lynx",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19800b352f53fd9f2f4047/1545175051630/JUMPSUIT-size-Lynx-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "venus",
				"displayName": "venus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197a6a4fa51a29086526df/1545173611618/JUMPSUIT-size-Venus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "galaxy",
				"displayName": "galaxy",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e62352f53fd9f2f24a5/1545174626886/JUMPSUIT-size-Galaxy-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "bagel",
				"displayName": "bagel",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197ebfc2241bfb4144293f/1545174720052/JUMPSUIT-size-Bagel-Pattern-1.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "may",
				"displayName": "may",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f412b6a280251d1b7ef/1545174849820/JUMPSUIT-size-May-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "cigar",
				"displayName": "cigar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197fad40ec9adb51128768/1545174958194/JUMPSUIT-size-Cigar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "bode",
				"displayName": "bode",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19801e6d2a7361d3b3f17a/1545175071221/JUMPSUIT-size-Bode-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "moon",
				"displayName": "moon",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197a84cd8366ce40748b98/1545173636928/JUMPSUIT-size-Moon-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "tara",
				"displayName": "tara",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197e7740ec9adb511276a2/1545174647866/JUMPSUIT-size-Tara-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "capricorn",
				"displayName": "capricorn",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197ed04fa51a2908656b25/1545174737030/JUMPSUIT-size-Capricorn-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "andromeda",
				"displayName": "andromeda",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197f51c2241bfb41443240/1545174866224/JUMPSUIT-size-Andromeda-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "polar",
				"displayName": "polar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197fc24d7a9c3f61d0c51e/1545174978750/JUMPSUIT-size-Polar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "dione",
				"displayName": "dione",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "giles",
				"displayName": "giles",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "arctic",
				"displayName": "arctic",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "sculptor",
				"displayName": "sculptor",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "june",
				"displayName": "june",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "legos",
				"displayName": "legos",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "talon",
				"displayName": "talon",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "spike",
				"displayName": "spike",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "flamingo",
				"displayName": "flamingo",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "hydra",
				"displayName": "hydra",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "barcelona",
				"displayName": "barcelona",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "calypso",
				"displayName": "calypso",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "memory",
				"displayName": "memory",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "essay",
				"displayName": "essay",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "atom",
				"displayName": "atom",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "kino",
				"displayName": "kino",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "velocity",
				"displayName": "velocity",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "sól",
				"displayName": "sól",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c198033352f53fd9f2f42f2/1545175092321/JUMPSUIT-size-Sol-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}]
		}, {
			"type": "unfitted",
			"bodyType": "V",
			"chestDiff": {
				"min": "7.5",
				"max": "10.5"
			},
			"seatDiff": {
				"min": "5",
				"max": "7"
			},
			"patterns": [{
				"name": "pacific",
				"displayName": "pacific",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1980611ae6cf427a7e9992/1545175137579/JUMPSUIT-size-Pacific-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35.5",
						"max": "39.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "jupiter",
				"displayName": "jupiter",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1980e28985836efb5b4d02/1545175267083/JUMPSUIT-size-Jupiter-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35.5",
						"max": "39.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "magellan",
				"displayName": "magellan",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19813c562fa783d99edb5c/1545175356612/JUMPSUIT-size-Magellan-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35.5",
						"max": "39.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "diana",
				"displayName": "diana",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19818f4ae237c84f6309a8/1545175440148/JUMPSUIT-size-Diana-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35.5",
						"max": "39.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "rufus",
				"displayName": "rufus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981ec758d4688cf2bb1a2/1545175532855/JUMPSUIT-size-Rufus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "35.5",
						"max": "39.5"
					},
					"seat": {
						"min": "35",
						"max": "37"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "skiff",
				"displayName": "skiff",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c198079352f53fd9f2f47f7/1545175162497/JUMPSUIT-size-Skiff-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39.5",
						"max": "41"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "taurus",
				"displayName": "taurus",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1980f16d2a7361d3b400a1/1545175281678/JUMPSUIT-size-Taurus-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39.5",
						"max": "41"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "april",
				"displayName": "april",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981496d2a7361d3b40725/1545175370012/JUMPSUIT-size-April-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39.5",
						"max": "41"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "sunflower",
				"displayName": "sunflower",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19819e0e2e72a648979096/1545175454965/JUMPSUIT-size-Sunflower-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39.5",
						"max": "41"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "hermes",
				"displayName": "hermes",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981fc562fa783d99ee6fa/1545175549093/JUMPSUIT-size-Hermes-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "39.5",
						"max": "41"
					},
					"seat": {
						"min": "37",
						"max": "39"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "ursa",
				"displayName": "ursa",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1980880e2e72a648977ab7/1545175176477/JUMPSUIT-size-Ursa-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "43"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "gemini",
				"displayName": "gemini",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981008985836efb5b4f8c/1545175297139/JUMPSUIT-size-Gemini-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "43"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "buffy",
				"displayName": "buffy",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19815c21c67c4793a98e8e/1545175389214/JUMPSUIT-size-Buffy-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "43"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "boötes",
				"displayName": "boötes",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981ac4fa51a2908659c44/1545175468515/JUMPSUIT-size-Bootes-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "43"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "leto",
				"displayName": "leto",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19820bf950b751fd50a519/1545175563847/JUMPSUIT-size-Leto-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41",
						"max": "43"
					},
					"seat": {
						"min": "39",
						"max": "40.5"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "radio",
				"displayName": "radio",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1980998985836efb5b47ea/1545175194027/JUMPSUIT-size-Radio-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "43",
						"max": "44.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "nova",
				"displayName": "nova",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19810fcd8366ce4074f96f/1545175312272/JUMPSUIT-size-Nova-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "43",
						"max": "44.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "pluto",
				"displayName": "pluto",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19816c03ce64a75638be25/1545175404322/JUMPSUIT-size-Pluto-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "43",
						"max": "44.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "demeter",
				"displayName": "demeter",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19821d4fa51a290865a2b6/1545175582281/JUMPSUIT-size-Demeter-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "43",
						"max": "44.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "nótt",
				"displayName": "nótt",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1980ab8a922db47774f402/1545175211624/JUMPSUIT-size-Nott-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44.5",
						"max": "46.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "cancer",
				"displayName": "cancer",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19812103ce64a75638b81d/1545175329362/JUMPSUIT-size-Cancer-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44.5",
						"max": "46.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "cartwheel",
				"displayName": "cartwheel",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c198178c2241bfb41445880/1545175417127/JUMPSUIT-size-Cartwheel-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44.5",
						"max": "46.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "max",
				"displayName": "max",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981cd758d4688cf2bb034/1545175501517/JUMPSUIT-size-Max-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44.5",
						"max": "46.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "fons",
				"displayName": "fons",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19822d88251b4163bee925/1545175597493/JUMPSUIT-size-Fons-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "44.5",
						"max": "46.5"
					},
					"seat": {
						"min": "42",
						"max": "44"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "pices",
				"displayName": "pices",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "vör",
				"displayName": "vör",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "athena",
				"displayName": "athena",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "luna",
				"displayName": "luna",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "owl",
				"displayName": "owl",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "44",
						"max": "47"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "aries",
				"displayName": "aries",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1981be40ec9adb5112adce/1545175487928/JUMPSUIT-size-Aries-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "43",
						"max": "44.5"
					},
					"seat": {
						"min": "40.5",
						"max": "42"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}]
		}, {
			"type": "unfitted",
			"bodyType": "A",
			"chestDiff": {
				"min": "5",
				"max": "7"
			},
			"seatDiff": {
				"min": "7.5",
				"max": "10.5"
			},
			"patterns": [{
				"name": "society",
				"displayName": "society",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19724a6d2a7361d3b312b9/1545171531142/JUMPSUIT-size-Society-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "axel",
				"displayName": "axel",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1974e56d2a7361d3b3396e/1545172197422/JUMPSUIT-size-Axel-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "stellar",
				"displayName": "stellar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1976092b6a280251d126fd/1545172489699/JUMPSUIT-size-Stellar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "fork",
				"displayName": "fork",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1976fe70a6ad66257a7570/1545172734681/JUMPSUIT-size-Fork-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "orbit",
				"displayName": "orbit",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19779db8a0458fbc11951c/1545172895338/JUMPSUIT-size-Orbit-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "earth",
				"displayName": "earth",
				"conditions": {
					"chest": {
						"min": "34.5",
						"max": "36.5"
					},
					"seat": {
						"min": "38",
						"max": "40"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "nosh",
				"displayName": "nosh",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19726f1ae6cf427a7dbbe1/1545171567676/JUMPSUIT-size-Nosh-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "thesis",
				"displayName": "thesis",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19750bcd8366ce40742dfc/1545172236116/JUMPSUIT-size-Thesis-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "pompom",
				"displayName": "pompom",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197618cd8366ce40743f3d/1545172505072/JUMPSUIT-size-Pompom-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "saturn",
				"displayName": "saturn",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197722c2241bfb4143acac/1545172770933/JUMPSUIT-size-Saturn-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "elsewhere",
				"displayName": "elsewhere",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1977b3562fa783d99e3b8b/1545172915698/JUMPSUIT-size-Elsewhere-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "quark",
				"displayName": "quark",
				"conditions": {
					"chest": {
						"min": "36.5",
						"max": "38"
					},
					"seat": {
						"min": "40",
						"max": "42"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "hyperion",
				"displayName": "hyperion",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1972ab352f53fd9f2e6b0b/1545171627630/JUMPSUIT-size-Hyperion-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "madrid",
				"displayName": "madrid",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19751c8a922db477742c6d/1545172252681/JUMPSUIT-size-Madrid-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "neutron",
				"displayName": "neutron",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19732c4d7a9c3f61cff926/1545171757321/JUMPSUIT-size-Neutron-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "mercury",
				"displayName": "mercury",
				"link": "https://www.jumpsu.it/wp-content/uploads/2017/10/JUMPSUIT-size-Mercury-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "helene",
				"displayName": "helene",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1977c1562fa783d99e3c42/1545172929397/JUMPSUIT-size-Helene-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "anthony",
				"displayName": "anthony",
				"conditions": {
					"chest": {
						"min": "38",
						"max": "40"
					},
					"seat": {
						"min": "42",
						"max": "43.5"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "wuhan",
				"displayName": "wuhan",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1972c26d2a7361d3b3192f/1545171651497/JUMPSUIT-size-Wuhan-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "solar",
				"displayName": "solar",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1975c5352f53fd9f2e9c63/1545172421947/JUMPSUIT-size-Solar-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "fall",
				"displayName": "fall",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1976a60ebbe865b39b15ef/1545172647068/JUMPSUIT-size-Fall-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "ion",
				"displayName": "ion",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c19775203ce64a7563810a3/1545172818791/JUMPSUIT-size-Ion-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "cantona",
				"displayName": "cantona",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1977d80e2e72a64896e56e/1545172952409/JUMPSUIT-size-Cantona-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "rice",
				"displayName": "rice",
				"conditions": {
					"chest": {
						"min": "40",
						"max": "41.5"
					},
					"seat": {
						"min": "43.5",
						"max": "45"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "octave",
				"displayName": "octave",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1972eb8985836efb5a682f/1545171692302/JUMPSUIT-size-Octave-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "vista",
				"displayName": "vista",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1975da70a6ad66257a6299/1545172442583/JUMPSUIT-size-Vista-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "elipse",
				"displayName": "elipse",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1976c2cd8366ce407448fe/1545172674293/JUMPSUIT-size-Elipse-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "akocha",
				"displayName": "akocha",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c197769562fa783d99e3646/1545172842276/JUMPSUIT-size-Akocha-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "attention",
				"displayName": "attention",
				"link": "https://static1.squarespace.com/static/5bf9afd0f2e6b130dad9312f/t/5c1977ed21c67c4793a8f15b/1545172973530/JUMPSUIT-size-Attention-Pattern.pdf",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "pause",
				"displayName": "pause",
				"conditions": {
					"chest": {
						"min": "41.5",
						"max": "43.5"
					},
					"seat": {
						"min": "45",
						"max": "47"
					},
					"height": {
						"min": "73",
						"max": "76"
					}
				}
			}, {
				"name": "neutrino",
				"displayName": "neutrino",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "ultra",
				"displayName": "ultra",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "deal",
				"displayName": "deal",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "tumble",
				"displayName": "tumble",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "canine",
				"displayName": "canine",
				"conditions": {
					"chest": {
						"min": "43.5",
						"max": "46.5"
					},
					"seat": {
						"min": "47",
						"max": "50"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "ooloi",
				"displayName": "ooloi",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "schweinsteiger",
				"displayName": "schweinsteiger",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "million",
				"displayName": "million",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "fossey",
				"displayName": "fossey",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}, {
				"name": "jairzinho",
				"displayName": "jairzinho",
				"conditions": {
					"chest": {
						"min": "46.5",
						"max": "49.5"
					},
					"seat": {
						"min": "50",
						"max": "53"
					},
					"height": {
						"min": "71",
						"max": "73"
					}
				}
			}, {
				"name": "maldini",
				"displayName": "maldini",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "59",
						"max": "64"
					}
				}
			}, {
				"name": "hawk",
				"displayName": "hawk",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "64",
						"max": "67"
					}
				}
			}, {
				"name": "horn",
				"displayName": "horn",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "67",
						"max": "69"
					}
				}
			}, {
				"name": "bogotá",
				"displayName": "bogotá",
				"conditions": {
					"chest": {
						"min": "49.5",
						"max": "52.5"
					},
					"seat": {
						"min": "53",
						"max": "56"
					},
					"height": {
						"min": "69",
						"max": "71"
					}
				}
			}]
		}];
	}, {}] }, {}, [1]);