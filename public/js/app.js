(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/app"],{

/***/ "./node_modules/blurhash/dist/base83.js":
/*!**********************************************!*\
  !*** ./node_modules/blurhash/dist/base83.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var digitCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "#",
    "$",
    "%",
    "*",
    "+",
    ",",
    "-",
    ".",
    ":",
    ";",
    "=",
    "?",
    "@",
    "[",
    "]",
    "^",
    "_",
    "{",
    "|",
    "}",
    "~"
];
exports.decode83 = function (str) {
    var value = 0;
    for (var i = 0; i < str.length; i++) {
        var c = str[i];
        var digit = digitCharacters.indexOf(c);
        value = value * 83 + digit;
    }
    return value;
};
exports.encode83 = function (n, length) {
    var result = "";
    for (var i = 1; i <= length; i++) {
        var digit = (Math.floor(n) / Math.pow(83, length - i)) % 83;
        result += digitCharacters[Math.floor(digit)];
    }
    return result;
};
//# sourceMappingURL=base83.js.map

/***/ }),

/***/ "./node_modules/blurhash/dist/decode.js":
/*!**********************************************!*\
  !*** ./node_modules/blurhash/dist/decode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base83_1 = __webpack_require__(/*! ./base83 */ "./node_modules/blurhash/dist/base83.js");
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/blurhash/dist/utils.js");
var error_1 = __webpack_require__(/*! ./error */ "./node_modules/blurhash/dist/error.js");
/**
 * Returns an error message if invalid or undefined if valid
 * @param blurhash
 */
var validateBlurhash = function (blurhash) {
    if (!blurhash || blurhash.length < 6) {
        throw new error_1.ValidationError("The blurhash string must be at least 6 characters");
    }
    var sizeFlag = base83_1.decode83(blurhash[0]);
    var numY = Math.floor(sizeFlag / 9) + 1;
    var numX = (sizeFlag % 9) + 1;
    if (blurhash.length !== 4 + 2 * numX * numY) {
        throw new error_1.ValidationError("blurhash length mismatch: length is " + blurhash.length + " but it should be " + (4 + 2 * numX * numY));
    }
};
exports.isBlurhashValid = function (blurhash) {
    try {
        validateBlurhash(blurhash);
    }
    catch (error) {
        return { result: false, errorReason: error.message };
    }
    return { result: true };
};
var decodeDC = function (value) {
    var intR = value >> 16;
    var intG = (value >> 8) & 255;
    var intB = value & 255;
    return [utils_1.sRGBToLinear(intR), utils_1.sRGBToLinear(intG), utils_1.sRGBToLinear(intB)];
};
var decodeAC = function (value, maximumValue) {
    var quantR = Math.floor(value / (19 * 19));
    var quantG = Math.floor(value / 19) % 19;
    var quantB = value % 19;
    var rgb = [
        utils_1.signPow((quantR - 9) / 9, 2.0) * maximumValue,
        utils_1.signPow((quantG - 9) / 9, 2.0) * maximumValue,
        utils_1.signPow((quantB - 9) / 9, 2.0) * maximumValue
    ];
    return rgb;
};
var decode = function (blurhash, width, height, punch) {
    validateBlurhash(blurhash);
    punch = punch | 1;
    var sizeFlag = base83_1.decode83(blurhash[0]);
    var numY = Math.floor(sizeFlag / 9) + 1;
    var numX = (sizeFlag % 9) + 1;
    var quantisedMaximumValue = base83_1.decode83(blurhash[1]);
    var maximumValue = (quantisedMaximumValue + 1) / 166;
    var colors = new Array(numX * numY);
    for (var i = 0; i < colors.length; i++) {
        if (i === 0) {
            var value = base83_1.decode83(blurhash.substring(2, 6));
            colors[i] = decodeDC(value);
        }
        else {
            var value = base83_1.decode83(blurhash.substring(4 + i * 2, 6 + i * 2));
            colors[i] = decodeAC(value, maximumValue * punch);
        }
    }
    var bytesPerRow = width * 4;
    var pixels = new Uint8ClampedArray(bytesPerRow * height);
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var r = 0;
            var g = 0;
            var b = 0;
            for (var j = 0; j < numY; j++) {
                for (var i = 0; i < numX; i++) {
                    var basis = Math.cos((Math.PI * x * i) / width) *
                        Math.cos((Math.PI * y * j) / height);
                    var color = colors[i + j * numX];
                    r += color[0] * basis;
                    g += color[1] * basis;
                    b += color[2] * basis;
                }
            }
            var intR = utils_1.linearTosRGB(r);
            var intG = utils_1.linearTosRGB(g);
            var intB = utils_1.linearTosRGB(b);
            pixels[4 * x + 0 + y * bytesPerRow] = intR;
            pixels[4 * x + 1 + y * bytesPerRow] = intG;
            pixels[4 * x + 2 + y * bytesPerRow] = intB;
            pixels[4 * x + 3 + y * bytesPerRow] = 255; // alpha
        }
    }
    return pixels;
};
exports.default = decode;
//# sourceMappingURL=decode.js.map

/***/ }),

/***/ "./node_modules/blurhash/dist/encode.js":
/*!**********************************************!*\
  !*** ./node_modules/blurhash/dist/encode.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var base83_1 = __webpack_require__(/*! ./base83 */ "./node_modules/blurhash/dist/base83.js");
