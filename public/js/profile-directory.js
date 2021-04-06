(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/profile-directory"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileDirectory.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ProfileDirectory.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      loaded: false,
      showLoadMore: true,
      profiles: [],
      page: 1
    };
  },
  beforeMount: function beforeMount() {
    this.fetchData();
  },
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      axios.get('/api/pixelfed/v2/discover/profiles', {
        params: {
          page: this.page
        }
      }).then(function (res) {
        if (res.data.length == 0) {
          _this.showLoadMore = false;
          _this.loaded = true;
          return;
        }

        _this.profiles = res.data;
        _this.showLoadMore = _this.profiles.length == 8;
        _this.loaded = true;
      });
    },
    prettyCount: function prettyCount(val) {
      return App.util.format.count(val);
    },
    loadMore: function loadMore() {
      this.loaded = false;
      this.page++;
      this.fetchData();
    },
    thumbUrl: function thumbUrl(p) {
      return p.media_attachments[0].url;
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true& ***!
  \**************************************************************************************************************************************************************************************************************************************/
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
    _c("div", { staticClass: "col-12" }, [
      _c("p", { staticClass: "font-weight-bold text-lighter text-uppercase" }, [
        _vm._v("Perfis")
      ]),
      _vm._v(" "),
      _vm.loaded
        ? _c("div", {}, [
            _c(
              "div",
              { staticClass: "row" },
              [
                _vm._l(_vm.profiles, function(profile, index) {
                  return _c("div", { staticClass: "col-12 col-md-6 p-1" }, [
                    _c(
                      "div",
                      { staticClass: "card card-body border shadow-none py-2" },
                      [
                        _c("div", { staticClass: "media" }, [
                          _c("a", { attrs: { href: profile.url } }, [
                            _c("img", {
                              staticClass: "rounded-circle border mr-3",
                              attrs: {
                                src: profile.avatar,
                                alt: "...",
                                width: "40px",
                                height: "40px"
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "media-body" }, [
                            _c(
                              "p",
                              { staticClass: "mt-0 mb-0 font-weight-bold" },
                              [
                                _c(
                                  "a",
                                  {
                                    staticClass: "text-dark",
                                    attrs: { href: profile.url }
                                  },
                                  [_vm._v(_vm._s(profile.username))]
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "p",
                              {
                                staticClass:
                                  "mb-1 small text-lighter d-flex justify-content-between font-weight-bold"
                              },
                              [
                                _c("span", [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.prettyCount(profile.statuses_count)
                                      )
                                    )
                                  ]),
                                  _vm._v(" POSTS\n\t\t\t\t\t\t\t\t\t")
                                ]),
                                _vm._v(" "),
                                _c("span", [
                                  _c("span", [
                                    _vm._v(
                                      _vm._s(
                                        _vm.prettyCount(profile.followers_count)
                                      )
                                    )
                                  ]),
                                  _vm._v(" SEGUIDORES\n\t\t\t\t\t\t\t\t\t")
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c(
                              "p",
                              { staticClass: "mb-1" },
                              _vm._l(profile.posts, function(post, i) {
                                return _c(
                                  "span",
                                  {
                                    key: "profile_posts_" + i,
                                    staticClass: "shadow-sm"
                                  },
                                  [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "text-decoration-none mr-1",
                                        attrs: { href: post.url }
                                      },
                                      [
                                        _c("img", {
                                          staticClass: "border rounded",
                                          attrs: {
                                            src: _vm.thumbUrl(post),
                                            width: "62.3px",
                                            height: "62.3px"
                                          }
                                        })
                                      ]
                                    )
                                  ]
                                )
                              }),
                              0
                            )
                          ])
                        ])
                      ]
                    )
                  ])
                }),
                _vm._v(" "),
                _vm.showLoadMore
                  ? _c("div", { staticClass: "col-12" }, [
                      _c("p", { staticClass: "text-center mb-0 pt-3" }, [
                        _c(
                          "button",
                          {
                            staticClass:
                              "btn btn-outline-secondary btn-sm px-4 py-1 font-weight-bold",
                            on: {
                              click: function($event) {
                                return _vm.loadMore()
                              }
                            }
                          },
                          [_vm._v("Mais")]
                        )
                      ])
                    ])
                  : _vm._e()
              ],
              2
            )
          ])
        : _c("div", [_vm._m(0)])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c(
        "div",
        {
          staticClass: "col-12 d-flex justify-content-center align-items-center"
        },
        [
          _c(
            "div",
            { staticClass: "spinner-border", attrs: { role: "status" } },
            [_c("span", { staticClass: "sr-only" }, [_vm._v("Carregando...")])]
          )
        ]
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

/***/ "./resources/assets/js/components/ProfileDirectory.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/ProfileDirectory.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProfileDirectory_vue_vue_type_template_id_9cec2a0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true& */ "./resources/assets/js/components/ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true&");
/* harmony import */ var _ProfileDirectory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProfileDirectory.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/ProfileDirectory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ProfileDirectory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ProfileDirectory_vue_vue_type_template_id_9cec2a0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ProfileDirectory_vue_vue_type_template_id_9cec2a0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9cec2a0a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/ProfileDirectory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/ProfileDirectory.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/ProfileDirectory.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileDirectory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileDirectory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileDirectory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileDirectory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileDirectory_vue_vue_type_template_id_9cec2a0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/ProfileDirectory.vue?vue&type=template&id=9cec2a0a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileDirectory_vue_vue_type_template_id_9cec2a0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ProfileDirectory_vue_vue_type_template_id_9cec2a0a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/profile-directory.js":
/*!**************************************************!*\
  !*** ./resources/assets/js/profile-directory.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('profile-directory', __webpack_require__(/*! ./components/ProfileDirectory.vue */ "./resources/assets/js/components/ProfileDirectory.vue")["default"]);

/***/ }),

/***/ 19:
/*!********************************************************!*\
  !*** multi ./resources/assets/js/profile-directory.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/profile-directory.js */"./resources/assets/js/profile-directory.js");


/***/ })

},[[19,"/js/manifest"]]]);