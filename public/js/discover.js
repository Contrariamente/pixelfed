(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/discover"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DiscoverComponent.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/DiscoverComponent.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      authenticated: false,
      loaded: false,
      config: window.App.config,
      posts: {},
      trending: {},
      trendingDaily: {},
      trendingMonthly: {},
      searchTerm: '',
      trendingRange: 'daily',
      trendingLoading: true,
      recommendedLoading: true
    };
  },
  beforeMount: function beforeMount() {
    this.authenticated = $('body').hasClass('loggedIn');
  },
  mounted: function mounted() {
    this.loaded = true;
    this.loadTrending();

    if ($('body').hasClass('loggedIn') == true) {
      this.fetchData();
      axios.get('/api/pixelfed/v1/accounts/verify_credentials').then(function (res) {
        window._sharedData.curUser = res.data;
        window.App.util.navatar();
      });
    }
  },
  methods: {
    fetchData: function fetchData() {
      var _this = this;

      if (!this.recommendedLoading) {
        return;
      }

      axios.get('/api/pixelfed/v2/discover/posts').then(function (res) {
        _this.posts = res.data.posts.filter(function (r) {
          return r != null;
        });
        _this.recommendedLoading = false;
      });
    },
    searchSubmit: function searchSubmit() {
      if (this.searchTerm.length > 1) {
        window.location.href = '/i/results?q=' + this.searchTerm;
      }
    },
    loadTrending: function loadTrending() {
      var _this2 = this;

      if (this.trendingRange == 'daily' && this.trendingDaily.length) {
        this.trending = this.trendingDaily;
        this.trendingLoading = false;
      }

      if (this.trendingRange == 'monthly' && this.trendingMonthly.length) {
        this.trending = this.trendingMonthly;
        this.trendingLoading = false;
      }

      axios.get('/api/pixelfed/v2/discover/posts/trending', {
        params: {
          range: this.trendingRange
        }
      }).then(function (res) {
        var data = res.data.filter(function (r) {
          return r !== null;
        });

        if (_this2.trendingRange == 'daily') {
          _this2.trendingDaily = data.filter(function (t) {
            return t.sensitive == false;
          });
        }

        if (_this2.trendingRange == 'monthly') {
          _this2.trendingMonthly = data.filter(function (t) {
            return t.sensitive == false;
          });
        }

        _this2.trending = data;
        _this2.trendingLoading = false;
      });
    },
    trendingRangeToggle: function trendingRangeToggle(r) {
      this.trendingLoading = true;
      this.trendingRange = r;
      this.loadTrending();
    },
    formatCount: function formatCount(s) {
      return App.util.format.count(s);
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DiscoverComponent.vue?vue&type=template&id=7ab7dfed&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/DiscoverComponent.vue?vue&type=template&id=7ab7dfed& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    !_vm.loaded
      ? _c(
          "div",
          {
            staticClass: "d-flex justify-content-center align-items-center",
            staticStyle: { height: "70vh" }
          },
          [_c("img", { attrs: { src: "/img/pixelfed-icon-grey.svg" } })]
        )
      : _c("div", [
          _vm.authenticated
            ? _c(
                "div",
                { staticClass: "d-block d-md-none border-top-0 pt-3" },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.searchTerm,
                        expression: "searchTerm"
                      }
                    ],
                    staticClass: "form-control rounded-pill shadow-sm",
                    attrs: { placeholder: "Search" },
                    domProps: { value: _vm.searchTerm },
                    on: {
                      keyup: function($event) {
                        if (
                          !$event.type.indexOf("key") &&
                          _vm._k(
                            $event.keyCode,
                            "enter",
                            13,
                            $event.key,
                            "Enter"
                          )
                        ) {
                          return null
                        }
                        return _vm.searchSubmit($event)
                      },
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.searchTerm = $event.target.value
                      }
                    }
                  })
                ]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("section", { staticClass: "mt-3 mb-5 section-explore" }, [
            _c("div", { staticClass: "profile-timeline" }, [
              _c("div", { staticClass: "row p-0 mt-5" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "col-12 mb-3 d-flex justify-content-between align-items-center"
                  },
                  [
                    _c(
                      "p",
                      {
                        staticClass:
                          "d-block d-md-none h1 font-weight-bold mb-0"
                      },
                      [_vm._v("Trending")]
                    ),
                    _vm._v(" "),
                    _c(
                      "p",
                      {
                        staticClass:
                          "d-none d-md-block display-4 font-weight-bold mb-0"
                      },
                      [_vm._v("Trending")]
                    ),
                    _vm._v(" "),
                    _c("div", [
                      _c("div", { staticClass: "btn-group" }, [
                        _c(
                          "button",
                          {
                            class:
                              _vm.trendingRange == "daily"
                                ? "btn py-1 font-weight-bold px-3 text-uppercase btn-sm btn-danger"
                                : "btn py-1 font-weight-bold px-3 text-uppercase btn-sm btn-outline-danger",
                            on: {
                              click: function($event) {
                                return _vm.trendingRangeToggle("daily")
                              }
                            }
                          },
                          [_vm._v("Diário")]
                        ),
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            class:
                              _vm.trendingRange == "monthly"
                                ? "btn py-1 font-weight-bold px-3 text-uppercase btn-sm btn-danger"
                                : "btn py-1 font-weight-bold px-3 text-uppercase btn-sm btn-outline-danger",
                            on: {
                              click: function($event) {
                                return _vm.trendingRangeToggle("monthly")
                              }
                            }
                          },
                          [_vm._v("Mensal")]
                        )
                      ])
                    ])
                  ]
                )
              ]),
              _vm._v(" "),
              !_vm.trendingLoading
                ? _c(
                    "div",
                    { staticClass: "row p-0 d-flex" },
                    _vm._l(_vm.trending.slice(0, 12), function(s, index) {
                      return _vm.trending.length
                        ? _c(
                            "div",
                            { staticClass: "col-4 p-1 p-sm-2 p-md-3 pt-0" },
                            [
                              _c(
                                "a",
                                {
                                  staticClass:
                                    "card info-overlay card-md-border-0",
                                  attrs: { href: s.url }
                                },
                                [
                                  _c("div", { staticClass: "square" }, [
                                    s.sensitive
                                      ? _c(
                                          "div",
                                          { staticClass: "square-content" },
                                          [
                                            _vm._m(0, true),
                                            _vm._v(" "),
                                            _c("blur-hash-canvas", {
                                              attrs: {
                                                width: "32",
                                                height: "32",
                                                hash:
                                                  s.media_attachments[0]
                                                    .blurhash
                                              }
                                            })
                                          ],
                                          1
                                        )
                                      : _c(
                                          "div",
                                          { staticClass: "square-content" },
                                          [
                                            _c("blur-hash-image", {
                                              attrs: {
                                                width: "32",
                                                height: "32",
                                                hash:
                                                  s.media_attachments[0]
                                                    .blurhash,
                                                src:
                                                  s.media_attachments[0]
                                                    .preview_url
                                              }
                                            })
                                          ],
                                          1
                                        ),
                                    _vm._v(" "),
                                    s.pf_type == "photo:album"
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "float-right mr-3 post-icon"
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fas fa-images fa-2x"
                                            })
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    s.pf_type == "video"
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "float-right mr-3 post-icon"
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fas fa-video fa-2x"
                                            })
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    s.pf_type == "video:album"
                                      ? _c(
                                          "span",
                                          {
                                            staticClass:
                                              "float-right mr-3 post-icon"
                                          },
                                          [
                                            _c("i", {
                                              staticClass: "fas fa-film fa-2x"
                                            })
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "info-overlay-text" },
                                      [
                                        _c(
                                          "h5",
                                          {
                                            staticClass:
                                              "text-white m-auto font-weight-bold"
                                          },
                                          [
                                            _c("span", [
                                              _c("span", {
                                                staticClass:
                                                  "far fa-heart fa-lg p-2 d-flex-inline"
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "d-flex-inline"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.formatCount(
                                                        s.favourites_count
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                            ]),
                                            _vm._v(" "),
                                            _c("span", [
                                              _c("span", {
                                                staticClass:
                                                  "far fa-comment fa-lg p-2 d-flex-inline"
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass: "d-flex-inline"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.formatCount(
                                                        s.reply_count
                                                      )
                                                    )
                                                  )
                                                ]
                                              )
                                            ])
                                          ]
                                        )
                                      ]
                                    )
                                  ])
                                ]
                              )
                            ]
                          )
                        : _c(
                            "div",
                            {
                              staticClass:
                                "col-12 d-flex align-items-center justify-content-center bg-light border",
                              staticStyle: { "min-height": "40vh" }
                            },
                            [
                              _c("div", { staticClass: "h2" }, [
                                _vm._v("Nenhum post encontrado :(")
                              ])
                            ]
                          )
                    }),
                    0
                  )
                : _c(
                    "div",
                    {
                      staticClass:
                        "row d-flex align-items-center justify-content-center bg-light border",
                      staticStyle: { "min-height": "40vh" }
                    },
                    [_vm._m(1)]
                  )
            ])
          ]),
          _vm._v(" "),
          _vm.authenticated
            ? _c("section", { staticClass: "pt-5 mb-5 section-explore" }, [
                _c("div", { staticClass: "profile-timeline pt-3" }, [
                  _vm._m(2),
                  _vm._v(" "),
                  !_vm.recommendedLoading
                    ? _c(
                        "div",
                        { staticClass: "row p-0 d-flex" },
                        _vm._l(_vm.posts, function(s, index) {
                          return _vm.posts.length
                            ? _c(
                                "div",
                                {
                                  key: "rmki:" + index,
                                  staticClass: "col-4 p-1 p-sm-2 p-md-3 pt-0"
                                },
                                [
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "card info-overlay card-md-border-0",
                                      attrs: { href: s.url }
                                    },
                                    [
                                      _c("div", { staticClass: "square" }, [
                                        s.sensitive
                                          ? _c(
                                              "div",
                                              { staticClass: "square-content" },
                                              [
                                                _vm._m(3, true),
                                                _vm._v(" "),
                                                _c("blur-hash-canvas", {
                                                  attrs: {
                                                    width: "32",
                                                    height: "32",
                                                    hash:
                                                      s.media_attachments[0]
                                                        .blurhash
                                                  }
                                                })
                                              ],
                                              1
                                            )
                                          : _c(
                                              "div",
                                              { staticClass: "square-content" },
                                              [
                                                _c("blur-hash-image", {
                                                  attrs: {
                                                    width: "32",
                                                    height: "32",
                                                    hash:
                                                      s.media_attachments[0]
                                                        .blurhash,
                                                    src:
                                                      s.media_attachments[0]
                                                        .preview_url
                                                  }
                                                })
                                              ],
                                              1
                                            ),
                                        _vm._v(" "),
                                        s.pf_type == "photo:album"
                                          ? _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "float-right mr-3 post-icon"
                                              },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-images fa-2x"
                                                })
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        s.pf_type == "video"
                                          ? _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "float-right mr-3 post-icon"
                                              },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-video fa-2x"
                                                })
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        s.pf_type == "video:album"
                                          ? _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "float-right mr-3 post-icon"
                                              },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-film fa-2x"
                                                })
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          { staticClass: "info-overlay-text" },
                                          [
                                            _c(
                                              "h5",
                                              {
                                                staticClass:
                                                  "text-white m-auto font-weight-bold"
                                              },
                                              [
                                                _c("span", [
                                                  _c("span", {
                                                    staticClass:
                                                      "far fa-heart fa-lg p-2 d-flex-inline"
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "d-flex-inline"
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.formatCount(
                                                            s.favourites_count
                                                          )
                                                        )
                                                      )
                                                    ]
                                                  )
                                                ]),
                                                _vm._v(" "),
                                                _c("span", [
                                                  _c("span", {
                                                    staticClass:
                                                      "far fa-comment fa-lg p-2 d-flex-inline"
                                                  }),
                                                  _vm._v(" "),
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "d-flex-inline"
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.formatCount(
                                                            s.reply_count
                                                          )
                                                        )
                                                      )
                                                    ]
                                                  )
                                                ])
                                              ]
                                            )
                                          ]
                                        )
                                      ])
                                    ]
                                  )
                                ]
                              )
                            : _c(
                                "div",
                                {
                                  staticClass:
                                    "col-12 d-flex align-items-center justify-content-center bg-light border",
                                  staticStyle: { "min-height": "40vh" }
                                },
                                [
                                  _c("div", { staticClass: "h2" }, [
                                    _vm._v("Nenhum post encontrado :(")
                                  ])
                                ]
                              )
                        }),
                        0
                      )
                    : _c(
                        "div",
                        {
                          staticClass:
                            "row d-flex align-items-center justify-content-center bg-light border",
                          staticStyle: { "min-height": "40vh" }
                        },
                        [_vm._m(4)]
                      )
                ])
              ])
            : _vm._e()
        ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "info-overlay-text-label" }, [
      _c("h5", { staticClass: "text-white m-auto font-weight-bold" }, [
        _c("span", [
          _c("span", {
            staticClass: "far fa-eye-slash fa-lg p-2 d-flex-inline"
          })
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Carregando...")])]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row p-0 mt-5" }, [
      _c(
        "div",
        {
          staticClass:
            "col-12 mb-3 d-flex justify-content-between align-items-center"
        },
        [
          _c(
            "p",
            { staticClass: "d-block d-md-none h1 font-weight-bold mb-0" },
            [_vm._v("Para você")]
          ),
          _vm._v(" "),
          _c(
            "p",
            {
              staticClass: "d-none d-md-block display-4 font-weight-bold mb-0"
            },
            [_vm._v("Para você")]
          )
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "info-overlay-text-label" }, [
      _c("h5", { staticClass: "text-white m-auto font-weight-bold" }, [
        _c("span", [
          _c("span", {
            staticClass: "far fa-eye-slash fa-lg p-2 d-flex-inline"
          })
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "div",
      { staticClass: "spinner-border", attrs: { role: "status" } },
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Carregando...")])]
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

/***/ "./resources/assets/js/components/DiscoverComponent.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/DiscoverComponent.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DiscoverComponent_vue_vue_type_template_id_7ab7dfed___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DiscoverComponent.vue?vue&type=template&id=7ab7dfed& */ "./resources/assets/js/components/DiscoverComponent.vue?vue&type=template&id=7ab7dfed&");
/* harmony import */ var _DiscoverComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DiscoverComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/DiscoverComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DiscoverComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DiscoverComponent_vue_vue_type_template_id_7ab7dfed___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DiscoverComponent_vue_vue_type_template_id_7ab7dfed___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/DiscoverComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/DiscoverComponent.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/DiscoverComponent.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DiscoverComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./DiscoverComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DiscoverComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DiscoverComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/DiscoverComponent.vue?vue&type=template&id=7ab7dfed&":
/*!*********************************************************************************************!*\
  !*** ./resources/assets/js/components/DiscoverComponent.vue?vue&type=template&id=7ab7dfed& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DiscoverComponent_vue_vue_type_template_id_7ab7dfed___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./DiscoverComponent.vue?vue&type=template&id=7ab7dfed& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/DiscoverComponent.vue?vue&type=template&id=7ab7dfed&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DiscoverComponent_vue_vue_type_template_id_7ab7dfed___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DiscoverComponent_vue_vue_type_template_id_7ab7dfed___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/discover.js":
/*!*****************************************!*\
  !*** ./resources/assets/js/discover.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('discover-component', __webpack_require__(/*! ./components/DiscoverComponent.vue */ "./resources/assets/js/components/DiscoverComponent.vue")["default"]);

/***/ }),

/***/ 3:
/*!***********************************************!*\
  !*** multi ./resources/assets/js/discover.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/discover.js */"./resources/assets/js/discover.js");


/***/ })

},[[3,"/js/manifest"]]]);