var utils_1 = __webpack_require__(/*! ./utils */ "./node_modules/blurhash/dist/utils.js");
var error_1 = __webpack_require__(/*! ./error */ "./node_modules/blurhash/dist/error.js");
var bytesPerPixel = 4;
var multiplyBasisFunction = function (pixels, width, height, basisFunction) {
    var r = 0;
    var g = 0;
    var b = 0;
    var bytesPerRow = width * bytesPerPixel;
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var basis = basisFunction(x, y);
            r +=
                basis * utils_1.sRGBToLinear(pixels[bytesPerPixel * x + 0 + y * bytesPerRow]);
            g +=
                basis * utils_1.sRGBToLinear(pixels[bytesPerPixel * x + 1 + y * bytesPerRow]);
            b +=
                basis * utils_1.sRGBToLinear(pixels[bytesPerPixel * x + 2 + y * bytesPerRow]);
        }
    }
    var scale = 1 / (width * height);
    return [r * scale, g * scale, b * scale];
};
var encodeDC = function (value) {
    var roundedR = utils_1.linearTosRGB(value[0]);
    var roundedG = utils_1.linearTosRGB(value[1]);
    var roundedB = utils_1.linearTosRGB(value[2]);
    return (roundedR << 16) + (roundedG << 8) + roundedB;
};
var encodeAC = function (value, maximumValue) {
    var quantR = Math.floor(Math.max(0, Math.min(18, Math.floor(utils_1.signPow(value[0] / maximumValue, 0.5) * 9 + 9.5))));
    var quantG = Math.floor(Math.max(0, Math.min(18, Math.floor(utils_1.signPow(value[1] / maximumValue, 0.5) * 9 + 9.5))));
    var quantB = Math.floor(Math.max(0, Math.min(18, Math.floor(utils_1.signPow(value[2] / maximumValue, 0.5) * 9 + 9.5))));
    return quantR * 19 * 19 + quantG * 19 + quantB;
};
var encode = function (pixels, width, height, componentX, componentY) {
    if (componentX < 1 || componentX > 9 || componentY < 1 || componentY > 9) {
        throw new error_1.ValidationError("BlurHash must have between 1 and 9 components");
    }
    if (width * height * 4 !== pixels.length) {
        throw new error_1.ValidationError("Width and height must match the pixels array");
    }
    var factors = [];
    var _loop_1 = function (y) {
        var _loop_2 = function (x) {
            var normalisation = x == 0 && y == 0 ? 1 : 2;
            var factor = multiplyBasisFunction(pixels, width, height, function (i, j) {
                return normalisation *
                    Math.cos((Math.PI * x * i) / width) *
                    Math.cos((Math.PI * y * j) / height);
            });
            factors.push(factor);
        };
        for (var x = 0; x < componentX; x++) {
            _loop_2(x);
        }
    };
    for (var y = 0; y < componentY; y++) {
        _loop_1(y);
    }
    var dc = factors[0];
    var ac = factors.slice(1);
    var hash = "";
    var sizeFlag = componentX - 1 + (componentY - 1) * 9;
    hash += base83_1.encode83(sizeFlag, 1);
    var maximumValue;
    if (ac.length > 0) {
        var actualMaximumValue = Math.max.apply(Math, ac.map(function (val) { return Math.max.apply(Math, val); }));
        var quantisedMaximumValue = Math.floor(Math.max(0, Math.min(82, Math.floor(actualMaximumValue * 166 - 0.5))));
        maximumValue = (quantisedMaximumValue + 1) / 166;
        hash += base83_1.encode83(quantisedMaximumValue, 1);
    }
    else {
        maximumValue = 1;
        hash += base83_1.encode83(0, 1);
    }
    hash += base83_1.encode83(encodeDC(dc), 4);
    ac.forEach(function (factor) {
        hash += base83_1.encode83(encodeAC(factor, maximumValue), 2);
    });
    return hash;
};
exports.default = encode;
//# sourceMappingURL=encode.js.map

/***/ }),

/***/ "./node_modules/blurhash/dist/error.js":
/*!*********************************************!*\
  !*** ./node_modules/blurhash/dist/error.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "ValidationError";
        _this.message = message;
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
//# sourceMappingURL=error.js.map

/***/ }),

/***/ "./node_modules/blurhash/dist/index.js":
/*!*********************************************!*\
  !*** ./node_modules/blurhash/dist/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var decode_1 = __webpack_require__(/*! ./decode */ "./node_modules/blurhash/dist/decode.js");
exports.decode = decode_1.default;
exports.isBlurhashValid = decode_1.isBlurhashValid;
var encode_1 = __webpack_require__(/*! ./encode */ "./node_modules/blurhash/dist/encode.js");
exports.encode = encode_1.default;
__export(__webpack_require__(/*! ./error */ "./node_modules/blurhash/dist/error.js"));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/blurhash/dist/utils.js":
/*!*********************************************!*\
  !*** ./node_modules/blurhash/dist/utils.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.sRGBToLinear = function (value) {
    var v = value / 255;
    if (v <= 0.04045) {
        return v / 12.92;
    }
    else {
        return Math.pow((v + 0.055) / 1.055, 2.4);
    }
};
exports.linearTosRGB = function (value) {
    var v = Math.max(0, Math.min(1, value));
    if (v <= 0.0031308) {
        return Math.round(v * 12.92 * 255 + 0.5);
    }
    else {
        return Math.round((1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255 + 0.5);
    }
};
exports.sign = function (n) { return (n < 0 ? -1 : 1); };
exports.signPow = function (val, exp) {
    return exports.sign(val) * Math.pow(Math.abs(val), exp);
};
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./polyfill */ "./resources/assets/js/polyfill.js");

window._ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
window.Popper = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js")["default"];
window.pixelfed = window.pixelfed || {};
window.$ = window.jQuery = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");

__webpack_require__(/*! bootstrap */ "./node_modules/bootstrap/dist/js/bootstrap.js");

