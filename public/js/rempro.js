(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/rempro"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemoteProfile.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['profile-id'],
  data: function data() {
    return {
      id: [],
      user: false,
      profile: {},
      feed: [],
      min_id: null,
      max_id: null,
      loading: true,
      owner: false,
      layoutType: true,
      relationship: null,
      warning: false,
      ctxMenuStatus: false,
      ctxMenuRelationship: false,
      fetchingRemotePosts: false,
      showMutualFollowers: false
    };
  },
  beforeMount: function beforeMount() {
    this.fetchRelationships();
    this.fetchProfile();
  },
  methods: {
    fetchProfile: function fetchProfile() {
      var _this = this;

      axios.get('/api/pixelfed/v1/accounts/verify_credentials').then(function (res) {
        _this.user = res.data;
        window._sharedData.curUser = res.data;
        window.App.util.navatar();
      });
      axios.get('/api/pixelfed/v1/accounts/' + this.profileId).then(function (res) {
        _this.profile = res.data;

        _this.fetchPosts();
      });
    },
    fetchPosts: function fetchPosts() {
      var _this2 = this;

      var apiUrl = '/api/pixelfed/v1/accounts/' + this.profileId + '/statuses';
      axios.get(apiUrl, {
        params: {
          only_media: true,
          min_id: 1
        }
      }).then(function (res) {
        var data = res.data.filter(function (status) {
          return status.media_attachments.length > 0;
        }).map(function (status) {
          return {
            id: status.id,
            caption: {
              text: status.content_text,
              html: status.content
            },
            count: {
              likes: status.favourites_count,
              shares: status.reblogs_count,
              comments: status.reply_count
            },
            thumb: status.media_attachments[0].url,
            media: status.media_attachments,
            timestamp: status.created_at,
            type: status.pf_type,
            url: status.url,
            sensitive: status.sensitive,
            cw: status.sensitive,
            spoiler_text: status.spoiler_text
          };
        });
        var ids = data.map(function (status) {
          return status.id;
        });
        _this2.ids = ids;
        _this2.min_id = Math.max.apply(Math, _toConsumableArray(ids));
        _this2.max_id = Math.min.apply(Math, _toConsumableArray(ids));
        _this2.feed = data;
        _this2.loading = false; //this.loadSponsor();
      })["catch"](function (err) {
        swal('Oops, something went wrong', 'Please release the page.', 'error');
      });
    },
    fetchRelationships: function fetchRelationships() {
      var _this3 = this;

      if (document.querySelectorAll('body')[0].classList.contains('loggedIn') == false) {
        return;
      }

      axios.get('/api/pixelfed/v1/accounts/relationships', {
        params: {
          'id[]': this.profileId
        }
      }).then(function (res) {
        if (res.data.length) {
          _this3.relationship = res.data[0];

          if (res.data[0].blocking == true) {
            _this3.loading = false;
            _this3.warning = true;
          }
        }
      });
    },
    postPreviewUrl: function postPreviewUrl(post) {
      return 'background: url("' + post.thumb + '");background-size:cover';
    },
    timestampFormat: function timestampFormat(timestamp) {
      var ts = new Date(timestamp);
      return ts.toDateString() + ' ' + ts.toLocaleTimeString();
    },
    remoteProfileUrl: function remoteProfileUrl(profile) {
      return '/i/web/profile/_/' + profile.id;
    },
    remotePostUrl: function remotePostUrl(status) {
      return '/i/web/post/_/' + this.profile.id + '/' + status.id;
    },
    followProfile: function followProfile() {
      var _this4 = this;

      axios.post('/i/follow', {
        item: this.profileId
      }).then(function (res) {
        swal('Followed', 'You are now following ' + _this4.profile.username + '!', 'success');
        _this4.relationship.following = true;
      })["catch"](function (err) {
        swal('Oops!', 'Something went wrong, please try again later.', 'error');
      });
    },
    unfollowProfile: function unfollowProfile() {
      var _this5 = this;

      axios.post('/i/follow', {
        item: this.profileId
      }).then(function (res) {
        swal('Unfollowed', 'You are no longer following ' + _this5.profile.username + '.', 'warning');
        _this5.relationship.following = false;
      })["catch"](function (err) {
        swal('Oops!', 'Something went wrong, please try again later.', 'error');
      });
    },
    showCtxMenu: function showCtxMenu() {
      this.$refs.visitorContextMenu.show();
    },
    copyProfileLink: function copyProfileLink() {
      navigator.clipboard.writeText(window.location.href);
      this.$refs.visitorContextMenu.hide();
    },
    muteProfile: function muteProfile() {
      var _this6 = this;

      var id = this.profileId;
      axios.post('/i/mute', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this6.fetchRelationships();

        _this6.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully muted ' + _this6.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
      this.$refs.visitorContextMenu.hide();
    },
    unmuteProfile: function unmuteProfile() {
      var _this7 = this;

      var id = this.profileId;
      axios.post('/i/unmute', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this7.fetchRelationships();

        _this7.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully unmuted ' + _this7.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
      this.$refs.visitorContextMenu.hide();
    },
    blockProfile: function blockProfile() {
      var _this8 = this;

      var id = this.profileId;
      axios.post('/i/block', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this8.warning = true;

        _this8.fetchRelationships();

        _this8.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully blocked ' + _this8.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
      this.$refs.visitorContextMenu.hide();
    },
    unblockProfile: function unblockProfile() {
      var _this9 = this;

      var id = this.profileId;
      axios.post('/i/unblock', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this9.warning = false;

        _this9.fetchRelationships();

        _this9.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully unblocked ' + _this9.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
      this.$refs.visitorContextMenu.hide();
    },
    reportProfile: function reportProfile() {
      window.location.href = '/l/i/report?type=profile&id=' + this.profileId;
      this.$refs.visitorContextMenu.hide();
    },
    ctxMenu: function ctxMenu(status) {
      this.ctxMenuStatus = status;
      var self = this;
      axios.get('/api/pixelfed/v1/accounts/relationships', {
        params: {
          'id[]': self.profileId
        }
      }).then(function (res) {
        self.ctxMenuRelationship = res.data[0];
        self.$refs.ctxModal.show();
      });
    },
    closeCtxMenu: function closeCtxMenu() {
      this.ctxMenuStatus = false;
      this.ctxMenuRelationship = false;
      this.$refs.ctxModal.hide();
    },
    ctxMenuCopyLink: function ctxMenuCopyLink() {
      var status = this.ctxMenuStatus;
      navigator.clipboard.writeText(status.url);
      this.closeCtxMenu();
      return;
    },
    ctxMenuGoToPost: function ctxMenuGoToPost() {
      var status = this.ctxMenuStatus;
      window.location.href = this.statusUrl(status);
      this.closeCtxMenu();
      return;
    },
    statusUrl: function statusUrl(status) {
      return '/i/web/post/_/' + this.profile.id + '/' + status.id;
    },
    deletePost: function deletePost(status) {
      var _this10 = this;

      if (this.user.is_admin == false) {
        return;
      }

      if (window.confirm('Are you sure you want to delete this post?') == false) {
        return;
      }

      axios.post('/i/delete', {
        type: 'status',
        item: status.id
      }).then(function (res) {
        _this10.feed = _this10.feed.filter(function (s) {
          return s.id != status.id;
        });

        _this10.$refs.ctxModal.hide();
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    manuallyFetchRemotePosts: function manuallyFetchRemotePosts($event) {
      this.fetchingRemotePosts = true;
      event.target.blur();
      swal('Fetching Remote Posts', 'Check back in a few minutes!', 'info');
    },
    timeAgo: function timeAgo(ts) {
      var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (ts == null) {
        return 'never';
      }

      suffix = suffix ? ' ' + suffix : '';
      return App.util.format.timeAgo(ts) + suffix;
    },
    urlRedirectHandler: function urlRedirectHandler(url) {
      var p = new URL(url);
      var path = '';

      if (p.hostname == window.location.hostname) {
        path = url;
      } else {
        path = '/i/redirect?url=';
        path += encodeURI(url);
      }

      window.location.href = path;
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n@media (min-width: 1200px) {\n.container[data-v-6095ac5c] {\n\t\tmax-width: 1050px;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _vm.relationship && _vm.relationship.blocking && _vm.warning
      ? _c("div", { staticClass: "bg-white pt-3 border-bottom" }, [
          _c("div", { staticClass: "container" }, [
            _c("p", { staticClass: "text-center font-weight-bold" }, [
              _vm._v("You are blocking this account")
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "text-center font-weight-bold" }, [
              _vm._v("Click "),
              _c(
                "a",
                {
                  staticClass: "cursor-pointer",
                  attrs: { href: "#" },
                  on: {
                    click: function($event) {
                      $event.preventDefault()
                      _vm.warning = false
                    }
                  }
                },
                [_vm._v("here")]
              ),
              _vm._v(" to view profile")
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.loading
      ? _c(
          "div",
          {
            staticClass: "d-flex justify-content-center align-items-center",
            staticStyle: { height: "80vh" }
          },
          [_c("img", { attrs: { src: "/img/pixelfed-icon-grey.svg" } })]
        )
      : _vm._e(),
    _vm._v(" "),
    !_vm.loading && !_vm.warning
      ? _c(
          "div",
          { staticClass: "container" },
          [
            _c("div", { staticClass: "row" }, [
              _c("div", { staticClass: "col-12 col-md-4 pt-5" }, [
                _c("div", { staticClass: "card shadow-none border" }, [
                  _c("div", { staticClass: "card-header p-0 m-0" }, [
                    _vm.profile.header_bg
                      ? _c("img", {
                          staticStyle: {
                            width: "100%",
                            height: "140px",
                            "object-fit": "cover"
                          },
                          attrs: { src: _vm.profile.header_bg }
                        })
                      : _c("div", {
                          staticClass: "bg-primary",
                          staticStyle: { width: "100%", height: "140px" }
                        })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-body pb-0" }, [
                    _c("div", { staticClass: "mt-n5 mb-3" }, [
                      _c("img", {
                        staticClass:
                          "rounded-circle p-1 border mt-n4 bg-white shadow",
                        attrs: {
                          src: _vm.profile.avatar,
                          width: "90px",
                          height: "90px;"
                        }
                      }),
                      _vm._v(" "),
                      _c("span", { staticClass: "float-right mt-n1" }, [
                        _c("span", [
                          _vm.relationship &&
                          _vm.relationship.following == false
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-light py-0 px-3 mt-n1",
                                  staticStyle: {
                                    "font-size": "13px",
                                    "font-weight": "500"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.followProfile()
                                    }
                                  }
                                },
                                [_vm._v("Follow")]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm.relationship && _vm.relationship.following == true
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-light py-0 px-3 mt-n1",
                                  staticStyle: {
                                    "font-size": "13px",
                                    "font-weight": "500"
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.unfollowProfile()
                                    }
                                  }
                                },
                                [_vm._v("Unfollow")]
                              )
                            : _vm._e()
                        ]),
                        _vm._v(" "),
                        _c("span", { staticClass: "mx-2" }, [
                          _c(
                            "a",
                            {
                              staticClass: "btn btn-outline-light btn-sm mt-n1",
                              staticStyle: {
                                "padding-top": "2px",
                                "padding-bottom": "1px"
                              },
                              attrs: {
                                href: "/account/direct/t/" + _vm.profile.id
                              }
                            },
                            [
                              _c("i", {
                                staticClass:
                                  "far fa-comment-dots cursor-pointer",
                                staticStyle: { "font-size": "13px" }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _c(
                            "button",
                            {
                              staticClass: "btn btn-outline-light btn-sm mt-n1",
                              staticStyle: {
                                "padding-top": "2px",
                                "padding-bottom": "1px"
                              },
                              on: {
                                click: function($event) {
                                  return _vm.showCtxMenu()
                                }
                              }
                            },
                            [
                              _c("i", {
                                staticClass: "fas fa-cog cursor-pointer",
                                staticStyle: { "font-size": "13px" }
                              })
                            ]
                          )
                        ])
                      ])
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "pl-2 h4 font-weight-bold mb-1" }, [
                      _vm._v(_vm._s(_vm.profile.display_name))
                    ]),
                    _vm._v(" "),
                    _c("p", { staticClass: "pl-2 font-weight-bold mb-2" }, [
                      _c(
                        "a",
                        {
                          staticClass: "text-muted",
                          attrs: { href: _vm.profile.url },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.urlRedirectHandler(_vm.profile.url)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.profile.acct))]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "p",
                      {
                        staticClass:
                          "pl-2 text-muted small d-flex justify-content-between"
                      },
                      [
                        _c("span", [
                          _c(
                            "span",
                            { staticClass: "font-weight-bold text-dark" },
                            [_vm._v(_vm._s(_vm.profile.statuses_count))]
                          ),
                          _vm._v(" "),
                          _c("span", [_vm._v("Posts")])
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _c(
                            "span",
                            { staticClass: "font-weight-bold text-dark" },
                            [_vm._v(_vm._s(_vm.profile.following_count))]
                          ),
                          _vm._v(" "),
                          _c("span", [_vm._v("Following")])
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _c(
                            "span",
                            { staticClass: "font-weight-bold text-dark" },
                            [_vm._v(_vm._s(_vm.profile.followers_count))]
                          ),
                          _vm._v(" "),
                          _c("span", [_vm._v("Followers")])
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c("p", {
                      staticClass: "pl-2 text-muted small pt-2",
                      domProps: { innerHTML: _vm._s(_vm.profile.note) }
                    })
                  ])
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "small text-lighter p-2" }, [
                  _vm._v("Last updated: "),
                  _c(
                    "time",
                    { attrs: { datetime: _vm.profile.last_fetched_at } },
                    [
                      _vm._v(
                        _vm._s(_vm.timeAgo(_vm.profile.last_fetched_at, "ago"))
                      )
                    ]
                  )
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "col-12 col-md-8 pt-5" }, [
                _c(
                  "div",
                  { staticClass: "row" },
                  [
                    _vm._l(_vm.feed, function(status, index) {
                      return _c(
                        "div",
                        { key: "remprop" + index, staticClass: "col-12 mb-2" },
                        [
                          _c(
                            "div",
                            {
                              staticClass:
                                "card mb-sm-4 status-card card-md-rounded-0 shadow-none border cursor-pointer"
                            },
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "card-header d-inline-flex align-items-center bg-white"
                                },
                                [
                                  _c("img", {
                                    staticStyle: { "border-radius": "38px" },
                                    attrs: {
                                      src: _vm.profile.avatar,
                                      width: "38px",
                                      height: "38px",
                                      onerror:
                                        "this.onerror=null;this.src='/storage/avatars/default.png?v=2'"
                                    }
                                  }),
                                  _vm._v(" "),
                                  _c("div", { staticClass: "pl-2" }, [
                                    _c(
                                      "span",
                                      {
                                        staticClass:
                                          "username font-weight-bold text-dark"
                                      },
                                      [
                                        _vm._v(
                                          _vm._s(_vm.profile.username) +
                                            "\n\t\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "text-right",
                                      staticStyle: { "flex-grow": "1" }
                                    },
                                    [
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-link text-dark py-0",
                                          attrs: { type: "button" },
                                          on: {
                                            click: function($event) {
                                              return _vm.ctxMenu(status)
                                            }
                                          }
                                        },
                                        [
                                          _c("span", {
                                            staticClass:
                                              "fas fa-ellipsis-h text-lighter"
                                          })
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "card-body p-0" }, [
                                status.sensitive == true
                                  ? _c("div", [
                                      _c(
                                        "details",
                                        {
                                          staticClass: "details-animated",
                                          on: {
                                            click: function($event) {
                                              status.sensitive = false
                                            }
                                          }
                                        },
                                        [
                                          _c("summary", [
                                            _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "mb-0 lead font-weight-bold"
                                              },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    status.spoiler_text
                                                      ? status.spoiler_text
                                                      : "CW / NSFW / Hidden Media"
                                                  )
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "p",
                                              {
                                                staticClass: "font-weight-light"
                                              },
                                              [_vm._v("(click to show)")]
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _c(
                                            "a",
                                            {
                                              attrs: {
                                                href: _vm.remotePostUrl(status)
                                              }
                                            },
                                            [
                                              _vm._o(
                                                _c("img", {
                                                  staticClass: "w-100 h-100",
                                                  attrs: { src: status.thumb }
                                                }),
                                                0,
                                                "remprop" + index
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ])
                                  : _c("div", [
                                      _c(
                                        "a",
                                        {
                                          attrs: {
                                            href: _vm.remotePostUrl(status)
                                          }
                                        },
                                        [
                                          _vm._o(
                                            _c("img", {
                                              staticClass: "w-100 h-100",
                                              attrs: { src: status.thumb }
                                            }),
                                            1,
                                            "remprop" + index
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      status.cw == true &&
                                      status.sensitive == false
                                        ? _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btn-block btn-primary font-weight-bold rounded-0",
                                              on: {
                                                click: function($event) {
                                                  status.sensitive = true
                                                }
                                              }
                                            },
                                            [_vm._v("Hide Media")]
                                          )
                                        : _vm._e()
                                    ])
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "card-body" }, [
                                _c("div", { staticClass: "caption" }, [
                                  _c(
                                    "p",
                                    {
                                      staticClass: "mb-2 read-more",
                                      staticStyle: { overflow: "hidden" }
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "username font-weight-bold"
                                        },
                                        [
                                          _c("bdi", [
                                            _c(
                                              "span",
                                              { staticClass: "text-dark" },
                                              [
                                                _vm._v(
                                                  _vm._s(_vm.profile.username)
                                                )
                                              ]
                                            )
                                          ])
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c("span", {
                                        staticClass: "status-content",
                                        domProps: {
                                          innerHTML: _vm._s(status.caption.html)
                                        }
                                      })
                                    ]
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", { staticClass: "timestamp mt-2" }, [
                                  _c(
                                    "p",
                                    {
                                      staticClass: "small text-uppercase mb-0"
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          staticClass: "text-muted",
                                          attrs: {
                                            href: _vm.remotePostUrl(status)
                                          }
                                        },
                                        [
                                          _c("timeago", {
                                            directives: [
                                              {
                                                name: "b-tooltip",
                                                rawName:
                                                  "v-b-tooltip.hover.bottom",
                                                modifiers: {
                                                  hover: true,
                                                  bottom: true
                                                }
                                              }
                                            ],
                                            attrs: {
                                              datetime: status.timestamp,
                                              "auto-update": 90,
                                              "converter-options": {
                                                includeSeconds: true
                                              },
                                              title: _vm.timestampFormat(
                                                status.timestamp
                                              )
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    ]
                                  )
                                ])
                              ])
                            ]
                          )
                        ]
                      )
                    }),
                    _vm._v(" "),
                    _vm.feed.length == 0
                      ? _c("div", { staticClass: "col-12 mb-2" }, [_vm._m(0)])
                      : _c("div", { staticClass: "col-12 mt-4" }, [_vm._m(1)])
                  ],
                  2
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "b-modal",
              {
                ref: "visitorContextMenu",
                attrs: {
                  id: "visitor-context-menu",
                  "hide-footer": "",
                  "hide-header": "",
                  centered: "",
                  size: "sm",
                  "body-class": "list-group-flush p-0"
                }
              },
              [
                _vm.relationship
                  ? _c("div", { staticClass: "list-group" }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "list-group-item cursor-pointer text-center rounded text-dark",
                          on: { click: _vm.copyProfileLink }
                        },
                        [_vm._v("\n\t\t\t\t\tCopy Link\n\t\t\t\t")]
                      ),
                      _vm._v(" "),
                      _vm.user && !_vm.owner && !_vm.relationship.muting
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "list-group-item cursor-pointer text-center rounded",
                              on: { click: _vm.muteProfile }
                            },
                            [_vm._v("\n\t\t\t\t\tMute\n\t\t\t\t")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.user && !_vm.owner && _vm.relationship.muting
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "list-group-item cursor-pointer text-center rounded",
                              on: { click: _vm.unmuteProfile }
                            },
                            [_vm._v("\n\t\t\t\t\tUnmute\n\t\t\t\t")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.user && !_vm.owner
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "list-group-item cursor-pointer text-center rounded text-dark",
                              on: { click: _vm.reportProfile }
                            },
                            [_vm._v("\n\t\t\t\t\tReport User\n\t\t\t\t")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.user && !_vm.owner && !_vm.relationship.blocking
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "list-group-item cursor-pointer text-center rounded text-dark",
                              on: { click: _vm.blockProfile }
                            },
                            [_vm._v("\n\t\t\t\t\tBlock\n\t\t\t\t")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.user && !_vm.owner && _vm.relationship.blocking
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "list-group-item cursor-pointer text-center rounded text-dark",
                              on: { click: _vm.unblockProfile }
                            },
                            [_vm._v("\n\t\t\t\t\tUnblock\n\t\t\t\t")]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "list-group-item cursor-pointer text-center rounded text-muted",
                          on: {
                            click: function($event) {
                              return _vm.$refs.visitorContextMenu.hide()
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\tClose\n\t\t\t\t")]
                      )
                    ])
                  : _vm._e()
              ]
            ),
            _vm._v(" "),
            _c(
              "b-modal",
              {
                ref: "ctxModal",
                attrs: {
                  id: "ctx-modal",
                  "hide-header": "",
                  "hide-footer": "",
                  centered: "",
                  rounded: "",
                  size: "sm",
                  "body-class": "list-group-flush p-0 rounded"
                }
              },
              [
                _c("div", { staticClass: "list-group text-center" }, [
                  _vm.ctxMenuStatus && _vm.profile.id != _vm.profile.id
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "list-group-item rounded cursor-pointer font-weight-bold text-danger",
                          on: {
                            click: function($event) {
                              return _vm.ctxMenuReportPost()
                            }
                          }
                        },
                        [_vm._v("Report inappropriate")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.ctxMenuStatus &&
                  _vm.profile.id != _vm.profile.id &&
                  _vm.ctxMenuRelationship &&
                  _vm.ctxMenuRelationship.following
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "list-group-item rounded cursor-pointer font-weight-bold text-danger",
                          on: {
                            click: function($event) {
                              return _vm.ctxMenuUnfollow()
                            }
                          }
                        },
                        [_vm._v("Unfollow")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.ctxMenuStatus &&
                  _vm.profile.id != _vm.profile.id &&
                  _vm.ctxMenuRelationship &&
                  !_vm.ctxMenuRelationship.following
                    ? _c(
                        "div",
                        {
                          staticClass:
                            "list-group-item rounded cursor-pointer font-weight-bold text-primary",
                          on: {
                            click: function($event) {
                              return _vm.ctxMenuFollow()
                            }
                          }
                        },
                        [_vm._v("Follow")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "list-group-item rounded cursor-pointer",
                      on: {
                        click: function($event) {
                          return _vm.ctxMenuGoToPost()
                        }
                      }
                    },
                    [_vm._v("Go to post")]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "list-group-item rounded cursor-pointer",
                      on: {
                        click: function($event) {
                          return _vm.ctxMenuCopyLink()
                        }
                      }
                    },
                    [_vm._v("Copy Link")]
                  ),
                  _vm._v(" "),
                  _vm.profile && _vm.profile.is_admin == true
                    ? _c(
                        "div",
                        {
                          staticClass: "list-group-item rounded cursor-pointer",
                          on: {
                            click: function($event) {
                              return _vm.ctxModMenuShow()
                            }
                          }
                        },
                        [_vm._v("Moderation Tools")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.ctxMenuStatus &&
                  (_vm.profile.is_admin || _vm.profile.id == _vm.profile.id)
                    ? _c(
                        "div",
                        {
                          staticClass: "list-group-item rounded cursor-pointer",
                          on: {
                            click: function($event) {
                              return _vm.deletePost(_vm.ctxMenuStatus)
                            }
                          }
                        },
                        [_vm._v("Delete")]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "list-group-item rounded cursor-pointer text-lighter",
                      on: {
                        click: function($event) {
                          return _vm.closeCtxMenu()
                        }
                      }
                    },
                    [_vm._v("Cancel")]
                  )
                ])
              ]
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      {
        staticClass:
          "d-flex justify-content-center align-items-center bg-white border rounded",
        staticStyle: { height: "60vh" }
      },
      [
        _c("div", { staticClass: "text-center" }, [
          _c("p", { staticClass: "lead" }, [
            _vm._v("We haven't seen any posts from this account.")
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "text-center mb-0 px-0" }, [
      _c(
        "button",
        { staticClass: "btn btn-outline-primary btn-block font-weight-bold" },
        [_vm._v("Load More")]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/assets/js/components/RemoteProfile.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/RemoteProfile.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RemoteProfile_vue_vue_type_template_id_6095ac5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true& */ "./resources/assets/js/components/RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true&");
/* harmony import */ var _RemoteProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RemoteProfile.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/RemoteProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css& */ "./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RemoteProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RemoteProfile_vue_vue_type_template_id_6095ac5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RemoteProfile_vue_vue_type_template_id_6095ac5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6095ac5c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/RemoteProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/RemoteProfile.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/RemoteProfile.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemoteProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=style&index=0&id=6095ac5c&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_style_index_0_id_6095ac5c_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_template_id_6095ac5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemoteProfile.vue?vue&type=template&id=6095ac5c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_template_id_6095ac5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RemoteProfile_vue_vue_type_template_id_6095ac5c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/rempro.js":
/*!***************************************!*\
  !*** ./resources/assets/js/rempro.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('remote-profile', __webpack_require__(/*! ./components/RemoteProfile.vue */ "./resources/assets/js/components/RemoteProfile.vue")["default"]);

/***/ }),

/***/ 22:
/*!*********************************************!*\
  !*** multi ./resources/assets/js/rempro.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/rempro.js */"./resources/assets/js/rempro.js");


/***/ })

},[[22,"/js/manifest"]]]);