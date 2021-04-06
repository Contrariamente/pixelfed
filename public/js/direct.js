(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/direct"],{

/***/ "./node_modules/@trevoreyre/autocomplete-vue/dist/autocomplete.esm.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@trevoreyre/autocomplete-vue/dist/autocomplete.esm.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

// Polyfill for element.matches, to support Internet Explorer. It's a relatively
// simple polyfill, so we'll just include it rather than require the user to
// include the polyfill themselves. Adapted from
// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
var matches = function matches(element, selector) {
  return element.matches ? element.matches(selector) : element.msMatchesSelector ? element.msMatchesSelector(selector) : element.webkitMatchesSelector ? element.webkitMatchesSelector(selector) : null;
};

// Polyfill for element.closest, to support Internet Explorer. It's a relatively

var closestPolyfill = function closestPolyfill(el, selector) {
  var element = el;

  while (element && element.nodeType === 1) {
    if (matches(element, selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return null;
};

var closest = function closest(element, selector) {
  return element.closest ? element.closest(selector) : closestPolyfill(element, selector);
};

// Returns true if the value has a "then" function. Adapted from
// https://github.com/graphql/graphql-js/blob/499a75939f70c4863d44149371d6a99d57ff7c35/src/jsutils/isPromise.js
var isPromise = function isPromise(value) {
  return Boolean(value && typeof value.then === 'function');
};

var AutocompleteCore = function AutocompleteCore() {
  var _this = this;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      search = _ref.search,
      _ref$autoSelect = _ref.autoSelect,
      autoSelect = _ref$autoSelect === void 0 ? false : _ref$autoSelect,
      _ref$setValue = _ref.setValue,
      setValue = _ref$setValue === void 0 ? function () {} : _ref$setValue,
      _ref$setAttribute = _ref.setAttribute,
      setAttribute = _ref$setAttribute === void 0 ? function () {} : _ref$setAttribute,
      _ref$onUpdate = _ref.onUpdate,
      onUpdate = _ref$onUpdate === void 0 ? function () {} : _ref$onUpdate,
      _ref$onSubmit = _ref.onSubmit,
      onSubmit = _ref$onSubmit === void 0 ? function () {} : _ref$onSubmit,
      _ref$onShow = _ref.onShow,
      onShow = _ref$onShow === void 0 ? function () {} : _ref$onShow,
      _ref$onHide = _ref.onHide,
      onHide = _ref$onHide === void 0 ? function () {} : _ref$onHide,
      _ref$onLoading = _ref.onLoading,
      onLoading = _ref$onLoading === void 0 ? function () {} : _ref$onLoading,
      _ref$onLoaded = _ref.onLoaded,
      onLoaded = _ref$onLoaded === void 0 ? function () {} : _ref$onLoaded;

  _classCallCheck(this, AutocompleteCore);

  _defineProperty(this, "value", '');

  _defineProperty(this, "searchCounter", 0);

  _defineProperty(this, "results", []);

  _defineProperty(this, "selectedIndex", -1);

  _defineProperty(this, "handleInput", function (event) {
    var value = event.target.value;

    _this.updateResults(value);

    _this.value = value;
  });

  _defineProperty(this, "handleKeyDown", function (event) {
    var key = event.key;

    switch (key) {
      case 'Up': // IE/Edge

      case 'Down': // IE/Edge

      case 'ArrowUp':
      case 'ArrowDown':
        {
          var selectedIndex = key === 'ArrowUp' || key === 'Up' ? _this.selectedIndex - 1 : _this.selectedIndex + 1;
          event.preventDefault();

          _this.handleArrows(selectedIndex);

          break;
        }

      case 'Tab':
        {
          _this.selectResult();

          break;
        }

      case 'Enter':
        {
          var selectedResult = _this.results[_this.selectedIndex];

          _this.selectResult();

          _this.onSubmit(selectedResult);

          break;
        }

      case 'Esc': // IE/Edge

      case 'Escape':
        {
          _this.hideResults();

          _this.setValue();

          break;
        }

      default:
        return;
    }
  });

  _defineProperty(this, "handleFocus", function (event) {
    var value = event.target.value;

    _this.updateResults(value);

    _this.value = value;
  });

  _defineProperty(this, "handleBlur", function () {
    _this.hideResults();
  });

  _defineProperty(this, "handleResultMouseDown", function (event) {
    event.preventDefault();
  });

  _defineProperty(this, "handleResultClick", function (event) {
    var target = event.target;
    var result = closest(target, '[data-result-index]');

    if (result) {
      _this.selectedIndex = parseInt(result.dataset.resultIndex, 10);
      var selectedResult = _this.results[_this.selectedIndex];

      _this.selectResult();

      _this.onSubmit(selectedResult);
    }
  });

  _defineProperty(this, "handleArrows", function (selectedIndex) {
    // Loop selectedIndex back to first or last result if out of bounds
    var resultsCount = _this.results.length;
    _this.selectedIndex = (selectedIndex % resultsCount + resultsCount) % resultsCount; // Update results and aria attributes

    _this.onUpdate(_this.results, _this.selectedIndex);
  });

  _defineProperty(this, "selectResult", function () {
    var selectedResult = _this.results[_this.selectedIndex];

    if (selectedResult) {
      _this.setValue(selectedResult);
    }

    _this.hideResults();
  });

  _defineProperty(this, "updateResults", function (value) {
    var currentSearch = ++_this.searchCounter;

    _this.onLoading();

    _this.search(value).then(function (results) {
      if (currentSearch !== _this.searchCounter) {
        return;
      }

      _this.results = results;

      _this.onLoaded();

      if (_this.results.length === 0) {
        _this.hideResults();

        return;
      }

      _this.selectedIndex = _this.autoSelect ? 0 : -1;

      _this.onUpdate(_this.results, _this.selectedIndex);

      _this.showResults();
    });
  });

  _defineProperty(this, "showResults", function () {
    _this.setAttribute('aria-expanded', true);

    _this.onShow();
  });

  _defineProperty(this, "hideResults", function () {
    _this.selectedIndex = -1;
    _this.results = [];

    _this.setAttribute('aria-expanded', false);

    _this.setAttribute('aria-activedescendant', '');

    _this.onUpdate(_this.results, _this.selectedIndex);

    _this.onHide();
  });

  _defineProperty(this, "checkSelectedResultVisible", function (resultsElement) {
    var selectedResultElement = resultsElement.querySelector("[data-result-index=\"".concat(_this.selectedIndex, "\"]"));

    if (!selectedResultElement) {
      return;
    }

    var resultsPosition = resultsElement.getBoundingClientRect();
    var selectedPosition = selectedResultElement.getBoundingClientRect();

    if (selectedPosition.top < resultsPosition.top) {
      // Element is above viewable area
      resultsElement.scrollTop -= resultsPosition.top - selectedPosition.top;
    } else if (selectedPosition.bottom > resultsPosition.bottom) {
      // Element is below viewable area
      resultsElement.scrollTop += selectedPosition.bottom - resultsPosition.bottom;
    }
  });

  this.search = isPromise(search) ? search : function (value) {
    return Promise.resolve(search(value));
  };
  this.autoSelect = autoSelect;
  this.setValue = setValue;
  this.setAttribute = setAttribute;
  this.onUpdate = onUpdate;
  this.onSubmit = onSubmit;
  this.onShow = onShow;
  this.onHide = onHide;
  this.onLoading = onLoading;
  this.onLoaded = onLoaded;
};

// Generates a unique ID, with optional prefix. Adapted from
// https://github.com/lodash/lodash/blob/61acdd0c295e4447c9c10da04e287b1ebffe452c/uniqueId.js
var idCounter = 0;

var uniqueId = function uniqueId() {
  var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "".concat(prefix).concat(++idCounter);
};

// Calculates whether element2 should be above or below element1. Always
// places element2 below unless all of the following:
// 1. There isn't enough visible viewport below to fit element2
// 2. There is more room above element1 than there is below
// 3. Placing elemen2 above 1 won't overflow window
var getRelativePosition = function getRelativePosition(element1, element2) {
  var position1 = element1.getBoundingClientRect();
  var position2 = element2.getBoundingClientRect();
  var positionAbove =
  /* 1 */
  position1.bottom + position2.height > window.innerHeight &&
  /* 2 */
  window.innerHeight - position1.bottom < position1.top &&
  /* 3 */
  window.pageYOffset + position1.top - position2.height > 0;
  return positionAbove ? 'above' : 'below';
};

// Credit David Walsh (https://davidwalsh.name/javascript-debounce-function)
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
var debounce = function debounce(func, wait, immediate) {
  var timeout;
  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var script = {
  name: 'Autocomplete',
  inheritAttrs: false,
  props: {
    search: {
      type: Function,
      required: true
    },
    baseClass: {
      type: String,
      "default": 'autocomplete'
    },
    autoSelect: {
      type: Boolean,
      "default": false
    },
    getResultValue: {
      type: Function,
      "default": function _default(result) {
        return result;
      }
    },
    defaultValue: {
      type: String,
      "default": ''
    },
    debounceTime: {
      type: Number,
      "default": 0
    }
  },
  data: function data() {
    var core = new AutocompleteCore({
      search: this.search,
      autoSelect: this.autoSelect,
      setValue: this.setValue,
      onUpdate: this.handleUpdate,
      onSubmit: this.handleSubmit,
      onShow: this.handleShow,
      onHide: this.handleHide,
      onLoading: this.handleLoading,
      onLoaded: this.handleLoaded
    });

    if (this.debounceTime > 0) {
      core.handleInput = debounce(core.handleInput, this.debounceTime);
    }

    return {
      core: core,
      value: this.defaultValue,
      resultListId: uniqueId("".concat(this.baseClass, "-result-list-")),
      results: [],
      selectedIndex: -1,
      expanded: false,
      loading: false,
      position: 'below',
      resetPosition: true
    };
  },
  computed: {
    rootProps: function rootProps() {
      return {
        "class": this.baseClass,
        style: {
          position: 'relative'
        },
        'data-expanded': this.expanded,
        'data-loading': this.loading,
        'data-position': this.position
      };
    },
    inputProps: function inputProps() {
      return _objectSpread2({
        "class": "".concat(this.baseClass, "-input"),
        value: this.value,
        role: 'combobox',
        autocomplete: 'off',
        autocapitalize: 'off',
        autocorrect: 'off',
        spellcheck: 'false',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'listbox',
        'aria-owns': this.resultListId,
        'aria-expanded': this.expanded ? 'true' : 'false',
        'aria-activedescendant': this.selectedIndex > -1 ? this.resultProps[this.selectedIndex].id : ''
      }, this.$attrs);
    },
    inputListeners: function inputListeners() {
      return {
        input: this.handleInput,
        keydown: this.core.handleKeyDown,
        focus: this.core.handleFocus,
        blur: this.core.handleBlur
      };
    },
    resultListProps: function resultListProps() {
      var yPosition = this.position === 'below' ? 'top' : 'bottom';
      return {
        id: this.resultListId,
        "class": "".concat(this.baseClass, "-result-list"),
        role: 'listbox',
        style: _defineProperty({
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          visibility: this.expanded ? 'visible' : 'hidden',
          pointerEvents: this.expanded ? 'auto' : 'none'
        }, yPosition, '100%')
      };
    },
    resultListListeners: function resultListListeners() {
      return {
        mousedown: this.core.handleResultMouseDown,
        click: this.core.handleResultClick
      };
    },
    resultProps: function resultProps() {
      var _this = this;

      return this.results.map(function (result, index) {
        return _objectSpread2({
          id: "".concat(_this.baseClass, "-result-").concat(index),
          "class": "".concat(_this.baseClass, "-result"),
          'data-result-index': index,
          role: 'option'
        }, _this.selectedIndex === index ? {
          'aria-selected': 'true'
        } : {});
      });
    }
  },
  mounted: function mounted() {
    document.body.addEventListener('click', this.handleDocumentClick);
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('click', this.handleDocumentClick);
  },
  updated: function updated() {
    if (!this.$refs.input || !this.$refs.resultList) {
      return;
    }

    if (this.resetPosition && this.results.length > 0) {
      this.resetPosition = false;
      this.position = getRelativePosition(this.$refs.input, this.$refs.resultList);
    }

    this.core.checkSelectedResultVisible(this.$refs.resultList);
  },
  methods: {
    setValue: function setValue(result) {
      this.value = result ? this.getResultValue(result) : '';
    },
    handleUpdate: function handleUpdate(results, selectedIndex) {
      this.results = results;
      this.selectedIndex = selectedIndex;
      this.$emit('update', results, selectedIndex);
    },
    handleShow: function handleShow() {
      this.expanded = true;
    },
    handleHide: function handleHide() {
      this.expanded = false;
      this.resetPosition = true;
    },
    handleLoading: function handleLoading() {
      this.loading = true;
    },
    handleLoaded: function handleLoaded() {
      this.loading = false;
    },
    handleInput: function handleInput(event) {
      this.value = event.target.value;
      this.core.handleInput(event);
    },
    handleSubmit: function handleSubmit(selectedResult) {
      this.$emit('submit', selectedResult);
    },
    handleDocumentClick: function handleDocumentClick(event) {
      if (this.$refs.root.contains(event.target)) {
        return;
      }

      this.core.hideResults();
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"root"},[_vm._t("default",[_c('div',_vm._b({},'div',_vm.rootProps,false),[_c('input',_vm._g(_vm._b({ref:"input",on:{"input":_vm.handleInput,"keydown":_vm.core.handleKeyDown,"focus":_vm.core.handleFocus,"blur":_vm.core.handleBlur}},'input',_vm.inputProps,false),_vm.$listeners)),_vm._v(" "),_c('ul',_vm._g(_vm._b({ref:"resultList"},'ul',_vm.resultListProps,false),_vm.resultListListeners),[_vm._l((_vm.results),function(result,index){return [_vm._t("result",[_c('li',_vm._b({key:_vm.resultProps[index].id},'li',_vm.resultProps[index],false),[_vm._v("\n              "+_vm._s(_vm.getResultValue(result))+"\n            ")])],{"result":result,"props":_vm.resultProps[index]})]})],2)])],{"rootProps":_vm.rootProps,"inputProps":_vm.inputProps,"inputListeners":_vm.inputListeners,"resultListProps":_vm.resultListProps,"resultListListeners":_vm.resultListListeners,"results":_vm.results,"resultProps":_vm.resultProps})],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

function install(Vue) {
  if (install.installed) {
    return;
  }

  install.installed = true;
  Vue.component('Autocomplete', __vue_component__);
}

var plugin = {
  install: install
}; // Auto install if Vue is found

var GlobalVue;

if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
} // Inject install function into component. Allows component to be registered via
// Vue.use() as well as Vue.component()


__vue_component__.install = install;

/* harmony default export */ __webpack_exports__["default"] = (__vue_component__);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/@trevoreyre/autocomplete-vue/dist/style.css":
/*!******************************************************************!*\
  !*** ./node_modules/@trevoreyre/autocomplete-vue/dist/style.css ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader??ref--9-1!../../../postcss-loader/src??ref--9-2!./style.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@trevoreyre/autocomplete-vue/dist/style.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Direct.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Direct.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _trevoreyre_autocomplete_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @trevoreyre/autocomplete-vue */ "./node_modules/@trevoreyre/autocomplete-vue/dist/autocomplete.esm.js");
/* harmony import */ var _trevoreyre_autocomplete_vue_dist_style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @trevoreyre/autocomplete-vue/dist/style.css */ "./node_modules/@trevoreyre/autocomplete-vue/dist/style.css");
/* harmony import */ var _trevoreyre_autocomplete_vue_dist_style_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_trevoreyre_autocomplete_vue_dist_style_css__WEBPACK_IMPORTED_MODULE_1__);
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
  components: {
    Autocomplete: _trevoreyre_autocomplete_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      config: window.App.config,
      loaded: false,
      profile: {},
      page: 'browse',
      pages: ['browse', 'add', 'read'],
      tab: 'inbox',
      tabs: ['inbox', 'sent', 'filtered'],
      inboxPage: 1,
      sentPage: 1,
      filteredPage: 1,
      threads: [],
      thread: false,
      threadIndex: false,
      replyText: '',
      composeUsername: '',
      ctxContext: null,
      ctxIndex: null,
      uploading: false,
      uploadProgress: null,
      messages: {
        inbox: [],
        sent: [],
        filtered: []
      },
      newType: 'select',
      composeLoading: false
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.fetchProfile();
    var self = this;
    axios.get('/api/direct/browse', {
      params: {
        a: 'inbox'
      }
    }).then(function (res) {
      self.loaded = true;
      _this.threads = res.data;
      _this.messages.inbox = res.data;
    });
  },
  updated: function updated() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    fetchProfile: function fetchProfile() {
      var _this2 = this;

      axios.get('/api/pixelfed/v1/accounts/verify_credentials').then(function (res) {
        _this2.profile = res.data;
        window._sharedData.curUser = res.data;
        window.App.util.navatar();
      });
    },
    "goto": function goto() {
      var l = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'browse';
      this.page = l;
    },
    loadMessage: function loadMessage(id) {
      var url = '/account/direct/t/' + id;
      window.location.href = url;
      return;
    },
    truncate: function truncate(t) {
      return _.truncate(t);
    },
    switchTab: function switchTab(tab) {
      var self = this;

      switch (tab) {
        case 'inbox':
          if (this.messages.inbox.length == 0) {// fetch
          }

          break;

        case 'sent':
          if (this.messages.sent.length == 0) {
            axios.get('/api/direct/browse', {
              params: {
                a: 'sent'
              }
            }).then(function (res) {
              self.loaded = true;
              self.threads = res.data;
              self.messages.sent = res.data;
            });
          }

          break;

        case 'filtered':
          if (this.messages.filtered.length == 0) {
            axios.get('/api/direct/browse', {
              params: {
                a: 'filtered'
              }
            }).then(function (res) {
              self.loaded = true;
              self.threads = res.data;
              self.messages.filtered = res.data;
            });
          }

          break;
      }

      this.tab = tab;
    },
    composeSearch: function composeSearch(input) {
      if (input.length < 1) {
        return [];
      }

      ;
      var self = this;
      var results = [];
      return axios.post('/api/direct/lookup', {
        q: input
      }).then(function (res) {
        return res.data;
      });
    },
    getTagResultValue: function getTagResultValue(result) {
      // return '@' + result.name;
      return result.local ? '@' + result.name : result.name;
    },
    onTagSubmitLocation: function onTagSubmitLocation(result) {
      //this.$refs.autocomplete.value = '';
      this.composeLoading = true;
      window.location.href = '/account/direct/t/' + result.id;
      return;
    },
    messagePagination: function messagePagination(tab, dir) {
      var _this3 = this;

      if (tab == 'inbox') {
        this.inboxPage = dir == 'prev' ? this.inboxPage - 1 : this.inboxPage + 1;
        axios.get('/api/direct/browse', {
          params: {
            a: 'inbox',
            page: this.inboxPage
          }
        }).then(function (res) {
          self.loaded = true;
          _this3.threads = res.data;
          _this3.messages.inbox = res.data;
        });
      }

      if (tab == 'sent') {
        this.sentPage = dir == 'prev' ? this.sentPage - 1 : this.sentPage + 1;
        axios.get('/api/direct/browse', {
          params: {
            a: 'sent',
            page: this.sentPage
          }
        }).then(function (res) {
          self.loaded = true;
          _this3.threads = res.data;
          _this3.messages.sent = res.data;
        });
      }

      if (tab == 'filtered') {
        this.filteredPage = dir == 'prev' ? this.filteredPage - 1 : this.filteredPage + 1;
        axios.get('/api/direct/browse', {
          params: {
            a: 'filtered',
            page: this.filteredPage
          }
        }).then(function (res) {
          self.loaded = true;
          _this3.threads = res.data;
          _this3.messages.filtered = res.data;
        });
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/DirectMessage.vue?vue&type=script&lang=js& ***!
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
  props: ['accountId'],
  data: function data() {
    return {
      config: window.App.config,
      hideAvatars: true,
      hideTimestamps: false,
      largerText: false,
      autoRefresh: false,
      mutedNotifications: false,
      blocked: false,
      loaded: false,
      profile: {},
      page: 'read',
      pages: ['browse', 'add', 'read'],
      threads: [],
      thread: false,
      threadIndex: false,
      replyText: '',
      composeUsername: '',
      ctxContext: null,
      ctxIndex: null,
      uploading: false,
      uploadProgress: null,
      min_id: null,
      max_id: null,
      loadingMessages: false,
      showLoadMore: true
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.fetchProfile();
    var self = this;
    axios.get('/api/direct/thread', {
      params: {
        pid: self.accountId
      }
    }).then(function (res) {
      self.loaded = true;
      var d = res.data;
      d.messages.reverse();
      _this.thread = d;
      _this.threads = [d];
      _this.threadIndex = 0;
      var mids = d.messages.map(function (m) {
        return m.id;
      });
      _this.max_id = Math.max.apply(Math, _toConsumableArray(mids));
      _this.min_id = Math.min.apply(Math, _toConsumableArray(mids));
      _this.mutedNotifications = d.muted;

      _this.markAsRead(); //this.messagePoll();


      setTimeout(function () {
        var objDiv = document.querySelector('.dm-wrapper');
        objDiv.scrollTop = objDiv.scrollHeight;
      }, 300);
    });
    var options = localStorage.getItem('px_dm_options');

    if (options) {
      options = JSON.parse(options);
      this.hideAvatars = options.hideAvatars;
      this.hideTimestamps = options.hideTimestamps;
      this.largerText = options.largerText;
    }
  },
  watch: {
    mutedNotifications: function mutedNotifications(v) {
      if (v) {
        axios.post('/api/direct/mute', {
          id: this.accountId
        }).then(function (res) {});
      } else {
        axios.post('/api/direct/unmute', {
          id: this.accountId
        }).then(function (res) {});
      }

      this.mutedNotifications = v;
    },
    hideAvatars: function hideAvatars(v) {
      this.hideAvatars = v;
      this.updateOptions();
    },
    hideTimestamps: function hideTimestamps(v) {
      this.hideTimestamps = v;
      this.updateOptions();
    },
    largerText: function largerText(v) {
      this.largerText = v;
      this.updateOptions();
    }
  },
  updated: function updated() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    fetchProfile: function fetchProfile() {
      var _this2 = this;

      axios.get('/api/pixelfed/v1/accounts/verify_credentials').then(function (res) {
        _this2.profile = res.data;
        window._sharedData.curUser = res.data;
        window.App.util.navatar();
      });
    },
    sendMessage: function sendMessage() {
      var _this3 = this;

      var self = this;
      var rt = this.replyText;
      axios.post('/api/direct/create', {
        'to_id': this.threads[this.threadIndex].id,
        'message': rt,
        'type': self.isEmoji(rt) && rt.length < 10 ? 'emoji' : 'text'
      }).then(function (res) {
        var msg = res.data;
        self.threads[self.threadIndex].messages.push(msg);
        var mids = self.threads[self.threadIndex].messages.map(function (m) {
          return m.id;
        });
        _this3.max_id = Math.max.apply(Math, _toConsumableArray(mids));
        _this3.min_id = Math.min.apply(Math, _toConsumableArray(mids));
        setTimeout(function () {
          var objDiv = document.querySelector('.dm-wrapper');
          objDiv.scrollTop = objDiv.scrollHeight;
        }, 300);
      })["catch"](function (err) {
        if (err.response.status == 403) {
          self.blocked = true;
          swal('Profile Unavailable', 'You cannot message this profile at this time.', 'error');
        }
      });
      this.replyText = '';
    },
    openCtxMenu: function openCtxMenu(r, i) {
      this.ctxIndex = i;
      this.ctxContext = r;
      this.$refs.ctxModal.show();
    },
    closeCtxMenu: function closeCtxMenu() {
      this.$refs.ctxModal.hide();
    },
    truncate: function truncate(t) {
      return _.truncate(t);
    },
    deleteMessage: function deleteMessage() {
      var self = this;
      var c = window.confirm('Confirma pagar esta mensagem?');

      if (c) {
        axios["delete"]('/api/direct/message', {
          params: {
            id: self.ctxContext.reportId
          }
        }).then(function (res) {
          self.threads[self.threadIndex].messages.splice(self.ctxIndex, 1);
          self.closeCtxMenu();
        });
      } else {
        self.closeCtxMenu();
      }
    },
    reportMessage: function reportMessage() {
      this.closeCtxMenu();
      var url = '/i/report?type=post&id=' + this.ctxContext.reportId;
      window.location.href = url;
      return;
    },
    uploadMedia: function uploadMedia(event) {
      var self = this;
      $(document).on('change', '#uploadMedia', function (e) {
        self.handleUpload();
      });
      var el = $(event.target);
      el.attr('disabled', '');
      $('#uploadMedia').click();
      el.blur();
      el.removeAttr('disabled');
    },
    handleUpload: function handleUpload() {
      var self = this;
      self.uploading = true;
      var io = document.querySelector('#uploadMedia');

      if (!io.files.length) {
        this.uploading = false;
      }

      Array.prototype.forEach.call(io.files, function (io, i) {
        var type = io.type;
        var acceptedMimes = self.config.uploader.media_types.split(',');
        var validated = $.inArray(type, acceptedMimes);

        if (validated == -1) {
          swal('Invalid File Type', 'The file you are trying to add is not a valid mime type. Please upload a ' + self.config.uploader.media_types + ' only.', 'error');
          self.uploading = false;
          return;
        }

        var form = new FormData();
        form.append('file', io);
        form.append('to_id', self.threads[self.threadIndex].id);
        var xhrConfig = {
          onUploadProgress: function onUploadProgress(e) {
            var progress = Math.round(e.loaded * 100 / e.total);
            self.uploadProgress = progress;
          }
        };
        axios.post('/api/direct/media', form, xhrConfig).then(function (e) {
          self.uploadProgress = 100;
          self.uploading = false;
          var msg = {
            id: e.data.id,
            type: e.data.type,
            reportId: e.data.reportId,
            isAuthor: true,
            text: null,
            media: e.data.url,
            timeAgo: '1s',
            seen: null
          };
          self.threads[self.threadIndex].messages.push(msg);
          setTimeout(function () {
            var objDiv = document.querySelector('.dm-wrapper');
            objDiv.scrollTop = objDiv.scrollHeight;
          }, 300);
        })["catch"](function (e) {
          switch (e.response.status) {
            case 451:
              self.uploading = false;
              io.value = null;
              swal('Banned Content', 'This content has been banned and cannot be uploaded.', 'error');
              break;

            default:
              self.uploading = false;
              io.value = null;
              swal('Oops, something went wrong!', 'An unexpected error occurred.', 'error');
              break;
          }
        });
        io.value = null;
        self.uploadProgress = 0;
      });
    },
    viewOriginal: function viewOriginal() {
      var url = this.ctxContext.media;
      window.location.href = url;
      return;
    },
    isEmoji: function isEmoji(text) {
      var onlyEmojis = text.replace(new RegExp("[\0-\u1EEFf]", 'g'), '');
      var visibleChars = text.replace(new RegExp('[\n\r\s]+|( )+', 'g'), '');
      return onlyEmojis.length === visibleChars.length;
    },
    copyText: function copyText() {
      window.App.util.clipboard(this.ctxContext.text);
      this.closeCtxMenu();
      return;
    },
    clickLink: function clickLink() {
      var url = this.ctxContext.text;

      if (this.ctxContext.meta.local != true) {
        url = '/i/redirect?url=' + encodeURI(this.ctxContext.text);
      }

      window.location.href = url;
    },
    markAsRead: function markAsRead() {
      return;
      axios.post('/api/direct/read', {
        pid: this.accountId,
        sid: this.max_id
      }).then(function (res) {})["catch"](function (err) {});
    },
    loadOlderMessages: function loadOlderMessages() {
      var _this4 = this;

      var self = this;
      this.loadingMessages = true;
      axios.get('/api/direct/thread', {
        params: {
          pid: this.accountId,
          max_id: this.min_id
        }
      }).then(function (res) {
        var _this4$thread$message;

        var d = res.data;

        if (!d.messages.length) {
          _this4.showLoadMore = false;
          _this4.loadingMessages = false;
          return;
        }

        var cids = _this4.thread.messages.map(function (m) {
          return m.id;
        });

        var m = d.messages.filter(function (m) {
          return cids.indexOf(m.id) == -1;
        }).reverse();
        var mids = m.map(function (m) {
          return m.id;
        });
        var min_id = Math.min.apply(Math, _toConsumableArray(mids));

        if (min_id == _this4.min_id) {
          _this4.showLoadMore = false;
          _this4.loadingMessages = false;
          return;
        }

        _this4.min_id = min_id;

        (_this4$thread$message = _this4.thread.messages).unshift.apply(_this4$thread$message, _toConsumableArray(m));

        setTimeout(function () {
          self.loadingMessages = false;
        }, 500);
      })["catch"](function (err) {
        _this4.loadingMessages = false;
      });
    },
    messagePoll: function messagePoll() {
      var self = this;
      setInterval(function () {
        axios.get('/api/direct/thread', {
          params: {
            pid: self.accountId,
            min_id: self.thread.messages[self.thread.messages.length - 1].id
          }
        }).then(function (res) {});
      }, 5000);
    },
    showOptions: function showOptions() {
      this.page = 'options';
    },
    updateOptions: function updateOptions() {
      var options = {
        v: 1,
        hideAvatars: this.hideAvatars,
        hideTimestamps: this.hideTimestamps,
        largerText: this.largerText
      };
      window.localStorage.setItem('px_dm_options', JSON.stringify(options));
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/@trevoreyre/autocomplete-vue/dist/style.css":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/src??ref--9-2!./node_modules/@trevoreyre/autocomplete-vue/dist/style.css ***!
  \**************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".autocomplete-input{border:1px solid #eee;border-radius:8px;width:100%;padding:12px 12px 12px 48px;box-sizing:border-box;position:relative;font-size:16px;line-height:1.5;-webkit-box-flex:1;flex:1;background-color:#eee;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjY2IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+\");background-repeat:no-repeat;background-position:12px}.autocomplete-input:focus,.autocomplete-input[aria-expanded=true]{border-color:rgba(0,0,0,.12);background-color:#fff;outline:none;box-shadow:0 2px 2px rgba(0,0,0,.16)}[data-position=below] .autocomplete-input[aria-expanded=true]{border-bottom-color:transparent;border-radius:8px 8px 0 0}[data-position=above] .autocomplete-input[aria-expanded=true]{border-top-color:transparent;border-radius:0 0 8px 8px;z-index:2}.autocomplete[data-loading=true]:after{content:\"\";border:3px solid rgba(0,0,0,.12);border-right-color:rgba(0,0,0,.48);border-radius:100%;width:20px;height:20px;position:absolute;right:12px;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%);-webkit-animation:rotate 1s linear infinite;animation:rotate 1s linear infinite}.autocomplete-result-list{margin:0;border:1px solid rgba(0,0,0,.12);padding:0;box-sizing:border-box;max-height:296px;overflow-y:auto;background:#fff;list-style:none;box-shadow:0 2px 2px rgba(0,0,0,.16)}[data-position=below] .autocomplete-result-list{margin-top:-1px;border-top-color:transparent;border-radius:0 0 8px 8px;padding-bottom:8px}[data-position=above] .autocomplete-result-list{margin-bottom:-1px;border-bottom-color:transparent;border-radius:8px 8px 0 0;padding-top:8px}.autocomplete-result{cursor:default;padding:12px 12px 12px 48px;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2NjIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iOCIvPjxwYXRoIGQ9Ik0yMSAyMWwtNC00Ii8+PC9zdmc+\");background-repeat:no-repeat;background-position:12px}.autocomplete-result:hover,.autocomplete-result[aria-selected=true]{background-color:rgba(0,0,0,.06)}@-webkit-keyframes rotate{0%{-webkit-transform:translateY(-50%) rotate(0deg);transform:translateY(-50%) rotate(0deg)}to{-webkit-transform:translateY(-50%) rotate(359deg);transform:translateY(-50%) rotate(359deg)}}@keyframes rotate{0%{-webkit-transform:translateY(-50%) rotate(0deg);transform:translateY(-50%) rotate(0deg)}to{-webkit-transform:translateY(-50%) rotate(359deg);transform:translateY(-50%) rotate(359deg)}}", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.reply-btn[data-v-6b74e792] {\n\tposition: absolute;\n\tbottom: 54px;\n\tright: 20px;\n\twidth: 90px;\n\ttext-align: center;\n\tborder-radius: 0 3px 3px 0;\n}\n.media-body .bg-primary[data-v-6b74e792] {\n\tbackground: linear-gradient(135deg, #2EA2F4 0%, #0B93F6 100%) !important;\n}\n.pill-to[data-v-6b74e792] {\n\tbackground:#EDF2F7;\n\tfont-weight: 500;\n\tborder-radius: 20px !important;\n\tpadding-left: 1rem;\n\tpadding-right: 1rem;\n\tpadding-top: 0.5rem;\n\tpadding-bottom: 0.5rem;\n\tmargin-right: 3rem;\n\tmargin-bottom: 0.25rem;\n}\n.pill-from[data-v-6b74e792] {\n\tcolor: white !important;\n\ttext-align: right !important;\n\t/*background: #53d769;*/\n\tbackground: linear-gradient(135deg, #2EA2F4 0%, #0B93F6 100%) !important;\n\tfont-weight: 500;\n\tborder-radius: 20px !important;\n\tpadding-left: 1rem;\n\tpadding-right: 1rem;\n\tpadding-top: 0.5rem;\n\tpadding-bottom: 0.5rem;\n\tmargin-left: 3rem;\n\tmargin-bottom: 0.25rem;\n}\n.chat-msg[data-v-6b74e792]:hover {\n\tbackground: #f7fbfd;\n}\n.no-focus[data-v-6b74e792]:focus {\n\toutline: none !important;\n\toutline-width: 0 !important;\n\tbox-shadow: none;\n\t-moz-box-shadow: none;\n\t-webkit-box-shadow: none;\n}\n.emoji-msg[data-v-6b74e792] {\n\tfont-size: 4rem !important;\n\tline-height: 30px !important;\n\tmargin-top: 10px !important;\n}\n.larger-text[data-v-6b74e792] {\n\tfont-size: 22px;\n}\n", ""]);

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Direct.vue?vue&type=template&id=96e9d740&scoped=true&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Direct.vue?vue&type=template&id=96e9d740&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    _vm.loaded && _vm.page == "browse"
      ? _c(
          "div",
          {
            staticClass: "container messages-page p-0 p-md-2 mt-n4",
            staticStyle: { "min-height": "50vh" }
          },
          [
            _c(
              "div",
              { staticClass: "col-12 col-md-8 offset-md-2 p-0 px-md-2" },
              [
                _c("div", { staticClass: "card shadow-none border mt-4" }, [
                  _c("div", { staticClass: "card-header bg-white py-4" }, [
                    _c("span", { staticClass: "h4 font-weight-bold mb-0" }, [
                      _vm._v("Mensagens Diretas")
                    ]),
                    _vm._v(" "),
                    _c("span", { staticClass: "float-right" }, [
                      _c(
                        "a",
                        {
                          staticClass:
                            "btn btn-outline-primary font-weight-bold py-0 rounded-pill",
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.goto("add")
                            }
                          }
                        },
                        [_vm._v("Nova mensagem")]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-header bg-white" }, [
                    _c("ul", { staticClass: "nav nav-pills nav-fill" }, [
                      _c("li", { staticClass: "nav-item" }, [
                        _c(
                          "a",
                          {
                            class: [
                              _vm.tab == "inbox"
                                ? "nav-link px-4 font-weight-bold rounded-pill active"
                                : "nav-link px-4 font-weight-bold rounded-pill"
                            ],
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.switchTab("inbox")
                              }
                            }
                          },
                          [_vm._v("Inbox")]
                        )
                      ]),
                      _vm._v(" "),
                      _c("li", { staticClass: "nav-item" }, [
                        _c(
                          "a",
                          {
                            class: [
                              _vm.tab == "sent"
                                ? "nav-link px-4 font-weight-bold rounded-pill active"
                                : "nav-link px-4 font-weight-bold rounded-pill"
                            ],
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.switchTab("sent")
                              }
                            }
                          },
                          [_vm._v("Enviadas")]
                        )
                      ]),
                      _vm._v(" "),
                      _c("li", { staticClass: "nav-item" }, [
                        _c(
                          "a",
                          {
                            class: [
                              _vm.tab == "filtered"
                                ? "nav-link px-4 font-weight-bold rounded-pill active"
                                : "nav-link px-4 font-weight-bold rounded-pill"
                            ],
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.switchTab("filtered")
                              }
                            }
                          },
                          [_vm._v("Filtradas")]
                        )
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm.tab == "inbox"
                    ? _c(
                        "ul",
                        { staticClass: "list-group list-group-flush" },
                        [
                          !_vm.messages.inbox.length
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "list-group-item d-flex justify-content-center align-items-center",
                                  staticStyle: { "min-height": "40vh" }
                                },
                                [
                                  _c("p", { staticClass: "lead mb-0" }, [
                                    _vm._v("Nenhuma mensagem ainda :(")
                                  ])
                                ]
                              )
                            : _vm._l(_vm.messages.inbox, function(
                                thread,
                                index
                              ) {
                                return _c("div", [
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "list-group-item text-dark text-decoration-none border-left-0 border-right-0 border-top-0",
                                      attrs: {
                                        href: "/account/direct/t/" + thread.id
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "media d-flex align-items-center"
                                        },
                                        [
                                          _c("img", {
                                            staticClass:
                                              "mr-3 rounded-circle img-thumbnail",
                                            attrs: {
                                              src: thread.avatar,
                                              alt: "Generic placeholder image",
                                              width: "32px"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "media-body" },
                                            [
                                              _c("p", { staticClass: "mb-0" }, [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold text-truncate"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(thread.name) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "pl-1 text-muted small text-truncate",
                                                    staticStyle: {
                                                      "font-weight": "500"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(
                                                          thread.isLocal
                                                            ? "@" +
                                                                thread.username
                                                            : thread.username
                                                        ) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "p",
                                                {
                                                  staticClass:
                                                    "text-muted mb-0",
                                                  staticStyle: {
                                                    "font-size": "13px",
                                                    "font-weight": "500"
                                                  }
                                                },
                                                [
                                                  _vm._m(0, true),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "pl-1 pr-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n\t\t\t\t\t\t\t\t\t\tRecebida\n\t\t\t\t\t\t\t\t\t"
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(thread.timeAgo) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ])
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _vm._m(1, true)
                                        ]
                                      )
                                    ]
                                  )
                                ])
                              })
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.tab == "sent"
                    ? _c(
                        "ul",
                        { staticClass: "list-group list-group-flush" },
                        [
                          !_vm.messages.sent.length
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "list-group-item d-flex justify-content-center align-items-center",
                                  staticStyle: { "min-height": "40vh" }
                                },
                                [
                                  _c("p", { staticClass: "lead mb-0" }, [
                                    _vm._v("Nenhuma mensage encontrada:(")
                                  ])
                                ]
                              )
                            : _vm._l(_vm.messages.sent, function(
                                thread,
                                index
                              ) {
                                return _c("div", [
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "list-group-item text-dark text-decoration-none border-left-0 border-right-0 border-top-0",
                                      attrs: { href: "#" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.loadMessage(thread.id)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "media d-flex align-items-center"
                                        },
                                        [
                                          _c("img", {
                                            staticClass:
                                              "mr-3 rounded-circle img-thumbnail",
                                            attrs: {
                                              src: thread.avatar,
                                              alt: "Generic placeholder image",
                                              width: "32px"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "media-body" },
                                            [
                                              _c("p", { staticClass: "mb-0" }, [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold text-truncate"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(thread.name) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "pl-1 text-muted small text-truncate",
                                                    staticStyle: {
                                                      "font-weight": "500"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(
                                                          thread.isLocal
                                                            ? "@" +
                                                                thread.username
                                                            : thread.username
                                                        ) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "p",
                                                {
                                                  staticClass:
                                                    "text-muted mb-0",
                                                  staticStyle: {
                                                    "font-size": "13px",
                                                    "font-weight": "500"
                                                  }
                                                },
                                                [
                                                  _vm._m(2, true),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "pl-1 pr-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n\t\t\t\t\t\t\t\t\t\tEnviada\n\t\t\t\t\t\t\t\t\t"
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(thread.timeAgo) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ])
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _vm._m(3, true)
                                        ]
                                      )
                                    ]
                                  )
                                ])
                              })
                        ],
                        2
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.tab == "filtered"
                    ? _c(
                        "ul",
                        { staticClass: "list-group list-group-flush" },
                        [
                          !_vm.messages.filtered.length
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "list-group-item d-flex justify-content-center align-items-center",
                                  staticStyle: { "min-height": "40vh" }
                                },
                                [
                                  _c("p", { staticClass: "lead mb-0" }, [
                                    _vm._v("No messages found :(")
                                  ])
                                ]
                              )
                            : _vm._l(_vm.messages.filtered, function(
                                thread,
                                index
                              ) {
                                return _c("div", [
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "list-group-item text-dark text-decoration-none border-left-0 border-right-0 border-top-0",
                                      attrs: { href: "#" },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.loadMessage(thread.id)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass:
                                            "media d-flex align-items-center"
                                        },
                                        [
                                          _c("img", {
                                            staticClass:
                                              "mr-3 rounded-circle img-thumbnail",
                                            attrs: {
                                              src: thread.avatar,
                                              alt: "Generic placeholder image",
                                              width: "32px"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            { staticClass: "media-body" },
                                            [
                                              _c("p", { staticClass: "mb-0" }, [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold text-truncate"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(thread.name) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "pl-1 text-muted small text-truncate",
                                                    staticStyle: {
                                                      "font-weight": "500"
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(
                                                          thread.isLocal
                                                            ? "@" +
                                                                thread.username
                                                            : thread.username
                                                        ) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "p",
                                                {
                                                  staticClass:
                                                    "text-muted mb-0",
                                                  staticStyle: {
                                                    "font-size": "13px",
                                                    "font-weight": "500"
                                                  }
                                                },
                                                [
                                                  _vm._m(4, true),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass: "pl-1 pr-3"
                                                    },
                                                    [
                                                      _vm._v(
                                                        "\n\t\t\t\t\t\t\t\t\t\tFiltrada\n\t\t\t\t\t\t\t\t\t"
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("span", [
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(thread.timeAgo) +
                                                        "\n\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ])
                                                ]
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _vm._m(5, true)
                                        ]
                                      )
                                    ]
                                  )
                                ])
                              })
                        ],
                        2
                      )
                    : _vm._e()
                ]),
                _vm._v(" "),
                _vm.tab == "inbox"
                  ? _c("div", { staticClass: "mt-3 text-center" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-primary rounded-pill btn-sm",
                          attrs: { disabled: _vm.inboxPage == 1 },
                          on: {
                            click: function($event) {
                              return _vm.messagePagination("inbox", "prev")
                            }
                          }
                        },
                        [_vm._v("Anterior")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-primary rounded-pill btn-sm",
                          attrs: { disabled: _vm.messages.inbox.length != 8 },
                          on: {
                            click: function($event) {
                              return _vm.messagePagination("inbox", "next")
                            }
                          }
                        },
                        [_vm._v("Próxima")]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.tab == "sent"
                  ? _c("div", { staticClass: "mt-3 text-center" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-primary rounded-pill btn-sm",
                          attrs: { disabled: _vm.sentPage == 1 },
                          on: {
                            click: function($event) {
                              return _vm.messagePagination("sent", "prev")
                            }
                          }
                        },
                        [_vm._v("Anterior")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-primary rounded-pill btn-sm",
                          attrs: { disabled: _vm.messages.sent.length != 8 },
                          on: {
                            click: function($event) {
                              return _vm.messagePagination("sent", "next")
                            }
                          }
                        },
                        [_vm._v("Próxima")]
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _vm.tab == "filtered"
                  ? _c("div", { staticClass: "mt-3 text-center" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-primary rounded-pill btn-sm",
                          attrs: { disabled: _vm.filteredPage == 1 },
                          on: {
                            click: function($event) {
                              return _vm.messagePagination("filtered", "prev")
                            }
                          }
                        },
                        [_vm._v("Anterior")]
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-outline-primary rounded-pill btn-sm",
                          attrs: {
                            disabled: _vm.messages.filtered.length != 8
                          },
                          on: {
                            click: function($event) {
                              return _vm.messagePagination("filtered", "next")
                            }
                          }
                        },
                        [_vm._v("Próxima")]
                      )
                    ])
                  : _vm._e()
              ]
            )
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.loaded && _vm.page == "add"
      ? _c(
          "div",
          {
            staticClass: "container messages-page p-0 p-md-2 mt-n4",
            staticStyle: { "min-height": "60vh" }
          },
          [
            _c(
              "div",
              { staticClass: "col-12 col-md-8 offset-md-2 p-0 px-md-2" },
              [
                _c("div", { staticClass: "card shadow-none border mt-4" }, [
                  _c(
                    "div",
                    {
                      staticClass:
                        "card-header bg-white py-4 d-flex justify-content-between"
                    },
                    [
                      _c(
                        "span",
                        {
                          staticClass: "cursor-pointer px-3",
                          on: {
                            click: function($event) {
                              return _vm.goto("browse")
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-chevron-left" })]
                      ),
                      _vm._v(" "),
                      _c("span", { staticClass: "h4 font-weight-bold mb-0" }, [
                        _vm._v("Nova mensage")
                      ]),
                      _vm._v(" "),
                      _vm._m(6)
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "card-body d-flex align-items-center justify-content-center",
                      staticStyle: { height: "60vh" }
                    },
                    [
                      _c(
                        "div",
                        [
                          _c("p", { staticClass: "mb-0 font-weight-bold" }, [
                            _vm._v("Destinatário")
                          ]),
                          _vm._v(" "),
                          _c("autocomplete", {
                            ref: "autocomplete",
                            attrs: {
                              search: _vm.composeSearch,
                              disabled: _vm.composeLoading,
                              placeholder: "@dansup",
                              "aria-label": "Search usernames",
                              "get-result-value": _vm.getTagResultValue
                            },
                            on: { submit: _vm.onTagSubmitLocation }
                          }),
                          _vm._v(" "),
                          _c("div", { staticStyle: { width: "300px" } })
                        ],
                        1
                      )
                    ]
                  )
                ])
              ]
            )
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [_c("i", { staticClass: "far fa-comment text-primary" })])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "float-right" }, [
      _c("i", { staticClass: "fas fa-chevron-right fa-lg text-lighter" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [
      _c("i", { staticClass: "far fa-paper-plane text-primary" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "float-right" }, [
      _c("i", { staticClass: "fas fa-chevron-right fa-lg text-lighter" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [
      _c("i", {
        staticClass: "fas fa-shield-alt",
        staticStyle: { color: "#fd9426" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "float-right" }, [
      _c("i", { staticClass: "fas fa-chevron-right fa-lg text-lighter" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [
      _c("i", { staticClass: "fas fa-chevron-right text-white" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true& ***!
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
  return _c(
    "div",
    [
      _vm.loaded && _vm.page == "read"
        ? _c(
            "div",
            {
              staticClass: "container messages-page p-0 p-md-2 mt-n4",
              staticStyle: { "min-height": "60vh" }
            },
            [
              _c(
                "div",
                { staticClass: "col-12 col-md-8 offset-md-2 p-0 px-md-2" },
                [
                  _c("div", { staticClass: "card shadow-none border mt-4" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "card-header bg-white d-flex justify-content-between align-items-center"
                      },
                      [
                        _vm._m(0),
                        _vm._v(" "),
                        _c("span", [
                          _c("div", { staticClass: "media" }, [
                            _c("img", {
                              staticClass: "mr-3 rounded-circle img-thumbnail",
                              attrs: {
                                src: _vm.thread.avatar,
                                alt: "Generic placeholder image",
                                width: "40px"
                              }
                            }),
                            _vm._v(" "),
                            _c("div", { staticClass: "media-body" }, [
                              _c("p", { staticClass: "mb-0" }, [
                                _c(
                                  "span",
                                  { staticClass: "font-weight-bold" },
                                  [_vm._v(_vm._s(_vm.thread.name))]
                                )
                              ]),
                              _vm._v(" "),
                              _c("p", { staticClass: "mb-0" }, [
                                !_vm.thread.isLocal
                                  ? _c(
                                      "a",
                                      {
                                        staticClass:
                                          "text-decoration-none text-muted",
                                        attrs: {
                                          href: "/" + _vm.thread.username
                                        }
                                      },
                                      [_vm._v(_vm._s(_vm.thread.username))]
                                    )
                                  : _c(
                                      "a",
                                      {
                                        staticClass:
                                          "text-decoration-none text-muted",
                                        attrs: {
                                          href: "/" + _vm.thread.username
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "@" + _vm._s(_vm.thread.username)
                                        )
                                      ]
                                    )
                              ])
                            ])
                          ])
                        ]),
                        _vm._v(" "),
                        _c("span", [
                          _c(
                            "a",
                            {
                              staticClass: "text-muted",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.showOptions()
                                }
                              }
                            },
                            [_c("i", { staticClass: "fas fa-cog fa-lg" })]
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      {
                        staticClass: "list-group list-group-flush dm-wrapper",
                        staticStyle: { height: "60vh", "overflow-y": "scroll" }
                      },
                      [
                        _c("li", { staticClass: "list-group-item border-0" }, [
                          _c(
                            "p",
                            { staticClass: "text-center small text-muted" },
                            [
                              _vm._v("\n\t\t\t\t\t\t\tConversa com "),
                              _c("span", { staticClass: "font-weight-bold" }, [
                                _vm._v(_vm._s(_vm.thread.username))
                              ])
                            ]
                          ),
                          _vm._v(" "),
                          _c("hr")
                        ]),
                        _vm._v(" "),
                        _vm.showLoadMore &&
                        _vm.thread.messages &&
                        _vm.thread.messages.length > 5
                          ? _c(
                              "li",
                              { staticClass: "list-group-item border-0 mt-n4" },
                              [
                                _c(
                                  "p",
                                  {
                                    staticClass: "text-center small text-muted"
                                  },
                                  [
                                    !_vm.loadingMessages
                                      ? _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-primary font-weight-bold rounded-pill btn-sm px-3",
                                            on: {
                                              click: function($event) {
                                                return _vm.loadOlderMessages()
                                              }
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "Carregar mensagens anteriores"
                                            )
                                          ]
                                        )
                                      : _c(
                                          "button",
                                          {
                                            staticClass:
                                              "btn btn-primary font-weight-bold rounded-pill btn-sm px-3",
                                            attrs: { disabled: "" }
                                          },
                                          [_vm._v("Carregando...")]
                                        )
                                  ]
                                )
                              ]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm._l(_vm.thread.messages, function(convo, index) {
                          return _c(
                            "li",
                            {
                              staticClass:
                                "list-group-item border-0 chat-msg cursor-pointer",
                              on: {
                                click: function($event) {
                                  return _vm.openCtxMenu(convo, index)
                                }
                              }
                            },
                            [
                              !convo.isAuthor
                                ? _c(
                                    "div",
                                    { staticClass: "media d-inline-flex mb-0" },
                                    [
                                      !_vm.hideAvatars
                                        ? _c("img", {
                                            staticClass:
                                              "mr-3 mt-2 rounded-circle img-thumbnail",
                                            attrs: {
                                              src: _vm.thread.avatar,
                                              alt: "avatar",
                                              width: "32px"
                                            }
                                          })
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "media-body" }, [
                                        convo.type == "photo"
                                          ? _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "pill-to p-0 shadow"
                                              },
                                              [
                                                _c("img", {
                                                  staticStyle: {
                                                    "border-radius": "20px"
                                                  },
                                                  attrs: {
                                                    src: convo.media,
                                                    width: "140px"
                                                  }
                                                })
                                              ]
                                            )
                                          : convo.type == "link"
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "media d-inline-flex mb-0 cursor-pointer"
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  { staticClass: "media-body" },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "card mb-2 rounded border shadow",
                                                        staticStyle: {
                                                          width: "240px"
                                                        },
                                                        attrs: {
                                                          title: convo.text
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "card-body p-0"
                                                          },
                                                          [
                                                            _c(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "media d-flex align-items-center"
                                                              },
                                                              [
                                                                convo.meta.local
                                                                  ? _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "bg-primary mr-3 border-right p-3"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-link text-white fa-2x"
                                                                          }
                                                                        )
                                                                      ]
                                                                    )
                                                                  : _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "bg-light mr-3 border-right p-3"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-link text-lighter fa-2x"
                                                                          }
                                                                        )
                                                                      ]
                                                                    ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "media-body text-muted small text-truncate pr-2 font-weight-bold"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                        _vm._s(
                                                                          convo
                                                                            .meta
                                                                            .local
                                                                            ? convo.text.substr(
                                                                                8
                                                                              )
                                                                            : convo
                                                                                .meta
                                                                                .domain
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            )
                                                          ]
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          : convo.type == "video"
                                          ? _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "pill-to p-0 shadow"
                                              },
                                              [_vm._m(1, true)]
                                            )
                                          : convo.type == "emoji"
                                          ? _c(
                                              "p",
                                              { staticClass: "p-0 emoji-msg" },
                                              [
                                                _vm._v(
                                                  "\n\t\t\t\t\t\t\t\t\t" +
                                                    _vm._s(convo.text) +
                                                    "\n\t\t\t\t\t\t\t\t"
                                                )
                                              ]
                                            )
                                          : _c(
                                              "p",
                                              {
                                                class: [
                                                  _vm.largerText
                                                    ? "pill-to shadow larger-text text-break"
                                                    : "pill-to shadow text-break"
                                                ]
                                              },
                                              [
                                                _vm._v(
                                                  "\n\t\t\t\t\t\t\t\t\t" +
                                                    _vm._s(convo.text) +
                                                    "\n\t\t\t\t\t\t\t\t"
                                                )
                                              ]
                                            ),
                                        _vm._v(" "),
                                        !_vm.hideTimestamps
                                          ? _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "small text-muted font-weight-bold ml-2 d-flex align-items-center justify-content-start",
                                                attrs: {
                                                  "data-timestamp": "timestamp"
                                                }
                                              },
                                              [
                                                convo.hidden
                                                  ? _c(
                                                      "span",
                                                      {
                                                        staticClass:
                                                          "mr-2 small",
                                                        attrs: {
                                                          title:
                                                            "Filtered Message",
                                                          "data-toggle":
                                                            "tooltip",
                                                          "data-placement":
                                                            "bottom"
                                                        }
                                                      },
                                                      [
                                                        _c("i", {
                                                          staticClass:
                                                            "fas fa-lock"
                                                        })
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(
                                                  " " + _vm._s(convo.timeAgo)
                                                )
                                              ]
                                            )
                                          : _c("p", [_vm._v(" ")])
                                      ])
                                    ]
                                  )
                                : _c(
                                    "div",
                                    {
                                      staticClass:
                                        "media d-inline-flex float-right mb-0"
                                    },
                                    [
                                      _c("div", { staticClass: "media-body" }, [
                                        convo.type == "photo"
                                          ? _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "pill-from p-0 shadow"
                                              },
                                              [
                                                _c("img", {
                                                  staticStyle: {
                                                    "border-radius": "20px"
                                                  },
                                                  attrs: {
                                                    src: convo.media,
                                                    width: "140px"
                                                  }
                                                })
                                              ]
                                            )
                                          : convo.type == "link"
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "media d-inline-flex float-right mb-0 cursor-pointer"
                                              },
                                              [
                                                _c(
                                                  "div",
                                                  { staticClass: "media-body" },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "card mb-2 rounded border shadow",
                                                        staticStyle: {
                                                          width: "240px"
                                                        },
                                                        attrs: {
                                                          title: convo.text
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "card-body p-0"
                                                          },
                                                          [
                                                            _c(
                                                              "div",
                                                              {
                                                                staticClass:
                                                                  "media d-flex align-items-center"
                                                              },
                                                              [
                                                                convo.meta.local
                                                                  ? _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "bg-primary mr-3 border-right p-3"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-link text-white fa-2x"
                                                                          }
                                                                        )
                                                                      ]
                                                                    )
                                                                  : _c(
                                                                      "div",
                                                                      {
                                                                        staticClass:
                                                                          "bg-light mr-3 border-right p-3"
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "i",
                                                                          {
                                                                            staticClass:
                                                                              "fas fa-link text-lighter fa-2x"
                                                                          }
                                                                        )
                                                                      ]
                                                                    ),
                                                                _vm._v(" "),
                                                                _c(
                                                                  "div",
                                                                  {
                                                                    staticClass:
                                                                      "media-body text-muted small text-truncate pr-2 font-weight-bold"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                        _vm._s(
                                                                          convo
                                                                            .meta
                                                                            .local
                                                                            ? convo.text.substr(
                                                                                8
                                                                              )
                                                                            : convo
                                                                                .meta
                                                                                .domain
                                                                        ) +
                                                                        "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                                    )
                                                                  ]
                                                                )
                                                              ]
                                                            )
                                                          ]
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          : convo.type == "video"
                                          ? _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "pill-from p-0 shadow"
                                              },
                                              [_vm._m(2, true)]
                                            )
                                          : convo.type == "emoji"
                                          ? _c(
                                              "p",
                                              { staticClass: "p-0 emoji-msg" },
                                              [
                                                _vm._v(
                                                  "\n\t\t\t\t\t\t\t\t\t" +
                                                    _vm._s(convo.text) +
                                                    "\n\t\t\t\t\t\t\t\t"
                                                )
                                              ]
                                            )
                                          : _c(
                                              "p",
                                              {
                                                class: [
                                                  _vm.largerText
                                                    ? "pill-from shadow larger-text text-break"
                                                    : "pill-from shadow text-break"
                                                ]
                                              },
                                              [
                                                _vm._v(
                                                  "\n\t\t\t\t\t\t\t\t\t" +
                                                    _vm._s(convo.text) +
                                                    "\n\t\t\t\t\t\t\t\t"
                                                )
                                              ]
                                            ),
                                        _vm._v(" "),
                                        !_vm.hideTimestamps
                                          ? _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "small text-muted font-weight-bold text-right mr-2"
                                              },
                                              [
                                                convo.hidden
                                                  ? _c(
                                                      "span",
                                                      {
                                                        staticClass:
                                                          "mr-2 small",
                                                        attrs: {
                                                          title:
                                                            "Filtered Message",
                                                          "data-toggle":
                                                            "tooltip",
                                                          "data-placement":
                                                            "bottom"
                                                        }
                                                      },
                                                      [
                                                        _c("i", {
                                                          staticClass:
                                                            "fas fa-lock"
                                                        })
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(
                                                  " " +
                                                    _vm._s(convo.timeAgo) +
                                                    "\n\t\t\t\t\t\t\t\t"
                                                )
                                              ]
                                            )
                                          : _c("p", [_vm._v(" ")])
                                      ]),
                                      _vm._v(" "),
                                      !_vm.hideAvatars
                                        ? _c("img", {
                                            staticClass:
                                              "ml-3 mt-2 rounded-circle img-thumbnail",
                                            attrs: {
                                              src: _vm.profile.avatar,
                                              alt: "avatar",
                                              width: "32px"
                                            }
                                          })
                                        : _vm._e()
                                    ]
                                  )
                            ]
                          )
                        })
                      ],
                      2
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-footer bg-white p-0" }, [
                      _c(
                        "form",
                        {
                          staticClass: "border-0 rounded-0 align-middle",
                          attrs: { method: "post", action: "#" }
                        },
                        [
                          _c("textarea", {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.replyText,
                                expression: "replyText"
                              }
                            ],
                            staticClass:
                              "form-control border-0 rounded-0 no-focus",
                            staticStyle: {
                              height: "86px",
                              "line-height": "18px",
                              "max-height": "80px",
                              resize: "none",
                              "padding-right": "115.22px"
                            },
                            attrs: {
                              name: "comment",
                              placeholder: "Reply ...",
                              autocomplete: "off",
                              autocorrect: "off",
                              disabled: _vm.blocked
                            },
                            domProps: { value: _vm.replyText },
                            on: {
                              input: function($event) {
                                if ($event.target.composing) {
                                  return
                                }
                                _vm.replyText = $event.target.value
                              }
                            }
                          }),
                          _vm._v(" "),
                          _c("input", {
                            class: [
                              _vm.replyText.length
                                ? "d-inline-block btn btn-sm btn-primary rounded-pill font-weight-bold reply-btn text-decoration-none text-uppercase"
                                : "d-inline-block btn btn-sm btn-primary rounded-pill font-weight-bold reply-btn text-decoration-none text-uppercase disabled"
                            ],
                            attrs: {
                              type: "button",
                              value: "Send",
                              disabled: _vm.replyText.length == 0
                            },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.sendMessage($event)
                              }
                            }
                          })
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "card-footer p-0" }, [
                      _c(
                        "p",
                        {
                          staticClass:
                            "d-flex justify-content-between align-items-center mb-0 px-3 py-1 small"
                        },
                        [
                          _c("span", [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "btn btn-primary btn-sm font-weight-bold py-0 px-3 rounded-pill",
                                on: { click: _vm.uploadMedia }
                              },
                              [
                                _c("i", { staticClass: "fas fa-upload mr-1" }),
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\tAdicionar foto/vídeo\n\t\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ]),
                          _vm._v(" "),
                          _c("input", {
                            staticClass: "d-none",
                            attrs: {
                              type: "file",
                              id: "uploadMedia",
                              name: "uploadMedia",
                              accept: "image/jpeg,image/png,image/gif,video/mp4"
                            }
                          }),
                          _vm._v(" "),
                          _c(
                            "span",
                            { staticClass: "text-muted font-weight-bold" },
                            [_vm._v(_vm._s(_vm.replyText.length) + "/600")]
                          )
                        ]
                      )
                    ])
                  ])
                ]
              )
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.loaded && _vm.page == "options"
        ? _c(
            "div",
            {
              staticClass: "container messages-page p-0 p-md-2 mt-n4",
              staticStyle: { "min-height": "60vh" }
            },
            [
              _c(
                "div",
                { staticClass: "col-12 col-md-8 offset-md-2 p-0 px-md-2" },
                [
                  _c("div", { staticClass: "card shadow-none border mt-4" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "card-header bg-white d-flex justify-content-between align-items-center"
                      },
                      [
                        _c("span", [
                          _c(
                            "a",
                            {
                              staticClass: "text-muted",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  _vm.page = "read"
                                }
                              }
                            },
                            [
                              _c("i", {
                                staticClass: "fas fa-chevron-left fa-lg"
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _vm._m(3),
                        _vm._v(" "),
                        _vm._m(4)
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "ul",
                      {
                        staticClass: "list-group list-group-flush dm-wrapper",
                        staticStyle: { height: "698px" }
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass: "list-group-item media border-bottom"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block custom-control custom-switch ml-3"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.hideAvatars,
                                      expression: "hideAvatars"
                                    }
                                  ],
                                  staticClass: "custom-control-input",
                                  attrs: {
                                    type: "checkbox",
                                    id: "customSwitch0"
                                  },
                                  domProps: {
                                    checked: Array.isArray(_vm.hideAvatars)
                                      ? _vm._i(_vm.hideAvatars, null) > -1
                                      : _vm.hideAvatars
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a = _vm.hideAvatars,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            (_vm.hideAvatars = $$a.concat([
                                              $$v
                                            ]))
                                        } else {
                                          $$i > -1 &&
                                            (_vm.hideAvatars = $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1)))
                                        }
                                      } else {
                                        _vm.hideAvatars = $$c
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", {
                                  staticClass: "custom-control-label",
                                  attrs: { for: "customSwitch0" }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block ml-3 font-weight-bold"
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\tOcultar Avatares\n\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "list-group-item media border-bottom"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block custom-control custom-switch ml-3"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.hideTimestamps,
                                      expression: "hideTimestamps"
                                    }
                                  ],
                                  staticClass: "custom-control-input",
                                  attrs: {
                                    type: "checkbox",
                                    id: "customSwitch1"
                                  },
                                  domProps: {
                                    checked: Array.isArray(_vm.hideTimestamps)
                                      ? _vm._i(_vm.hideTimestamps, null) > -1
                                      : _vm.hideTimestamps
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a = _vm.hideTimestamps,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            (_vm.hideTimestamps = $$a.concat([
                                              $$v
                                            ]))
                                        } else {
                                          $$i > -1 &&
                                            (_vm.hideTimestamps = $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1)))
                                        }
                                      } else {
                                        _vm.hideTimestamps = $$c
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", {
                                  staticClass: "custom-control-label",
                                  attrs: { for: "customSwitch1" }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block ml-3 font-weight-bold"
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\tOcultar data/hora\n\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass: "list-group-item media border-bottom"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block custom-control custom-switch ml-3"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.largerText,
                                      expression: "largerText"
                                    }
                                  ],
                                  staticClass: "custom-control-input",
                                  attrs: {
                                    type: "checkbox",
                                    id: "customSwitch2"
                                  },
                                  domProps: {
                                    checked: Array.isArray(_vm.largerText)
                                      ? _vm._i(_vm.largerText, null) > -1
                                      : _vm.largerText
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a = _vm.largerText,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            (_vm.largerText = $$a.concat([$$v]))
                                        } else {
                                          $$i > -1 &&
                                            (_vm.largerText = $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1)))
                                        }
                                      } else {
                                        _vm.largerText = $$c
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", {
                                  staticClass: "custom-control-label",
                                  attrs: { for: "customSwitch2" }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block ml-3 font-weight-bold"
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\tTexto grande\n\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "list-group-item media border-bottom d-flex align-items-center"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block custom-control custom-switch ml-3"
                              },
                              [
                                _c("input", {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.mutedNotifications,
                                      expression: "mutedNotifications"
                                    }
                                  ],
                                  staticClass: "custom-control-input",
                                  attrs: {
                                    type: "checkbox",
                                    id: "customSwitch4"
                                  },
                                  domProps: {
                                    checked: Array.isArray(
                                      _vm.mutedNotifications
                                    )
                                      ? _vm._i(_vm.mutedNotifications, null) >
                                        -1
                                      : _vm.mutedNotifications
                                  },
                                  on: {
                                    change: function($event) {
                                      var $$a = _vm.mutedNotifications,
                                        $$el = $event.target,
                                        $$c = $$el.checked ? true : false
                                      if (Array.isArray($$a)) {
                                        var $$v = null,
                                          $$i = _vm._i($$a, $$v)
                                        if ($$el.checked) {
                                          $$i < 0 &&
                                            (_vm.mutedNotifications = $$a.concat(
                                              [$$v]
                                            ))
                                        } else {
                                          $$i > -1 &&
                                            (_vm.mutedNotifications = $$a
                                              .slice(0, $$i)
                                              .concat($$a.slice($$i + 1)))
                                        }
                                      } else {
                                        _vm.mutedNotifications = $$c
                                      }
                                    }
                                  }
                                }),
                                _vm._v(" "),
                                _c("label", {
                                  staticClass: "custom-control-label",
                                  attrs: { for: "customSwitch4" }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-inline-block ml-3 font-weight-bold"
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\tMutar notificações\n\t\t\t\t\t\t\t"
                                ),
                                _c("p", { staticClass: "small mb-0" }, [
                                  _vm._v(
                                    "Você não irá receber nenhuma mensagem direta de "
                                  ),
                                  _c("strong", [
                                    _vm._v(_vm._s(_vm.thread.username))
                                  ]),
                                  _vm._v(".")
                                ])
                              ]
                            )
                          ]
                        )
                      ]
                    )
                  ])
                ]
              )
            ]
          )
        : _vm._e(),
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
            _vm.ctxContext && _vm.ctxContext.type == "photo"
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer font-weight-bold text-dark",
                    on: {
                      click: function($event) {
                        return _vm.viewOriginal()
                      }
                    }
                  },
                  [_vm._v("View Original")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.ctxContext && _vm.ctxContext.type == "video"
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer font-weight-bold text-dark",
                    on: {
                      click: function($event) {
                        return _vm.viewOriginal()
                      }
                    }
                  },
                  [_vm._v("Play")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.ctxContext && _vm.ctxContext.type == "link"
              ? _c(
                  "div",
                  {
                    staticClass: "list-group-item rounded cursor-pointer",
                    on: {
                      click: function($event) {
                        return _vm.clickLink()
                      }
                    }
                  },
                  [
                    _c(
                      "p",
                      {
                        staticClass: "mb-0",
                        staticStyle: { "font-size": "12px" }
                      },
                      [_vm._v("\n\t\t\t\tIr para\n\t\t\t")]
                    ),
                    _vm._v(" "),
                    _c(
                      "p",
                      { staticClass: "mb-0 font-weight-bold text-dark" },
                      [
                        _vm._v(
                          "\n\t\t\t\t" +
                            _vm._s(this.ctxContext.meta.domain) +
                            "\n\t\t\t"
                        )
                      ]
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.ctxContext &&
            (_vm.ctxContext.type == "text" ||
              _vm.ctxContext.type == "emoji" ||
              _vm.ctxContext.type == "link")
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer text-dark",
                    on: {
                      click: function($event) {
                        return _vm.copyText()
                      }
                    }
                  },
                  [_vm._v("Copia")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.ctxContext && !_vm.ctxContext.isAuthor
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer text-muted",
                    on: {
                      click: function($event) {
                        return _vm.reportMessage()
                      }
                    }
                  },
                  [_vm._v("Reportar")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.ctxContext && _vm.ctxContext.isAuthor
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer text-muted",
                    on: {
                      click: function($event) {
                        return _vm.deleteMessage()
                      }
                    }
                  },
                  [_vm._v("Apagar")]
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
              [_vm._v("Cancelar")]
            )
          ])
        ]
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [
      _c(
        "a",
        { staticClass: "text-muted", attrs: { href: "/account/direct" } },
        [_c("i", { staticClass: "fas fa-chevron-left fa-lg" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass:
          "d-block bg-primary d-flex align-items-center justify-content-center",
        staticStyle: {
          width: "200px",
          height: "110px",
          "border-radius": "20px"
        }
      },
      [
        _c("div", { staticClass: "text-center" }, [
          _c("p", { staticClass: "mb-1" }, [
            _c("i", { staticClass: "fas fa-play fa-2x text-white" })
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "mb-0 small font-weight-bold text-white" }, [
            _vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\tPlay\n\t\t\t\t\t\t\t\t\t\t\t")
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass:
          "rounded-pill bg-primary d-flex align-items-center justify-content-center",
        staticStyle: { width: "200px", height: "110px" }
      },
      [
        _c("div", { staticClass: "text-center" }, [
          _c("p", { staticClass: "mb-1" }, [
            _c("i", { staticClass: "fas fa-play fa-2x text-white" })
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "mb-0 small font-weight-bold" }, [
            _vm._v("\n\t\t\t\t\t\t\t\t\t\t\t\tPlay\n\t\t\t\t\t\t\t\t\t\t\t")
          ])
        ])
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", [
      _c("p", { staticClass: "mb-0 lead font-weight-bold py-2" }, [
        _vm._v("Configurações")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "span",
      {
        staticClass: "text-lighter",
        attrs: {
          "data-toggle": "tooltip",
          "data-placement": "bottom",
          title: "Have a nice day!"
        }
      },
      [_c("i", { staticClass: "far fa-smile fa-lg" })]
    )
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

/***/ "./resources/assets/js/components/Direct.vue":
/*!***************************************************!*\
  !*** ./resources/assets/js/components/Direct.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Direct_vue_vue_type_template_id_96e9d740_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Direct.vue?vue&type=template&id=96e9d740&scoped=true& */ "./resources/assets/js/components/Direct.vue?vue&type=template&id=96e9d740&scoped=true&");
/* harmony import */ var _Direct_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Direct.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Direct.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Direct_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Direct_vue_vue_type_template_id_96e9d740_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Direct_vue_vue_type_template_id_96e9d740_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "96e9d740",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Direct.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Direct.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/assets/js/components/Direct.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Direct_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Direct.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Direct.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Direct_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/Direct.vue?vue&type=template&id=96e9d740&scoped=true&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/Direct.vue?vue&type=template&id=96e9d740&scoped=true& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Direct_vue_vue_type_template_id_96e9d740_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Direct.vue?vue&type=template&id=96e9d740&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Direct.vue?vue&type=template&id=96e9d740&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Direct_vue_vue_type_template_id_96e9d740_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Direct_vue_vue_type_template_id_96e9d740_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/DirectMessage.vue":
/*!**********************************************************!*\
  !*** ./resources/assets/js/components/DirectMessage.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DirectMessage_vue_vue_type_template_id_6b74e792_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true& */ "./resources/assets/js/components/DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true&");
/* harmony import */ var _DirectMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DirectMessage.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/DirectMessage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css& */ "./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _DirectMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DirectMessage_vue_vue_type_template_id_6b74e792_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DirectMessage_vue_vue_type_template_id_6b74e792_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "6b74e792",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/DirectMessage.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/DirectMessage.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/assets/js/components/DirectMessage.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DirectMessage.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css& ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=style&index=0&id=6b74e792&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_style_index_0_id_6b74e792_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true&":
/*!*****************************************************************************************************!*\
  !*** ./resources/assets/js/components/DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_template_id_6b74e792_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DirectMessage.vue?vue&type=template&id=6b74e792&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_template_id_6b74e792_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DirectMessage_vue_vue_type_template_id_6b74e792_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/direct.js":
/*!***************************************!*\
  !*** ./resources/assets/js/direct.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('direct-component', __webpack_require__(/*! ./components/Direct.vue */ "./resources/assets/js/components/Direct.vue")["default"]);
Vue.component('direct-message', __webpack_require__(/*! ./components/DirectMessage.vue */ "./resources/assets/js/components/DirectMessage.vue")["default"]);

/***/ }),

/***/ 21:
/*!*********************************************!*\
  !*** multi ./resources/assets/js/direct.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/direct.js */"./resources/assets/js/direct.js");


/***/ })

},[[21,"/js/manifest"]]]);