window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

__webpack_require__(/*! readmore-js */ "./node_modules/readmore-js/readmore.js");

window.blurhash = __webpack_require__(/*! blurhash */ "./node_modules/blurhash/dist/index.js");
var token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
  window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
  console.error('CSRF token not found.');
}

window.App = window.App || {};

window.App.redirect = function () {
  document.querySelectorAll('a').forEach(function (i, k) {
    var a = i.getAttribute('href');

    if (a && a.length > 5 && a.startsWith('https://')) {
      var url = new URL(a);

      if (url.host !== window.location.host && url.pathname !== '/i/redirect') {
        i.setAttribute('href', '/i/redirect?url=' + encodeURIComponent(a));
      }
    }
  });
};

window.App.boot = function () {
  new Vue({
    el: '#content'
  });
};

window.App.util = {
  compose: {
    post: function post() {
      var path = window.location.pathname;
      var whitelist = ['/', '/timeline/public'];

      if (whitelist.includes(path)) {
        $('#composeModal').modal('show');
      } else {
        window.location.href = '/?a=co';
      }
    },
    circle: function circle() {
      console.log('Unsupported method.');
    },
    collection: function collection() {
      console.log('Unsupported method.');
    },
    loop: function loop() {
      console.log('Unsupported method.');
    },
    story: function story() {
      console.log('Unsupported method.');
    }
  },
  time: function time() {
    return new Date();
  },
  version: 1,
  format: {
    count: function count() {
      var _count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pt-BR';
      var notation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'compact';

      if (_count < 1) {
        return 0;
      }

      return new Intl.NumberFormat(locale, {
        notation: notation,
        compactDisplay: "short"
      }).format(_count);
    },
    timeAgo: function timeAgo(ts) {
      var date = Date.parse(ts);
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 63072000);

      if (interval >= 1) {
        return interval + "y";
      }

      interval = Math.floor(seconds / 604800);

      if (interval >= 1) {
        return interval + "w";
      }

      interval = Math.floor(seconds / 86400);

      if (interval >= 1) {
        return interval + "d";
      }

      interval = Math.floor(seconds / 3600);

      if (interval >= 1) {
        return interval + "h";
      }

      interval = Math.floor(seconds / 60);

      if (interval >= 1) {
        return interval + "m";
      }

      return Math.floor(seconds) + "s";
    },
    rewriteLinks: function rewriteLinks(i) {
      var tag = i.innerText;

      if (i.href.startsWith(window.location.origin)) {
        return i.href;
      }

      if (tag.startsWith('#') == true) {
        tag = '/discover/tags/' + tag.substr(1) + '?src=rph';
      } else if (tag.startsWith('@') == true) {
        tag = '/' + i.innerText + '?src=rpp';
      } else {
        tag = '/i/redirect?url=' + encodeURIComponent(tag);
      }

      return tag;
    }
  },
  filters: [['1977', 'filter-1977'], ['Aden', 'filter-aden'], ['Amaro', 'filter-amaro'], ['Ashby', 'filter-ashby'], ['Brannan', 'filter-brannan'], ['Brooklyn', 'filter-brooklyn'], ['Charmes', 'filter-charmes'], ['Clarendon', 'filter-clarendon'], ['Crema', 'filter-crema'], ['Dogpatch', 'filter-dogpatch'], ['Earlybird', 'filter-earlybird'], ['Gingham', 'filter-gingham'], ['Ginza', 'filter-ginza'], ['Hefe', 'filter-hefe'], ['Helena', 'filter-helena'], ['Hudson', 'filter-hudson'], ['Inkwell', 'filter-inkwell'], ['Kelvin', 'filter-kelvin'], ['Kuno', 'filter-juno'], ['Lark', 'filter-lark'], ['Lo-Fi', 'filter-lofi'], ['Ludwig', 'filter-ludwig'], ['Maven', 'filter-maven'], ['Mayfair', 'filter-mayfair'], ['Moon', 'filter-moon'], ['Nashville', 'filter-nashville'], ['Perpetua', 'filter-perpetua'], ['Poprocket', 'filter-poprocket'], ['Reyes', 'filter-reyes'], ['Rise', 'filter-rise'], ['Sierra', 'filter-sierra'], ['Skyline', 'filter-skyline'], ['Slumber', 'filter-slumber'], ['Stinson', 'filter-stinson'], ['Sutro', 'filter-sutro'], ['Toaster', 'filter-toaster'], ['Valencia', 'filter-valencia'], ['Vesper', 'filter-vesper'], ['Walden', 'filter-walden'], ['Willow', 'filter-willow'], ['X-Pro II', 'filter-xpro-ii']],
  filterCss: {
    'filter-1977': 'sepia(.5) hue-rotate(-30deg) saturate(1.4)',
    'filter-aden': 'sepia(.2) brightness(1.15) saturate(1.4)',
    'filter-amaro': 'sepia(.35) contrast(1.1) brightness(1.2) saturate(1.3)',
    'filter-ashby': 'sepia(.5) contrast(1.2) saturate(1.8)',
    'filter-brannan': 'sepia(.4) contrast(1.25) brightness(1.1) saturate(.9) hue-rotate(-2deg)',
    'filter-brooklyn': 'sepia(.25) contrast(1.25) brightness(1.25) hue-rotate(5deg)',
    'filter-charmes': 'sepia(.25) contrast(1.25) brightness(1.25) saturate(1.35) hue-rotate(-5deg)',
    'filter-clarendon': 'sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)',
    'filter-crema': 'sepia(.5) contrast(1.25) brightness(1.15) saturate(.9) hue-rotate(-2deg)',
    'filter-dogpatch': 'sepia(.35) saturate(1.1) contrast(1.5)',
    'filter-earlybird': 'sepia(.25) contrast(1.25) brightness(1.15) saturate(.9) hue-rotate(-5deg)',
    'filter-gingham': 'contrast(1.1) brightness(1.1)',
    'filter-ginza': 'sepia(.25) contrast(1.15) brightness(1.2) saturate(1.35) hue-rotate(-5deg)',
    'filter-hefe': 'sepia(.4) contrast(1.5) brightness(1.2) saturate(1.4) hue-rotate(-10deg)',
    'filter-helena': 'sepia(.5) contrast(1.05) brightness(1.05) saturate(1.35)',
    'filter-hudson': 'sepia(.25) contrast(1.2) brightness(1.2) saturate(1.05) hue-rotate(-15deg)',
    'filter-inkwell': 'brightness(1.25) contrast(.85) grayscale(1)',
    'filter-kelvin': 'sepia(.15) contrast(1.5) brightness(1.1) hue-rotate(-10deg)',
    'filter-juno': 'sepia(.35) contrast(1.15) brightness(1.15) saturate(1.8)',
    'filter-lark': 'sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)',
    'filter-lofi': 'saturate(1.1) contrast(1.5)',
    'filter-ludwig': 'sepia(.25) contrast(1.05) brightness(1.05) saturate(2)',
    'filter-maven': 'sepia(.35) contrast(1.05) brightness(1.05) saturate(1.75)',
    'filter-mayfair': 'contrast(1.1) brightness(1.15) saturate(1.1)',
    'filter-moon': 'brightness(1.4) contrast(.95) saturate(0) sepia(.35)',
    'filter-nashville': 'sepia(.25) contrast(1.5) brightness(.9) hue-rotate(-15deg)',
    'filter-perpetua': 'contrast(1.1) brightness(1.25) saturate(1.1)',
    'filter-poprocket': 'sepia(.15) brightness(1.2)',
    'filter-reyes': 'sepia(.75) contrast(.75) brightness(1.25) saturate(1.4)',
    'filter-rise': 'sepia(.25) contrast(1.25) brightness(1.2) saturate(.9)',
    'filter-sierra': 'sepia(.25) contrast(1.5) brightness(.9) hue-rotate(-15deg)',
    'filter-skyline': 'sepia(.15) contrast(1.25) brightness(1.25) saturate(1.2)',
    'filter-slumber': 'sepia(.35) contrast(1.25) saturate(1.25)',
    'filter-stinson': 'sepia(.35) contrast(1.25) brightness(1.1) saturate(1.25)',
    'filter-sutro': 'sepia(.4) contrast(1.2) brightness(.9) saturate(1.4) hue-rotate(-10deg)',
    'filter-toaster': 'sepia(.25) contrast(1.5) brightness(.95) hue-rotate(-15deg)',
    'filter-valencia': 'sepia(.25) contrast(1.1) brightness(1.1)',
    'filter-vesper': 'sepia(.35) contrast(1.15) brightness(1.2) saturate(1.3)',
    'filter-walden': 'sepia(.35) contrast(.8) brightness(1.25) saturate(1.4)',
    'filter-willow': 'brightness(1.2) contrast(.85) saturate(.05) sepia(.2)',
    'filter-xpro-ii': 'sepia(.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5deg)'
  },
  emoji: ['😂', '💯', '❤️', '🙌', '👏', '👌', '😍', '😯', '😢', '😅', '😁', '🙂', '😎', '😀', '🤣', '😃', '😄', '😆', '😉', '😊', '😋', '😘', '😗', '😙', '😚', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '🤑', '😲', '🙁', '😖', '😞', '😟', '😤', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '😰', '😱', '😳', '🤪', '😵', '😡', '😠', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '😇', '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🤓', '😈', '👿', '👹', '👺', '💀', '👻', '👽', '🤖', '💩', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🤲', '👐', '🤝', '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌️', '🤟', '🤘', '👈', '👉', '👆', '👇', '☝️', '✋', '🤚', '🖐', '🖖', '👋', '🤙', '💪', '🖕', '✍️', '🙏', '💍', '💄', '💋', '👄', '👅', '👂', '👃', '👣', '👁', '👀', '🧠', '🗣', '👤', '👥'],
  embed: {
    post: function post(url) {
      var caption = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var likes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var layout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'full';
      var u = url + '/embed?';
      u += caption ? 'caption=true&' : 'caption=false&';
      u += likes ? 'likes=true&' : 'likes=false&';
      u += layout == 'compact' ? 'layout=compact' : 'layout=full';
      return '<iframe src="' + u + '" class="pixelfed__embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script async defer src="' + window.location.origin + '/embed.js"><\/script>';
    },
    profile: function profile(url) {
      var u = url + '/embed';
      return '<iframe src="' + u + '" class="pixelfed__embed" style="max-width: 100%; border: 0" width="400" allowfullscreen="allowfullscreen"></iframe><script async defer src="' + window.location.origin + '/embed.js"><\/script>';
    }
  },
  clipboard: function clipboard(data) {
    return navigator.clipboard.writeText(data);
  },
  navatar: function navatar() {
    $('#navbarDropdown .far').addClass('d-none');
    $('#navbarDropdown img').attr('src', window._sharedData.curUser.avatar).removeClass('d-none').addClass('rounded-circle border shadow').attr('width', 34).attr('height', 34);
  }
};

/***/ }),

/***/ "./resources/assets/js/polyfill.js":
/*!*****************************************!*\
  !*** ./resources/assets/js/polyfill.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* Blob.js
 * A Blob, File, FileReader & URL implementation.
 * 2019-04-19
 *
 * By Eli Grey, http://eligrey.com
 * By Jimmy Wärting, https://github.com/jimmywarting
 * License: MIT
 *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
 */
;

(function () {
  var global = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' ? self : this;
  var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

  global.URL = global.URL || global.webkitURL || function (href, a) {
    a = document.createElement('a');
    a.href = href;
    return a;
  };

  var origBlob = global.Blob;
  var createObjectURL = URL.createObjectURL;
  var revokeObjectURL = URL.revokeObjectURL;
  var strTag = global.Symbol && global.Symbol.toStringTag;
  var blobSupported = false;
  var blobSupportsArrayBufferView = false;
  var arrayBufferSupported = !!global.ArrayBuffer;
  var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

  try {
    // Check if Blob constructor is supported
    blobSupported = new Blob(['ä']).size === 2; // Check if Blob constructor supports ArrayBufferViews
    // Fails in Safari 6, so we need to map to ArrayBuffers there.

    blobSupportsArrayBufferView = new Blob([new Uint8Array([1, 2])]).size === 2;
  } catch (e) {}
  /**
   * Helper function that maps ArrayBufferViews to ArrayBuffers
   * Used by BlobBuilder constructor and old browsers that didn't
   * support it in the Blob constructor.
   */


  function mapArrayBufferViews(ary) {
    return ary.map(function (chunk) {
      if (chunk.buffer instanceof ArrayBuffer) {
        var buf = chunk.buffer; // if this is a subarray, make a copy so we only
        // include the subarray region from the underlying buffer

        if (chunk.byteLength !== buf.byteLength) {
          var copy = new Uint8Array(chunk.byteLength);
          copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
          buf = copy.buffer;
        }

        return buf;
      }

      return chunk;
    });
  }

  function BlobBuilderConstructor(ary, options) {
    options = options || {};
    var bb = new BlobBuilder();
    mapArrayBufferViews(ary).forEach(function (part) {
      bb.append(part);
    });
    return options.type ? bb.getBlob(options.type) : bb.getBlob();
  }

  function BlobConstructor(ary, options) {
    return new origBlob(mapArrayBufferViews(ary), options || {});
  }

  if (global.Blob) {
    BlobBuilderConstructor.prototype = Blob.prototype;
    BlobConstructor.prototype = Blob.prototype;
  }
  /********************************************************/

  /*               String Encoder fallback                */

  /********************************************************/


  function stringEncode(string) {
    var pos = 0;
    var len = string.length;
    var Arr = global.Uint8Array || Array; // Use byte array when possible

    var at = 0; // output position

    var tlen = Math.max(32, len + (len >> 1) + 7); // 1.5x size

    var target = new Arr(tlen >> 3 << 3); // ... but at 8 byte offset

    while (pos < len) {
      var value = string.charCodeAt(pos++);

      if (value >= 0xd800 && value <= 0xdbff) {
        // high surrogate
        if (pos < len) {
          var extra = string.charCodeAt(pos);

          if ((extra & 0xfc00) === 0xdc00) {
            ++pos;
            value = ((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000;
          }
        }

        if (value >= 0xd800 && value <= 0xdbff) {
          continue; // drop lone surrogate
        }
      } // expand the buffer if we couldn't write 4 bytes


      if (at + 4 > target.length) {
        tlen += 8; // minimum extra

        tlen *= 1.0 + pos / string.length * 2; // take 2x the remaining

        tlen = tlen >> 3 << 3; // 8 byte offset

        var update = new Uint8Array(tlen);
        update.set(target);
        target = update;
      }

      if ((value & 0xffffff80) === 0) {
        // 1-byte
        target[at++] = value; // ASCII

        continue;
      } else if ((value & 0xfffff800) === 0) {
        // 2-byte
        target[at++] = value >> 6 & 0x1f | 0xc0;
      } else if ((value & 0xffff0000) === 0) {
        // 3-byte
        target[at++] = value >> 12 & 0x0f | 0xe0;
        target[at++] = value >> 6 & 0x3f | 0x80;
      } else if ((value & 0xffe00000) === 0) {
        // 4-byte
        target[at++] = value >> 18 & 0x07 | 0xf0;
        target[at++] = value >> 12 & 0x3f | 0x80;
        target[at++] = value >> 6 & 0x3f | 0x80;
      } else {
        // FIXME: do we care
        continue;
      }

      target[at++] = value & 0x3f | 0x80;
    }

    return target.slice(0, at);
  }
  /********************************************************/

  /*               String Decoder fallback                */

  /********************************************************/


  function stringDecode(buf) {
    var end = buf.length;
    var res = [];
    var i = 0;

    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;

        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 0x80) {
              codePoint = firstByte;
            }

            break;

          case 2:
            secondByte = buf[i + 1];

            if ((secondByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;

              if (tempCodePoint > 0x7F) {
                codePoint = tempCodePoint;
              }
            }

            break;

          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];

            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;

              if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                codePoint = tempCodePoint;
              }
            }

            break;

          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];

            if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
              tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;

              if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                codePoint = tempCodePoint;
              }
            }

        }
      }

      if (codePoint === null) {
        // we did not generate a valid codePoint so insert a
        // replacement char (U+FFFD) and advance only 1 byte
        codePoint = 0xFFFD;
        bytesPerSequence = 1;
      } else if (codePoint > 0xFFFF) {
        // encode to utf16 (surrogate pair dance)
        codePoint -= 0x10000;
        res.push(codePoint >>> 10 & 0x3FF | 0xD800);
        codePoint = 0xDC00 | codePoint & 0x3FF;
      }

      res.push(codePoint);
      i += bytesPerSequence;
    }

    var len = res.length;
    var str = '';
    var i = 0;

    while (i < len) {
      str += String.fromCharCode.apply(String, res.slice(i, i += 0x1000));
    }

    return str;
  } // string -> buffer


  var textEncode = typeof TextEncoder === 'function' ? TextEncoder.prototype.encode.bind(new TextEncoder()) : stringEncode; // buffer -> string

  var textDecode = typeof TextDecoder === 'function' ? TextDecoder.prototype.decode.bind(new TextDecoder()) : stringDecode;

  function FakeBlobBuilder() {
    function isDataView(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj);
    }

    function bufferClone(buf) {
      var view = new Array(buf.byteLength);
      var array = new Uint8Array(buf);
      var i = view.length;

      while (i--) {
        view[i] = array[i];
      }

      return view;
    }

    function array2base64(input) {
      var byteToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
      var output = [];

      for (var i = 0; i < input.length; i += 3) {
        var byte1 = input[i];
        var haveByte2 = i + 1 < input.length;
        var byte2 = haveByte2 ? input[i + 1] : 0;
        var haveByte3 = i + 2 < input.length;
        var byte3 = haveByte3 ? input[i + 2] : 0;
        var outByte1 = byte1 >> 2;
        var outByte2 = (byte1 & 0x03) << 4 | byte2 >> 4;
        var outByte3 = (byte2 & 0x0F) << 2 | byte3 >> 6;
        var outByte4 = byte3 & 0x3F;

        if (!haveByte3) {
          outByte4 = 64;

          if (!haveByte2) {
            outByte3 = 64;
          }
        }

        output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
      }

      return output.join('');
    }

    var create = Object.create || function (a) {
      function c() {}

      c.prototype = a;
      return new c();
    };

    if (arrayBufferSupported) {
      var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

      var isArrayBufferView = ArrayBuffer.isView || function (obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
      };
    }

    function concatTypedarrays(chunks) {
      var size = 0;
      var i = chunks.length;

      while (i--) {
        size += chunks[i].length;
      }

      var b = new Uint8Array(size);
      var offset = 0;

      for (i = 0, l = chunks.length; i < l; i++) {
        var chunk = chunks[i];
        b.set(chunk, offset);
        offset += chunk.byteLength || chunk.length;
      }

      return b;
    }
    /********************************************************/

    /*                   Blob constructor                   */

    /********************************************************/


    function Blob(chunks, opts) {
      chunks = chunks || [];
      opts = opts == null ? {} : opts;

      for (var i = 0, len = chunks.length; i < len; i++) {
        var chunk = chunks[i];

        if (chunk instanceof Blob) {
          chunks[i] = chunk._buffer;
        } else if (typeof chunk === 'string') {
          chunks[i] = textEncode(chunk);
        } else if (arrayBufferSupported && (ArrayBuffer.prototype.isPrototypeOf(chunk) || isArrayBufferView(chunk))) {
          chunks[i] = bufferClone(chunk);
        } else if (arrayBufferSupported && isDataView(chunk)) {
          chunks[i] = bufferClone(chunk.buffer);
        } else {
          chunks[i] = textEncode(String(chunk));
        }
      }

      this._buffer = global.Uint8Array ? concatTypedarrays(chunks) : [].concat.apply([], chunks);
      this.size = this._buffer.length;
      this.type = opts.type || '';

      if (/[^\u0020-\u007E]/.test(this.type)) {
        this.type = '';
      } else {
        this.type = this.type.toLowerCase();
      }
    }

    Blob.prototype.arrayBuffer = function () {
      return Promise.resolve(this._buffer);
    };

    Blob.prototype.text = function () {
      return Promise.resolve(textDecode(this._buffer));
    };

    Blob.prototype.slice = function (start, end, type) {
      var slice = this._buffer.slice(start || 0, end || this._buffer.length);

      return new Blob([slice], {
        type: type
      });
    };

    Blob.prototype.toString = function () {
      return '[object Blob]';
    };
    /********************************************************/

    /*                   File constructor                   */

    /********************************************************/


    function File(chunks, name, opts) {
      opts = opts || {};
      var a = Blob.call(this, chunks, opts) || this;
      a.name = name.replace(/\//g, ':');
      a.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();
      a.lastModified = +a.lastModifiedDate;
      return a;
    }

    File.prototype = create(Blob.prototype);
    File.prototype.constructor = File;

    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(File, Blob);
    } else {
      try {
        File.__proto__ = Blob;
      } catch (e) {}
    }

    File.prototype.toString = function () {
      return '[object File]';
    };
    /********************************************************/

    /*                FileReader constructor                */

    /********************************************************/


    function FileReader() {
      if (!(this instanceof FileReader)) {
        throw new TypeError("Failed to construct 'FileReader': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
      }

      var delegate = document.createDocumentFragment();
      this.addEventListener = delegate.addEventListener;

      this.dispatchEvent = function (evt) {
        var local = this['on' + evt.type];
        if (typeof local === 'function') local(evt);
        delegate.dispatchEvent(evt);
      };

      this.removeEventListener = delegate.removeEventListener;
    }

    function _read(fr, blob, kind) {
      if (!(blob instanceof Blob)) {
        throw new TypeError("Failed to execute '" + kind + "' on 'FileReader': parameter 1 is not of type 'Blob'.");
      }

      fr.result = '';
      setTimeout(function () {
        this.readyState = FileReader.LOADING;
        fr.dispatchEvent(new Event('load'));
        fr.dispatchEvent(new Event('loadend'));
      });
    }

    FileReader.EMPTY = 0;
    FileReader.LOADING = 1;
    FileReader.DONE = 2;
    FileReader.prototype.error = null;
    FileReader.prototype.onabort = null;
    FileReader.prototype.onerror = null;
    FileReader.prototype.onload = null;
    FileReader.prototype.onloadend = null;
    FileReader.prototype.onloadstart = null;
    FileReader.prototype.onprogress = null;

    FileReader.prototype.readAsDataURL = function (blob) {
      _read(this, blob, 'readAsDataURL');

      this.result = 'data:' + blob.type + ';base64,' + array2base64(blob._buffer);
    };

    FileReader.prototype.readAsText = function (blob) {
      _read(this, blob, 'readAsText');

      this.result = textDecode(blob._buffer);
    };

    FileReader.prototype.readAsArrayBuffer = function (blob) {
      _read(this, blob, 'readAsText'); // return ArrayBuffer when possible


      this.result = (blob._buffer.buffer || blob._buffer).slice();
    };

    FileReader.prototype.abort = function () {};
    /********************************************************/

    /*                         URL                          */

    /********************************************************/


    URL.createObjectURL = function (blob) {
      return blob instanceof Blob ? 'data:' + blob.type + ';base64,' + array2base64(blob._buffer) : createObjectURL.call(URL, blob);
    };

    URL.revokeObjectURL = function (url) {
      revokeObjectURL && revokeObjectURL.call(URL, url);
    };
    /********************************************************/

    /*                         XHR                          */

    /********************************************************/


    var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;

    if (_send) {
      XMLHttpRequest.prototype.send = function (data) {
        if (data instanceof Blob) {
          this.setRequestHeader('Content-Type', data.type);

          _send.call(this, textDecode(data._buffer));
        } else {
          _send.call(this, data);
        }
      };
    }

    global.FileReader = FileReader;
    global.File = File;
    global.Blob = Blob;
  }

  function fixFileAndXHR() {
    var isIE = !!global.ActiveXObject || '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style; // Monkey patched
    // IE don't set Content-Type header on XHR whose body is a typed Blob
    // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/6047383

    var _send = global.XMLHttpRequest && global.XMLHttpRequest.prototype.send;

    if (isIE && _send) {
      XMLHttpRequest.prototype.send = function (data) {
        if (data instanceof Blob) {
          this.setRequestHeader('Content-Type', data.type);

          _send.call(this, data);
        } else {
          _send.call(this, data);
        }
      };
    }

    try {
      new File([], '');
    } catch (e) {
      try {
        var klass = new Function('class File extends Blob {' + 'constructor(chunks, name, opts) {' + 'opts = opts || {};' + 'super(chunks, opts || {});' + 'this.name = name.replace(/\//g, ":");' + 'this.lastModifiedDate = opts.lastModified ? new Date(opts.lastModified) : new Date();' + 'this.lastModified = +this.lastModifiedDate;' + '}};' + 'return new File([], ""), File')();
        global.File = klass;
      } catch (e) {
        var klass = function klass(b, d, c) {
          var blob = new Blob(b, c);
          var t = c && void 0 !== c.lastModified ? new Date(c.lastModified) : new Date();
          blob.name = d.replace(/\//g, ':');
          blob.lastModifiedDate = t;
          blob.lastModified = +t;

          blob.toString = function () {
            return '[object File]';
          };

          if (strTag) {
            blob[strTag] = 'File';
          }

          return blob;
        };

        global.File = klass;
      }
    }
  }

  if (blobSupported) {
    fixFileAndXHR();
    global.Blob = blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    fixFileAndXHR();
    global.Blob = BlobBuilderConstructor;
  } else {
    FakeBlobBuilder();
  }

  if (strTag) {
    File.prototype[strTag] = 'File';
    Blob.prototype[strTag] = 'Blob';
    FileReader.prototype[strTag] = 'FileReader';
  }

  var blob = global.Blob.prototype;
  var stream;

  function promisify(obj) {
    return new Promise(function (resolve, reject) {
      obj.onload = obj.onerror = function (evt) {
        obj.onload = obj.onerror = null;
        evt.type === 'load' ? resolve(obj.result || obj) : reject(new Error('Failed to read the blob/file'));
      };
    });
  }

  try {
    new ReadableStream({
      type: 'bytes'
    });

    stream = function stream() {
      var position = 0;
      var blob = this;
      return new ReadableStream({
        type: 'bytes',
        autoAllocateChunkSize: 524288,
        pull: function pull(controller) {
          var v = controller.byobRequest.view;
          var chunk = blob.slice(position, position + v.byteLength);
          return chunk.arrayBuffer().then(function (buffer) {
            var uint8array = new Uint8Array(buffer);
            var bytesRead = uint8array.byteLength;
            position += bytesRead;
            v.set(uint8array);
            controller.byobRequest.respond(bytesRead);
            if (position >= blob.size) controller.close();
          });
        }
      });
    };
  } catch (e) {
    try {
      new ReadableStream({});

      stream = function stream(blob) {
        var position = 0;
        var blob = this;
        return new ReadableStream({
          pull: function pull(controller) {
            var chunk = blob.slice(position, position + 524288);
            return chunk.arrayBuffer().then(function (buffer) {
              position += buffer.byteLength;
              var uint8array = new Uint8Array(buffer);
              controller.enqueue(uint8array);
              if (position == blob.size) controller.close();
            });
          }
        });
      };
    } catch (e) {
      try {
        new Response('').body.getReader().read();

        stream = function stream() {
          return new Response(this).body;
        };
      } catch (e) {
        stream = function stream() {
          throw new Error('Include https://github.com/MattiasBuelens/web-streams-polyfill');
        };
      }
    }
  }

  if (!blob.arrayBuffer) {
    blob.arrayBuffer = function arrayBuffer() {
      var fr = new FileReader();
      fr.readAsArrayBuffer(this);
      return promisify(fr);
    };
  }

  if (!blob.text) {
    blob.text = function text() {
      var fr = new FileReader();
      fr.readAsText(this);
      return promisify(fr);
    };
  }

  if (!blob.stream) {
    blob.stream = stream;
  }
})();
/* canvas-toBlob.js
 * A canvas.toBlob() implementation.
 * 2016-05-26
 * 
 * By Eli Grey, http://eligrey.com and Devin Samarin, https://github.com/eboyjr
 * License: MIT
 *   See https://github.com/eligrey/canvas-toBlob.js/blob/master/LICENSE.md
 */

/*global self */

/*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
  plusplus: true */

/*! @source http://purl.eligrey.com/github/canvas-toBlob.js/blob/master/canvas-toBlob.js */


(function (view) {
  "use strict";

  var Uint8Array = view.Uint8Array,
      HTMLCanvasElement = view.HTMLCanvasElement,
      canvas_proto = HTMLCanvasElement && HTMLCanvasElement.prototype,
      is_base64_regex = /\s*;\s*base64\s*(?:;|$)/i,
      to_data_url = "toDataURL",
      base64_ranks,
      decode_base64 = function decode_base64(base64) {
    var len = base64.length,
        buffer = new Uint8Array(len / 4 * 3 | 0),
        i = 0,
        outptr = 0,
        last = [0, 0],
        state = 0,
        save = 0,
        rank,
        code,
        undef;

    while (len--) {
      code = base64.charCodeAt(i++);
      rank = base64_ranks[code - 43];

      if (rank !== 255 && rank !== undef) {
        last[1] = last[0];
        last[0] = code;
        save = save << 6 | rank;
        state++;

        if (state === 4) {
          buffer[outptr++] = save >>> 16;

          if (last[1] !== 61
          /* padding character */
          ) {
              buffer[outptr++] = save >>> 8;
            }

          if (last[0] !== 61
          /* padding character */
          ) {
              buffer[outptr++] = save;
            }

          state = 0;
        }
      }
    } // 2/3 chance there's going to be some null bytes at the end, but that
    // doesn't really matter with most image formats.
    // If it somehow matters for you, truncate the buffer up outptr.


    return buffer;
  };

  if (Uint8Array) {
    base64_ranks = new Uint8Array([62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, 0, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]);
  }

  if (HTMLCanvasElement && (!canvas_proto.toBlob || !canvas_proto.toBlobHD)) {
    if (!canvas_proto.toBlob) canvas_proto.toBlob = function (callback, type
    /*, ...args*/
    ) {
      if (!type) {
        type = "image/png";
      }

      if (this.mozGetAsFile) {
        callback(this.mozGetAsFile("canvas", type));
        return;
      }

      if (this.msToBlob && /^\s*image\/png\s*(?:$|;)/i.test(type)) {
        callback(this.msToBlob());
        return;
      }

      var args = Array.prototype.slice.call(arguments, 1),
          dataURI = this[to_data_url].apply(this, args),
          header_end = dataURI.indexOf(","),
          data = dataURI.substring(header_end + 1),
          is_base64 = is_base64_regex.test(dataURI.substring(0, header_end)),
          blob;

      if (Blob.fake) {
        // no reason to decode a data: URI that's just going to become a data URI again
        blob = new Blob();

        if (is_base64) {
          blob.encoding = "base64";
        } else {
          blob.encoding = "URI";
        }

        blob.data = data;
        blob.size = data.length;
      } else if (Uint8Array) {
        if (is_base64) {
          blob = new Blob([decode_base64(data)], {
            type: type
          });
        } else {
          blob = new Blob([decodeURIComponent(data)], {
            type: type
          });
        }
      }

      callback(blob);
    };

    if (!canvas_proto.toBlobHD && canvas_proto.toDataURLHD) {
      canvas_proto.toBlobHD = function () {
        to_data_url = "toDataURLHD";
        var blob = this.toBlob();
        to_data_url = "toDataURL";
        return blob;
      };
    } else {
      canvas_proto.toBlobHD = canvas_proto.toBlob;
    }
  }
})(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content || this);

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/appdark.scss":
/*!********************************************!*\
  !*** ./resources/assets/sass/appdark.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/landing.scss":
/*!********************************************!*\
  !*** ./resources/assets/sass/landing.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/assets/sass/quill.scss":
/*!******************************************!*\
  !*** ./resources/assets/sass/quill.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!****************************************************************************************************************************************************************************************!*\
  !*** multi ./resources/assets/js/app.js ./resources/assets/sass/app.scss ./resources/assets/sass/appdark.scss ./resources/assets/sass/landing.scss ./resources/assets/sass/quill.scss ***!
  \****************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /workspace/pixelfed/resources/assets/js/app.js */"./resources/assets/js/app.js");
__webpack_require__(/*! /workspace/pixelfed/resources/assets/sass/app.scss */"./resources/assets/sass/app.scss");
__webpack_require__(/*! /workspace/pixelfed/resources/assets/sass/appdark.scss */"./resources/assets/sass/appdark.scss");
__webpack_require__(/*! /workspace/pixelfed/resources/assets/sass/landing.scss */"./resources/assets/sass/landing.scss");
module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/sass/quill.scss */"./resources/assets/sass/quill.scss");


/***/ })

},[[0,"/js/manifest","/js/vendor"]]]);