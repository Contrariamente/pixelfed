(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/timeline"],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      announcements: [],
      announcement: {},
      cursor: 0,
      showNext: true,
      showPrev: false
    };
  },
  mounted: function mounted() {
    this.fetchAnnouncements();
  },
  updated: function updated() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    fetchAnnouncements: function fetchAnnouncements() {
      var self = this;
      var key = 'metro-tips-closed';
      var cached = JSON.parse(window.localStorage.getItem(key));
      axios.get('/api/pixelfed/v1/newsroom/timeline').then(function (res) {
        self.announcements = res.data.filter(function (p) {
          if (cached) {
            return cached.indexOf(p.id) == -1;
          } else {
            return true;
          }
        });
        self.announcement = self.announcements[0];

        if (self.announcements.length == 1) {
          self.showNext = false;
        }
      });
    },
    loadNext: function loadNext() {
      if (!this.showNext) {
        return;
      }

      this.cursor += 1;
      this.announcement = this.announcements[this.cursor];

      if (this.cursor + 1 == this.announcements.length) {
        this.showNext = false;
      }

      if (this.cursor >= 1) {
        this.showPrev = true;
      }
    },
    loadPrev: function loadPrev() {
      if (!this.showPrev) {
        return;
      }

      this.cursor -= 1;
      this.announcement = this.announcements[this.cursor];

      if (this.cursor == 0) {
        this.showPrev = false;
      }

      if (this.cursor < this.announcements.length) {
        this.showNext = true;
      }
    },
    closeNewsroomPost: function closeNewsroomPost(id, index) {
      var key = 'metro-tips-closed';
      var ctx = [];
      var cached = window.localStorage.getItem(key);

      if (cached) {
        ctx = JSON.parse(cached);
      }

      ctx.push(id);
      window.localStorage.setItem(key, JSON.stringify(ctx));
      this.newsroomPosts = this.newsroomPosts.filter(function (res) {
        return res.id !== id;
      });

      if (this.newsroomPosts.length == 0) {
        this.showTips = false;
      } else {
        this.newsroomPost = [this.newsroomPosts[0]];
      }
    },
    close: function close() {
      window.localStorage.setItem('metro-tips', false);
      this.$emit('show-tips', false);
    },
    markAsRead: function markAsRead() {
      var vm = this;
      axios.post('/api/pixelfed/v1/newsroom/markasread', {
        id: this.announcement.id
      }).then(function (res) {
        var cur = vm.cursor;
        vm.announcements.splice(cur, 1);
        vm.announcement = vm.announcements[0];
        vm.cursor = 0;
        vm.showPrev = false;
        vm.showNext = vm.announcements.length > 1;
      })["catch"](function (err) {
        swal('Oops, Something went wrong', 'There was a problem with your request, please try again later.', 'error');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NotificationCard.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/NotificationCard.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      notifications: {},
      notificationCursor: 2,
      notificationMaxId: 0,
      profile: {
        locked: false
      },
      followRequests: null
    };
  },
  mounted: function mounted() {
    var self = this;
    this.fetchNotifications();
    setTimeout(function () {
      self.profile = window._sharedData.curUser;
      self.fetchFollowRequests();
    }, 500);
  },
  updated: function updated() {},
  methods: {
    fetchNotifications: function fetchNotifications() {
      var _this = this;

      axios.get('/api/pixelfed/v1/notifications?pg=true').then(function (res) {
        var data = res.data;
        var ids = res.data.map(function (n) {
          return n.id;
        });
        _this.notificationMaxId = Math.min.apply(Math, _toConsumableArray(ids));
        _this.notifications = data;
        $('.notification-card .loader').addClass('d-none');
        $('.notification-card .contents').removeClass('d-none'); //this.notificationPoll();
      });
    },
    infiniteNotifications: function infiniteNotifications($state) {
      var _this2 = this;

      if (this.notificationCursor > 5) {
        $state.complete();
        return;
      }

      axios.get('/api/pixelfed/v1/notifications', {
        params: {
          page: this.notificationCursor
        }
      }).then(function (res) {
        if (res.data.length) {
          var _this2$notifications;

          var data = res.data.filter(function (n) {
            if (n.type == 'share' && !status) {
              return false;
            }

            if (_.find(_this2.notifications, {
              id: n.id
            })) {
              return false;
            }

            return true;
          });

          (_this2$notifications = _this2.notifications).push.apply(_this2$notifications, _toConsumableArray(data));

          _this2.notificationCursor++;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    truncate: function truncate(text) {
      if (text.length <= 15) {
        return text;
      }

      return text.slice(0, 15) + '...';
    },
    timeAgo: function timeAgo(ts) {
      return window.App.util.format.timeAgo(ts);
    },
    mentionUrl: function mentionUrl(status) {
      var username = status.account.username;
      var id = status.id;
      return '/p/' + username + '/' + id;
    },
    notificationPoll: function notificationPoll() {
      var interval = this.notifications.length > 5 ? 15000 : 120000;
      var self = this;
      setInterval(function () {
        axios.get('/api/pixelfed/v1/notifications').then(function (res) {
          var data = res.data.filter(function (n) {
            if (n.type == 'share' || self.notificationMaxId >= n.id) {
              return false;
            }

            return true;
          });

          if (data.length) {
            var _self$notifications;

            var ids = data.map(function (n) {
              return n.id;
            });
            self.notificationMaxId = Math.max.apply(Math, _toConsumableArray(ids));

            (_self$notifications = self.notifications).unshift.apply(_self$notifications, _toConsumableArray(data));

            var beep = new Audio('/static/beep.mp3');
            beep.volume = 0.7;
            beep.play();
            $('.notification-card .far.fa-bell').addClass('fas text-danger').removeClass('far text-muted');
          }
        });
      }, interval);
    },
    refreshNotifications: function refreshNotifications() {
      var self = this;
      axios.get('/api/pixelfed/v1/notifications').then(function (res) {
        var data = res.data.filter(function (n) {
          if (n.type == 'share' || self.notificationMaxId >= n.id) {
            return false;
          }

          return true;
        });

        if (data.length > 0) {
          var ids = data.map(function (n) {
            return n.id;
          });
          var max = Math.max(ids);

          if (max <= self.notificationMaxId) {
            return;
          } else {
            self.notificationMaxId = max;
            self.notifications = data;
            var beep = new Audio('/static/beep.mp3');
            beep.volume = 0.7;
            beep.play();
          }
        }
      });
    },
    fetchFollowRequests: function fetchFollowRequests() {
      var _this3 = this;

      if (window._sharedData.curUser.locked == true) {
        axios.get('/account/follow-requests.json').then(function (res) {
          _this3.followRequests = res.data;
        });
      }
    },
    redirect: function redirect(url) {
      window.location.href = url;
    },
    notificationPreview: function notificationPreview(n) {
      if (!n.status.hasOwnProperty('media_attachments') || !n.status.media_attachments.length) {
        return '/storage/no-preview.png';
      }

      return n.status.media_attachments[0].preview_url;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PostMenu.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['feed', 'status', 'profile', 'size', 'modal'],
  data: function data() {
    return {
      activeSession: false
    };
  },
  mounted: function mounted() {
    var el = document.querySelector('body');
    this.activeSession = el.classList.contains('loggedIn') ? true : false;
  },
  methods: {
    reportUrl: function reportUrl(status) {
      var type = status.in_reply_to ? 'comment' : 'post';
      var id = status.id;
      return '/i/report?type=' + type + '&id=' + id;
    },
    timestampFormat: function timestampFormat(timestamp) {
      var ts = new Date(timestamp);
      return ts.toDateString() + ' ' + ts.toLocaleTimeString();
    },
    editUrl: function editUrl(status) {
      return status.url + '/edit';
    },
    redirect: function redirect(url) {
      window.location.href = url;
      return;
    },
    replyUrl: function replyUrl(status) {
      var username = this.profile.username;
      var id = status.account.id == this.profile.id ? status.id : status.in_reply_to_id;
      return '/p/' + username + '/' + id;
    },
    mentionUrl: function mentionUrl(status) {
      var username = status.account.username;
      var id = status.id;
      return '/p/' + username + '/' + id;
    },
    statusOwner: function statusOwner(status) {
      var sid = parseInt(status.account.id);
      var uid = parseInt(this.profile.id);

      if (sid == uid) {
        return true;
      } else {
        return false;
      }
    },
    deletePost: function deletePost() {
      this.$emit('deletePost');
      $('#mt_pid_' + this.status.id).modal('hide');
    },
    hidePost: function hidePost(status) {
      status.sensitive = true;
      $('#mt_pid_' + status.id).modal('hide');
    },
    moderatePost: function moderatePost(status, action, $event) {
      var username = status.account.username;

      switch (action) {
        case 'autocw':
          var msg = 'Are you sure you want to enforce CW for ' + username + ' ?';
          swal({
            title: 'Confirm',
            text: msg,
            icon: 'warning',
            buttons: true,
            dangerMode: true
          });
          break;

        case 'suspend':
          msg = 'Are you sure you want to suspend the account of ' + username + ' ?';
          swal({
            title: 'Confirm',
            text: msg,
            icon: 'warning',
            buttons: true,
            dangerMode: true
          });
          break;
      }
    },
    muteProfile: function muteProfile(status) {
      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/mute', {
        type: 'user',
        item: status.account.id
      }).then(function (res) {
        swal('Success', 'Você silenciou ' + status.account.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    blockProfile: function blockProfile(status) {
      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/block', {
        type: 'user',
        item: status.account.id
      }).then(function (res) {
        swal('Success', 'Você bloqueou ' + status.account.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var zuck_js_dist_zuck_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zuck.js/dist/zuck.css */ "./node_modules/zuck.js/dist/zuck.css");
/* harmony import */ var zuck_js_dist_zuck_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zuck_js_dist_zuck_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zuck_js_dist_skins_snapgram_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zuck.js/dist/skins/snapgram.css */ "./node_modules/zuck.js/dist/skins/snapgram.css");
/* harmony import */ var zuck_js_dist_skins_snapgram_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zuck_js_dist_skins_snapgram_css__WEBPACK_IMPORTED_MODULE_1__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var Zuck = __webpack_require__(/*! zuck.js */ "./node_modules/zuck.js/src/zuck.js");

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['list'],
  data: function data() {
    return {
      show: false,
      stories: {}
    };
  },
  mounted: function mounted() {
    this.fetchStories();
  },
  methods: {
    fetchStories: function fetchStories() {
      var _this = this;

      axios.get('/api/stories/v0/recent').then(function (res) {
        var data = res.data;

        if (!res.data.length) {
          _this.show = false;
          return;
        }

        var stories = new Zuck('storyContainer', {
          list: _this.list == true ? true : false,
          stories: data,
          localStorage: true,
          callbacks: {
            onOpen: function onOpen(storyId, callback) {
              document.body.style.overflow = "hidden";
              callback();
            },
            onEnd: function onEnd(storyId, callback) {
              axios.post('/i/stories/viewed', {
                id: storyId
              });
              callback();
            },
            onClose: function onClose(storyId, callback) {
              document.body.style.overflow = "auto";
              callback();
            }
          }
        });
        data.forEach(function (d) {
          var url = '/api/stories/v0/fetch/' + d.pid;
          axios.get(url).then(function (res) {
            res.data.forEach(function (item) {
              var img = new Image();
              img.src = item.src;
              stories.addItem(d.id, item);
            });
          });
        });
      });
      this.show = true;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Timeline.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_tribute__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-tribute */ "./node_modules/vue-tribute/dist/vue-tribute.es.js");
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['scope', 'layout'],
  components: {
    VueTribute: vue_tribute__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      ids: [],
      config: window.App.config,
      page: 2,
      feed: [],
      profile: {},
      min_id: 0,
      max_id: 0,
      suggestions: {},
      loading: true,
      replies: [],
      replyId: null,
      modes: {
        'mod': false,
        'dark': false,
        'notify': true,
        'distractionFree': false
      },
      followers: [],
      followerCursor: 1,
      followerMore: true,
      following: [],
      followingCursor: 1,
      followingMore: true,
      lightboxMedia: false,
      showSuggestions: true,
      showReadMore: true,
      replyStatus: {},
      replyText: '',
      replyNsfw: false,
      emoji: window.App.util.emoji,
      showHashtagPosts: false,
      hashtagPosts: [],
      hashtagPostsName: '',
      ctxMenuStatus: false,
      ctxMenuRelationship: false,
      ctxEmbedPayload: false,
      copiedEmbed: false,
      showTips: true,
      userStory: false,
      replySending: false,
      ctxEmbedShowCaption: true,
      ctxEmbedShowLikes: false,
      ctxEmbedCompactMode: false,
      morePostsAvailable: false,
      mpCount: 0,
      mpData: false,
      mpInterval: 15000,
      mpEnabled: false,
      mpPoller: null,
      confirmModalTitle: 'Are you sure?',
      confirmModalIdentifer: null,
      confirmModalType: false,
      currentLayout: 'feed',
      pagination: {},
      tributeSettings: {
        collection: [{
          trigger: '@',
          menuShowMinLength: 2,
          values: function values(text, cb) {
            var url = '/api/compose/v0/search/mention';
            axios.get(url, {
              params: {
                q: text
              }
            }).then(function (res) {
              cb(res.data);
            })["catch"](function (err) {
              console.log(err);
            });
          }
        }, {
          trigger: '#',
          menuShowMinLength: 2,
          values: function values(text, cb) {
            var url = '/api/compose/v0/search/hashtag';
            axios.get(url, {
              params: {
                q: text
              }
            }).then(function (res) {
              cb(res.data);
            })["catch"](function (err) {
              console.log(err);
            });
          }
        }]
      }
    };
  },
  watch: {
    ctxEmbedShowCaption: function ctxEmbedShowCaption(n, o) {
      if (n == true) {
        this.ctxEmbedCompactMode = false;
      }

      var mode = this.ctxEmbedCompactMode ? 'compact' : 'full';
      this.ctxEmbedPayload = window.App.util.embed.post(this.ctxMenuStatus.url, this.ctxEmbedShowCaption, this.ctxEmbedShowLikes, mode);
    },
    ctxEmbedShowLikes: function ctxEmbedShowLikes(n, o) {
      if (n == true) {
        this.ctxEmbedCompactMode = false;
      }

      var mode = this.ctxEmbedCompactMode ? 'compact' : 'full';
      this.ctxEmbedPayload = window.App.util.embed.post(this.ctxMenuStatus.url, this.ctxEmbedShowCaption, this.ctxEmbedShowLikes, mode);
    },
    ctxEmbedCompactMode: function ctxEmbedCompactMode(n, o) {
      if (n == true) {
        this.ctxEmbedShowCaption = false;
        this.ctxEmbedShowLikes = false;
      }

      var mode = this.ctxEmbedCompactMode ? 'compact' : 'full';
      this.ctxEmbedPayload = window.App.util.embed.post(this.ctxMenuStatus.url, this.ctxEmbedShowCaption, this.ctxEmbedShowLikes, mode);
    }
  },
  beforeMount: function beforeMount() {
    this.fetchProfile();
    this.fetchTimelineApi();
  },
  mounted: function mounted() {
    // todo: release after dark mode updates

    /* if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches || $('link[data-stylesheet="dark"]').length != 0) {
    	this.modes.dark = true;
    		let el = document.querySelector('link[data-stylesheet="light"]');
    	el.setAttribute('href', '/css/appdark.css?id=' + Date.now());
    	el.setAttribute('data-stylesheet', 'dark');
    }*/
    if (localStorage.getItem('pf_metro_ui.exp.rec') == 'false') {
      this.showSuggestions = false;
    } else {
      this.showSuggestions = true;
    }

    if (localStorage.getItem('pf_metro_ui.exp.rm') == 'false') {
      this.showReadMore = false;
    } else {
      this.showReadMore = true;
    }

    if (localStorage.getItem('metro-tips') == 'false') {
      this.showTips = false;
    }

    this.$nextTick(function () {
      $('[data-toggle="tooltip"]').tooltip();
      var u = new URLSearchParams(window.location.search);

      if (u.has('a') && u.get('a') == 'co') {
        $('#composeModal').modal('show');
      }
    });
  },
  updated: function updated() {
    if (this.showReadMore == true) {
      pixelfed.readmore();
    }
  },
  methods: {
    fetchProfile: function fetchProfile() {
      var _this = this;

      axios.get('/api/pixelfed/v1/accounts/verify_credentials').then(function (res) {
        _this.profile = res.data;

        if (_this.profile.is_admin == true) {
          _this.modes.mod = true;
        }

        window._sharedData.curUser = res.data;
        window.App.util.navatar();

        _this.hasStory(); // this.expRec();

      })["catch"](function (err) {
        swal('Oops, something went wrong', 'Please reload the page.', 'error');
      });
    },
    fetchTimelineApi: function fetchTimelineApi() {
      var _this2 = this;

      var apiUrl = false;

      switch (this.scope) {
        case 'home':
          apiUrl = '/api/pixelfed/v1/timelines/home';
          break;

        case 'local':
          apiUrl = '/api/pixelfed/v1/timelines/public';
          break;

        case 'network':
          apiUrl = '/api/pixelfed/v1/timelines/network';
          break;
      }

      axios.get(apiUrl, {
        params: {
          max_id: this.max_id,
          limit: 3
        }
      }).then(function (res) {
        var _this2$feed;

        var data = res.data;

        (_this2$feed = _this2.feed).push.apply(_this2$feed, _toConsumableArray(data));

        var ids = data.map(function (status) {
          return status.id;
        });
        _this2.ids = ids;
        _this2.min_id = Math.max.apply(Math, _toConsumableArray(ids)).toString();
        _this2.max_id = Math.min.apply(Math, _toConsumableArray(ids)).toString();
        _this2.loading = false;
        $('.timeline .pagination').removeClass('d-none'); // if(this.feed.length == 4) {
        // 	this.fetchTimelineApi();
        // }

        if (_this2.hashtagPosts.length == 0) {
          _this2.fetchHashtagPosts();
        } // this.fetchStories();


        _this2.rtw();

        setTimeout(function () {
          document.querySelectorAll('.timeline .card-body .comments .comment-body a').forEach(function (i, e) {
            i.href = App.util.format.rewriteLinks(i);
          });
        }, 500);
      })["catch"](function (err) {
        swal('Oops, something went wrong', 'Please reload the page.', 'error');
      });
    },
    infiniteTimeline: function infiniteTimeline($state) {
      var _this3 = this;

      if (this.loading) {
        $state.complete();
        return;
      }

      if (this.page > 40) {
        this.loading = false;
        $state.complete();
      }

      var apiUrl = false;

      switch (this.scope) {
        case 'home':
          apiUrl = '/api/pixelfed/v1/timelines/home';
          break;

        case 'local':
          apiUrl = '/api/pixelfed/v1/timelines/public';
          break;

        case 'network':
          apiUrl = '/api/pixelfed/v1/timelines/network';
          break;
      }

      axios.get(apiUrl, {
        params: {
          max_id: this.max_id,
          limit: 6
        }
      }).then(function (res) {
        if (res.data.length && _this3.loading == false) {
          var data = res.data;
          var self = _this3;
          data.forEach(function (d, index) {
            if (self.ids.indexOf(d.id) == -1) {
              self.feed.push(d);
              self.ids.push(d.id);
              axios.post('/api/status/view', {
                'status_id': d.id,
                'profile_id': d.account.id
              });
            }
          });
          _this3.min_id = Math.max.apply(Math, _toConsumableArray(_this3.ids)).toString();
          _this3.max_id = Math.min.apply(Math, _toConsumableArray(_this3.ids)).toString();
          _this3.page += 1;
          $state.loaded();
          _this3.loading = false;
        } else {
          $state.complete();
        }
      })["catch"](function (err) {
        _this3.loading = false;
        $state.complete();
      });
    },
    reportUrl: function reportUrl(status) {
      var type = status.in_reply_to ? 'comment' : 'post';
      var id = status.id;
      return '/i/report?type=' + type + '&id=' + id;
    },
    commentFocus: function commentFocus(status, $event) {
      if (status.comments_disabled) {
        return;
      } // if(this.status && this.status.id == status.id) {
      // 	this.$refs.replyModal.show();
      // 	return;
      // }


      this.status = status;
      this.replies = {};
      this.replyStatus = {};
      this.replyText = '';
      this.replyId = status.id;
      this.replyStatus = status; // this.$refs.replyModal.show();

      this.fetchStatusComments(status, '');
      $('nav').hide();
      $('footer').hide();
      $('.mobile-footer-spacer').attr('style', 'display:none !important');
      $('.mobile-footer').attr('style', 'display:none !important');
      this.currentLayout = 'comments';
      window.history.pushState({}, '', status.url);
      return;
    },
    commentNavigateBack: function commentNavigateBack(id) {
      $('nav').show();
      $('footer').show();
      $('.mobile-footer-spacer').attr('style', 'display:block');
      $('.mobile-footer').attr('style', 'display:block');
      this.currentLayout = 'feed';
      setTimeout(function () {
        $([document.documentElement, document.body]).animate({
          scrollTop: $("div[data-status-id=\"".concat(id, "\"]")).offset().top
        }, 1000);
      }, 500);
      var path = this.scope == 'home' ? '/' : '/timeline/public';
      window.history.pushState({}, '', path);
    },
    likeStatus: function likeStatus(status, event) {
      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      var count = status.favourites_count;
      status.favourited = !status.favourited;
      axios.post('/i/like', {
        item: status.id
      }).then(function (res) {
        status.favourites_count = res.data.count;
      })["catch"](function (err) {
        status.favourited = !status.favourited;
        status.favourites_count = count;
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
      window.navigator.vibrate(200);

      if (status.favourited) {
        setTimeout(function () {
          event.target.classList.add('animate__animated', 'animate__bounce');
        }, 100);
      }
    },
    shareStatus: function shareStatus(status, $event) {
      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      this.closeModals();
      axios.post('/i/share', {
        item: status.id
      }).then(function (res) {
        status.reblogs_count = res.data.count;
        status.reblogged = !status.reblogged;

        if (status.reblogged) {
          swal('Success', 'You shared this post', 'success');
        } else {
          swal('Success', 'You unshared this post', 'success');
        }
      })["catch"](function (err) {
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
    },
    timestampFormat: function timestampFormat(timestamp) {
      var ts = new Date(timestamp);
      return ts.toDateString() + ' ' + ts.toLocaleTimeString();
    },
    redirect: function redirect(url) {
      window.location.href = url;
      return;
    },
    statusOwner: function statusOwner(status) {
      var sid = status.account.id;
      var uid = this.profile.id;

      if (sid == uid) {
        return true;
      } else {
        return false;
      }
    },
    fetchStatusComments: function fetchStatusComments(status, card) {
      var _this4 = this;

      // axios.get('/api/v2/status/'+status.id+'/replies',
      // {
      // 	params: {
      // 		limit: 6
      // 	}
      // })
      // .then(res => {
      // 	let data = res.data.filter(res => {
      // 		return res.sensitive == false;
      // 	});
      // 	this.replies = _.reverse(data);
      // 	setTimeout(function() {
      // 		document.querySelectorAll('.timeline .card-body .comments .comment-body a').forEach(function(i, e) {
      // 			i.href = App.util.format.rewriteLinks(i);
      // 		});
      // 	}, 500);
      // }).catch(err => {
      // })
      var url = '/api/v2/comments/' + status.account.id + '/status/' + status.id;
      axios.get(url).then(function (response) {
        var self = _this4; // this.results = this.layout == 'metro' ?
        // _.reverse(response.data.data) :
        // response.data.data;

        _this4.replies = _.reverse(response.data.data);
        _this4.pagination = response.data.meta.pagination;

        if (_this4.replies.length > 0) {
          $('.load-more-link').removeClass('d-none');
        }

        $('.postCommentsLoader').addClass('d-none');
        $('.postCommentsContainer').removeClass('d-none'); // setTimeout(function() {
        // 	document.querySelectorAll('.status-comment .postCommentsContainer .comment-body a').forEach(function(i, e) {
        // 		i.href = App.util.format.rewriteLinks(i);
        // 	});
        // }, 500);
      })["catch"](function (error) {
        if (!error.response) {
          $('.postCommentsLoader .lds-ring').attr('style', 'width:100%').addClass('pt-4 font-weight-bold text-muted').text('An error occurred, cannot fetch comments. Please try again later.');
        } else {
          switch (error.response.status) {
            case 401:
              $('.postCommentsLoader .lds-ring').attr('style', 'width:100%').addClass('pt-4 font-weight-bold text-muted').text('Please login to view.');
              break;

            default:
              $('.postCommentsLoader .lds-ring').attr('style', 'width:100%').addClass('pt-4 font-weight-bold text-muted').text('An error occurred, cannot fetch comments. Please try again later.');
              break;
          }
        }
      });
    },
    muteProfile: function muteProfile(status) {
      var _this5 = this;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/mute', {
        type: 'user',
        item: status.account.id
      }).then(function (res) {
        _this5.feed = _this5.feed.filter(function (s) {
          return s.account.id !== status.account.id;
        });
        swal('Success', 'You have successfully muted ' + status.account.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    blockProfile: function blockProfile(status) {
      var _this6 = this;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/block', {
        type: 'user',
        item: status.account.id
      }).then(function (res) {
        _this6.feed = _this6.feed.filter(function (s) {
          return s.account.id !== status.account.id;
        });
        swal('Success', 'You have successfully blocked ' + status.account.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    deletePost: function deletePost(status) {
      var _this7 = this;

      if ($('body').hasClass('loggedIn') == false || this.ownerOrAdmin(status) == false) {
        return;
      }

      if (window.confirm('Are you sure you want to delete this post?') == false) {
        return;
      }

      axios.post('/i/delete', {
        type: 'status',
        item: status.id
      }).then(function (res) {
        _this7.feed = _this7.feed.filter(function (s) {
          return s.id != status.id;
        });

        _this7.closeModals();
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    commentSubmit: function commentSubmit(status, $event) {
      var _this8 = this;

      this.replySending = true;
      var id = status.id;
      var comment = this.replyText;
      var limit = this.config.uploader.max_caption_length;

      if (comment.length > limit) {
        this.replySending = false;
        swal('Comment Too Long', 'Please make sure your comment is ' + limit + ' characters or less.', 'error');
        return;
      }

      axios.post('/i/comment', {
        item: id,
        comment: comment,
        sensitive: this.replyNsfw
      }).then(function (res) {
        _this8.replyText = '';

        _this8.replies.push(res.data.entity);

        _this8.$refs.replyModal.hide();
      });
      this.replySending = false;
    },
    moderatePost: function moderatePost(status, action, $event) {
      var _this9 = this;

      var username = status.account.username;
      var msg = '';
      var self = this;

      switch (action) {
        case 'addcw':
          msg = 'Are you sure you want to add a content warning to this post?';
          swal({
            title: 'Confirm',
            text: msg,
            icon: 'warning',
            buttons: true,
            dangerMode: true
          }).then(function (res) {
            if (res) {
              axios.post('/api/v2/moderator/action', {
                action: action,
                item_id: status.id,
                item_type: 'status'
              }).then(function (res) {
                swal('Success', 'Successfully added content warning', 'success');
                status.sensitive = true;
                self.ctxModMenuClose();
              })["catch"](function (err) {
                swal('Error', 'Something went wrong, please try again later.', 'error');
                self.ctxModMenuClose();
              });
            }
          });
          break;

        case 'remcw':
          msg = 'Are you sure you want to remove the content warning on this post?';
          swal({
            title: 'Confirm',
            text: msg,
            icon: 'warning',
            buttons: true,
            dangerMode: true
          }).then(function (res) {
            if (res) {
              axios.post('/api/v2/moderator/action', {
                action: action,
                item_id: status.id,
                item_type: 'status'
              }).then(function (res) {
                swal('Success', 'Successfully added content warning', 'success');
                status.sensitive = false;
                self.ctxModMenuClose();
              })["catch"](function (err) {
                swal('Error', 'Something went wrong, please try again later.', 'error');
                self.ctxModMenuClose();
              });
            }
          });
          break;

        case 'unlist':
          msg = 'Are you sure you want to unlist this post?';
          swal({
            title: 'Confirm',
            text: msg,
            icon: 'warning',
            buttons: true,
            dangerMode: true
          }).then(function (res) {
            if (res) {
              axios.post('/api/v2/moderator/action', {
                action: action,
                item_id: status.id,
                item_type: 'status'
              }).then(function (res) {
                _this9.feed = _this9.feed.filter(function (f) {
                  return f.id != status.id;
                });
                swal('Success', 'Successfully unlisted post', 'success');
                self.ctxModMenuClose();
              })["catch"](function (err) {
                self.ctxModMenuClose();
                swal('Error', 'Something went wrong, please try again later.', 'error');
              });
            }
          });
          break;
      }
    },
    followingModal: function followingModal() {
      var _this10 = this;

      if (this.following.length > 0) {
        this.$refs.followingModal.show();
        return;
      }

      axios.get('/api/pixelfed/v1/accounts/' + this.profile.id + '/following', {
        params: {
          page: this.followingCursor
        }
      }).then(function (res) {
        _this10.following = res.data;
        _this10.followingCursor++;
      });

      if (res.data.length < 10) {
        this.followingMore = false;
      }

      this.$refs.followingModal.show();
    },
    followersModal: function followersModal() {
      var _this11 = this;

      if (this.followers.length > 0) {
        this.$refs.followerModal.show();
        return;
      }

      axios.get('/api/pixelfed/v1/accounts/' + this.profile.id + '/followers', {
        params: {
          page: this.followerCursor
        }
      }).then(function (res) {
        _this11.followers = res.data;
        _this11.followerCursor++;
      });

      if (res.data.length < 10) {
        this.followerMore = false;
      }

      this.$refs.followerModal.show();
    },
    followingLoadMore: function followingLoadMore() {
      var _this12 = this;

      axios.get('/api/pixelfed/v1/accounts/' + this.profile.id + '/following', {
        params: {
          page: this.followingCursor
        }
      }).then(function (res) {
        if (res.data.length > 0) {
          var _this12$following;

          (_this12$following = _this12.following).push.apply(_this12$following, _toConsumableArray(res.data));

          _this12.followingCursor++;
        }

        if (res.data.length < 10) {
          _this12.followingMore = false;
        }
      });
    },
    followersLoadMore: function followersLoadMore() {
      var _this13 = this;

      axios.get('/api/pixelfed/v1/accounts/' + this.profile.id + '/followers', {
        params: {
          page: this.followerCursor
        }
      }).then(function (res) {
        if (res.data.length > 0) {
          var _this13$followers;

          (_this13$followers = _this13.followers).push.apply(_this13$followers, _toConsumableArray(res.data));

          _this13.followerCursor++;
        }

        if (res.data.length < 10) {
          _this13.followerMore = false;
        }
      });
    },
    lightbox: function lightbox(status) {
      window.location.href = status.media_attachments[0].url;
      return;
      this.lightboxMedia = status.media_attachments[0];
      this.$refs.lightboxModal.show();
    },
    expLc: function expLc(status) {
      if (this.config.ab.lc == false) {
        return true;
      }

      if (this.statusOwner(status) == true) {
        return true;
      }

      return false;
    },
    expRec: function expRec() {
      var _this14 = this;

      //return;
      if (this.config.ab.rec == false) {
        return;
      }

      axios.get('/api/local/exp/rec').then(function (res) {
        _this14.suggestions = res.data;
      });
    },
    expRecFollow: function expRecFollow(id, index) {
      var _this15 = this;

      return;

      if (this.config.ab.rec == false) {
        return;
      }

      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        _this15.suggestions.splice(index, 1);
      })["catch"](function (err) {
        if (err.response.data.message) {
          swal('Error', err.response.data.message, 'error');
        }
      });
    },
    followAction: function followAction(status) {
      var _this16 = this;

      var id = status.account.id;
      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        _this16.feed.forEach(function (s) {
          if (s.account.id == id) {
            s.account.relationship.following = !s.account.relationship.following;
          }
        });

        var username = status.account.acct;

        if (status.account.relationship.following) {
          swal('Seguindo!', 'Você agora está seguindo ' + username, 'success');
        } else {
          swal('Unfollow!', 'Você deixou de seguir ' + username, 'success');
        }
      })["catch"](function (err) {
        if (err.response.data.message) {
          swal('Error', err.response.data.message, 'error');
        }
      });
    },
    owner: function owner(status) {
      return this.profile.id === status.account.id;
    },
    admin: function admin() {
      return this.profile.is_admin == true;
    },
    ownerOrAdmin: function ownerOrAdmin(status) {
      return this.owner(status) || this.admin();
    },
    hideSuggestions: function hideSuggestions() {
      localStorage.setItem('pf_metro_ui.exp.rec', false);
      this.showSuggestions = false;
    },
    emojiReaction: function emojiReaction(status) {
      var em = event.target.innerText;

      if (this.replyText.length == 0) {
        this.replyText = em + ' ';
        $('textarea[name="comment"]').focus();
      } else {
        this.replyText += em + ' ';
        $('textarea[name="comment"]').focus();
      }
    },
    refreshSuggestions: function refreshSuggestions() {
      var _this17 = this;

      return;
      var el = event.target.parentNode;

      if (el.classList.contains('disabled') == true) {
        return;
      }

      axios.get('/api/local/exp/rec', {
        params: {
          refresh: true
        }
      }).then(function (res) {
        _this17.suggestions = res.data;

        if (el.classList) {
          el.classList.add('disabled');
          el.classList.add('text-light');
        } else {
          el.className += ' ' + 'disabled text-light';
        }

        setTimeout(function () {
          el.setAttribute('href', '#');

          if (el.classList) {
            el.classList.remove('disabled');
            el.classList.remove('text-light');
          } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), 'disabled text-light');
          }
        }, 10000);
      });
    },
    fetchHashtagPosts: function fetchHashtagPosts() {
      var _this18 = this;

      axios.get('/api/local/discover/tag/list').then(function (res) {
        var tags = res.data;

        if (tags.length == 0) {
          return;
        }

        var hashtag = tags[Math.floor(Math.random(), tags.length)];
        _this18.hashtagPostsName = hashtag;
        axios.get('/api/v2/discover/tag', {
          params: {
            hashtag: hashtag
          }
        }).then(function (res) {
          if (res.data.tags.length > 3) {
            _this18.showHashtagPosts = true;
            _this18.hashtagPosts = res.data.tags.splice(0, 3);
          }
        });
      });
    },
    ctxMenu: function ctxMenu(status) {
      var _this19 = this;

      this.ctxMenuStatus = status;
      this.ctxEmbedPayload = window.App.util.embed.post(status.url);

      if (status.account.id == this.profile.id) {
        this.ctxMenuRelationship = false;
        this.$refs.ctxModal.show();
      } else {
        axios.get('/api/pixelfed/v1/accounts/relationships', {
          params: {
            'id[]': status.account.id
          }
        }).then(function (res) {
          _this19.ctxMenuRelationship = res.data[0];

          _this19.$refs.ctxModal.show();
        });
      }
    },
    closeCtxMenu: function closeCtxMenu(truncate) {
      this.copiedEmbed = false;
      this.ctxMenuStatus = false;
      this.ctxMenuRelationship = false;
      this.$refs.ctxModal.hide();
      this.$refs.ctxReport.hide();
      this.$refs.ctxReportOther.hide();
      this.closeModals();
    },
    ctxMenuCopyLink: function ctxMenuCopyLink() {
      var status = this.ctxMenuStatus;
      navigator.clipboard.writeText(status.url);
      this.closeModals();
      return;
    },
    ctxMenuGoToPost: function ctxMenuGoToPost() {
      var status = this.ctxMenuStatus;
      window.location.href = this.statusUrl(status);
      this.closeCtxMenu();
      return;
    },
    ctxMenuFollow: function ctxMenuFollow() {
      var _this20 = this;

      var id = this.ctxMenuStatus.account.id;
      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        var username = _this20.ctxMenuStatus.account.acct;

        _this20.closeCtxMenu();

        setTimeout(function () {
          swal('Seguindo!', 'Você agora está seguindo ' + username, 'success');
        }, 500);
      });
    },
    ctxMenuUnfollow: function ctxMenuUnfollow() {
      var _this21 = this;

      var id = this.ctxMenuStatus.account.id;
      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        var username = _this21.ctxMenuStatus.account.acct;

        if (_this21.scope == 'home') {
          _this21.feed = _this21.feed.filter(function (s) {
            return s.account.id != _this21.ctxMenuStatus.account.id;
          });
        }

        _this21.closeCtxMenu();

        setTimeout(function () {
          swal('Unfollow!', 'Você deixou de seguir ' + username, 'success');
        }, 500);
      });
    },
    ctxMenuReportPost: function ctxMenuReportPost() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxReport.show();
      return; // window.location.href = '/i/report?type=post&id=' + this.ctxMenuStatus.id;
    },
    ctxMenuEmbed: function ctxMenuEmbed() {
      this.closeModals();
      this.$refs.ctxEmbedModal.show();
    },
    ctxMenuShare: function ctxMenuShare() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxShareModal.show();
    },
    closeCtxShareMenu: function closeCtxShareMenu() {
      this.$refs.ctxShareModal.hide();
      this.$refs.ctxModal.show();
    },
    ctxCopyEmbed: function ctxCopyEmbed() {
      navigator.clipboard.writeText(this.ctxEmbedPayload);
      this.ctxEmbedShowCaption = true;
      this.ctxEmbedShowLikes = false;
      this.ctxEmbedCompactMode = false;
      this.$refs.ctxEmbedModal.hide();
    },
    ctxModMenuShow: function ctxModMenuShow() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxModModal.show();
    },
    ctxModOtherMenuShow: function ctxModOtherMenuShow() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxModModal.hide();
      this.$refs.ctxModOtherModal.show();
    },
    ctxModMenu: function ctxModMenu() {
      this.$refs.ctxModal.hide();
    },
    ctxModMenuClose: function ctxModMenuClose() {
      this.closeModals();
      this.$refs.ctxModal.show();
    },
    ctxModOtherMenuClose: function ctxModOtherMenuClose() {
      this.closeModals();
      this.$refs.ctxModModal.show();
    },
    formatCount: function formatCount(count) {
      return App.util.format.count(count);
    },
    statusUrl: function statusUrl(status) {
      if (status.local == true) {
        return status.url;
      }

      return '/i/web/post/_/' + status.account.id + '/' + status.id;
    },
    profileUrl: function profileUrl(status) {
      if (status.local == true) {
        return status.account.url;
      }

      return '/i/web/profile/_/' + status.account.id;
    },
    statusCardUsernameFormat: function statusCardUsernameFormat(status) {
      if (status.account.local == true) {
        return status.account.username;
      }

      var fmt = window.App.config.username.remote.format;
      var txt = window.App.config.username.remote.custom;
      var usr = status.account.username;
      var dom = document.createElement('a');
      dom.href = status.account.url;
      dom = dom.hostname;

      switch (fmt) {
        case '@':
          return usr + '<span class="text-lighter font-weight-bold">@' + dom + '</span>';
          break;

        case 'from':
          return usr + '<span class="text-lighter font-weight-bold"> <span class="font-weight-normal">from</span> ' + dom + '</span>';
          break;

        case 'custom':
          return usr + '<span class="text-lighter font-weight-bold"> ' + txt + ' ' + dom + '</span>';
          break;

        default:
          return usr + '<span class="text-lighter font-weight-bold">@' + dom + '</span>';
          break;
      }
    },
    previewUrl: function previewUrl(status) {
      return status.sensitive ? '/storage/no-preview.png?v=' + new Date().getTime() : status.media_attachments[0].preview_url;
    },
    previewBackground: function previewBackground(status) {
      var preview = this.previewUrl(status);
      return 'background-image: url(' + preview + ');';
    },
    trimCaption: function trimCaption(caption) {
      var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 60;
      return _.truncate(caption, {
        length: len
      });
    },
    hasStory: function hasStory() {
      var _this22 = this;

      axios.get('/api/stories/v0/exists/' + this.profile.id).then(function (res) {
        _this22.userStory = res.data;
      });
    },
    // real time watcher
    rtw: function rtw() {
      var _this23 = this;

      this.mpPoller = setInterval(function () {
        var apiUrl = false;
        _this23.mpCount++;

        if (_this23.mpCount > 10) {
          _this23.mpInterval = 30000;
        }

        if (_this23.mpCount > 50) {
          _this23.mpInterval = 5 * 60 * 1000;
        }

        switch (_this23.scope) {
          case 'home':
            apiUrl = '/api/pixelfed/v1/timelines/home';
            break;

          case 'local':
            apiUrl = '/api/pixelfed/v1/timelines/public';
            break;

          case 'network':
            apiUrl = '/api/pixelfed/v1/timelines/network';
            break;
        }

        axios.get(apiUrl, {
          params: {
            max_id: 0,
            limit: 20
          }
        }).then(function (res) {
          var self = _this23;

          var tids = _this23.feed.map(function (status) {
            return status.id;
          });

          var data = res.data.filter(function (d) {
            return d.id > self.min_id && tids.indexOf(d.id) == -1;
          });
          var ids = data.map(function (status) {
            return status.id;
          });
          var max = Math.max.apply(Math, _toConsumableArray(ids)).toString();
          var newer = max > _this23.min_id;

          if (newer) {
            _this23.morePostsAvailable = true;
            _this23.mpData = data;
          }
        });
      }, this.mpInterval);
    },
    syncNewPosts: function syncNewPosts() {
      var _this$feed;

      var self = this;
      var data = this.mpData;
      var ids = data.map(function (s) {
        return s.id;
      });
      this.min_id = Math.max.apply(Math, _toConsumableArray(ids)).toString();
      this.max_id = Math.min.apply(Math, _toConsumableArray(ids)).toString();

      (_this$feed = this.feed).unshift.apply(_this$feed, _toConsumableArray(data));

      this.morePostsAvailable = false;
      this.mpData = null;
    },
    switchFeedLayout: function switchFeedLayout(toggle) {
      this.loading = true;
      this.layout = toggle;
      var self = this;
      setTimeout(function () {
        self.loading = false;
      }, 500);
    },
    labelRedirect: function labelRedirect(type) {
      var url = '/i/redirect?url=' + encodeURI(this.config.features.label.covid.url);
      window.location.href = url;
    },
    openCtxReportOtherMenu: function openCtxReportOtherMenu() {
      var s = this.ctxMenuStatus;
      this.closeCtxMenu();
      this.ctxMenuStatus = s;
      this.$refs.ctxReportOther.show();
    },
    ctxReportMenuGoBack: function ctxReportMenuGoBack() {
      this.$refs.ctxReportOther.hide();
      this.$refs.ctxReport.hide();
      this.$refs.ctxModal.show();
    },
    ctxReportOtherMenuGoBack: function ctxReportOtherMenuGoBack() {
      this.$refs.ctxReportOther.hide();
      this.$refs.ctxModal.hide();
      this.$refs.ctxReport.show();
    },
    sendReport: function sendReport(type) {
      var _this24 = this;

      var id = this.ctxMenuStatus.id;
      swal({
        'title': 'Confirmar Report',
        'text': 'Confirma que deseja reportar este post?',
        'icon': 'warning',
        'buttons': true,
        'dangerMode': true
      }).then(function (res) {
        if (res) {
          axios.post('/i/report/', {
            'report': type,
            'type': 'post',
            'id': id
          }).then(function (res) {
            _this24.closeCtxMenu();

            swal('Obrigado!', 'Recebemos sua solicitação.', 'success');
          })["catch"](function (err) {
            swal('Oops!', 'There was an issue reporting this post.', 'error');
          });
        } else {
          _this24.closeCtxMenu();
        }
      });
    },
    closeModals: function closeModals() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxModModal.hide();
      this.$refs.ctxModOtherModal.hide();
      this.$refs.ctxShareModal.hide();
      this.$refs.ctxEmbedModal.hide();
      this.$refs.ctxReport.hide();
      this.$refs.ctxReportOther.hide();
      this.$refs.ctxConfirm.hide();
      this.$refs.lightboxModal.hide();
      this.$refs.replyModal.hide();
      this.$refs.ctxStatusModal.hide();
    },
    openCtxStatusModal: function openCtxStatusModal() {
      this.closeModals();
      this.$refs.ctxStatusModal.show();
    },
    openConfirmModal: function openConfirmModal() {
      this.closeModals();
      this.$refs.ctxConfirm.show();
    },
    closeConfirmModal: function closeConfirmModal() {
      this.closeModals();
      this.confirmModalTitle = 'Confirma?';
      this.confirmModalType = false;
      this.confirmModalIdentifer = null;
    },
    confirmModalConfirm: function confirmModalConfirm() {
      var _this25 = this;

      switch (this.confirmModalType) {
        case 'post.delete':
          axios.post('/i/delete', {
            type: 'status',
            item: this.confirmModalIdentifer
          }).then(function (res) {
            _this25.feed = _this25.feed.filter(function (s) {
              return s.id != _this25.confirmModalIdentifer;
            });

            _this25.closeConfirmModal();
          })["catch"](function (err) {
            _this25.closeConfirmModal();

            swal('Error', 'Something went wrong. Please try again later.', 'error');
          });
          break;
      }

      this.closeConfirmModal();
    },
    confirmModalCancel: function confirmModalCancel() {
      this.closeConfirmModal();
    },
    timeAgo: function timeAgo(ts) {
      return App.util.format.timeAgo(ts);
    },
    toggleReplies: function toggleReplies(reply) {
      if (reply.thread) {
        reply.thread = false;
      } else {
        if (reply.replies.length > 0) {
          reply.thread = true;
          return;
        }

        var url = '/api/v2/comments/' + reply.account.id + '/status/' + reply.id;
        axios.get(url).then(function (response) {
          reply.replies = _.reverse(response.data.data);
          reply.thread = true;
        });
      }
    },
    likeReply: function likeReply(status, $event) {
      if ($('body').hasClass('loggedIn') == false) {
        swal('Login', 'Por favor, efetue login para esta ação.', 'info');
        return;
      }

      axios.post('/i/like', {
        item: status.id
      }).then(function (res) {
        status.favourites_count = res.data.count;

        if (status.favourited == true) {
          status.favourited = false;
        } else {
          status.favourited = true;
        }
      })["catch"](function (err) {
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
    },
    replyFocus: function replyFocus(e, index) {
      var prependUsername = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if ($('body').hasClass('loggedIn') == false) {
        this.redirect('/login?next=' + encodeURIComponent(window.location.pathname));
        return;
      }

      if (this.status.comments_disabled) {
        return;
      }

      this.replyToIndex = index;
      this.replyingToId = e.id;
      this.replyingToUsername = e.account.username;
      this.reply_to_profile_id = e.account.id;
      var username = e.account.local ? '@' + e.account.username + ' ' : '@' + e.account.acct + ' ';

      if (prependUsername == true) {
        this.replyText = username;
      }

      this.$refs.replyModal.show();
      setTimeout(function () {
        $('.replyModalTextarea').focus();
      }, 500);
    },
    loadMoreComments: function loadMoreComments() {
      var _this26 = this;

      if (this.pagination.total_pages == 1 || this.pagination.current_page == this.pagination.total_pages) {
        $('.load-more-link').addClass('d-none');
        return;
      }

      $('.load-more-link').addClass('d-none');
      $('.postCommentsLoader').removeClass('d-none');
      var next = this.pagination.links.next;
      axios.get(next).then(function (response) {
        var self = _this26;
        var res = response.data.data;
        $('.postCommentsLoader').addClass('d-none');

        for (var i = 0; i < res.length; i++) {
          _this26.replies.unshift(res[i]);
        }

        _this26.pagination = response.data.meta.pagination;
        $('.load-more-link').removeClass('d-none');
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearInterval(this.mpInterval);
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['status']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['status'],
  data: function data() {
    return {
      cursor: 0
    };
  },
  created: function created() {// window.addEventListener("keydown", this.keypressNavigation);
  },
  beforeDestroy: function beforeDestroy() {// window.removeEventListener("keydown", this.keypressNavigation);
  },
  methods: {
    loadSensitive: function loadSensitive() {
      this.$refs.carousel.onResize();
      this.$refs.carousel.goToPage(0);
    },
    altText: function altText(img) {
      var desc = img.description;

      if (desc) {
        return desc;
      }

      return 'Photo was not tagged with any alt text.';
    },
    keypressNavigation: function keypressNavigation(e) {
      var ref = this.$refs.carousel;

      if (e.keyCode == "37") {
        e.preventDefault();
        var direction = "backward";
        ref.advancePage(direction);
        ref.$emit("navigation-click", direction);
      }

      if (e.keyCode == "39") {
        e.preventDefault();
        var _direction = "forward";
        ref.advancePage(_direction);
        ref.$emit("navigation-click", _direction);
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['status'],
  methods: {
    altText: function altText(status) {
      var desc = status.media_attachments[0].description;

      if (desc) {
        return desc;
      }

      return 'Photo was not tagged with any alt text.';
    },
    toggleContentWarning: function toggleContentWarning(status) {
      this.$emit('togglecw');
    },
    width: function width() {
      if (!this.status.media_attachments[0].meta || !this.status.media_attachments[0].meta.original || !this.status.media_attachments[0].meta.original.width) {
        return;
      }

      return this.status.media_attachments[0].meta.original.width;
    },
    height: function height() {
      if (!this.status.media_attachments[0].meta || !this.status.media_attachments[0].meta.original || !this.status.media_attachments[0].meta.original.height) {
        return;
      }

      return this.status.media_attachments[0].meta.original.height;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['status']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['status'],
  methods: {
    playOrPause: function playOrPause(e) {
      var el = e.target;

      if (el.getAttribute('playing') == 1) {
        el.removeAttribute('playing');
        el.pause();
      } else {
        el.setAttribute('playing', 1);
        el.play();
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/zuck.js/dist/skins/snapgram.css":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/src??ref--9-2!./node_modules/zuck.js/dist/skins/snapgram.css ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".stories.snapgram .story > .item-link {\n  text-decoration: none;\n  color: #333;\n}\n.stories.snapgram .story > .item-link > .item-preview {\n  border-radius: 50%;\n  padding: 2px;\n  background: radial-gradient(ellipse at 70% 70%, #ee583f 8%, #d92d77 42%, #bd3381 58%);\n}\n.stories.snapgram .story > .item-link > .item-preview img {\n  border-radius: 50%;\n  border: 3px solid #fff;\n}\n\n.stories.snapgram .story.seen {\n  opacity: 0.75;\n}\n.stories.snapgram .story.seen > a > .item-preview {\n  background: #999;\n}\n.stories.snapgram .story.seen > a {\n  color: #999 !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/zuck.js/dist/zuck.css":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/postcss-loader/src??ref--9-2!./node_modules/zuck.js/dist/zuck.css ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@-webkit-keyframes zuckSlideTime {\n  0% {\n    max-width: 0;\n  }\n  100% {\n    max-width: 100%;\n  }\n}\n\n@keyframes zuckSlideTime {\n  0% {\n    max-width: 0;\n  }\n  100% {\n    max-width: 100%;\n  }\n}\n\n@-webkit-keyframes zuckLoading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes zuckLoading {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n#zuck-modal {\n  outline: 0 !important;\n  overflow: hidden;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.75);\n  z-index: 100000;\n  font-size: 14px;\n  font-family: inherit;\n}\n#zuck-modal-content,\n#zuck-modal-content .story-viewer,\n#zuck-modal-content .story-viewer > .slides,\n#zuck-modal-content .story-viewer > .slides > * {\n  width: 100vw;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  overflow: hidden;\n}\n#zuck-modal * {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  outline: 0;\n}\n\n#zuck-modal.with-effects {\n  -webkit-transform: scale(0.01);\n          transform: scale(0.01);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n  -webkit-transition: 0.25s;\n  transition: 0.25s;\n}\n#zuck-modal.with-effects.animated {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  border-radius: 0;\n  margin-top: 0 !important;\n  margin-left: 0 !important;\n}\n#zuck-modal.with-effects.closed {\n  -webkit-transform: translateY(100%);\n          transform: translateY(100%);\n}\n\n#zuck-modal .slider {\n  width: 300vw;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  left: -100vw;\n  position: absolute;\n}\n#zuck-modal .slider > * {\n  width: 100vw;\n  height: 100%;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n}\n#zuck-modal .slider > .previous {\n  left: 0;\n}\n#zuck-modal .slider > .viewing {\n  left: 100vw;\n}\n#zuck-modal .slider > .next {\n  left: 200vw;\n}\n#zuck-modal .slider.animated {\n  -webkit-transition: -webkit-transform 0.25s linear;\n  transition: -webkit-transform 0.25s linear;\n  transition: transform 0.25s linear;\n  transition: transform 0.25s linear, -webkit-transform 0.25s linear;\n}\n\n#zuck-modal.with-cube #zuck-modal-content {\n  -webkit-perspective: 1000vw;\n          perspective: 1000vw;\n  -webkit-transform: scale(0.95);\n          transform: scale(0.95);\n  -webkit-perspective-origin: 50% 50%;\n          perspective-origin: 50% 50%;\n  overflow: visible;\n  -webkit-transition: 0.3s;\n  transition: 0.3s;\n}\n#zuck-modal.with-cube .slider {\n  -webkit-transform-style: preserve-3d;\n          transform-style: preserve-3d;\n  -webkit-transform: rotateY(0deg);\n          transform: rotateY(0deg);\n}\n#zuck-modal.with-cube .slider > .previous {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  left: 100vw;\n  -webkit-transform: rotateY(270deg) translateX(-50%);\n          transform: rotateY(270deg) translateX(-50%);\n  -webkit-transform-origin: center left;\n          transform-origin: center left;\n}\n#zuck-modal.with-cube .slider > .viewing {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  left: 100vw;\n  -webkit-transform: translateZ(50vw);\n          transform: translateZ(50vw);\n}\n#zuck-modal.with-cube .slider > .next {\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  left: 100vw;\n  -webkit-transform: rotateY(-270deg) translateX(50%);\n          transform: rotateY(-270deg) translateX(50%);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n#zuck-modal-content .story-viewer.paused.longPress .head,\n#zuck-modal-content .story-viewer.paused.longPress .slides-pointers,\n#zuck-modal-content .story-viewer.paused.longPress .tip {\n  opacity: 0;\n}\n#zuck-modal-content .story-viewer.viewing:not(.paused):not(.stopped) .slides-pointers > * > .active > b {\n  -webkit-animation-play-state: running;\n  animation-play-state: running;\n}\n#zuck-modal-content .story-viewer.next {\n  z-index: 10;\n}\n#zuck-modal-content .story-viewer.viewing {\n  z-index: 5;\n}\n#zuck-modal-content .story-viewer.previous {\n  z-index: 0;\n}\n#zuck-modal-content .story-viewer.muted .tip.muted,\n#zuck-modal-content .story-viewer.loading .head .loading {\n  display: block;\n}\n#zuck-modal-content .story-viewer.loading .head .right .time,\n#zuck-modal-content .story-viewer.loading .head .right .close {\n  display: none;\n}\n\n#zuck-modal-content .story-viewer .slides-pagination span {\n  position: absolute;\n  top: 50vh;\n  font-size: 48px;\n  color: #fff;\n  line-height: 48px;\n  width: 48px;\n  margin: 6px;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  z-index: 1;\n  text-align: center;\n}\n\n#zuck-modal-content .story-viewer .slides-pagination .previous {\n  left: 0;\n}\n\n#zuck-modal-content .story-viewer .slides-pagination .next {\n  right: 0;\n}\n\n#zuck-modal-content .story-viewer .slides-pointers {\n  display: table;\n  table-layout: fixed;\n  border-spacing: 6px;\n  border-collapse: separate;\n  position: absolute;\n  width: 100vh;\n  top: 0;\n  left: calc(50vw - 50vh);\n  right: calc(50vw - 50vh);\n  z-index: 100020;\n}\n#zuck-modal-content .story-viewer .slides-pointers > * {\n  display: table-row;\n}\n#zuck-modal-content .story-viewer .slides-pointers > * > * {\n  display: table-cell;\n  background: rgba(255, 255, 255, 0.5);\n  border-radius: 2px;\n}\n#zuck-modal-content .story-viewer .slides-pointers > * > .seen {\n  background: #fff;\n}\n#zuck-modal-content .story-viewer .slides-pointers > * > * > b {\n  background: #fff;\n  width: auto;\n  max-width: 0;\n  height: 2px;\n  display: block;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  -webkit-animation-play-state: paused;\n  animation-play-state: paused;\n  border-radius: 2px;\n}\n#zuck-modal-content .story-viewer .slides-pointers > * > .active > b {\n  -webkit-animation-name: zuckSlideTime;\n  animation-name: zuckSlideTime;\n  -webkit-animation-timing-function: linear;\n  animation-timing-function: linear;\n}\n\n#zuck-modal-content .story-viewer .head {\n  position: absolute;\n  height: 56px;\n  left: 0;\n  right: 0;\n  line-height: 56px;\n  z-index: 100010;\n  color: #fff;\n  font-size: 14px;\n  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.35), 1px 0 1px rgba(0, 0, 0, 0.35);\n  padding: 6px 12px;\n}\n#zuck-modal-content .story-viewer .head .item-preview {\n  overflow: hidden;\n  vertical-align: top;\n  background-size: cover;\n  width: 42px;\n  height: 42px;\n  display: inline-block;\n  margin-right: 9px;\n  border-radius: 50%;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-position: center;\n}\n#zuck-modal-content .story-viewer .head .item-preview img {\n  display: block;\n  box-sizing: border-box;\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  background-position: center;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n#zuck-modal-content .story-viewer .head .time {\n  opacity: 0.75;\n  font-weight: 500;\n  font-size: 13px;\n}\n#zuck-modal-content .story-viewer .head .left {\n  line-height: 1 !important;\n  display: inline-block;\n  margin: 6px 0;\n}\n#zuck-modal-content .story-viewer .head .left .info {\n  display: inline-block;\n  max-width: 30vw;\n  vertical-align: middle;\n}\n#zuck-modal-content .story-viewer .head .left .info > * {\n  width: 100%;\n  display: inline-block;\n  line-height: 21px;\n}\n#zuck-modal-content .story-viewer .head .left .info .name {\n  font-weight: 500;\n}\n#zuck-modal-content .story-viewer .head .right {\n  float: right;\n}\n#zuck-modal-content .story-viewer .head .right .close,\n#zuck-modal-content .story-viewer .head .back {\n  font-size: 42px;\n  width: 48px;\n  height: 48px;\n  line-height: 48px;\n  cursor: pointer;\n  text-align: center;\n}\n#zuck-modal-content .story-viewer .head .left .back {\n  display: none;\n  width: 24px;\n  margin: -9px -6px 0 -6px;\n}\n#zuck-modal-content .story-viewer .head .right .time {\n  display: none;\n}\n#zuck-modal-content .story-viewer .head .loading {\n  display: none;\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  margin: 9px 0;\n  border: 4px solid rgba(255, 255, 255, 0.2);\n  box-sizing: border-box;\n  border-top-color: #fff;\n  -webkit-animation: zuckLoading 1s infinite linear;\n  animation: zuckLoading 1s infinite linear;\n}\n\n#zuck-modal-content .story-viewer .head,\n#zuck-modal-content .story-viewer .slides-pointers,\n#zuck-modal-content .story-viewer .tip {\n  -webkit-transition: opacity 0.5s;\n  transition: opacity 0.5s;\n}\n\n#zuck-modal-content .story-viewer .slides .item {\n  display: none;\n  overflow: hidden;\n  background: #000;\n}\n#zuck-modal-content .story-viewer .slides .item:before {\n  z-index: 4;\n  background: transparent;\n  content: '';\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  top: 0;\n}\n#zuck-modal-content .story-viewer .slides .item > .media {\n  height: 100%;\n  position: absolute;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  margin: auto;\n}\n#zuck-modal-content .story-viewer .slides .item.active,\n#zuck-modal-content .story-viewer .slides .item.active .tip.link {\n  display: block;\n}\n\n#zuck-modal-content .story-viewer .tip {\n  z-index: 5;\n  text-decoration: none;\n  display: none;\n  border-radius: 24px;\n  background: rgba(0, 0, 0, 0.5);\n  font-size: 16px;\n  position: absolute;\n  bottom: 24px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n          transform: translateX(-50%);\n  z-index: 1000;\n  color: #fff;\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: 500;\n  padding: 12px 24px;\n}\n\n\n#zuck-modal.rtl {\n  direction: rtl;\n  left: auto;\n  right: 0;\n}\n#zuck-modal.rtl.with-effects {\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n#zuck-modal.rtl.with-effects.animated {\n  margin-left: auto !important;\n  margin-right: 0 !important;\n}\n#zuck-modal.rtl .slider {\n  left: auto;\n  right: -100vw;\n}\n#zuck-modal.rtl .slider > .previous {\n  left: auto;\n  right: 0;\n  -webkit-transform: rotateY(-270deg) translateX(50%);\n          transform: rotateY(-270deg) translateX(50%);\n}\n#zuck-modal.rtl .slider > .viewing {\n  left: auto;\n  right: 100vw;\n}\n#zuck-modal.rtl .slider > .next {\n  left: auto;\n  right: 200vw;\n}\n#zuck-modal.rtl.with-cube .slider > .previous {\n  left: auto;\n  right: 100vw;\n  -webkit-transform-origin: center right;\n          transform-origin: center right;\n}\n#zuck-modal.rtl.with-cube .slider > .viewing {\n  left: auto;\n  right: 100vw;\n  -webkit-transform: translateZ(50vw);\n          transform: translateZ(50vw);\n}\n#zuck-modal.rtl.with-cube .slider > .next {\n  left: auto;\n  right: 100vw;\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n  -webkit-transform: rotateY(270deg) translateX(-50%);\n          transform: rotateY(270deg) translateX(-50%);\n}\n#zuck-modal.rtl #zuck-modal-content .story-viewer .slides-pagination .previous {\n  left: auto;\n  right: 0;\n}\n#zuck-modal.rtl #zuck-modal-content .story-viewer .slides-pagination .next {\n  right: auto;\n  left: 0;\n}\n#zuck-modal.rtl #zuck-modal-content .story-viewer .head .item-preview {\n  margin-right: auto;\n  margin-left: 9px;\n}\n#zuck-modal.rtl #zuck-modal-content .story-viewer .head .right {\n  float: left;\n}\n#zuck-modal.rtl #zuck-modal-content .story-viewer .tip {\n  left: auto;\n  right: 50%;\n  -webkit-transform: translateX(50%);\n          transform: translateX(50%);\n}\n\n@media (max-width: 1024px) {\n  #zuck-modal-content .story-viewer .head {\n    top: 3px;\n  }\n  #zuck-modal-content .story-viewer .head .loading {\n    width: 24px;\n    height: 24px;\n    margin: 6px 0;\n  }\n  #zuck-modal-content .story-viewer .head .item-preview {\n    width: 30px;\n    height: 30px;\n    margin-right: 9px;\n  }\n  #zuck-modal-content .story-viewer .head .left {\n    font-size: 15px;\n    margin: 15px 0;\n  }\n  #zuck-modal-content .story-viewer .head .left > div {\n    line-height: 30px;\n  }\n  #zuck-modal-content .story-viewer .head .right .time {\n    display: block;\n    white-space: nowrap;\n    font-size: 15px;\n    margin: 15px 0;\n    line-height: 30px;\n  }\n  #zuck-modal-content .story-viewer .head .left > .back {\n    display: none;\n    background: transparent;\n    z-index: 20;\n    visibility: visible;\n    position: absolute;\n    height: 42px;\n    width: 24px;\n    line-height: 36px;\n    text-align: left;\n    vertical-align: top;\n    text-shadow: none;\n  }\n\n  #zuck-modal-content .story-viewer.with-back-button .head .left > .back {\n    display: block;\n  }\n  #zuck-modal-content .story-viewer.with-back-button .head .left .item-preview {\n    margin-left: 18px;\n  }\n\n  #zuck-modal-content .story-viewer .slides-pointers {\n    width: 100vw;\n    left: 0;\n    right: 0;\n  }\n\n  #zuck-modal-content .story-viewer .tip {\n    font-size: 14px;\n    padding: 6px 12px;\n  }\n  #zuck-modal-content .story-viewer .head .left .time,\n  #zuck-modal-content .story-viewer .head .right .close {\n    display: none;\n  }\n\n  #zuck-modal.rtl #zuck-modal-content .story-viewer .head .item-preview {\n    margin-right: auto;\n    margin-left: 9px;\n  }\n  #zuck-modal.rtl #zuck-modal-content .story-viewer .head .left > .back {\n    text-align: right;\n  }\n  #zuck-modal.rtl #zuck-modal-content .story-viewer.with-back-button .head .left .item-preview {\n    margin-left: auto;\n    margin-right: 18px;\n  }\n}\n\n.stories.carousel {\n  white-space: nowrap;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  overflow-scrolling: touch;\n}\n.stories.carousel::-webkit-scrollbar {\n  width: 0px;\n  background: transparent;\n}\n.stories.carousel .story {\n  display: inline-block;\n  width: 18vw;\n  max-width: 90px;\n  margin: 0 6px;\n  vertical-align: top;\n}\n.stories.carousel .story:first-child {\n  margin-left: 0;\n}\n.stories.carousel .story:last-child {\n  margin-right: 0;\n}\n\n.stories.carousel .story > .item-link {\n  text-align: center;\n  display: block;\n}\n.stories.carousel .story > .item-link:active > .item-preview {\n  -webkit-transform: scale(0.9);\n          transform: scale(0.9);\n}\n.stories.carousel .story > .item-link > .item-preview {\n  display: block;\n  box-sizing: border-box;\n  font-size: 0;\n  max-height: 90px;\n  height: 18vw;\n  overflow: hidden;\n  -webkit-transition: -webkit-transform 0.2s;\n  transition: -webkit-transform 0.2s;\n  transition: transform 0.2s;\n  transition: transform 0.2s, -webkit-transform 0.2s;\n}\n.stories.carousel .story > .item-link > .item-preview img {\n  display: block;\n  box-sizing: border-box;\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  background-position: center;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.stories.carousel .story > .item-link > .info {\n  display: inline-block;\n  margin-top: 0.5em;\n  line-height: 1.2em;\n  width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.stories.carousel .story > .item-link > .info .name {\n  font-weight: 300;\n}\n.stories.carousel .story > .item-link > .info .time {\n  display: none;\n}\n.stories.carousel .story > .items {\n  display: none;\n}\n\n.stories.list {\n  white-space: nowrap;\n  overflow: auto;\n}\n.stories.list .story {\n  display: block;\n  width: auto;\n  margin: 6px;\n  padding-bottom: 6px;\n}\n\n.stories.list .story > .item-link {\n  text-align: left;\n  display: block;\n}\n.stories.list .story > .item-link > .item-preview {\n  height: 42px;\n  width: 42px;\n  max-width: 42px;\n  margin-right: 12px;\n  vertical-align: top;\n  display: inline-block;\n  box-sizing: border-box;\n  font-size: 0;\n  overflow: hidden;\n}\n.stories.list .story > .item-link > .item-preview img {\n  display: block;\n  box-sizing: border-box;\n  height: 100%;\n  width: 100%;\n  background-size: cover;\n  background-position: center;\n}\n.stories.list .story > .item-link > .info {\n  display: inline-block;\n  line-height: 1.6em;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  vertical-align: top;\n}\n.stories.list .story > .item-link > .info .name {\n  font-weight: 500;\n  display: block;\n}\n.stories.list .story > .item-link > .info .time {\n  display: inline-block;\n}\n.stories.list .story > .items {\n  display: none;\n}\n\n.stories.rtl {\n  direction: rtl;\n}\n.stories.rtl.carousel .story:first-child {\n  margin-left: auto;\n  margin-right: 0;\n}\n.stories.rtl.carousel .story:last-child {\n  margin-right: auto;\n  margin-left: 0;\n}\n.stories.rtl.list .story > .item-link {\n  text-align: right;\n}\n.stories.rtl.list .story > .item-link > .item-preview {\n  margin-right: auto;\n  margin-left: 12px;\n}\n/*\n    zuck.js\n    https://github.com/ramon82/zuck.js\n    MIT License\n*/\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.fade-enter-active[data-v-043c5615], .fade-leave-active[data-v-043c5615] {\n  -webkit-transition: opacity .5s;\n  transition: opacity .5s;\n}\n.fade-enter[data-v-043c5615], .fade-leave-to[data-v-043c5615] {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.text-lighter[data-v-bb77b854] {\n\tcolor:#B8C2CC !important;\n}\n.modal-body[data-v-bb77b854] {\n\tpadding: 0;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#storyContainer > .story[data-v-3ffb4cbe] {\n\tmargin-right: 3rem;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#storyContainer .story {\n\tmargin-right: 2rem;\n\twidth: 100%;\n\tmax-width: 60px;\n}\n.stories.carousel .story > .item-link > .item-preview {\n\theight: 60px;\n}\n#zuck-modal.with-effects {\n\twidth: 100%;\n}\n.stories.carousel .story > .item-link > .info .name {\n\tfont-weight: 500;\n\tfont-size: 11px;\n}\n.stories.carousel .story > .item-link > .info {\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css&":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.postPresenterContainer[data-v-40ef44f8] {\n\tdisplay: -webkit-box;\n\tdisplay: flex;\n\t-webkit-box-align: center;\n\t        align-items: center;\n\tbackground: #fff;\n}\n.word-break[data-v-40ef44f8] {\n\tword-break: break-all;\n}\n.small .custom-control-label[data-v-40ef44f8] {\n\tpadding-top: 3px;\n}\n/*.reply-btn {\n\tposition: absolute;\n\tbottom: 30px;\n\tright: 20px;\n\twidth: 60px;\n\ttext-align: center;\n\tfont-size: 13px;\n\tborder-radius: 0 3px 3px 0;\n}*/\n.emoji-reactions .nav-item[data-v-40ef44f8] {\n\tfont-size: 1.2rem;\n\tpadding: 9px;\n\tcursor: pointer;\n}\n.emoji-reactions[data-v-40ef44f8]::-webkit-scrollbar {\n\twidth: 0px;\n\theight: 0px;\n\tbackground: transparent;\n}\n.reply-btn[disabled][data-v-40ef44f8] {\n\topacity: .3;\n\tcolor: #3897f0;\n}\n.replyModalTextarea[data-v-40ef44f8] {\n\tborder: none;\n\tfont-size: 18px;\n\tresize: none;\n\twhite-space: pre-wrap;\n\toutline: none;\n}\n.has-story[data-v-40ef44f8] {\n\twidth: 64px;\n\theight: 64px;\n\tborder-radius: 50%;\n\tpadding: 2px;\n\tbackground: radial-gradient(ellipse at 70% 70%, #ee583f 8%, #d92d77 42%, #bd3381 58%);\n}\n.has-story img[data-v-40ef44f8] {\n\twidth: 60px;\n\theight: 60px;\n\tborder-radius: 50%;\n\tpadding: 3px;\n\tbackground: #fff;\n}\n.has-story.has-story-sm[data-v-40ef44f8] {\n\twidth: 32px;\n\theight: 32px;\n\tborder-radius: 50%;\n\tpadding: 2px;\n\tbackground: radial-gradient(ellipse at 70% 70%, #ee583f 8%, #d92d77 42%, #bd3381 58%);\n}\n.has-story.has-story-sm img[data-v-40ef44f8] {\n\twidth: 28px;\n\theight: 28px;\n\tborder-radius: 50%;\n\tpadding: 3px;\n\tbackground: #fff;\n}\n#ctx-reply-modal .form-control[data-v-40ef44f8]:focus {\n\tborder: none;\n\toutline: 0;\n\tbox-shadow: none;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css&":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css& ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.card-img-top[data-v-1c78113d] {\n  border-top-left-radius: 0 !important;\n  border-top-right-radius: 0 !important;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.card-img-top[data-v-88c038d8] {\n  border-top-left-radius: 0 !important;\n  border-top-right-radius: 0 !important;\n}\n.content-label[data-v-88c038d8] {\n\tmargin: 0;\n\tposition: absolute;\n\ttop:50%;\n\tleft:50%;\n\tz-index: 2;\n\t-webkit-transform: translate(-50%, -50%);\n\t        transform: translate(-50%, -50%);\n\tdisplay: -webkit-box;\n\tdisplay: flex;\n\t-webkit-box-orient: vertical;\n\t-webkit-box-direction: normal;\n\t        flex-direction: column;\n\t-webkit-box-align: center;\n\t        align-items: center;\n\t-webkit-box-pack: center;\n\t        justify-content: center;\n\twidth: 100%;\n\theight: 100%;\n\tz-index: 2;\n\tbackground: rgba(0, 0, 0, 0.2)\n}\n", ""]);

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryTimelineComponent.vue?vue&type=style&index=1&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css&":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--9-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--9-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css&":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--9-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--9-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

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

/***/ "./node_modules/tributejs/dist/tribute.js":
/*!************************************************!*\
  !*** ./node_modules/tributejs/dist/tribute.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./utils");

var _TributeEvents = _interopRequireDefault(require("./TributeEvents"));

var _TributeMenuEvents = _interopRequireDefault(require("./TributeMenuEvents"));

var _TributeRange = _interopRequireDefault(require("./TributeRange"));

var _TributeSearch = _interopRequireDefault(require("./TributeSearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tribute =
/*#__PURE__*/
function () {
  function Tribute(_ref) {
    var _this = this;

    var _ref$values = _ref.values,
        values = _ref$values === void 0 ? null : _ref$values,
        _ref$iframe = _ref.iframe,
        iframe = _ref$iframe === void 0 ? null : _ref$iframe,
        _ref$selectClass = _ref.selectClass,
        selectClass = _ref$selectClass === void 0 ? 'highlight' : _ref$selectClass,
        _ref$containerClass = _ref.containerClass,
        containerClass = _ref$containerClass === void 0 ? 'tribute-container' : _ref$containerClass,
        _ref$itemClass = _ref.itemClass,
        itemClass = _ref$itemClass === void 0 ? '' : _ref$itemClass,
        _ref$trigger = _ref.trigger,
        trigger = _ref$trigger === void 0 ? '@' : _ref$trigger,
        _ref$autocompleteMode = _ref.autocompleteMode,
        autocompleteMode = _ref$autocompleteMode === void 0 ? false : _ref$autocompleteMode,
        _ref$selectTemplate = _ref.selectTemplate,
        selectTemplate = _ref$selectTemplate === void 0 ? null : _ref$selectTemplate,
        _ref$menuItemTemplate = _ref.menuItemTemplate,
        menuItemTemplate = _ref$menuItemTemplate === void 0 ? null : _ref$menuItemTemplate,
        _ref$lookup = _ref.lookup,
        lookup = _ref$lookup === void 0 ? 'key' : _ref$lookup,
        _ref$fillAttr = _ref.fillAttr,
        fillAttr = _ref$fillAttr === void 0 ? 'value' : _ref$fillAttr,
        _ref$collection = _ref.collection,
        collection = _ref$collection === void 0 ? null : _ref$collection,
        _ref$menuContainer = _ref.menuContainer,
        menuContainer = _ref$menuContainer === void 0 ? null : _ref$menuContainer,
        _ref$noMatchTemplate = _ref.noMatchTemplate,
        noMatchTemplate = _ref$noMatchTemplate === void 0 ? null : _ref$noMatchTemplate,
        _ref$requireLeadingSp = _ref.requireLeadingSpace,
        requireLeadingSpace = _ref$requireLeadingSp === void 0 ? true : _ref$requireLeadingSp,
        _ref$allowSpaces = _ref.allowSpaces,
        allowSpaces = _ref$allowSpaces === void 0 ? false : _ref$allowSpaces,
        _ref$replaceTextSuffi = _ref.replaceTextSuffix,
        replaceTextSuffix = _ref$replaceTextSuffi === void 0 ? null : _ref$replaceTextSuffi,
        _ref$positionMenu = _ref.positionMenu,
        positionMenu = _ref$positionMenu === void 0 ? true : _ref$positionMenu,
        _ref$spaceSelectsMatc = _ref.spaceSelectsMatch,
        spaceSelectsMatch = _ref$spaceSelectsMatc === void 0 ? false : _ref$spaceSelectsMatc,
        _ref$searchOpts = _ref.searchOpts,
        searchOpts = _ref$searchOpts === void 0 ? {} : _ref$searchOpts,
        _ref$menuItemLimit = _ref.menuItemLimit,
        menuItemLimit = _ref$menuItemLimit === void 0 ? null : _ref$menuItemLimit;

    _classCallCheck(this, Tribute);

    this.autocompleteMode = autocompleteMode;
    this.menuSelected = 0;
    this.current = {};
    this.inputEvent = false;
    this.isActive = false;
    this.menuContainer = menuContainer;
    this.allowSpaces = allowSpaces;
    this.replaceTextSuffix = replaceTextSuffix;
    this.positionMenu = positionMenu;
    this.hasTrailingSpace = false;
    this.spaceSelectsMatch = spaceSelectsMatch;

    if (this.autocompleteMode) {
      trigger = '';
      allowSpaces = false;
    }

    if (values) {
      this.collection = [{
        // symbol that starts the lookup
        trigger: trigger,
        // is it wrapped in an iframe
        iframe: iframe,
        // class applied to selected item
        selectClass: selectClass,
        // class applied to the Container 
        containerClass: containerClass,
        // class applied to each item
        itemClass: itemClass,
        // function called on select that retuns the content to insert
        selectTemplate: (selectTemplate || Tribute.defaultSelectTemplate).bind(this),
        // function called that returns content for an item
        menuItemTemplate: (menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(this),
        // function called when menu is empty, disables hiding of menu.
        noMatchTemplate: function (t) {
          if (typeof t === 'function') {
            return t.bind(_this);
          }

          return noMatchTemplate || function () {
            return '';
          }.bind(_this);
        }(noMatchTemplate),
        // column to search against in the object
        lookup: lookup,
        // column that contains the content to insert by default
        fillAttr: fillAttr,
        // array of objects or a function returning an array of objects
        values: values,
        requireLeadingSpace: requireLeadingSpace,
        searchOpts: searchOpts,
        menuItemLimit: menuItemLimit
      }];
    } else if (collection) {
      if (this.autocompleteMode) console.warn('Tribute in autocomplete mode does not work for collections');
      this.collection = collection.map(function (item) {
        return {
          trigger: item.trigger || trigger,
          iframe: item.iframe || iframe,
          selectClass: item.selectClass || selectClass,
          containerClass: item.containerClass || containerClass,
          itemClass: item.itemClass || itemClass,
          selectTemplate: (item.selectTemplate || Tribute.defaultSelectTemplate).bind(_this),
          menuItemTemplate: (item.menuItemTemplate || Tribute.defaultMenuItemTemplate).bind(_this),
          // function called when menu is empty, disables hiding of menu.
          noMatchTemplate: function (t) {
            if (typeof t === 'function') {
              return t.bind(_this);
            }

            return null;
          }(noMatchTemplate),
          lookup: item.lookup || lookup,
          fillAttr: item.fillAttr || fillAttr,
          values: item.values,
          requireLeadingSpace: item.requireLeadingSpace,
          searchOpts: item.searchOpts || searchOpts,
          menuItemLimit: item.menuItemLimit || menuItemLimit
        };
      });
    } else {
      throw new Error('[Tribute] No collection specified.');
    }

    new _TributeRange["default"](this);
    new _TributeEvents["default"](this);
    new _TributeMenuEvents["default"](this);
    new _TributeSearch["default"](this);
  }

  _createClass(Tribute, [{
    key: "triggers",
    value: function triggers() {
      return this.collection.map(function (config) {
        return config.trigger;
      });
    }
  }, {
    key: "attach",
    value: function attach(el) {
      if (!el) {
        throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
      } // Check if it is a jQuery collection


      if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
        el = el.get();
      } // Is el an Array/Array-like object?


      if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
        var length = el.length;

        for (var i = 0; i < length; ++i) {
          this._attach(el[i]);
        }
      } else {
        this._attach(el);
      }
    }
  }, {
    key: "_attach",
    value: function _attach(el) {
      if (el.hasAttribute('data-tribute')) {
        console.warn('Tribute was already bound to ' + el.nodeName);
      }

      this.ensureEditable(el);
      this.events.bind(el);
      el.setAttribute('data-tribute', true);
    }
  }, {
    key: "ensureEditable",
    value: function ensureEditable(element) {
      if (Tribute.inputTypes().indexOf(element.nodeName) === -1) {
        if (element.contentEditable) {
          element.contentEditable = true;
        } else {
          throw new Error('[Tribute] Cannot bind to ' + element.nodeName);
        }
      }
    }
  }, {
    key: "createMenu",
    value: function createMenu(containerClass) {
      var wrapper = this.range.getDocument().createElement('div'),
          ul = this.range.getDocument().createElement('ul');
      wrapper.className = containerClass;
      wrapper.appendChild(ul);

      if (this.menuContainer) {
        return this.menuContainer.appendChild(wrapper);
      }

      return this.range.getDocument().body.appendChild(wrapper);
    }
  }, {
    key: "showMenuFor",
    value: function showMenuFor(element, scrollTo) {
      var _this2 = this;

      // Only proceed if menu isn't already shown for the current element & mentionText
      if (this.isActive && this.current.element === element && this.current.mentionText === this.currentMentionTextSnapshot) {
        return;
      }

      this.currentMentionTextSnapshot = this.current.mentionText; // create the menu if it doesn't exist.

      if (!this.menu) {
        this.menu = this.createMenu(this.current.collection.containerClass);
        element.tributeMenu = this.menu;
        this.menuEvents.bind(this.menu);
      }

      this.isActive = true;
      this.menuSelected = 0;

      if (!this.current.mentionText) {
        this.current.mentionText = '';
      }

      var processValues = function processValues(values) {
        // Tribute may not be active any more by the time the value callback returns
        if (!_this2.isActive) {
          return;
        }

        var items = _this2.search.filter(_this2.current.mentionText, values, {
          pre: _this2.current.collection.searchOpts.pre || '<span>',
          post: _this2.current.collection.searchOpts.post || '</span>',
          skip: _this2.current.collection.searchOpts.skip,
          extract: function extract(el) {
            if (typeof _this2.current.collection.lookup === 'string') {
              return el[_this2.current.collection.lookup];
            } else if (typeof _this2.current.collection.lookup === 'function') {
              return _this2.current.collection.lookup(el, _this2.current.mentionText);
            } else {
              throw new Error('Invalid lookup attribute, lookup must be string or function.');
            }
          }
        });

        if (_this2.current.collection.menuItemLimit) {
          items = items.slice(0, _this2.current.collection.menuItemLimit);
        }

        _this2.current.filteredItems = items;

        var ul = _this2.menu.querySelector('ul');

        _this2.range.positionMenuAtCaret(scrollTo);

        if (!items.length) {
          var noMatchEvent = new CustomEvent('tribute-no-match', {
            detail: _this2.menu
          });

          _this2.current.element.dispatchEvent(noMatchEvent);

          if (typeof _this2.current.collection.noMatchTemplate === 'function' && !_this2.current.collection.noMatchTemplate() || !_this2.current.collection.noMatchTemplate) {
            _this2.hideMenu();
          } else {
            typeof _this2.current.collection.noMatchTemplate === 'function' ? ul.innerHTML = _this2.current.collection.noMatchTemplate() : ul.innerHTML = _this2.current.collection.noMatchTemplate;
          }

          return;
        }

        ul.innerHTML = '';

        var fragment = _this2.range.getDocument().createDocumentFragment();

        items.forEach(function (item, index) {
          var li = _this2.range.getDocument().createElement('li');

          li.setAttribute('data-index', index);
          li.className = _this2.current.collection.itemClass;
          li.addEventListener('mousemove', function (e) {
            var _this2$_findLiTarget = _this2._findLiTarget(e.target),
                _this2$_findLiTarget2 = _slicedToArray(_this2$_findLiTarget, 2),
                li = _this2$_findLiTarget2[0],
                index = _this2$_findLiTarget2[1];

            if (e.movementY !== 0) {
              _this2.events.setActiveLi(index);
            }
          });

          if (_this2.menuSelected === index) {
            li.classList.add(_this2.current.collection.selectClass);
          }

          li.innerHTML = _this2.current.collection.menuItemTemplate(item);
          fragment.appendChild(li);
        });
        ul.appendChild(fragment);
      };

      if (typeof this.current.collection.values === 'function') {
        this.current.collection.values(this.current.mentionText, processValues);
      } else {
        processValues(this.current.collection.values);
      }
    }
  }, {
    key: "_findLiTarget",
    value: function _findLiTarget(el) {
      if (!el) return [];
      var index = el.getAttribute('data-index');
      return !index ? this._findLiTarget(el.parentNode) : [el, index];
    }
  }, {
    key: "showMenuForCollection",
    value: function showMenuForCollection(element, collectionIndex) {
      if (element !== document.activeElement) {
        this.placeCaretAtEnd(element);
      }

      this.current.collection = this.collection[collectionIndex || 0];
      this.current.externalTrigger = true;
      this.current.element = element;
      if (element.isContentEditable) this.insertTextAtCursor(this.current.collection.trigger);else this.insertAtCaret(element, this.current.collection.trigger);
      this.showMenuFor(element);
    } // TODO: make sure this works for inputs/textareas

  }, {
    key: "placeCaretAtEnd",
    value: function placeCaretAtEnd(el) {
      el.focus();

      if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
    } // for contenteditable

  }, {
    key: "insertTextAtCursor",
    value: function insertTextAtCursor(text) {
      var sel, range, html;
      sel = window.getSelection();
      range = sel.getRangeAt(0);
      range.deleteContents();
      var textNode = document.createTextNode(text);
      range.insertNode(textNode);
      range.selectNodeContents(textNode);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    } // for regular inputs

  }, {
    key: "insertAtCaret",
    value: function insertAtCaret(textarea, text) {
      var scrollPos = textarea.scrollTop;
      var caretPos = textarea.selectionStart;
      var front = textarea.value.substring(0, caretPos);
      var back = textarea.value.substring(textarea.selectionEnd, textarea.value.length);
      textarea.value = front + text + back;
      caretPos = caretPos + text.length;
      textarea.selectionStart = caretPos;
      textarea.selectionEnd = caretPos;
      textarea.focus();
      textarea.scrollTop = scrollPos;
    }
  }, {
    key: "hideMenu",
    value: function hideMenu() {
      if (this.menu) {
        this.menu.style.cssText = 'display: none;';
        this.isActive = false;
        this.menuSelected = 0;
        this.current = {};
      }
    }
  }, {
    key: "selectItemAtIndex",
    value: function selectItemAtIndex(index, originalEvent) {
      index = parseInt(index);
      if (typeof index !== 'number' || isNaN(index)) return;
      var item = this.current.filteredItems[index];
      var content = this.current.collection.selectTemplate(item);
      if (content !== null) this.replaceText(content, originalEvent, item);
    }
  }, {
    key: "replaceText",
    value: function replaceText(content, originalEvent, item) {
      this.range.replaceTriggerText(content, true, true, originalEvent, item);
    }
  }, {
    key: "_append",
    value: function _append(collection, newValues, replace) {
      if (typeof collection.values === 'function') {
        throw new Error('Unable to append to values, as it is a function.');
      } else if (!replace) {
        collection.values = collection.values.concat(newValues);
      } else {
        collection.values = newValues;
      }
    }
  }, {
    key: "append",
    value: function append(collectionIndex, newValues, replace) {
      var index = parseInt(collectionIndex);
      if (typeof index !== 'number') throw new Error('please provide an index for the collection to update.');
      var collection = this.collection[index];

      this._append(collection, newValues, replace);
    }
  }, {
    key: "appendCurrent",
    value: function appendCurrent(newValues, replace) {
      if (this.isActive) {
        this._append(this.current.collection, newValues, replace);
      } else {
        throw new Error('No active state. Please use append instead and pass an index.');
      }
    }
  }, {
    key: "detach",
    value: function detach(el) {
      if (!el) {
        throw new Error('[Tribute] Must pass in a DOM node or NodeList.');
      } // Check if it is a jQuery collection


      if (typeof jQuery !== 'undefined' && el instanceof jQuery) {
        el = el.get();
      } // Is el an Array/Array-like object?


      if (el.constructor === NodeList || el.constructor === HTMLCollection || el.constructor === Array) {
        var length = el.length;

        for (var i = 0; i < length; ++i) {
          this._detach(el[i]);
        }
      } else {
        this._detach(el);
      }
    }
  }, {
    key: "_detach",
    value: function _detach(el) {
      var _this3 = this;

      this.events.unbind(el);

      if (el.tributeMenu) {
        this.menuEvents.unbind(el.tributeMenu);
      }

      setTimeout(function () {
        el.removeAttribute('data-tribute');
        _this3.isActive = false;

        if (el.tributeMenu) {
          el.tributeMenu.remove();
        }
      });
    }
  }], [{
    key: "defaultSelectTemplate",
    value: function defaultSelectTemplate(item) {
      if (typeof item === 'undefined') return null;

      if (this.range.isContentEditable(this.current.element)) {
        return '<span class="tribute-mention">' + (this.current.collection.trigger + item.original[this.current.collection.fillAttr]) + '</span>';
      }

      return this.current.collection.trigger + item.original[this.current.collection.fillAttr];
    }
  }, {
    key: "defaultMenuItemTemplate",
    value: function defaultMenuItemTemplate(matchItem) {
      return matchItem.string;
    }
  }, {
    key: "inputTypes",
    value: function inputTypes() {
      return ['TEXTAREA', 'INPUT'];
    }
  }]);

  return Tribute;
}();

var _default = Tribute;
exports["default"] = _default;
module.exports = exports.default;

},{"./TributeEvents":2,"./TributeMenuEvents":3,"./TributeRange":4,"./TributeSearch":5,"./utils":7}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TributeEvents =
/*#__PURE__*/
function () {
  function TributeEvents(tribute) {
    _classCallCheck(this, TributeEvents);

    this.tribute = tribute;
    this.tribute.events = this;
  }

  _createClass(TributeEvents, [{
    key: "bind",
    value: function bind(element) {
      element.boundKeydown = this.keydown.bind(element, this);
      element.boundKeyup = this.keyup.bind(element, this);
      element.boundInput = this.input.bind(element, this);
      element.addEventListener('keydown', element.boundKeydown, false);
      element.addEventListener('keyup', element.boundKeyup, false);
      element.addEventListener('input', element.boundInput, false);
    }
  }, {
    key: "unbind",
    value: function unbind(element) {
      element.removeEventListener('keydown', element.boundKeydown, false);
      element.removeEventListener('keyup', element.boundKeyup, false);
      element.removeEventListener('input', element.boundInput, false);
      delete element.boundKeydown;
      delete element.boundKeyup;
      delete element.boundInput;
    }
  }, {
    key: "keydown",
    value: function keydown(instance, event) {
      if (instance.shouldDeactivate(event)) {
        instance.tribute.isActive = false;
        instance.tribute.hideMenu();
      }

      var element = this;
      instance.commandEvent = false;
      TributeEvents.keys().forEach(function (o) {
        if (o.key === event.keyCode) {
          instance.commandEvent = true;
          instance.callbacks()[o.value.toLowerCase()](event, element);
        }
      });
    }
  }, {
    key: "input",
    value: function input(instance, event) {
      instance.inputEvent = true;
      instance.keyup.call(this, instance, event);
    }
  }, {
    key: "click",
    value: function click(instance, event) {
      var tribute = instance.tribute;

      if (tribute.menu && tribute.menu.contains(event.target)) {
        var li = event.target;
        event.preventDefault();
        event.stopPropagation();

        while (li.nodeName.toLowerCase() !== 'li') {
          li = li.parentNode;

          if (!li || li === tribute.menu) {
            throw new Error('cannot find the <li> container for the click');
          }
        }

        tribute.selectItemAtIndex(li.getAttribute('data-index'), event);
        tribute.hideMenu(); // TODO: should fire with externalTrigger and target is outside of menu
      } else if (tribute.current.element && !tribute.current.externalTrigger) {
        tribute.current.externalTrigger = false;
        setTimeout(function () {
          return tribute.hideMenu();
        });
      }
    }
  }, {
    key: "keyup",
    value: function keyup(instance, event) {
      if (instance.inputEvent) {
        instance.inputEvent = false;
      }

      instance.updateSelection(this);
      if (event.keyCode === 27) return;

      if (!instance.tribute.allowSpaces && instance.tribute.hasTrailingSpace) {
        instance.tribute.hasTrailingSpace = false;
        instance.commandEvent = true;
        instance.callbacks()["space"](event, this);
        return;
      }

      if (!instance.tribute.isActive) {
        if (instance.tribute.autocompleteMode) {
          instance.callbacks().triggerChar(event, this, '');
        } else {
          var keyCode = instance.getKeyCode(instance, this, event);
          if (isNaN(keyCode) || !keyCode) return;
          var trigger = instance.tribute.triggers().find(function (trigger) {
            return trigger.charCodeAt(0) === keyCode;
          });

          if (typeof trigger !== 'undefined') {
            instance.callbacks().triggerChar(event, this, trigger);
          }
        }
      }

      if ((instance.tribute.current.trigger || instance.tribute.autocompleteMode) && instance.commandEvent === false || instance.tribute.isActive && event.keyCode === 8) {
        instance.tribute.showMenuFor(this, true);
      }
    }
  }, {
    key: "shouldDeactivate",
    value: function shouldDeactivate(event) {
      if (!this.tribute.isActive) return false;

      if (this.tribute.current.mentionText.length === 0) {
        var eventKeyPressed = false;
        TributeEvents.keys().forEach(function (o) {
          if (event.keyCode === o.key) eventKeyPressed = true;
        });
        return !eventKeyPressed;
      }

      return false;
    }
  }, {
    key: "getKeyCode",
    value: function getKeyCode(instance, el, event) {
      var _char;

      var tribute = instance.tribute;
      var info = tribute.range.getTriggerInfo(false, tribute.hasTrailingSpace, true, tribute.allowSpaces, tribute.autocompleteMode);

      if (info) {
        return info.mentionTriggerChar.charCodeAt(0);
      } else {
        return false;
      }
    }
  }, {
    key: "updateSelection",
    value: function updateSelection(el) {
      this.tribute.current.element = el;
      var info = this.tribute.range.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode);

      if (info) {
        this.tribute.current.selectedPath = info.mentionSelectedPath;
        this.tribute.current.mentionText = info.mentionText;
        this.tribute.current.selectedOffset = info.mentionSelectedOffset;
      }
    }
  }, {
    key: "callbacks",
    value: function callbacks() {
      var _this = this;

      return {
        triggerChar: function triggerChar(e, el, trigger) {
          var tribute = _this.tribute;
          tribute.current.trigger = trigger;
          var collectionItem = tribute.collection.find(function (item) {
            return item.trigger === trigger;
          });
          tribute.current.collection = collectionItem;
          if (tribute.inputEvent) tribute.showMenuFor(el, true);
        },
        enter: function enter(e, el) {
          // choose selection
          if (_this.tribute.isActive && _this.tribute.current.filteredItems) {
            e.preventDefault();
            e.stopPropagation();
            setTimeout(function () {
              _this.tribute.selectItemAtIndex(_this.tribute.menuSelected, e);

              _this.tribute.hideMenu();
            }, 0);
          }
        },
        escape: function escape(e, el) {
          if (_this.tribute.isActive) {
            e.preventDefault();
            e.stopPropagation();
            _this.tribute.isActive = false;

            _this.tribute.hideMenu();
          }
        },
        tab: function tab(e, el) {
          // choose first match
          _this.callbacks().enter(e, el);
        },
        space: function space(e, el) {
          if (_this.tribute.isActive) {
            if (_this.tribute.spaceSelectsMatch) {
              _this.callbacks().enter(e, el);
            } else if (!_this.tribute.allowSpaces) {
              e.stopPropagation();
              setTimeout(function () {
                _this.tribute.hideMenu();

                _this.tribute.isActive = false;
              }, 0);
            }
          }
        },
        up: function up(e, el) {
          // navigate up ul
          if (_this.tribute.isActive && _this.tribute.current.filteredItems) {
            e.preventDefault();
            e.stopPropagation();
            var count = _this.tribute.current.filteredItems.length,
                selected = _this.tribute.menuSelected;

            if (count > selected && selected > 0) {
              _this.tribute.menuSelected--;

              _this.setActiveLi();
            } else if (selected === 0) {
              _this.tribute.menuSelected = count - 1;

              _this.setActiveLi();

              _this.tribute.menu.scrollTop = _this.tribute.menu.scrollHeight;
            }
          }
        },
        down: function down(e, el) {
          // navigate down ul
          if (_this.tribute.isActive && _this.tribute.current.filteredItems) {
            e.preventDefault();
            e.stopPropagation();
            var count = _this.tribute.current.filteredItems.length - 1,
                selected = _this.tribute.menuSelected;

            if (count > selected) {
              _this.tribute.menuSelected++;

              _this.setActiveLi();
            } else if (count === selected) {
              _this.tribute.menuSelected = 0;

              _this.setActiveLi();

              _this.tribute.menu.scrollTop = 0;
            }
          }
        },
        "delete": function _delete(e, el) {
          if (_this.tribute.isActive && _this.tribute.current.mentionText.length < 1) {
            _this.tribute.hideMenu();
          } else if (_this.tribute.isActive) {
            _this.tribute.showMenuFor(el);
          }
        }
      };
    }
  }, {
    key: "setActiveLi",
    value: function setActiveLi(index) {
      var lis = this.tribute.menu.querySelectorAll('li'),
          length = lis.length >>> 0;
      if (index) this.tribute.menuSelected = parseInt(index);

      for (var i = 0; i < length; i++) {
        var li = lis[i];

        if (i === this.tribute.menuSelected) {
          li.classList.add(this.tribute.current.collection.selectClass);
          var liClientRect = li.getBoundingClientRect();
          var menuClientRect = this.tribute.menu.getBoundingClientRect();

          if (liClientRect.bottom > menuClientRect.bottom) {
            var scrollDistance = liClientRect.bottom - menuClientRect.bottom;
            this.tribute.menu.scrollTop += scrollDistance;
          } else if (liClientRect.top < menuClientRect.top) {
            var _scrollDistance = menuClientRect.top - liClientRect.top;

            this.tribute.menu.scrollTop -= _scrollDistance;
          }
        } else {
          li.classList.remove(this.tribute.current.collection.selectClass);
        }
      }
    }
  }, {
    key: "getFullHeight",
    value: function getFullHeight(elem, includeMargin) {
      var height = elem.getBoundingClientRect().height;

      if (includeMargin) {
        var style = elem.currentStyle || window.getComputedStyle(elem);
        return height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      }

      return height;
    }
  }], [{
    key: "keys",
    value: function keys() {
      return [{
        key: 9,
        value: 'TAB'
      }, {
        key: 8,
        value: 'DELETE'
      }, {
        key: 13,
        value: 'ENTER'
      }, {
        key: 27,
        value: 'ESCAPE'
      }, {
        key: 32,
        value: 'SPACE'
      }, {
        key: 38,
        value: 'UP'
      }, {
        key: 40,
        value: 'DOWN'
      }];
    }
  }]);

  return TributeEvents;
}();

var _default = TributeEvents;
exports["default"] = _default;
module.exports = exports.default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TributeMenuEvents =
/*#__PURE__*/
function () {
  function TributeMenuEvents(tribute) {
    _classCallCheck(this, TributeMenuEvents);

    this.tribute = tribute;
    this.tribute.menuEvents = this;
    this.menu = this.tribute.menu;
  }

  _createClass(TributeMenuEvents, [{
    key: "bind",
    value: function bind(menu) {
      var _this = this;

      this.menuClickEvent = this.tribute.events.click.bind(null, this);
      this.menuContainerScrollEvent = this.debounce(function () {
        if (_this.tribute.isActive) {
          _this.tribute.showMenuFor(_this.tribute.current.element, false);
        }
      }, 300, false);
      this.windowResizeEvent = this.debounce(function () {
        if (_this.tribute.isActive) {
          _this.tribute.range.positionMenuAtCaret(true);
        }
      }, 300, false); // fixes IE11 issues with mousedown

      this.tribute.range.getDocument().addEventListener('MSPointerDown', this.menuClickEvent, false);
      this.tribute.range.getDocument().addEventListener('mousedown', this.menuClickEvent, false);
      window.addEventListener('resize', this.windowResizeEvent);

      if (this.menuContainer) {
        this.menuContainer.addEventListener('scroll', this.menuContainerScrollEvent, false);
      } else {
        window.addEventListener('scroll', this.menuContainerScrollEvent);
      }
    }
  }, {
    key: "unbind",
    value: function unbind(menu) {
      this.tribute.range.getDocument().removeEventListener('mousedown', this.menuClickEvent, false);
      this.tribute.range.getDocument().removeEventListener('MSPointerDown', this.menuClickEvent, false);
      window.removeEventListener('resize', this.windowResizeEvent);

      if (this.menuContainer) {
        this.menuContainer.removeEventListener('scroll', this.menuContainerScrollEvent, false);
      } else {
        window.removeEventListener('scroll', this.menuContainerScrollEvent);
      }
    }
  }, {
    key: "debounce",
    value: function debounce(func, wait, immediate) {
      var _this2 = this,
          _arguments = arguments;

      var timeout;
      return function () {
        var context = _this2,
            args = _arguments;

        var later = function later() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    }
  }]);

  return TributeMenuEvents;
}();

var _default = TributeMenuEvents;
exports["default"] = _default;
module.exports = exports.default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TributeRange =
/*#__PURE__*/
function () {
  function TributeRange(tribute) {
    _classCallCheck(this, TributeRange);

    this.tribute = tribute;
    this.tribute.range = this;
  }

  _createClass(TributeRange, [{
    key: "getDocument",
    value: function getDocument() {
      var iframe;

      if (this.tribute.current.collection) {
        iframe = this.tribute.current.collection.iframe;
      }

      if (!iframe) {
        return document;
      }

      return iframe.contentWindow.document;
    }
  }, {
    key: "positionMenuAtCaret",
    value: function positionMenuAtCaret(scrollTo) {
      var _this = this;

      var context = this.tribute.current,
          coordinates;
      var info = this.getTriggerInfo(false, this.tribute.hasTrailingSpace, true, this.tribute.allowSpaces, this.tribute.autocompleteMode);

      if (typeof info !== 'undefined') {
        if (!this.tribute.positionMenu) {
          this.tribute.menu.style.cssText = "display: block;";
          return;
        }

        if (!this.isContentEditable(context.element)) {
          coordinates = this.getTextAreaOrInputUnderlinePosition(this.tribute.current.element, info.mentionPosition);
        } else {
          coordinates = this.getContentEditableCaretPosition(info.mentionPosition);
        }

        this.tribute.menu.style.cssText = "top: ".concat(coordinates.top, "px;\n                                     left: ").concat(coordinates.left, "px;\n                                     right: ").concat(coordinates.right, "px;\n                                     bottom: ").concat(coordinates.bottom, "px;\n                                     position: absolute;\n                                     display: block;");

        if (coordinates.left === 'auto') {
          this.tribute.menu.style.left = 'auto';
        }

        if (coordinates.top === 'auto') {
          this.tribute.menu.style.top = 'auto';
        }

        if (scrollTo) this.scrollIntoView();
        window.setTimeout(function () {
          var menuDimensions = {
            width: _this.tribute.menu.offsetWidth,
            height: _this.tribute.menu.offsetHeight
          };

          var menuIsOffScreen = _this.isMenuOffScreen(coordinates, menuDimensions);

          var menuIsOffScreenHorizontally = window.innerWidth > menuDimensions.width && (menuIsOffScreen.left || menuIsOffScreen.right);
          var menuIsOffScreenVertically = window.innerHeight > menuDimensions.height && (menuIsOffScreen.top || menuIsOffScreen.bottom);

          if (menuIsOffScreenHorizontally || menuIsOffScreenVertically) {
            _this.tribute.menu.style.cssText = 'display: none';

            _this.positionMenuAtCaret(scrollTo);
          }
        }, 0);
      } else {
        this.tribute.menu.style.cssText = 'display: none';
      }
    }
  }, {
    key: "selectElement",
    value: function selectElement(targetElement, path, offset) {
      var range;
      var elem = targetElement;

      if (path) {
        for (var i = 0; i < path.length; i++) {
          elem = elem.childNodes[path[i]];

          if (elem === undefined) {
            return;
          }

          while (elem.length < offset) {
            offset -= elem.length;
            elem = elem.nextSibling;
          }

          if (elem.childNodes.length === 0 && !elem.length) {
            elem = elem.previousSibling;
          }
        }
      }

      var sel = this.getWindowSelection();
      range = this.getDocument().createRange();
      range.setStart(elem, offset);
      range.setEnd(elem, offset);
      range.collapse(true);

      try {
        sel.removeAllRanges();
      } catch (error) {}

      sel.addRange(range);
      targetElement.focus();
    }
  }, {
    key: "replaceTriggerText",
    value: function replaceTriggerText(text, requireLeadingSpace, hasTrailingSpace, originalEvent, item) {
      var info = this.getTriggerInfo(true, hasTrailingSpace, requireLeadingSpace, this.tribute.allowSpaces, this.tribute.autocompleteMode);

      if (info !== undefined) {
        var context = this.tribute.current;
        var replaceEvent = new CustomEvent('tribute-replaced', {
          detail: {
            item: item,
            instance: context,
            context: info,
            event: originalEvent
          }
        });

        if (!this.isContentEditable(context.element)) {
          var myField = this.tribute.current.element;
          var textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : ' ';
          text += textSuffix;
          var startPos = info.mentionPosition;
          var endPos = info.mentionPosition + info.mentionText.length + textSuffix.length;

          if (!this.tribute.autocompleteMode) {
            endPos += info.mentionTriggerChar.length - 1;
          }

          myField.value = myField.value.substring(0, startPos) + text + myField.value.substring(endPos, myField.value.length);
          myField.selectionStart = startPos + text.length;
          myField.selectionEnd = startPos + text.length;
        } else {
          // add a space to the end of the pasted text
          var _textSuffix = typeof this.tribute.replaceTextSuffix == 'string' ? this.tribute.replaceTextSuffix : '\xA0';

          text += _textSuffix;

          var _endPos = info.mentionPosition + info.mentionText.length;

          if (!this.tribute.autocompleteMode) {
            _endPos += info.mentionTriggerChar.length;
          }

          this.pasteHtml(text, info.mentionPosition, _endPos);
        }

        context.element.dispatchEvent(new CustomEvent('input', {
          bubbles: true
        }));
        context.element.dispatchEvent(replaceEvent);
      }
    }
  }, {
    key: "pasteHtml",
    value: function pasteHtml(html, startPos, endPos) {
      var range, sel;
      sel = this.getWindowSelection();
      range = this.getDocument().createRange();
      range.setStart(sel.anchorNode, startPos);
      range.setEnd(sel.anchorNode, endPos);
      range.deleteContents();
      var el = this.getDocument().createElement('div');
      el.innerHTML = html;
      var frag = this.getDocument().createDocumentFragment(),
          node,
          lastNode;

      while (node = el.firstChild) {
        lastNode = frag.appendChild(node);
      }

      range.insertNode(frag); // Preserve the selection

      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, {
    key: "getWindowSelection",
    value: function getWindowSelection() {
      if (this.tribute.collection.iframe) {
        return this.tribute.collection.iframe.contentWindow.getSelection();
      }

      return window.getSelection();
    }
  }, {
    key: "getNodePositionInParent",
    value: function getNodePositionInParent(element) {
      if (element.parentNode === null) {
        return 0;
      }

      for (var i = 0; i < element.parentNode.childNodes.length; i++) {
        var node = element.parentNode.childNodes[i];

        if (node === element) {
          return i;
        }
      }
    }
  }, {
    key: "getContentEditableSelectedPath",
    value: function getContentEditableSelectedPath(ctx) {
      var sel = this.getWindowSelection();
      var selected = sel.anchorNode;
      var path = [];
      var offset;

      if (selected != null) {
        var i;
        var ce = selected.contentEditable;

        while (selected !== null && ce !== 'true') {
          i = this.getNodePositionInParent(selected);
          path.push(i);
          selected = selected.parentNode;

          if (selected !== null) {
            ce = selected.contentEditable;
          }
        }

        path.reverse(); // getRangeAt may not exist, need alternative

        offset = sel.getRangeAt(0).startOffset;
        return {
          selected: selected,
          path: path,
          offset: offset
        };
      }
    }
  }, {
    key: "getTextPrecedingCurrentSelection",
    value: function getTextPrecedingCurrentSelection() {
      var context = this.tribute.current,
          text = '';

      if (!this.isContentEditable(context.element)) {
        var textComponent = this.tribute.current.element;

        if (textComponent) {
          var startPos = textComponent.selectionStart;

          if (textComponent.value && startPos >= 0) {
            text = textComponent.value.substring(0, startPos);
          }
        }
      } else {
        var selectedElem = this.getWindowSelection().anchorNode;

        if (selectedElem != null) {
          var workingNodeContent = selectedElem.textContent;
          var selectStartOffset = this.getWindowSelection().getRangeAt(0).startOffset;

          if (workingNodeContent && selectStartOffset >= 0) {
            text = workingNodeContent.substring(0, selectStartOffset);
          }
        }
      }

      return text;
    }
  }, {
    key: "getLastWordInText",
    value: function getLastWordInText(text) {
      text = text.replace(/\u00A0/g, ' '); // https://stackoverflow.com/questions/29850407/how-do-i-replace-unicode-character-u00a0-with-a-space-in-javascript

      var wordsArray = text.split(/\s+/);
      var worldsCount = wordsArray.length - 1;
      return wordsArray[worldsCount].trim();
    }
  }, {
    key: "getTriggerInfo",
    value: function getTriggerInfo(menuAlreadyActive, hasTrailingSpace, requireLeadingSpace, allowSpaces, isAutocomplete) {
      var _this2 = this;

      var ctx = this.tribute.current;
      var selected, path, offset;

      if (!this.isContentEditable(ctx.element)) {
        selected = this.tribute.current.element;
      } else {
        var selectionInfo = this.getContentEditableSelectedPath(ctx);

        if (selectionInfo) {
          selected = selectionInfo.selected;
          path = selectionInfo.path;
          offset = selectionInfo.offset;
        }
      }

      var effectiveRange = this.getTextPrecedingCurrentSelection();
      var lastWordOfEffectiveRange = this.getLastWordInText(effectiveRange);

      if (isAutocomplete) {
        return {
          mentionPosition: effectiveRange.length - lastWordOfEffectiveRange.length,
          mentionText: lastWordOfEffectiveRange,
          mentionSelectedElement: selected,
          mentionSelectedPath: path,
          mentionSelectedOffset: offset
        };
      }

      if (effectiveRange !== undefined && effectiveRange !== null) {
        var mostRecentTriggerCharPos = -1;
        var triggerChar;
        this.tribute.collection.forEach(function (config) {
          var c = config.trigger;
          var idx = config.requireLeadingSpace ? _this2.lastIndexWithLeadingSpace(effectiveRange, c) : effectiveRange.lastIndexOf(c);

          if (idx > mostRecentTriggerCharPos) {
            mostRecentTriggerCharPos = idx;
            triggerChar = c;
            requireLeadingSpace = config.requireLeadingSpace;
          }
        });

        if (mostRecentTriggerCharPos >= 0 && (mostRecentTriggerCharPos === 0 || !requireLeadingSpace || /[\xA0\s]/g.test(effectiveRange.substring(mostRecentTriggerCharPos - 1, mostRecentTriggerCharPos)))) {
          var currentTriggerSnippet = effectiveRange.substring(mostRecentTriggerCharPos + triggerChar.length, effectiveRange.length);
          triggerChar = effectiveRange.substring(mostRecentTriggerCharPos, mostRecentTriggerCharPos + triggerChar.length);
          var firstSnippetChar = currentTriggerSnippet.substring(0, 1);
          var leadingSpace = currentTriggerSnippet.length > 0 && (firstSnippetChar === ' ' || firstSnippetChar === '\xA0');

          if (hasTrailingSpace) {
            currentTriggerSnippet = currentTriggerSnippet.trim();
          }

          var regex = allowSpaces ? /[^\S ]/g : /[\xA0\s]/g;
          this.tribute.hasTrailingSpace = regex.test(currentTriggerSnippet);

          if (!leadingSpace && (menuAlreadyActive || !regex.test(currentTriggerSnippet))) {
            return {
              mentionPosition: mostRecentTriggerCharPos,
              mentionText: currentTriggerSnippet,
              mentionSelectedElement: selected,
              mentionSelectedPath: path,
              mentionSelectedOffset: offset,
              mentionTriggerChar: triggerChar
            };
          }
        }
      }
    }
  }, {
    key: "lastIndexWithLeadingSpace",
    value: function lastIndexWithLeadingSpace(str, trigger) {
      var reversedStr = str.split('').reverse().join('');
      var index = -1;

      for (var cidx = 0, len = str.length; cidx < len; cidx++) {
        var firstChar = cidx === str.length - 1;
        var leadingSpace = /\s/.test(reversedStr[cidx + 1]);
        var match = true;

        for (var triggerIdx = trigger.length - 1; triggerIdx >= 0; triggerIdx--) {
          if (trigger[triggerIdx] !== reversedStr[cidx - triggerIdx]) {
            match = false;
            break;
          }
        }

        if (match && (firstChar || leadingSpace)) {
          index = str.length - 1 - cidx;
          break;
        }
      }

      return index;
    }
  }, {
    key: "isContentEditable",
    value: function isContentEditable(element) {
      return element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA';
    }
  }, {
    key: "isMenuOffScreen",
    value: function isMenuOffScreen(coordinates, menuDimensions) {
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var menuTop = typeof coordinates.top === 'number' ? coordinates.top : windowTop + windowHeight - coordinates.bottom - menuDimensions.height;
      var menuRight = typeof coordinates.right === 'number' ? coordinates.right : coordinates.left + menuDimensions.width;
      var menuBottom = typeof coordinates.bottom === 'number' ? coordinates.bottom : coordinates.top + menuDimensions.height;
      var menuLeft = typeof coordinates.left === 'number' ? coordinates.left : windowLeft + windowWidth - coordinates.right - menuDimensions.width;
      return {
        top: menuTop < Math.floor(windowTop),
        right: menuRight > Math.ceil(windowLeft + windowWidth),
        bottom: menuBottom > Math.ceil(windowTop + windowHeight),
        left: menuLeft < Math.floor(windowLeft)
      };
    }
  }, {
    key: "getMenuDimensions",
    value: function getMenuDimensions() {
      // Width of the menu depends of its contents and position
      // We must check what its width would be without any obstruction
      // This way, we can achieve good positioning for flipping the menu
      var dimensions = {
        width: null,
        height: null
      };
      this.tribute.menu.style.cssText = "top: 0px;\n                                 left: 0px;\n                                 position: fixed;\n                                 display: block;\n                                 visibility; hidden;";
      dimensions.width = this.tribute.menu.offsetWidth;
      dimensions.height = this.tribute.menu.offsetHeight;
      this.tribute.menu.style.cssText = "display: none;";
      return dimensions;
    }
  }, {
    key: "getTextAreaOrInputUnderlinePosition",
    value: function getTextAreaOrInputUnderlinePosition(element, position, flipped) {
      var properties = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing'];
      var isFirefox = window.mozInnerScreenX !== null;
      var div = this.getDocument().createElement('div');
      div.id = 'input-textarea-caret-position-mirror-div';
      this.getDocument().body.appendChild(div);
      var style = div.style;
      var computed = window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
      style.whiteSpace = 'pre-wrap';

      if (element.nodeName !== 'INPUT') {
        style.wordWrap = 'break-word';
      } // position off-screen


      style.position = 'absolute';
      style.visibility = 'hidden'; // transfer the element's properties to the div

      properties.forEach(function (prop) {
        style[prop] = computed[prop];
      });

      if (isFirefox) {
        style.width = "".concat(parseInt(computed.width) - 2, "px");
        if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
      } else {
        style.overflow = 'hidden';
      }

      div.textContent = element.value.substring(0, position);

      if (element.nodeName === 'INPUT') {
        div.textContent = div.textContent.replace(/\s/g, ' ');
      }

      var span = this.getDocument().createElement('span');
      span.textContent = element.value.substring(position) || '.';
      div.appendChild(span);
      var rect = element.getBoundingClientRect();
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var top = 0;
      var left = 0;

      if (this.menuContainerIsBody) {
        top = rect.top;
        left = rect.left;
      }

      var coordinates = {
        top: top + windowTop + span.offsetTop + parseInt(computed.borderTopWidth) + parseInt(computed.fontSize) - element.scrollTop,
        left: left + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth)
      };
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var menuDimensions = this.getMenuDimensions();
      var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

      if (menuIsOffScreen.right) {
        coordinates.right = windowWidth - coordinates.left;
        coordinates.left = 'auto';
      }

      var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

      if (menuIsOffScreen.bottom) {
        var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
        var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);
        coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top - span.offsetTop);
        coordinates.top = 'auto';
      }

      menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

      if (menuIsOffScreen.left) {
        coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
        delete coordinates.right;
      }

      if (menuIsOffScreen.top) {
        coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
        delete coordinates.bottom;
      }

      this.getDocument().body.removeChild(div);
      return coordinates;
    }
  }, {
    key: "getContentEditableCaretPosition",
    value: function getContentEditableCaretPosition(selectedNodePosition) {
      var range;
      var sel = this.getWindowSelection();
      range = this.getDocument().createRange();
      range.setStart(sel.anchorNode, selectedNodePosition);
      range.setEnd(sel.anchorNode, selectedNodePosition);
      range.collapse(false);
      var rect = range.getBoundingClientRect();
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var left = rect.left;
      var top = rect.top;
      var coordinates = {
        left: left + windowLeft,
        top: top + rect.height + windowTop
      };
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      var menuDimensions = this.getMenuDimensions();
      var menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

      if (menuIsOffScreen.right) {
        coordinates.left = 'auto';
        coordinates.right = windowWidth - rect.left - windowLeft;
      }

      var parentHeight = this.tribute.menuContainer ? this.tribute.menuContainer.offsetHeight : this.getDocument().body.offsetHeight;

      if (menuIsOffScreen.bottom) {
        var parentRect = this.tribute.menuContainer ? this.tribute.menuContainer.getBoundingClientRect() : this.getDocument().body.getBoundingClientRect();
        var scrollStillAvailable = parentHeight - (windowHeight - parentRect.top);
        coordinates.top = 'auto';
        coordinates.bottom = scrollStillAvailable + (windowHeight - rect.top);
      }

      menuIsOffScreen = this.isMenuOffScreen(coordinates, menuDimensions);

      if (menuIsOffScreen.left) {
        coordinates.left = windowWidth > menuDimensions.width ? windowLeft + windowWidth - menuDimensions.width : windowLeft;
        delete coordinates.right;
      }

      if (menuIsOffScreen.top) {
        coordinates.top = windowHeight > menuDimensions.height ? windowTop + windowHeight - menuDimensions.height : windowTop;
        delete coordinates.bottom;
      }

      if (!this.menuContainerIsBody) {
        coordinates.left = coordinates.left ? coordinates.left - this.tribute.menuContainer.offsetLeft : coordinates.left;
        coordinates.top = coordinates.top ? coordinates.top - this.tribute.menuContainer.offsetTop : coordinates.top;
      }

      return coordinates;
    }
  }, {
    key: "scrollIntoView",
    value: function scrollIntoView(elem) {
      var reasonableBuffer = 20,
          clientRect;
      var maxScrollDisplacement = 100;
      var e = this.menu;
      if (typeof e === 'undefined') return;

      while (clientRect === undefined || clientRect.height === 0) {
        clientRect = e.getBoundingClientRect();

        if (clientRect.height === 0) {
          e = e.childNodes[0];

          if (e === undefined || !e.getBoundingClientRect) {
            return;
          }
        }
      }

      var elemTop = clientRect.top;
      var elemBottom = elemTop + clientRect.height;

      if (elemTop < 0) {
        window.scrollTo(0, window.pageYOffset + clientRect.top - reasonableBuffer);
      } else if (elemBottom > window.innerHeight) {
        var maxY = window.pageYOffset + clientRect.top - reasonableBuffer;

        if (maxY - window.pageYOffset > maxScrollDisplacement) {
          maxY = window.pageYOffset + maxScrollDisplacement;
        }

        var targetY = window.pageYOffset - (window.innerHeight - elemBottom);

        if (targetY > maxY) {
          targetY = maxY;
        }

        window.scrollTo(0, targetY);
      }
    }
  }, {
    key: "menuContainerIsBody",
    get: function get() {
      return this.tribute.menuContainer === document.body || !this.tribute.menuContainer;
    }
  }]);

  return TributeRange;
}();

var _default = TributeRange;
exports["default"] = _default;
module.exports = exports.default;

},{"./utils":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// Thanks to https://github.com/mattyork/fuzzy
var TributeSearch =
/*#__PURE__*/
function () {
  function TributeSearch(tribute) {
    _classCallCheck(this, TributeSearch);

    this.tribute = tribute;
    this.tribute.search = this;
  }

  _createClass(TributeSearch, [{
    key: "simpleFilter",
    value: function simpleFilter(pattern, array) {
      var _this = this;

      return array.filter(function (string) {
        return _this.test(pattern, string);
      });
    }
  }, {
    key: "test",
    value: function test(pattern, string) {
      return this.match(pattern, string) !== null;
    }
  }, {
    key: "match",
    value: function match(pattern, string, opts) {
      opts = opts || {};
      var patternIdx = 0,
          result = [],
          len = string.length,
          totalScore = 0,
          currScore = 0,
          pre = opts.pre || '',
          post = opts.post || '',
          compareString = opts.caseSensitive && string || string.toLowerCase(),
          ch,
          compareChar;

      if (opts.skip) {
        return {
          rendered: string,
          score: 0
        };
      }

      pattern = opts.caseSensitive && pattern || pattern.toLowerCase();
      var patternCache = this.traverse(compareString, pattern, 0, 0, []);

      if (!patternCache) {
        return null;
      }

      return {
        rendered: this.render(string, patternCache.cache, pre, post),
        score: patternCache.score
      };
    }
  }, {
    key: "traverse",
    value: function traverse(string, pattern, stringIndex, patternIndex, patternCache) {
      // if the pattern search at end
      if (pattern.length === patternIndex) {
        // calculate score and copy the cache containing the indices where it's found
        return {
          score: this.calculateScore(patternCache),
          cache: patternCache.slice()
        };
      } // if string at end or remaining pattern > remaining string


      if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
        return undefined;
      }

      var c = pattern[patternIndex];
      var index = string.indexOf(c, stringIndex);
      var best, temp;

      while (index > -1) {
        patternCache.push(index);
        temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
        patternCache.pop(); // if downstream traversal failed, return best answer so far

        if (!temp) {
          return best;
        }

        if (!best || best.score < temp.score) {
          best = temp;
        }

        index = string.indexOf(c, index + 1);
      }

      return best;
    }
  }, {
    key: "calculateScore",
    value: function calculateScore(patternCache) {
      var score = 0;
      var temp = 1;
      patternCache.forEach(function (index, i) {
        if (i > 0) {
          if (patternCache[i - 1] + 1 === index) {
            temp += temp + 1;
          } else {
            temp = 1;
          }
        }

        score += temp;
      });
      return score;
    }
  }, {
    key: "render",
    value: function render(string, indices, pre, post) {
      var rendered = string.substring(0, indices[0]);
      indices.forEach(function (index, i) {
        rendered += pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
      });
      return rendered;
    }
  }, {
    key: "filter",
    value: function filter(pattern, arr, opts) {
      var _this2 = this;

      opts = opts || {};
      return arr.reduce(function (prev, element, idx, arr) {
        var str = element;

        if (opts.extract) {
          str = opts.extract(element);

          if (!str) {
            // take care of undefineds / nulls / etc.
            str = '';
          }
        }

        var rendered = _this2.match(pattern, str, opts);

        if (rendered != null) {
          prev[prev.length] = {
            string: rendered.rendered,
            score: rendered.score,
            index: idx,
            original: element
          };
        }

        return prev;
      }, []).sort(function (a, b) {
        var compare = b.score - a.score;
        if (compare) return compare;
        return a.index - b.index;
      });
    }
  }]);

  return TributeSearch;
}();

var _default = TributeSearch;
exports["default"] = _default;
module.exports = exports.default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Tribute = _interopRequireDefault(require("./Tribute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
* Tribute.js
* Native ES6 JavaScript @mention Plugin
**/
var _default = _Tribute["default"];
exports["default"] = _default;
module.exports = exports.default;

},{"./Tribute":1}],7:[function(require,module,exports){
"use strict";

if (!Array.prototype.find) {
  Array.prototype.find = function (predicate) {
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }

    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }

    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];

      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }

    return undefined;
  };
}

if (window && typeof window.CustomEvent !== "function") {
  var CustomEvent = function CustomEvent(event, params) {
    params = params || {
      bubbles: false,
      cancelable: false,
      detail: undefined
    };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  };

  if (typeof window.Event !== 'undefined') {
    CustomEvent.prototype = window.Event.prototype;
  }

  window.CustomEvent = CustomEvent;
}

},{}]},{},[6])(6)
});
//# sourceMappingURL=tribute.js.map


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
      _c("transition", { attrs: { name: "fade" } }, [
        _vm.announcements.length
          ? _c("div", { staticClass: "card border shadow-none mb-3" }, [
              _c("div", { staticClass: "card-header text-muted bg-white" }, [
                _c("i", { staticClass: "fas fa-bullhorn mr-2" }),
                _vm._v(" "),
                _c("span", { staticClass: "text-weight-light" }, [
                  _vm._v("COMUNICADOS")
                ]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "float-right cursor-pointer",
                    attrs: { title: "Close" },
                    on: { click: _vm.close }
                  },
                  [_c("i", { staticClass: "fas fa-times text-lighter" })]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "card-body" }, [
                _c("div", { staticClass: "card-title mb-0" }, [
                  _c("span", { staticClass: "font-weight-bold" }, [
                    _vm._v(_vm._s(_vm.announcement.title))
                  ])
                ]),
                _vm._v(" "),
                _c("p", { staticClass: "card-text" }, [
                  _c("span", { staticStyle: { "font-size": "13px" } }, [
                    _vm._v(_vm._s(_vm.announcement.summary))
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "p",
                  {
                    staticClass:
                      "d-flex align-items-center justify-content-between mb-0"
                  },
                  [
                    _vm.announcement.url
                      ? _c(
                          "a",
                          {
                            staticClass: "small font-weight-bold mb-0",
                            attrs: { href: _vm.announcement.url }
                          },
                          [_vm._v("Ver mais")]
                        )
                      : _c("span"),
                    _vm._v(" "),
                    _c("span", [
                      _c(
                        "span",
                        {
                          class: [
                            _vm.showPrev
                              ? "btn btn-outline-secondary btn-sm py-0"
                              : "btn btn-outline-secondary btn-sm py-0 disabled"
                          ],
                          attrs: { disabled: _vm.showPrev == false },
                          on: {
                            click: function($event) {
                              return _vm.loadPrev()
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-chevron-left fa-sm" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          staticClass:
                            "btn btn-outline-success btn-sm py-0 mx-1",
                          attrs: {
                            title: "Mark as Read",
                            "data-toggle": "tooltip",
                            "data-placement": "bottom"
                          },
                          on: {
                            click: function($event) {
                              return _vm.markAsRead()
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-check fa-sm" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "span",
                        {
                          class: [
                            _vm.showNext
                              ? "btn btn-outline-secondary btn-sm py-0"
                              : "btn btn-outline-secondary btn-sm py-0 disabled"
                          ],
                          attrs: { disabled: _vm.showNext == false },
                          on: {
                            click: function($event) {
                              return _vm.loadNext()
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-chevron-right fa-sm" })]
                      )
                    ])
                  ]
                )
              ])
            ])
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true&":
/*!**************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true& ***!
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
  return _c(
    "div",
    [
      _c("transition", { attrs: { name: "fade" } }, [
        _c(
          "div",
          { staticClass: "card notification-card shadow-none border" },
          [
            _c(
              "div",
              {
                staticClass: "card-body loader text-center",
                staticStyle: { height: "200px" }
              },
              [
                _c(
                  "div",
                  { staticClass: "spinner-border", attrs: { role: "status" } },
                  [
                    _c("span", { staticClass: "sr-only" }, [
                      _vm._v("Carregando...")
                    ])
                  ]
                )
              ]
            ),
            _vm._v(" "),
            _vm.notifications.length > 0
              ? _c(
                  "div",
                  {
                    staticClass: "card-body px-0 py-0 contents",
                    staticStyle: {
                      "max-height": "240px",
                      "overflow-y": "scroll"
                    }
                  },
                  [
                    _vm.profile.locked
                      ? _c(
                          "div",
                          {
                            staticClass:
                              "media align-items-center mt-n2 px-3 py-2 border-bottom border-lighter bg-light cursor-pointer",
                            on: {
                              click: function($event) {
                                return _vm.redirect("/account/follow-requests")
                              }
                            }
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "media-body font-weight-light pt-2 small d-flex align-items-center justify-content-between"
                              },
                              [
                                _c("p", { staticClass: "mb-0 text-lighter" }, [
                                  _c("i", {
                                    staticClass: "fas fa-cog text-light"
                                  })
                                ]),
                                _vm._v(" "),
                                _c(
                                  "p",
                                  {
                                    staticClass:
                                      "text-center pt-1 mb-1 text-dark font-weight-bold"
                                  },
                                  [
                                    _c("strong", [
                                      _vm._v(_vm._s(_vm.followRequests.count))
                                    ]),
                                    _vm._v(" Requisições")
                                  ]
                                ),
                                _vm._v(" "),
                                _c("p", { staticClass: "mb-0 text-lighter" }, [
                                  _c("i", {
                                    staticClass: "fas fa-chevron-right"
                                  })
                                ])
                              ]
                            )
                          ]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.notifications, function(n, index) {
                      return _vm.notifications.length > 0
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "media align-items-center px-3 py-2 border-bottom border-light"
                            },
                            [
                              _c("img", {
                                staticClass: "mr-2 rounded-circle",
                                staticStyle: { border: "1px solid #ccc" },
                                attrs: {
                                  src: n.account.avatar,
                                  alt: "",
                                  width: "32px",
                                  height: "32px",
                                  onerror:
                                    "this.onerror=null;this.src='/storage/avatars/default.png';"
                                }
                              }),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "media-body font-weight-light small"
                                },
                                [
                                  n.type == "favourite"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(
                                            " curtiu seu\n\t\t\t\t\t\t\t\t"
                                          ),
                                          n.status.hasOwnProperty(
                                            "media_attachments"
                                          )
                                            ? _c(
                                                "span",
                                                [
                                                  _c(
                                                    "a",
                                                    {
                                                      staticClass:
                                                        "font-weight-bold",
                                                      attrs: {
                                                        href: n.status.url,
                                                        id: "fvn-" + n.id
                                                      }
                                                    },
                                                    [_vm._v("post")]
                                                  ),
                                                  _vm._v(
                                                    ".\n\t\t\t\t\t\t\t\t\t"
                                                  ),
                                                  _c(
                                                    "b-popover",
                                                    {
                                                      attrs: {
                                                        target: "fvn-" + n.id,
                                                        title: "",
                                                        triggers: "hover",
                                                        placement: "top",
                                                        boundary: "window"
                                                      }
                                                    },
                                                    [
                                                      _c("img", {
                                                        staticStyle: {
                                                          "object-fit": "cover"
                                                        },
                                                        attrs: {
                                                          src: _vm.notificationPreview(
                                                            n
                                                          ),
                                                          width: "100px",
                                                          height: "100px"
                                                        }
                                                      })
                                                    ]
                                                  )
                                                ],
                                                1
                                              )
                                            : _c("span", [
                                                _c(
                                                  "a",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold",
                                                    attrs: {
                                                      href: n.status.url
                                                    }
                                                  },
                                                  [_vm._v("post")]
                                                ),
                                                _vm._v(".\n\t\t\t\t\t\t\t\t")
                                              ])
                                        ])
                                      ])
                                    : n.type == "comment"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" comentou no seu "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "font-weight-bold",
                                              attrs: { href: n.status.url }
                                            },
                                            [_vm._v("post")]
                                          ),
                                          _vm._v(".\n\t\t\t\t\t\t\t")
                                        ])
                                      ])
                                    : n.type == "mention"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "font-weight-bold",
                                              attrs: {
                                                href: _vm.mentionUrl(n.status)
                                              }
                                            },
                                            [_vm._v("mencionou")]
                                          ),
                                          _vm._v(" você.\n\t\t\t\t\t\t\t")
                                        ])
                                      ])
                                    : n.type == "follow"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(
                                            " seguiu você.\n\t\t\t\t\t\t\t"
                                          )
                                        ])
                                      ])
                                    : n.type == "share"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" compartilhou seu "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "font-weight-bold",
                                              attrs: { href: n.status.url }
                                            },
                                            [_vm._v("post")]
                                          ),
                                          _vm._v(".\n\t\t\t\t\t\t\t")
                                        ])
                                      ])
                                    : n.type == "modlog"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" atualizou um "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "font-weight-bold",
                                              attrs: { href: n.modlog.url }
                                            },
                                            [_vm._v("modlog")]
                                          ),
                                          _vm._v(".\n\t\t\t\t\t\t\t")
                                        ])
                                      ])
                                    : n.type == "tagged"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" marcou você em um "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "font-weight-bold",
                                              attrs: { href: n.tagged.post_url }
                                            },
                                            [_vm._v("post")]
                                          ),
                                          _vm._v(".\n\t\t\t\t\t\t\t")
                                        ])
                                      ])
                                    : n.type == "direct"
                                    ? _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "font-weight-bold text-dark word-break",
                                              attrs: {
                                                href: n.account.url,
                                                title: n.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.truncate(
                                                    n.account.username
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" enviou uma "),
                                          _c(
                                            "a",
                                            {
                                              staticClass: "font-weight-bold",
                                              attrs: {
                                                href:
                                                  "/account/direct/t/" +
                                                  n.account.id
                                              }
                                            },
                                            [_vm._v("mensagem")]
                                          ),
                                          _vm._v(".\n\t\t\t\t\t\t\t")
                                        ])
                                      ])
                                    : _c("div", [
                                        _c("p", { staticClass: "my-0" }, [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\tNão foi possível esta notificação.\n\t\t\t\t\t\t\t"
                                          )
                                        ])
                                      ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "small text-muted font-weight-bold",
                                  attrs: { title: n.created_at }
                                },
                                [_vm._v(_vm._s(_vm.timeAgo(n.created_at)))]
                              )
                            ]
                          )
                        : _vm._e()
                    }),
                    _vm._v(" "),
                    _vm.notifications.length
                      ? _c(
                          "div",
                          [
                            _c(
                              "infinite-loading",
                              { on: { infinite: _vm.infiniteNotifications } },
                              [
                                _c("div", {
                                  staticClass: "font-weight-bold",
                                  attrs: { slot: "no-results" },
                                  slot: "no-results"
                                }),
                                _vm._v(" "),
                                _c("div", {
                                  staticClass: "font-weight-bold",
                                  attrs: { slot: "no-more" },
                                  slot: "no-more"
                                })
                              ]
                            )
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.notifications.length == 0
                      ? _c(
                          "div",
                          { staticClass: "text-lighter text-center py-3" },
                          [
                            _c("p", { staticClass: "mb-0" }, [
                              _c("i", { staticClass: "fas fa-inbox fa-3x" })
                            ]),
                            _vm._v(" "),
                            _c(
                              "p",
                              { staticClass: "mb-0 small font-weight-bold" },
                              [_vm._v("Nenhuma notificação!")]
                            )
                          ]
                        )
                      : _vm._e()
                  ],
                  2
                )
              : _vm._e()
          ]
        )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=template&id=bb77b854&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/PostMenu.vue?vue&type=template&id=bb77b854&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    _vm.modal != "true"
      ? _c("div", { staticClass: "dropdown" }, [
          _c(
            "button",
            {
              staticClass:
                "btn btn-link text-dark no-caret dropdown-toggle py-0",
              attrs: {
                type: "button",
                "data-toggle": "dropdown",
                "aria-haspopup": "true",
                "aria-expanded": "false",
                title: "Post options"
              }
            },
            [
              _c("span", {
                class: [
                  _vm.size == "lg"
                    ? "fas fa-ellipsis-v fa-lg text-muted"
                    : "fas fa-ellipsis-v fa-sm text-lighter"
                ]
              })
            ]
          ),
          _vm._v(" "),
          _c("div", { staticClass: "dropdown-menu dropdown-menu-right" }, [
            _c(
              "a",
              {
                staticClass:
                  "dropdown-item font-weight-bold text-decoration-none",
                attrs: { href: _vm.status.url }
              },
              [_vm._v("Ir para o post")]
            ),
            _vm._v(" "),
            _vm.activeSession == true && _vm.statusOwner(_vm.status) == false
              ? _c("span", [
                  _c(
                    "a",
                    {
                      staticClass: "dropdown-item font-weight-bold",
                      attrs: { href: _vm.reportUrl(_vm.status) }
                    },
                    [_vm._v("Report")]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.activeSession == true && _vm.statusOwner(_vm.status) == true
              ? _c("span", [
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.muteProfile(_vm.status)
                        }
                      }
                    },
                    [_vm._v("Silenciar perfil")]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.blockProfile(_vm.status)
                        }
                      }
                    },
                    [_vm._v("Bloquear perfil")]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.activeSession == true && _vm.profile.is_admin == true
              ? _c("span", [
                  _c("div", { staticClass: "dropdown-divider" }),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-danger text-decoration-none",
                      on: {
                        click: function($event) {
                          return _vm.deletePost(_vm.status)
                        }
                      }
                    },
                    [_vm._v("Apagar")]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "dropdown-divider" }),
                  _vm._v(" "),
                  _c("h6", { staticClass: "dropdown-header" }, [
                    _vm._v("Mod Tools")
                  ]),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.status, "autocw")
                        }
                      }
                    },
                    [
                      _c("p", { staticClass: "mb-0" }, [_vm._v("Enforce CW")]),
                      _vm._v(" "),
                      _vm._m(0)
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.status, "noautolink")
                        }
                      }
                    },
                    [
                      _c("p", { staticClass: "mb-0" }, [
                        _vm._v("No Autolinking")
                      ]),
                      _vm._v(" "),
                      _vm._m(1)
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.status, "unlisted")
                        }
                      }
                    },
                    [
                      _c("p", { staticClass: "mb-0" }, [
                        _vm._v("Unlisted Posts")
                      ]),
                      _vm._v(" "),
                      _vm._m(2)
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.status, "disable")
                        }
                      }
                    },
                    [
                      _c("p", { staticClass: "mb-0" }, [
                        _vm._v("Disable Account")
                      ]),
                      _vm._v(" "),
                      _vm._m(3)
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "a",
                    {
                      staticClass:
                        "dropdown-item font-weight-bold text-decoration-none",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.status, "suspend")
                        }
                      }
                    },
                    [
                      _c("p", { staticClass: "mb-0" }, [
                        _vm._v("Suspend Account")
                      ]),
                      _vm._v(" "),
                      _vm._m(4)
                    ]
                  )
                ])
              : _vm._e()
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.modal == "true"
      ? _c("div", [
          _c(
            "span",
            {
              attrs: {
                "data-toggle": "modal",
                "data-target": "#mt_pid_" + _vm.status.id
              }
            },
            [
              _c("span", {
                class: [
                  _vm.size == "lg"
                    ? "fas fa-ellipsis-v fa-lg text-muted"
                    : "fas fa-ellipsis-v fa-sm text-lighter"
                ]
              })
            ]
          ),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass: "modal",
              attrs: {
                tabindex: "-1",
                role: "dialog",
                id: "mt_pid_" + _vm.status.id
              }
            },
            [
              _c(
                "div",
                {
                  staticClass: "modal-dialog modal-sm",
                  attrs: { role: "document" }
                },
                [
                  _c("div", { staticClass: "modal-content" }, [
                    _c("div", { staticClass: "modal-body text-center" }, [
                      _c("div", { staticClass: "list-group text-dark" }, [
                        _c(
                          "a",
                          {
                            staticClass:
                              "list-group-item text-dark text-decoration-none",
                            attrs: { href: _vm.status.url }
                          },
                          [_vm._v("Ir para o post")]
                        ),
                        _vm._v(" "),
                        _c(
                          "a",
                          {
                            staticClass:
                              "list-group-item text-dark text-decoration-none",
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.hidePost(_vm.status)
                              }
                            }
                          },
                          [_vm._v("Ocultar")]
                        ),
                        _vm._v(" "),
                        _vm.activeSession == true &&
                        !_vm.statusOwner(_vm.status)
                          ? _c(
                              "a",
                              {
                                staticClass:
                                  "list-group-item text-danger font-weight-bold text-decoration-none",
                                attrs: { href: _vm.reportUrl(_vm.status) }
                              },
                              [_vm._v("Reportar")]
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        (_vm.activeSession == true &&
                          _vm.statusOwner(_vm.status) == true) ||
                        _vm.profile.is_admin == true
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "list-group-item text-danger font-weight-bold cursor-pointer",
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.deletePost($event)
                                  }
                                }
                              },
                              [_vm._v("Apagar")]
                            )
                          : _vm._e()
                      ])
                    ])
                  ])
                ]
              )
            ]
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-0  small text-muted" }, [
      _vm._v("Adds a CW to every post "),
      _c("br"),
      _vm._v(" made by this account.")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-0 small text-muted" }, [
      _vm._v("Do not transform mentions, "),
      _c("br"),
      _vm._v(" hashtags or urls into HTML.")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-0 small text-muted" }, [
      _vm._v("Removes account from "),
      _c("br"),
      _vm._v(" public/network timelines.")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-0 small text-muted" }, [
      _vm._v("Temporarily disable account "),
      _c("br"),
      _vm._v(" until next time user log in.")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-0 small text-muted" }, [
      _vm._v("This prevents any new interactions, "),
      _c("br"),
      _vm._v(" without deleting existing data.")
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************************/
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
    _vm.show
      ? _c(
          "div",
          {
            staticClass: "card card-body p-0 border mt-md-4 mb-md-3 shadow-none"
          },
          [
            _c("div", {
              class: [
                _vm.list == true ? "mt-1 mr-3 mb-0 ml-1" : "mx-3 mt-3 mb-0 pb-0"
              ],
              attrs: { id: "storyContainer" }
            })
          ]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=template&id=40ef44f8&scoped=true&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Timeline.vue?vue&type=template&id=40ef44f8&scoped=true& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
    _vm.currentLayout === "feed"
      ? _c("div", { staticClass: "container" }, [
          _c("div", { staticClass: "row" }, [
            _vm.morePostsAvailable == true
              ? _c("div", { staticClass: "col-12 mt-5 pt-3 mb-3 fixed-top" }, [
                  _c("p", { staticClass: "text-center" }, [
                    _c(
                      "button",
                      {
                        staticClass:
                          "btn btn-dark px-4 rounded-pill font-weight-bold shadow",
                        on: { click: _vm.syncNewPosts }
                      },
                      [_vm._v("Carregar novos posts")]
                    )
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("div", { staticClass: "d-none col-12 pl-3 pl-md-0 pt-3 pl-0" }, [
              _c(
                "div",
                {
                  staticClass:
                    "d-none d-md-flex justify-content-between align-items-center"
                },
                [
                  _c("p", { staticClass: "lead text-muted mb-0" }, [
                    _c("i", {
                      class: [
                        _vm.scope == "home" ? "fas fa-home" : "fas fa-stream"
                      ]
                    }),
                    _vm._v(
                      "   " +
                        _vm._s(_vm.scope == "local" ? "Public" : "Home") +
                        " Timeline"
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", { staticClass: "mb-0" }, [
                    _c("span", { staticClass: "btn-group" }, [
                      _c(
                        "a",
                        {
                          class: [
                            _vm.layout == "feed"
                              ? "btn btn-sm btn-outline-primary font-weight-bold text-decoration-none"
                              : "btn btn-sm btn-outline-lighter font-weight-light text-decoration-none"
                          ],
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.switchFeedLayout("feed")
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-list" })]
                      ),
                      _vm._v(" "),
                      _c(
                        "a",
                        {
                          class: [
                            _vm.layout !== "feed"
                              ? "btn btn-sm btn-outline-primary font-weight-bold text-decoration-none"
                              : "btn btn-sm btn-outline-lighter font-weight-light text-decoration-none"
                          ],
                          attrs: { href: "#" },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.switchFeedLayout("grid")
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-th" })]
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _vm._m(0)
                ]
              ),
              _vm._v(" "),
              _c("hr")
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "col-md-8 col-lg-8 px-0 mb-sm-3 timeline order-2 order-md-1"
              },
              [
                _c(
                  "div",
                  { staticStyle: { "margin-top": "-2px" } },
                  [
                    _vm.config.features.stories
                      ? _c("story-component")
                      : _vm._e()
                  ],
                  1
                ),
                _vm._v(" "),
                _c(
                  "div",
                  [
                    _vm.loading
                      ? _c(
                          "div",
                          {
                            staticClass: "text-center",
                            staticStyle: { "padding-top": "10px" }
                          },
                          [_vm._m(1)]
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm._l(_vm.feed, function(status, index) {
                      return _c(
                        "div",
                        {
                          key: index + "-" + status.id,
                          attrs: { "data-status-id": status.id }
                        },
                        [
                          index == 0 && _vm.showTips && !_vm.loading
                            ? _c(
                                "div",
                                { staticClass: "my-4 card-tips" },
                                [
                                  _c("announcements-card", {
                                    on: {
                                      "show-tips": function($event) {
                                        _vm.showTips = $event
                                      }
                                    }
                                  })
                                ],
                                1
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          index == 2 &&
                          _vm.showSuggestions == true &&
                          _vm.suggestions.length
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "card mb-sm-4 status-card card-md-rounded-0 shadow-none border"
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "card-header d-flex align-items-center justify-content-between bg-white border-0 pb-0"
                                    },
                                    [
                                      _c(
                                        "h6",
                                        {
                                          staticClass:
                                            "text-muted font-weight-bold mb-0"
                                        },
                                        [_vm._v("Sugestões")]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "cursor-pointer text-muted",
                                          on: { click: _vm.hideSuggestions }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-times"
                                          })
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "card-body row mx-0" },
                                    _vm._l(_vm.suggestions, function(
                                      rec,
                                      index
                                    ) {
                                      return _c(
                                        "div",
                                        { staticClass: "col-12 col-md-4 mb-3" },
                                        [
                                          _c("div", { staticClass: "card" }, [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "card-body text-center pt-3"
                                              },
                                              [
                                                _c(
                                                  "p",
                                                  { staticClass: "mb-0" },
                                                  [
                                                    _c(
                                                      "a",
                                                      {
                                                        attrs: {
                                                          href:
                                                            "/" + rec.username
                                                        }
                                                      },
                                                      [
                                                        _c("img", {
                                                          staticClass:
                                                            "img-fluid rounded-circle cursor-pointer",
                                                          attrs: {
                                                            src: rec.avatar,
                                                            width: "45px",
                                                            height: "45px",
                                                            onerror:
                                                              "this.onerror=null;this.src='/storage/avatars/default.png?v=2'",
                                                            alt: "avatar"
                                                          }
                                                        })
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "div",
                                                  { staticClass: "py-3" },
                                                  [
                                                    _c(
                                                      "p",
                                                      {
                                                        staticClass:
                                                          "font-weight-bold text-dark cursor-pointer mb-0"
                                                      },
                                                      [
                                                        _c(
                                                          "a",
                                                          {
                                                            staticClass:
                                                              "text-decoration-none text-dark",
                                                            attrs: {
                                                              href:
                                                                "/" +
                                                                rec.username
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                                _vm._s(
                                                                  rec.username
                                                                ) +
                                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                            )
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "p",
                                                      {
                                                        staticClass:
                                                          "small text-muted mb-0"
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(rec.message)
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "p",
                                                  { staticClass: "mb-0" },
                                                  [
                                                    _c(
                                                      "a",
                                                      {
                                                        staticClass:
                                                          "btn btn-primary btn-block font-weight-bold py-0",
                                                        attrs: { href: "#" },
                                                        on: {
                                                          click: function(
                                                            $event
                                                          ) {
                                                            $event.preventDefault()
                                                            return _vm.expRecFollow(
                                                              rec.id,
                                                              index
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [_vm._v("Seguir")]
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          ])
                                        ]
                                      )
                                    }),
                                    0
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          index == 4 &&
                          _vm.showHashtagPosts &&
                          _vm.hashtagPosts.length
                            ? _c(
                                "div",
                                {
                                  staticClass:
                                    "card mb-sm-4 status-card card-md-rounded-0 shadow-none border"
                                },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "card-header d-flex align-items-center justify-content-between bg-white border-0 pb-0"
                                    },
                                    [
                                      _c("span"),
                                      _vm._v(" "),
                                      _c(
                                        "h6",
                                        {
                                          staticClass:
                                            "text-muted font-weight-bold mb-0"
                                        },
                                        [
                                          _c(
                                            "a",
                                            {
                                              attrs: {
                                                href:
                                                  "/discover/tags/" +
                                                  _vm.hashtagPostsName +
                                                  "?src=tr"
                                              }
                                            },
                                            [
                                              _vm._v(
                                                "#" +
                                                  _vm._s(_vm.hashtagPostsName)
                                              )
                                            ]
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "cursor-pointer text-muted",
                                          on: {
                                            click: function($event) {
                                              _vm.showHashtagPosts = false
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass: "fas fa-times"
                                          })
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "card-body row mx-0" },
                                    _vm._l(_vm.hashtagPosts, function(
                                      tag,
                                      index
                                    ) {
                                      return _c(
                                        "div",
                                        {
                                          staticClass:
                                            "col-4 p-0 p-sm-2 p-md-3 hashtag-post-square"
                                        },
                                        [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "card info-overlay card-md-border-0",
                                              attrs: { href: tag.status.url }
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  class: [
                                                    tag.status.filter
                                                      ? "square " +
                                                        tag.status.filter
                                                      : "square"
                                                  ]
                                                },
                                                [
                                                  tag.status.sensitive
                                                    ? _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "square-content"
                                                        },
                                                        [
                                                          _vm._m(2, true),
                                                          _vm._v(" "),
                                                          _c(
                                                            "blur-hash-canvas",
                                                            {
                                                              attrs: {
                                                                width: "32",
                                                                height: "32",
                                                                hash:
                                                                  tag.status
                                                                    .media_attachments[0]
                                                                    .blurhash
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    : _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "square-content"
                                                        },
                                                        [
                                                          _c(
                                                            "blur-hash-image",
                                                            {
                                                              attrs: {
                                                                width: "32",
                                                                height: "32",
                                                                hash:
                                                                  tag.status
                                                                    .media_attachments[0]
                                                                    .blurhash,
                                                                src:
                                                                  tag.status
                                                                    .media_attachments[0]
                                                                    .preview_url
                                                              }
                                                            }
                                                          )
                                                        ],
                                                        1
                                                      ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "div",
                                                    {
                                                      staticClass:
                                                        "info-overlay-text"
                                                    },
                                                    [
                                                      _c(
                                                        "h5",
                                                        {
                                                          staticClass:
                                                            "text-white m-auto font-weight-bold"
                                                        },
                                                        [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "pr-4"
                                                            },
                                                            [
                                                              _c("span", {
                                                                staticClass:
                                                                  "far fa-heart fa-lg pr-1"
                                                              }),
                                                              _vm._v(
                                                                " " +
                                                                  _vm._s(
                                                                    _vm.formatCount(
                                                                      tag.status
                                                                        .favourites_count
                                                                    )
                                                                  ) +
                                                                  "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                              )
                                                            ]
                                                          ),
                                                          _vm._v(" "),
                                                          _c("span", [
                                                            _c("span", {
                                                              staticClass:
                                                                "far fa-comment fa-lg pr-1"
                                                            }),
                                                            _vm._v(
                                                              " " +
                                                                _vm._s(
                                                                  _vm.formatCount(
                                                                    tag.status
                                                                      .reply_count
                                                                  )
                                                                ) +
                                                                "\n\t\t\t\t\t\t\t\t\t\t\t\t\t"
                                                            )
                                                          ])
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
                                    }),
                                    0
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              class:
                                index == 0
                                  ? "card mb-sm-4 status-card card-md-rounded-0 shadow-none border mt-md-4"
                                  : "card mb-sm-4 status-card card-md-rounded-0 shadow-none border"
                            },
                            [
                              status
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "card-header d-inline-flex align-items-center bg-white"
                                    },
                                    [
                                      _c("div", [
                                        _c("img", {
                                          staticClass:
                                            "rounded-circle box-shadow",
                                          attrs: {
                                            src: status.account.avatar,
                                            width: "32px",
                                            height: "32px",
                                            onerror:
                                              "this.onerror=null;this.src='/storage/avatars/default.png?v=2'",
                                            alt: "avatar"
                                          }
                                        })
                                      ]),
                                      _vm._v(" "),
                                      _c("div", { staticClass: "pl-2" }, [
                                        _c(
                                          "a",
                                          {
                                            staticClass:
                                              "username font-weight-bold text-dark text-decoration-none",
                                            attrs: {
                                              href: _vm.profileUrl(status)
                                            },
                                            domProps: {
                                              innerHTML: _vm._s(
                                                _vm.statusCardUsernameFormat(
                                                  status
                                                )
                                              )
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n\t\t\t\t\t\t\t\t\t\t\tCarregando...\n\t\t\t\t\t\t\t\t\t\t"
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        status.account.is_admin
                                          ? _c(
                                              "span",
                                              {
                                                staticClass: "fa-stack",
                                                staticStyle: {
                                                  height: "1em",
                                                  "line-height": "1em",
                                                  "max-width": "19px"
                                                },
                                                attrs: {
                                                  title: "Admin Account",
                                                  "data-toggle": "tooltip"
                                                }
                                              },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-certificate text-danger fa-stack-1x"
                                                }),
                                                _vm._v(" "),
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-crown text-white fa-sm fa-stack-1x",
                                                  staticStyle: {
                                                    "font-size": "7px"
                                                  }
                                                })
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "d-flex align-items-center"
                                          },
                                          [
                                            status.place
                                              ? _c(
                                                  "a",
                                                  {
                                                    staticClass:
                                                      "small text-decoration-none text-muted",
                                                    attrs: {
                                                      href:
                                                        "/discover/places/" +
                                                        status.place.id +
                                                        "/" +
                                                        status.place.slug,
                                                      title: "Location",
                                                      "data-toggle": "tooltip"
                                                    }
                                                  },
                                                  [
                                                    _c("i", {
                                                      staticClass:
                                                        "fas fa-map-marked-alt"
                                                    }),
                                                    _vm._v(
                                                      " " +
                                                        _vm._s(
                                                          status.place.name
                                                        ) +
                                                        ", " +
                                                        _vm._s(
                                                          status.place.country
                                                        )
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
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
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                { staticClass: "sr-only" },
                                                [_vm._v("Post Menu")]
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass: "postPresenterContainer",
                                  staticStyle: { background: "#000" }
                                },
                                [
                                  _vm.config.ab.top && status.pf_type === "text"
                                    ? _c("div", { staticClass: "w-100" }, [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "w-100 card-img-top border-bottom rounded-0",
                                            staticStyle: {
                                              "background-image":
                                                "url(/storage/textimg/bg_1.jpg)",
                                              "background-size": "cover",
                                              width: "100%",
                                              height: "540px"
                                            }
                                          },
                                          [
                                            _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "w-100 h-100 d-flex justify-content-center align-items-center"
                                              },
                                              [
                                                _c("p", {
                                                  staticClass:
                                                    "text-center text-break h3 px-5 font-weight-bold",
                                                  domProps: {
                                                    innerHTML: _vm._s(
                                                      status.content
                                                    )
                                                  }
                                                })
                                              ]
                                            )
                                          ]
                                        )
                                      ])
                                    : status.pf_type === "photo"
                                    ? _c(
                                        "div",
                                        { staticClass: "w-100" },
                                        [
                                          _c("photo-presenter", {
                                            attrs: { status: status },
                                            on: {
                                              lightbox: _vm.lightbox,
                                              togglecw: function($event) {
                                                status.sensitive = false
                                              }
                                            }
                                          })
                                        ],
                                        1
                                      )
                                    : status.pf_type === "video"
                                    ? _c(
                                        "div",
                                        { staticClass: "w-100" },
                                        [
                                          _c("video-presenter", {
                                            attrs: { status: status }
                                          })
                                        ],
                                        1
                                      )
                                    : status.pf_type === "photo:album"
                                    ? _c(
                                        "div",
                                        { staticClass: "w-100" },
                                        [
                                          _c("photo-album-presenter", {
                                            attrs: { status: status },
                                            on: { lightbox: _vm.lightbox }
                                          })
                                        ],
                                        1
                                      )
                                    : status.pf_type === "video:album"
                                    ? _c(
                                        "div",
                                        { staticClass: "w-100" },
                                        [
                                          _c("video-album-presenter", {
                                            attrs: { status: status }
                                          })
                                        ],
                                        1
                                      )
                                    : status.pf_type === "photo:video:album"
                                    ? _c(
                                        "div",
                                        { staticClass: "w-100" },
                                        [
                                          _c("mixed-album-presenter", {
                                            attrs: { status: status },
                                            on: { lightbox: _vm.lightbox }
                                          })
                                        ],
                                        1
                                      )
                                    : _c("div", { staticClass: "w-100" }, [
                                        _c(
                                          "p",
                                          {
                                            staticClass:
                                              "text-center p-0 font-weight-bold text-white"
                                          },
                                          [
                                            _vm._v(
                                              "Erro ao carregar pré visualização."
                                            )
                                          ]
                                        )
                                      ])
                                ]
                              ),
                              _vm._v(" "),
                              _vm.config.features.label.covid.enabled &&
                              status.label &&
                              status.label.covid == true
                                ? _c(
                                    "div",
                                    {
                                      staticClass:
                                        "card-body border-top border-bottom py-2 cursor-pointer pr-2",
                                      on: {
                                        click: function($event) {
                                          return _vm.labelRedirect()
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "p",
                                        {
                                          staticClass:
                                            "font-weight-bold d-flex justify-content-between align-items-center mb-0"
                                        },
                                        [
                                          _c("span", [
                                            _c("i", {
                                              staticClass:
                                                "fas fa-info-circle mr-2"
                                            }),
                                            _vm._v(
                                              "\n\t\t\t\t\t\t\t\t\tFor information about COVID-19, " +
                                                _vm._s(
                                                  _vm.config.features.label
                                                    .covid.org
                                                ) +
                                                "\n\t\t\t\t\t\t\t\t"
                                            )
                                          ]),
                                          _vm._v(" "),
                                          _vm._m(3, true)
                                        ]
                                      )
                                    ]
                                  )
                                : _vm._e(),
                              _vm._v(" "),
                              _c("div", { staticClass: "card-body" }, [
                                _c(
                                  "div",
                                  { staticClass: "reactions my-1 pb-2" },
                                  [
                                    status.favourited
                                      ? _c("h3", {
                                          staticClass:
                                            "fas fa-heart text-danger pr-3 m-0 cursor-pointer",
                                          attrs: { title: "Like" },
                                          on: {
                                            click: function($event) {
                                              return _vm.likeStatus(
                                                status,
                                                $event
                                              )
                                            }
                                          }
                                        })
                                      : _c("h3", {
                                          staticClass:
                                            "far fa-heart pr-3 m-0 like-btn text-dark cursor-pointer",
                                          attrs: { title: "Like" },
                                          on: {
                                            click: function($event) {
                                              return _vm.likeStatus(
                                                status,
                                                $event
                                              )
                                            }
                                          }
                                        }),
                                    _vm._v(" "),
                                    !status.comments_disabled
                                      ? _c("h3", {
                                          staticClass:
                                            "far fa-comment text-dark pr-3 m-0 cursor-pointer",
                                          attrs: { title: "Comment" },
                                          on: {
                                            click: function($event) {
                                              return _vm.commentFocus(
                                                status,
                                                $event
                                              )
                                            }
                                          }
                                        })
                                      : _vm._e(),
                                    _vm._v(" "),
                                    status.taggedPeople.length
                                      ? _c(
                                          "span",
                                          { staticClass: "float-right" },
                                          [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "font-weight-light small",
                                                staticStyle: {
                                                  color: "#718096"
                                                }
                                              },
                                              [
                                                _c("i", {
                                                  staticClass: "far fa-user",
                                                  attrs: {
                                                    "data-toggle": "tooltip",
                                                    title: "Tagged People"
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _vm._l(
                                                  status.taggedPeople,
                                                  function(tag, index) {
                                                    return _c(
                                                      "span",
                                                      { staticClass: "mr-n2" },
                                                      [
                                                        _c(
                                                          "a",
                                                          {
                                                            attrs: {
                                                              href:
                                                                "/" +
                                                                tag.username
                                                            }
                                                          },
                                                          [
                                                            _c("img", {
                                                              staticClass:
                                                                "border rounded-circle",
                                                              attrs: {
                                                                src: tag.avatar,
                                                                width: "20px",
                                                                height: "20px",
                                                                "data-toggle":
                                                                  "tooltip",
                                                                title:
                                                                  "@" +
                                                                  tag.username,
                                                                alt: "Avatar"
                                                              }
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    )
                                                  }
                                                )
                                              ],
                                              2
                                            )
                                          ]
                                        )
                                      : _vm._e()
                                  ]
                                ),
                                _vm._v(" "),
                                _vm.expLc(status) == true
                                  ? _c(
                                      "div",
                                      { staticClass: "likes font-weight-bold" },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "like-count" },
                                          [
                                            _vm._v(
                                              _vm._s(status.favourites_count)
                                            )
                                          ]
                                        ),
                                        _vm._v(
                                          " " +
                                            _vm._s(
                                              status.favourites_count == 1
                                                ? "like"
                                                : "likes"
                                            ) +
                                            "\n\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                status.pf_type != "text"
                                  ? _c("div", { staticClass: "caption" }, [
                                      !status.sensitive
                                        ? _c(
                                            "p",
                                            {
                                              staticClass: "mb-2 read-more",
                                              staticStyle: {
                                                overflow: "hidden"
                                              }
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
                                                      "a",
                                                      {
                                                        staticClass:
                                                          "text-dark",
                                                        attrs: {
                                                          href: _vm.profileUrl(
                                                            status
                                                          )
                                                        }
                                                      },
                                                      [
                                                        _vm._v(
                                                          _vm._s(
                                                            status.account
                                                              .username
                                                          )
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
                                                  innerHTML: _vm._s(
                                                    status.content
                                                  )
                                                }
                                              })
                                            ]
                                          )
                                        : _vm._e()
                                    ])
                                  : _vm._e(),
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
                                          attrs: { href: _vm.statusUrl(status) }
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
                                              datetime: status.created_at,
                                              "auto-update": 60,
                                              "converter-options": {
                                                includeSeconds: true
                                              },
                                              title: _vm.timestampFormat(
                                                status.created_at
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
                    !_vm.loading && _vm.feed.length
                      ? _c("div", [
                          _c("div", { staticClass: "card shadow-none" }, [
                            _c(
                              "div",
                              { staticClass: "card-body" },
                              [
                                _c(
                                  "infinite-loading",
                                  {
                                    attrs: { distance: 800 },
                                    on: { infinite: _vm.infiniteTimeline }
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        staticClass: "font-weight-bold",
                                        attrs: { slot: "no-more" },
                                        slot: "no-more"
                                      },
                                      [_vm._v("Sem novos posts para exibir")]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass: "font-weight-bold",
                                        attrs: { slot: "no-results" },
                                        slot: "no-results"
                                      },
                                      [_vm._v("Sem novos posts para exibir")]
                                    )
                                  ]
                                )
                              ],
                              1
                            )
                          ])
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    !_vm.loading && _vm.scope == "home" && _vm.feed.length == 0
                      ? _c("div", [
                          _c(
                            "div",
                            { staticClass: "card shadow-none border" },
                            [
                              _c(
                                "div",
                                { staticClass: "card-body text-center" },
                                [
                                  _c(
                                    "p",
                                    {
                                      staticClass: "h2 font-weight-lighter p-5"
                                    },
                                    [_vm._v("Oi, " + _vm._s(_vm.profile.acct))]
                                  ),
                                  _vm._v(" "),
                                  _vm._m(4),
                                  _vm._v(" "),
                                  _c(
                                    "p",
                                    {
                                      staticClass: "h3 font-weight-lighter p-5"
                                    },
                                    [
                                      _vm._v(
                                        "Siga novas pessoas para a sua timeline."
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm._m(5)
                                ]
                              )
                            ]
                          )
                        ])
                      : _vm._e()
                  ],
                  2
                )
              ]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "col-md-4 col-lg-4 my-4 order-1 order-md-2 d-none d-md-block"
              },
              [
                _c("div", [
                  _c("div", { staticClass: "mb-4" }, [
                    _c(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !_vm.loading,
                            expression: "!loading"
                          }
                        ]
                      },
                      [
                        _c("div", { staticClass: "pb-2" }, [
                          _c(
                            "div",
                            { staticClass: "media d-flex align-items-center" },
                            [
                              _c(
                                "a",
                                {
                                  staticClass: "mr-3",
                                  attrs: {
                                    href: !_vm.userStory
                                      ? _vm.profile.url
                                      : "/stories/" + _vm.profile.acct
                                  }
                                },
                                [
                                  _vm.userStory
                                    ? _c(
                                        "div",
                                        {
                                          staticClass:
                                            "has-story cursor-pointer shadow-sm",
                                          on: {
                                            click: function($event) {
                                              return _vm.storyRedirect()
                                            }
                                          }
                                        },
                                        [
                                          _c("img", {
                                            staticClass:
                                              "rounded-circle box-shadow",
                                            attrs: {
                                              src: _vm.profile.avatar,
                                              width: "64px",
                                              height: "64px",
                                              onerror:
                                                "this.onerror=null;this.src='/storage/avatars/default.png?v=2'",
                                              alt: "avatar"
                                            }
                                          })
                                        ]
                                      )
                                    : _c("div", [
                                        _c("img", {
                                          staticClass:
                                            "rounded-circle box-shadow",
                                          attrs: {
                                            src: _vm.profile.avatar,
                                            width: "64px",
                                            height: "64px",
                                            onerror:
                                              "this.onerror=null;this.src='/storage/avatars/default.png?v=2'",
                                            alt: "avatar"
                                          }
                                        })
                                      ])
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "media-body d-flex justify-content-between word-break"
                                },
                                [
                                  _c("div", [
                                    _c(
                                      "p",
                                      {
                                        staticClass:
                                          "mb-0 px-0 font-weight-bold"
                                      },
                                      [
                                        _c(
                                          "a",
                                          {
                                            staticClass: "text-dark",
                                            attrs: { href: _vm.profile.url }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.profile.username ||
                                                  "loading..."
                                              )
                                            )
                                          ]
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "p",
                                      { staticClass: "my-0 text-muted pb-0" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.profile.display_name ||
                                              "loading..."
                                          )
                                        )
                                      ]
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm._m(6)
                                ]
                              )
                            ]
                          )
                        ])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.modes.notify == true && !_vm.loading,
                          expression: "modes.notify == true && !loading"
                        }
                      ],
                      staticClass: "mb-4"
                    },
                    [_c("notification-card")],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value:
                            _vm.showSuggestions == true &&
                            _vm.suggestions.length &&
                            _vm.config.ab &&
                            _vm.config.ab.rec == true,
                          expression:
                            "showSuggestions == true && suggestions.length && config.ab && config.ab.rec == true"
                        }
                      ],
                      staticClass: "mb-4"
                    },
                    [
                      _c("div", { staticClass: "card shadow-none border" }, [
                        _c(
                          "div",
                          {
                            staticClass:
                              "card-header bg-white d-flex align-items-center justify-content-between"
                          },
                          [
                            _c(
                              "a",
                              {
                                ref: "suggestionRefresh",
                                staticClass: "small text-muted cursor-pointer",
                                attrs: { href: "#" },
                                on: {
                                  click: function($event) {
                                    $event.preventDefault()
                                    return _vm.refreshSuggestions($event)
                                  }
                                }
                              },
                              [_c("i", { staticClass: "fas fa-sync-alt" })]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass:
                                  "small text-dark text-uppercase font-weight-bold"
                              },
                              [_vm._v("Sugestões")]
                            ),
                            _vm._v(" "),
                            _c(
                              "div",
                              {
                                staticClass: "small text-muted cursor-pointer",
                                on: { click: _vm.hideSuggestions }
                              },
                              [_c("i", { staticClass: "fas fa-times" })]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          { staticClass: "card-body pt-0" },
                          _vm._l(_vm.suggestions, function(rec, index) {
                            return _c(
                              "div",
                              { staticClass: "media align-items-center mt-3" },
                              [
                                _c(
                                  "a",
                                  { attrs: { href: "/" + rec.username } },
                                  [
                                    _c("img", {
                                      staticClass: "rounded-circle mr-3",
                                      attrs: {
                                        src: rec.avatar,
                                        width: "32px",
                                        height: "32px",
                                        onerror:
                                          "this.onerror=null;this.src='/storage/avatars/default.png?v=2'",
                                        alt: "avatar"
                                      }
                                    })
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "media-body" }, [
                                  _c(
                                    "p",
                                    {
                                      staticClass: "mb-0 font-weight-bold small"
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          staticClass:
                                            "text-decoration-none text-dark",
                                          attrs: { href: "/" + rec.username }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\t\t\t\t" +
                                              _vm._s(rec.username) +
                                              "\n\t\t\t\t\t\t\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "p",
                                    { staticClass: "mb-0 small text-muted" },
                                    [_vm._v(_vm._s(rec.message))]
                                  )
                                ]),
                                _vm._v(" "),
                                _c(
                                  "a",
                                  {
                                    staticClass: "font-weight-bold small",
                                    attrs: { href: "#" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.expRecFollow(rec.id, index)
                                      }
                                    }
                                  },
                                  [_vm._v("Seguir")]
                                )
                              ]
                            )
                          }),
                          0
                        )
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _vm._m(7)
                ])
              ]
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.currentLayout === "comments"
      ? _c("div", { staticClass: "container p-0 overflow-hidden" }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-12 col-md-6 offset-md-3" }, [
              _c(
                "div",
                {
                  staticClass: "card shadow-none border",
                  staticStyle: { height: "100vh" }
                },
                [
                  _c(
                    "div",
                    {
                      staticClass:
                        "card-header d-flex justify-content-between align-items-center"
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass: "cursor-pointer",
                          on: {
                            click: function($event) {
                              return _vm.commentNavigateBack(_vm.status.id)
                            }
                          }
                        },
                        [
                          _c("i", {
                            staticClass: "fas fa-chevron-left fa-lg px-2"
                          })
                        ]
                      ),
                      _vm._v(" "),
                      _vm._m(8),
                      _vm._v(" "),
                      _vm._m(9)
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "card-body",
                      staticStyle: { "overflow-y": "auto !important" }
                    },
                    [
                      _c("div", { staticClass: "media" }, [
                        _c("img", {
                          staticClass: "rounded-circle border mr-3",
                          attrs: {
                            src: _vm.status.account.avatar,
                            width: "32px",
                            height: "32px"
                          }
                        }),
                        _vm._v(" "),
                        _c("div", { staticClass: "media-body" }, [
                          _c(
                            "p",
                            {
                              staticClass:
                                "d-flex justify-content-between align-items-top mb-0",
                              staticStyle: { "overflow-y": "hidden" }
                            },
                            [
                              _c(
                                "span",
                                {
                                  staticClass: "mr-2",
                                  staticStyle: { "font-size": "13px" }
                                },
                                [
                                  _c(
                                    "a",
                                    {
                                      staticClass:
                                        "text-dark font-weight-bold mr-1 text-break",
                                      attrs: {
                                        href: _vm.status.account.url,
                                        title: _vm.status.account.username
                                      }
                                    },
                                    [
                                      _vm._v(
                                        _vm._s(
                                          _vm.trimCaption(
                                            _vm.status.account.username,
                                            15
                                          )
                                        )
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c("span", {
                                    staticClass: "text-break comment-body",
                                    staticStyle: { "word-break": "break-all" },
                                    domProps: {
                                      innerHTML: _vm._s(_vm.status.content)
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c("hr"),
                      _vm._v(" "),
                      _vm._m(10),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "postCommentsContainer d-none" },
                        [
                          _vm.replies.length
                            ? _c(
                                "p",
                                {
                                  staticClass:
                                    "mb-1 text-center load-more-link my-4"
                                },
                                [
                                  _c(
                                    "a",
                                    {
                                      staticClass: "text-dark",
                                      attrs: {
                                        href: "#",
                                        title: "Load more comments"
                                      },
                                      on: {
                                        click: function($event) {
                                          $event.preventDefault()
                                          return _vm.loadMoreComments($event)
                                        }
                                      }
                                    },
                                    [
                                      _c(
                                        "svg",
                                        {
                                          staticClass: "bi bi-plus-circle",
                                          staticStyle: { "font-size": "2em" },
                                          attrs: {
                                            width: "1em",
                                            height: "1em",
                                            viewBox: "0 0 16 16",
                                            fill: "currentColor",
                                            xmlns: "http://www.w3.org/2000/svg"
                                          }
                                        },
                                        [
                                          _c("path", {
                                            attrs: {
                                              "fill-rule": "evenodd",
                                              d:
                                                "M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z",
                                              "clip-rule": "evenodd"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("path", {
                                            attrs: {
                                              "fill-rule": "evenodd",
                                              d:
                                                "M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z",
                                              "clip-rule": "evenodd"
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c("path", {
                                            attrs: {
                                              "fill-rule": "evenodd",
                                              d:
                                                "M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z",
                                              "clip-rule": "evenodd"
                                            }
                                          })
                                        ]
                                      )
                                    ]
                                  )
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _vm._l(_vm.replies, function(reply, index) {
                            return _c(
                              "div",
                              {
                                key: "tl" + reply.id + "_" + index,
                                staticClass: "pb-3 media"
                              },
                              [
                                _c("img", {
                                  staticClass: "rounded-circle border mr-3",
                                  attrs: {
                                    src: reply.account.avatar,
                                    width: "32px",
                                    height: "32px"
                                  }
                                }),
                                _vm._v(" "),
                                _c("div", { staticClass: "media-body" }, [
                                  reply.sensitive == true
                                    ? _c("div", [
                                        _c("span", { staticClass: "py-3" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "text-dark font-weight-bold mr-3",
                                              staticStyle: {
                                                "font-size": "13px"
                                              },
                                              attrs: {
                                                href: reply.account.url,
                                                title: reply.account.username
                                              }
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.trimCaption(
                                                    reply.account.username,
                                                    15
                                                  )
                                                )
                                              )
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass: "text-break",
                                              staticStyle: {
                                                "font-size": "13px"
                                              }
                                            },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "font-italic text-muted"
                                                },
                                                [
                                                  _vm._v(
                                                    "This comment may contain sensitive material"
                                                  )
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-primary cursor-pointer pl-1",
                                                  on: {
                                                    click: function($event) {
                                                      reply.sensitive = false
                                                    }
                                                  }
                                                },
                                                [_vm._v("Show")]
                                              )
                                            ]
                                          )
                                        ])
                                      ])
                                    : _c("div", [
                                        _c(
                                          "p",
                                          {
                                            staticClass:
                                              "d-flex justify-content-between align-items-top read-more mb-0",
                                            staticStyle: {
                                              "overflow-y": "hidden"
                                            }
                                          },
                                          [
                                            _c(
                                              "span",
                                              {
                                                staticClass: "mr-3",
                                                staticStyle: {
                                                  "font-size": "13px"
                                                }
                                              },
                                              [
                                                _c(
                                                  "a",
                                                  {
                                                    staticClass:
                                                      "text-dark font-weight-bold mr-1 text-break",
                                                    attrs: {
                                                      href: reply.account.url,
                                                      title:
                                                        reply.account.username
                                                    }
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.trimCaption(
                                                          reply.account
                                                            .username,
                                                          15
                                                        )
                                                      )
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c("span", {
                                                  staticClass:
                                                    "text-break comment-body",
                                                  staticStyle: {
                                                    "word-break": "break-all"
                                                  },
                                                  domProps: {
                                                    innerHTML: _vm._s(
                                                      reply.content
                                                    )
                                                  }
                                                })
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "span",
                                              {
                                                staticClass: "text-right",
                                                staticStyle: {
                                                  "min-width": "30px"
                                                }
                                              },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.likeReply(
                                                          reply,
                                                          $event
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c("i", {
                                                      class: [
                                                        reply.favourited
                                                          ? "fas fa-heart fa-sm text-danger"
                                                          : "far fa-heart fa-sm text-lighter"
                                                      ]
                                                    })
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "pl-2 text-lighter cursor-pointer",
                                                    on: {
                                                      click: function($event) {
                                                        return _vm.ctxMenu(
                                                          reply
                                                        )
                                                      }
                                                    }
                                                  },
                                                  [
                                                    _c("span", {
                                                      staticClass:
                                                        "fas fa-ellipsis-v text-lighter"
                                                    })
                                                  ]
                                                )
                                              ]
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c("p", { staticClass: "mb-0" }, [
                                          _vm._o(
                                            _c("a", {
                                              staticClass:
                                                "text-muted mr-3 text-decoration-none small",
                                              staticStyle: { width: "20px" },
                                              attrs: { href: reply.url },
                                              domProps: {
                                                textContent: _vm._s(
                                                  _vm.timeAgo(reply.created_at)
                                                )
                                              }
                                            }),
                                            0,
                                            "tl" + reply.id + "_" + index
                                          ),
                                          _vm._v(" "),
                                          reply.favourites_count
                                            ? _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "text-muted comment-reaction font-weight-bold mr-3 small"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      reply.favourites_count ==
                                                        1
                                                        ? "1 like"
                                                        : reply.favourites_count +
                                                            " likes"
                                                    )
                                                  )
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "small text-muted comment-reaction font-weight-bold cursor-pointer",
                                              on: {
                                                click: function($event) {
                                                  return _vm.replyFocus(
                                                    reply,
                                                    index,
                                                    true
                                                  )
                                                }
                                              }
                                            },
                                            [_vm._v("Reply")]
                                          )
                                        ]),
                                        _vm._v(" "),
                                        reply.reply_count > 0
                                          ? _c(
                                              "div",
                                              {
                                                staticClass:
                                                  "cursor-pointer pb-2",
                                                on: {
                                                  click: function($event) {
                                                    return _vm.toggleReplies(
                                                      reply
                                                    )
                                                  }
                                                }
                                              },
                                              [
                                                _c("span", {
                                                  staticClass: "show-reply-bar"
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "comment-reaction small font-weight-bold"
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        reply.thread
                                                          ? "Ocultar"
                                                          : "Exibir"
                                                      ) +
                                                        " Respostas (" +
                                                        _vm._s(
                                                          reply.reply_count
                                                        ) +
                                                        ")"
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          : _vm._e(),
                                        _vm._v(" "),
                                        reply.thread == true
                                          ? _c(
                                              "div",
                                              { staticClass: "comment-thread" },
                                              _vm._l(reply.replies, function(
                                                s,
                                                sindex
                                              ) {
                                                return _c(
                                                  "div",
                                                  {
                                                    key:
                                                      "cr" + s.id + "_" + index,
                                                    staticClass: "py-1 media"
                                                  },
                                                  [
                                                    _c("img", {
                                                      staticClass:
                                                        "rounded-circle border mr-3",
                                                      attrs: {
                                                        src: s.account.avatar,
                                                        width: "25px",
                                                        height: "25px"
                                                      }
                                                    }),
                                                    _vm._v(" "),
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "media-body"
                                                      },
                                                      [
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass:
                                                              "d-flex justify-content-between align-items-top read-more mb-0",
                                                            staticStyle: {
                                                              "overflow-y":
                                                                "hidden"
                                                            }
                                                          },
                                                          [
                                                            _c(
                                                              "span",
                                                              {
                                                                staticClass:
                                                                  "mr-2",
                                                                staticStyle: {
                                                                  "font-size":
                                                                    "13px"
                                                                }
                                                              },
                                                              [
                                                                _c(
                                                                  "a",
                                                                  {
                                                                    staticClass:
                                                                      "text-dark font-weight-bold mr-1",
                                                                    attrs: {
                                                                      href:
                                                                        s
                                                                          .account
                                                                          .url,
                                                                      title:
                                                                        s
                                                                          .account
                                                                          .username
                                                                    }
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        s
                                                                          .account
                                                                          .username
                                                                      )
                                                                    )
                                                                  ]
                                                                ),
                                                                _vm._v(" "),
                                                                _c("span", {
                                                                  staticClass:
                                                                    "text-break comment-body",
                                                                  staticStyle: {
                                                                    "word-break":
                                                                      "break-all"
                                                                  },
                                                                  domProps: {
                                                                    innerHTML: _vm._s(
                                                                      s.content
                                                                    )
                                                                  }
                                                                })
                                                              ]
                                                            ),
                                                            _vm._v(" "),
                                                            _c("span", [
                                                              _c(
                                                                "span",
                                                                {
                                                                  on: {
                                                                    click: function(
                                                                      $event
                                                                    ) {
                                                                      return _vm.likeReply(
                                                                        s,
                                                                        $event
                                                                      )
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  _c("i", {
                                                                    class: [
                                                                      s.favourited
                                                                        ? "fas fa-heart fa-sm text-danger"
                                                                        : "far fa-heart fa-sm text-lighter"
                                                                    ]
                                                                  })
                                                                ]
                                                              )
                                                            ])
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "p",
                                                          {
                                                            staticClass: "mb-0"
                                                          },
                                                          [
                                                            _vm._o(
                                                              _c("a", {
                                                                staticClass:
                                                                  "text-muted mr-3 text-decoration-none small",
                                                                staticStyle: {
                                                                  width: "20px"
                                                                },
                                                                attrs: {
                                                                  href: s.url
                                                                },
                                                                domProps: {
                                                                  textContent: _vm._s(
                                                                    _vm.timeAgo(
                                                                      s.created_at
                                                                    )
                                                                  )
                                                                }
                                                              }),
                                                              1,
                                                              "cr" +
                                                                s.id +
                                                                "_" +
                                                                index
                                                            ),
                                                            _vm._v(" "),
                                                            s.favourites_count
                                                              ? _c(
                                                                  "span",
                                                                  {
                                                                    staticClass:
                                                                      "text-muted comment-reaction font-weight-bold mr-3"
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      _vm._s(
                                                                        s.favourites_count ==
                                                                          1
                                                                          ? "1 curtida"
                                                                          : s.favourites_count +
                                                                              " curtidas"
                                                                      )
                                                                    )
                                                                  ]
                                                                )
                                                              : _vm._e()
                                                          ]
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                )
                                              }),
                                              0
                                            )
                                          : _vm._e()
                                      ])
                                ])
                              ]
                            )
                          }),
                          _vm._v(" "),
                          !_vm.replies.length
                            ? _c("div", [
                                _c(
                                  "p",
                                  {
                                    staticClass:
                                      "text-center text-muted font-weight-bold small"
                                  },
                                  [_vm._v("Nenhum comentário ainda")]
                                )
                              ])
                            : _vm._e()
                        ],
                        2
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "card-footer mb-3" }, [
                    _c("div", { staticClass: "align-middle d-flex" }, [
                      _c("img", {
                        staticClass: "rounded-circle border mr-3",
                        attrs: {
                          src: _vm.profile.avatar,
                          width: "36",
                          height: "36"
                        }
                      }),
                      _vm._v(" "),
                      _c("textarea", {
                        staticClass: "form-control rounded-pill",
                        staticStyle: { resize: "none", "overflow-y": "hidden" },
                        attrs: {
                          name: "comment",
                          placeholder: "Add a comment…",
                          autocomplete: "off",
                          autocorrect: "off",
                          rows: "1",
                          maxlength: "0"
                        },
                        on: {
                          click: function($event) {
                            return _vm.replyFocus(_vm.status)
                          }
                        }
                      })
                    ])
                  ])
                ]
              )
            ])
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "modal-stack" },
      [
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
                [_vm._v("Ver Post")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "list-group-item rounded cursor-pointer",
                  on: {
                    click: function($event) {
                      return _vm.ctxMenuShare()
                    }
                  }
                },
                [_vm._v("Compartilhar")]
              ),
              _vm._v(" "),
              _vm.ctxMenuStatus && _vm.profile && _vm.profile.is_admin == true
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
              _vm.ctxMenuStatus.account.id != _vm.profile.id
                ? _c(
                    "div",
                    {
                      staticClass:
                        "list-group-item rounded cursor-pointer text-danger",
                      on: {
                        click: function($event) {
                          return _vm.ctxMenuReportPost()
                        }
                      }
                    },
                    [_vm._v("Reportar")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.ctxMenuStatus &&
              (_vm.profile.is_admin ||
                _vm.profile.id == _vm.ctxMenuStatus.account.id)
                ? _c(
                    "div",
                    {
                      staticClass:
                        "list-group-item rounded cursor-pointer text-danger",
                      on: {
                        click: function($event) {
                          return _vm.deletePost(_vm.ctxMenuStatus)
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
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxModModal",
            attrs: {
              id: "ctx-mod-modal",
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
              _c("p", { staticClass: "py-2 px-3 mb-0" }),
              _c(
                "div",
                { staticClass: "text-center font-weight-bold text-danger" },
                [_vm._v("Moderation Tools")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "small text-center text-muted" }, [
                _vm._v("Select one of the following options")
              ]),
              _vm._v(" "),
              _c("p"),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "list-group-item rounded cursor-pointer",
                  on: {
                    click: function($event) {
                      return _vm.moderatePost(_vm.ctxMenuStatus, "unlist")
                    }
                  }
                },
                [_vm._v("Unlist from Timelines")]
              ),
              _vm._v(" "),
              _vm.ctxMenuStatus.sensitive
                ? _c(
                    "div",
                    {
                      staticClass: "list-group-item rounded cursor-pointer",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.ctxMenuStatus, "remcw")
                        }
                      }
                    },
                    [_vm._v("Remove Content Warning")]
                  )
                : _c(
                    "div",
                    {
                      staticClass: "list-group-item rounded cursor-pointer",
                      on: {
                        click: function($event) {
                          return _vm.moderatePost(_vm.ctxMenuStatus, "addcw")
                        }
                      }
                    },
                    [_vm._v("Add Content Warning")]
                  ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer text-lighter",
                  on: {
                    click: function($event) {
                      return _vm.ctxModMenuClose()
                    }
                  }
                },
                [_vm._v("Cancel")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxModOtherModal",
            attrs: {
              id: "ctx-mod-other-modal",
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
              _c("p", { staticClass: "py-2 px-3 mb-0" }),
              _c(
                "div",
                { staticClass: "text-center font-weight-bold text-danger" },
                [_vm._v("Moderation Tools")]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "small text-center text-muted" }, [
                _vm._v("Select one of the following options")
              ]),
              _vm._v(" "),
              _c("p"),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.confirmModal()
                    }
                  }
                },
                [_vm._v("Unlist Posts")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.confirmModal()
                    }
                  }
                },
                [_vm._v("Moderation Log")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer text-lighter",
                  on: {
                    click: function($event) {
                      return _vm.ctxModOtherMenuClose()
                    }
                  }
                },
                [_vm._v("Cancel")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxShareModal",
            attrs: {
              id: "ctx-share-modal",
              title: "Share",
              "hide-footer": "",
              "hide-header": "",
              centered: "",
              rounded: "",
              size: "sm",
              "body-class": "list-group-flush p-0 rounded text-center"
            }
          },
          [
            _c(
              "div",
              {
                staticClass: "list-group-item rounded cursor-pointer",
                on: {
                  click: function($event) {
                    return _vm.shareStatus(_vm.ctxMenuStatus, $event)
                  }
                }
              },
              [
                _vm._v(
                  _vm._s(
                    _vm.ctxMenuStatus.reblogged
                      ? "Cancelar compartilhamento"
                      : "Compartilhar"
                  ) + " com seguidores"
                )
              ]
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
              [_vm._v("Copiar Link")]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "list-group-item rounded cursor-pointer text-lighter",
                on: {
                  click: function($event) {
                    return _vm.closeCtxShareMenu()
                  }
                }
              },
              [_vm._v("Cancelar")]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxEmbedModal",
            attrs: {
              id: "ctx-embed-modal",
              "hide-header": "",
              "hide-footer": "",
              centered: "",
              rounded: "",
              size: "md",
              "body-class": "p-2 rounded"
            }
          },
          [
            _c("div", [
              _c("div", { staticClass: "form-group" }, [
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.ctxEmbedPayload,
                      expression: "ctxEmbedPayload"
                    }
                  ],
                  staticClass: "form-control disabled text-monospace",
                  staticStyle: {
                    "overflow-y": "hidden",
                    border: "1px solid #efefef",
                    "font-size": "12px",
                    "line-height": "18px",
                    margin: "0 0 7px",
                    resize: "none"
                  },
                  attrs: { rows: "8", disabled: "" },
                  domProps: { value: _vm.ctxEmbedPayload },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.ctxEmbedPayload = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "form-group pl-2 d-flex justify-content-center"
                },
                [
                  _c("div", { staticClass: "form-check mr-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.ctxEmbedShowCaption,
                          expression: "ctxEmbedShowCaption"
                        }
                      ],
                      staticClass: "form-check-input",
                      attrs: {
                        type: "checkbox",
                        disabled: _vm.ctxEmbedCompactMode == true
                      },
                      domProps: {
                        checked: Array.isArray(_vm.ctxEmbedShowCaption)
                          ? _vm._i(_vm.ctxEmbedShowCaption, null) > -1
                          : _vm.ctxEmbedShowCaption
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.ctxEmbedShowCaption,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                (_vm.ctxEmbedShowCaption = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.ctxEmbedShowCaption = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.ctxEmbedShowCaption = $$c
                          }
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      { staticClass: "form-check-label font-weight-light" },
                      [_vm._v("\n\t\t\t\t\t\t\tExibir Legenda\n\t\t\t\t\t\t")]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-check mr-3" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.ctxEmbedShowLikes,
                          expression: "ctxEmbedShowLikes"
                        }
                      ],
                      staticClass: "form-check-input",
                      attrs: {
                        type: "checkbox",
                        disabled: _vm.ctxEmbedCompactMode == true
                      },
                      domProps: {
                        checked: Array.isArray(_vm.ctxEmbedShowLikes)
                          ? _vm._i(_vm.ctxEmbedShowLikes, null) > -1
                          : _vm.ctxEmbedShowLikes
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.ctxEmbedShowLikes,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                (_vm.ctxEmbedShowLikes = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.ctxEmbedShowLikes = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.ctxEmbedShowLikes = $$c
                          }
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      { staticClass: "form-check-label font-weight-light" },
                      [_vm._v("\n\t\t\t\t\t\t\tExibir Curtidas\n\t\t\t\t\t\t")]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "form-check" }, [
                    _c("input", {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.ctxEmbedCompactMode,
                          expression: "ctxEmbedCompactMode"
                        }
                      ],
                      staticClass: "form-check-input",
                      attrs: { type: "checkbox" },
                      domProps: {
                        checked: Array.isArray(_vm.ctxEmbedCompactMode)
                          ? _vm._i(_vm.ctxEmbedCompactMode, null) > -1
                          : _vm.ctxEmbedCompactMode
                      },
                      on: {
                        change: function($event) {
                          var $$a = _vm.ctxEmbedCompactMode,
                            $$el = $event.target,
                            $$c = $$el.checked ? true : false
                          if (Array.isArray($$a)) {
                            var $$v = null,
                              $$i = _vm._i($$a, $$v)
                            if ($$el.checked) {
                              $$i < 0 &&
                                (_vm.ctxEmbedCompactMode = $$a.concat([$$v]))
                            } else {
                              $$i > -1 &&
                                (_vm.ctxEmbedCompactMode = $$a
                                  .slice(0, $$i)
                                  .concat($$a.slice($$i + 1)))
                            }
                          } else {
                            _vm.ctxEmbedCompactMode = $$c
                          }
                        }
                      }
                    }),
                    _vm._v(" "),
                    _c(
                      "label",
                      { staticClass: "form-check-label font-weight-light" },
                      [_vm._v("\n\t\t\t\t\t\t\tModo Compacto\n\t\t\t\t\t\t")]
                    )
                  ])
                ]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxReport",
            attrs: {
              id: "ctx-report",
              "hide-header": "",
              "hide-footer": "",
              centered: "",
              rounded: "",
              size: "sm",
              "body-class": "list-group-flush p-0 rounded"
            }
          },
          [
            _c("p", { staticClass: "py-2 px-3 mb-0" }),
            _c(
              "div",
              { staticClass: "text-center font-weight-bold text-danger" },
              [_vm._v("Reportar")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "small text-center text-muted" }, [
              _vm._v("Selecione uma ou mais opções")
            ]),
            _vm._v(" "),
            _c("p"),
            _vm._v(" "),
            _c("div", { staticClass: "list-group text-center" }, [
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("spam")
                    }
                  }
                },
                [_vm._v("Spam")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("sensitive")
                    }
                  }
                },
                [_vm._v("Conteúdo Inapropriado")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("abusive")
                    }
                  }
                },
                [_vm._v("Abusivo ou Nocivo")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer text-lighter",
                  on: {
                    click: function($event) {
                      return _vm.ctxReportMenuGoBack()
                    }
                  }
                },
                [_vm._v("Cancelar")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxReportOther",
            attrs: {
              id: "ctx-report-other",
              "hide-header": "",
              "hide-footer": "",
              centered: "",
              rounded: "",
              size: "sm",
              "body-class": "list-group-flush p-0 rounded"
            }
          },
          [
            _c("p", { staticClass: "py-2 px-3 mb-0" }),
            _c(
              "div",
              { staticClass: "text-center font-weight-bold text-danger" },
              [_vm._v("Reportar")]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "small text-center text-muted" }, [
              _vm._v("Selecione uma ou mais opções")
            ]),
            _vm._v(" "),
            _c("p"),
            _vm._v(" "),
            _c("div", { staticClass: "list-group text-center" }, [
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("underage")
                    }
                  }
                },
                [_vm._v("Underage Account")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("copyright")
                    }
                  }
                },
                [_vm._v("Copyright Infringement")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("impersonation")
                    }
                  }
                },
                [_vm._v("Impersonation")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.sendReport("scam")
                    }
                  }
                },
                [_vm._v("Scam or Fraud")]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass:
                    "list-group-item rounded cursor-pointer text-lighter",
                  on: {
                    click: function($event) {
                      return _vm.ctxReportOtherMenuGoBack()
                    }
                  }
                },
                [_vm._v("Cancelar")]
              )
            ])
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "ctxConfirm",
            attrs: {
              id: "ctx-confirm",
              "hide-header": "",
              "hide-footer": "",
              centered: "",
              rounded: "",
              size: "sm",
              "body-class": "list-group-flush p-0 rounded"
            }
          },
          [
            _c(
              "div",
              {
                staticClass:
                  "d-flex align-items-center justify-content-center py-3"
              },
              [_c("div", [_vm._v(_vm._s(this.confirmModalTitle))])]
            ),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass:
                  "d-flex border-top btn-group btn-group-block rounded-0",
                attrs: { role: "group" }
              },
              [
                _c(
                  "button",
                  {
                    staticClass:
                      "btn btn-outline-lighter border-left-0 border-top-0 border-bottom-0 border-right py-2",
                    staticStyle: { color: "rgb(0,122,255) !important" },
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.confirmModalCancel()
                      }
                    }
                  },
                  [_vm._v("Cancelar")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-outline-lighter border-0",
                    staticStyle: { color: "rgb(0,122,255) !important" },
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.confirmModalConfirm()
                      }
                    }
                  },
                  [_vm._v("Confirmar")]
                )
              ]
            )
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "lightboxModal",
            attrs: {
              id: "lightbox",
              "hide-header": "",
              "hide-footer": "",
              centered: "",
              size: "lg",
              "body-class": "p-0"
            }
          },
          [
            _vm.lightboxMedia
              ? _c(
                  "div",
                  {
                    staticClass: "w-100 h-100",
                    class: _vm.lightboxMedia.filter_class
                  },
                  [
                    _c("img", {
                      staticStyle: {
                        "max-height": "100%",
                        "max-width": "100%"
                      },
                      attrs: {
                        src: _vm.lightboxMedia.url,
                        alt: "lightbox media"
                      }
                    })
                  ]
                )
              : _vm._e()
          ]
        ),
        _vm._v(" "),
        _c(
          "b-modal",
          {
            ref: "replyModal",
            attrs: {
              id: "ctx-reply-modal",
              "hide-footer": "",
              centered: "",
              rounded: "",
              "title-html": _vm.replyStatus.account
                ? "Responder para <span class=text-dark>" +
                  _vm.replyStatus.account.username +
                  "</span>"
                : "",
              "title-tag": "p",
              "title-class": "font-weight-bold text-muted",
              size: "md",
              "body-class": "p-2 rounded"
            }
          },
          [
            _c(
              "div",
              [
                _c("vue-tribute", { attrs: { options: _vm.tributeSettings } }, [
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.replyText,
                        expression: "replyText"
                      }
                    ],
                    staticClass: "form-control replyModalTextarea",
                    attrs: { rows: "4" },
                    domProps: { value: _vm.replyText },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.replyText = $event.target.value
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "border-top border-bottom my-2" }, [
                  _c(
                    "ul",
                    {
                      staticClass: "nav align-items-center emoji-reactions",
                      staticStyle: {
                        "overflow-x": "scroll",
                        "flex-wrap": "unset"
                      }
                    },
                    _vm._l(_vm.emoji, function(e) {
                      return _c(
                        "li",
                        {
                          staticClass: "nav-item",
                          on: {
                            click: function($event) {
                              return _vm.emojiReaction(_vm.status)
                            }
                          }
                        },
                        [_vm._v(_vm._s(e))]
                      )
                    }),
                    0
                  )
                ]),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "d-flex justify-content-between align-items-center"
                  },
                  [
                    _c("div", [
                      _c(
                        "span",
                        {
                          staticClass:
                            "pl-2 small text-muted font-weight-bold text-monospace"
                        },
                        [
                          _c(
                            "span",
                            {
                              class: [
                                _vm.replyText.length >
                                _vm.config.uploader.max_caption_length
                                  ? "text-danger"
                                  : "text-dark"
                              ]
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.replyText.length >
                                    _vm.config.uploader.max_caption_length
                                    ? _vm.config.uploader.max_caption_length -
                                        _vm.replyText.length
                                    : _vm.replyText.length
                                )
                              )
                            ]
                          ),
                          _vm._v(
                            "/" +
                              _vm._s(_vm.config.uploader.max_caption_length) +
                              "\n\t\t\t\t\t\t"
                          )
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "d-flex align-items-center" }, [
                      _c(
                        "button",
                        {
                          staticClass:
                            "btn btn-primary btn-sm py-2 px-4 lead text-uppercase font-weight-bold",
                          attrs: { disabled: _vm.replyText.length == 0 },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.commentSubmit(_vm.status, $event)
                            }
                          }
                        },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t" +
                              _vm._s(
                                _vm.replySending == true ? "POSTING" : "POST"
                              ) +
                              "\n\t\t\t\t\t\t"
                          )
                        ]
                      )
                    ])
                  ]
                )
              ],
              1
            )
          ]
        ),
        _vm._v(" "),
        _c("b-modal", {
          ref: "ctxStatusModal",
          attrs: {
            id: "ctx-status-modal",
            "hide-header": "",
            "hide-footer": "",
            centered: "",
            rounded: "",
            size: "xl",
            "body-class": "list-group-flush p-0 m-0 rounded"
          }
        })
      ],
      1
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "mb-0 d-none d-md-block" }, [
      _c(
        "a",
        {
          staticClass: "btn btn-block btn-primary btn-sm font-weight-bold",
          attrs: {
            href: "/i/compose",
            "data-toggle": "modal",
            "data-target": "#composeModal"
          }
        },
        [_vm._v("\n\t\t\t\t\t\t\tNovo Post\n\t\t\t\t\t\t")]
      )
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
    return _c("span", [
      _c("i", { staticClass: "fas fa-chevron-right text-lighter" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "text-lighter" }, [
      _c("i", { staticClass: "fas fa-camera-retro fa-5x" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c(
        "a",
        {
          staticClass: "btn btn-primary font-weight-bold py-0",
          attrs: { href: "/discover" }
        },
        [_vm._v("Descobrir")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "ml-2" }, [
      _c(
        "a",
        { staticClass: "text-muted", attrs: { href: "/settings/home" } },
        [
          _c("i", { staticClass: "fas fa-cog fa-lg" }),
          _vm._v(" "),
          _c("span", { staticClass: "sr-only" }, [_vm._v("Configurações")])
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("footer", [
      _c("div", { staticClass: "container pb-5" }, [
        _c(
          "p",
          {
            staticClass: "mb-0 text-uppercase font-weight-bold text-muted small"
          },
          [
            _c(
              "a",
              { staticClass: "text-dark pr-2", attrs: { href: "/site/about" } },
              [_vm._v("Sobre")]
            ),
            _vm._v(" "),
            _c(
              "a",
              { staticClass: "text-dark pr-2", attrs: { href: "/site/help" } },
              [_vm._v("Ajuda")]
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "text-dark pr-2",
                attrs: { href: "/discover/profiles" }
              },
              [_vm._v("Pessoas")]
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                staticClass: "text-dark pr-2",
                attrs: { href: "/site/privacy" }
              },
              [_vm._v("Privacidade")]
            )
          ]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [
      _c("p", { staticClass: "font-weight-bold mb-0 h5" }, [
        _vm._v("Commentários")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("i", { staticClass: "fas fa-cog fa-lg text-white" })])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "postCommentsLoader text-center py-2" }, [
      _c("div", { staticClass: "spinner-border", attrs: { role: "status" } }, [
        _c("span", { staticClass: "sr-only" }, [_vm._v("Carregando...")])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=template&id=66084274&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=template&id=66084274& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
  return _vm.status.sensitive == true
    ? _c("div", [
        _c(
          "details",
          { staticClass: "details-animated" },
          [
            _c("summary", [
              _c("p", { staticClass: "mb-0 lead font-weight-bold" }, [
                _vm._v(
                  _vm._s(
                    _vm.status.spoiler_text
                      ? _vm.status.spoiler_text
                      : "CW / NSFW / Hidden Media"
                  )
                )
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "font-weight-light" }, [
                _vm._v("(click to show)")
              ])
            ]),
            _vm._v(" "),
            _c(
              "b-carousel",
              {
                staticStyle: {
                  "text-shadow": "1px 1px 2px #333",
                  "background-color": "#000"
                },
                attrs: {
                  id: _vm.status.id + "-carousel",
                  controls: "",
                  "img-blank": "",
                  background: "#ffffff",
                  interval: 0
                }
              },
              _vm._l(_vm.status.media_attachments, function(media, index) {
                return _c("b-carousel-slide", { key: media.id + "-media" }, [
                  media.type == "Video"
                    ? _c(
                        "video",
                        {
                          staticClass: "embed-responsive-item",
                          attrs: {
                            slot: "img",
                            preload: "none",
                            controls: "",
                            loop: "",
                            alt: media.description,
                            width: "100%",
                            height: "100%",
                            poster: media.preview_url
                          },
                          slot: "img"
                        },
                        [
                          _c("source", {
                            attrs: { src: media.url, type: media.mime }
                          })
                        ]
                      )
                    : media.type == "Image"
                    ? _c(
                        "div",
                        {
                          attrs: { slot: "img", title: media.description },
                          slot: "img"
                        },
                        [
                          _c("img", {
                            class:
                              media.filter_class + " d-block img-fluid w-100",
                            attrs: {
                              src: media.url,
                              alt: media.description,
                              loading: "lazy",
                              onerror:
                                "this.onerror=null;this.src='/storage/no-preview.png'"
                            }
                          })
                        ]
                      )
                    : _c(
                        "p",
                        {
                          staticClass:
                            "text-center p-0 font-weight-bold text-white"
                        },
                        [_vm._v("Error: Problem rendering preview.")]
                      )
                ])
              }),
              1
            )
          ],
          1
        )
      ])
    : _c(
        "div",
        { staticClass: "w-100 h-100 p-0" },
        [
          _c(
            "carousel",
            {
              ref: "carousel",
              staticClass: "p-0 m-0",
              attrs: {
                centerMode: true,
                loop: false,
                "per-page": 1,
                paginationPosition: "bottom-overlay",
                paginationActiveColor: "#3897f0",
                paginationColor: "#dbdbdb"
              }
            },
            _vm._l(_vm.status.media_attachments, function(media, index) {
              return _c(
                "slide",
                {
                  key: "px-carousel-" + media.id + "-" + index,
                  staticClass: "w-100 h-100 d-block mx-auto text-center",
                  staticStyle: {
                    background: "#000",
                    display: "flex",
                    "align-items": "center"
                  }
                },
                [
                  media.type == "Video"
                    ? _c(
                        "video",
                        {
                          staticClass: "embed-responsive-item",
                          attrs: {
                            preload: "none",
                            controls: "",
                            loop: "",
                            title: media.description,
                            width: "100%",
                            height: "100%",
                            poster: media.preview_url
                          }
                        },
                        [
                          _c("source", {
                            attrs: { src: media.url, type: media.mime }
                          })
                        ]
                      )
                    : media.type == "Image"
                    ? _c("div", { attrs: { title: media.description } }, [
                        _c("img", {
                          class: media.filter_class + " img-fluid w-100",
                          attrs: {
                            src: media.url,
                            alt: media.description,
                            loading: "lazy",
                            onerror:
                              "this.onerror=null;this.src='/storage/no-preview.png'"
                          }
                        })
                      ])
                    : _c(
                        "p",
                        {
                          staticClass:
                            "text-center p-0 font-weight-bold text-white"
                        },
                        [_vm._v("Error: Problem rendering preview.")]
                      )
                ]
              )
            }),
            1
          )
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true&":
/*!***************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true& ***!
  \***************************************************************************************************************************************************************************************************************************************************/
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
  return _vm.status.sensitive == true
    ? _c("div", [
        _c(
          "details",
          { staticClass: "details-animated" },
          [
            _c("summary", { on: { click: _vm.loadSensitive } }, [
              _c("p", { staticClass: "mb-0 lead font-weight-bold" }, [
                _vm._v(
                  _vm._s(
                    _vm.status.spoiler_text
                      ? _vm.status.spoiler_text
                      : "CW / NSFW / Hidden Media"
                  )
                )
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "font-weight-light" }, [
                _vm._v("(click to show)")
              ])
            ]),
            _vm._v(" "),
            _c(
              "carousel",
              {
                ref: "carousel",
                attrs: {
                  centerMode: true,
                  loop: false,
                  "per-page": 1,
                  paginationPosition: "bottom-overlay",
                  paginationActiveColor: "#3897f0",
                  paginationColor: "#dbdbdb"
                }
              },
              _vm._l(_vm.status.media_attachments, function(img, index) {
                return _c(
                  "slide",
                  {
                    key: "px-carousel-" + img.id + "-" + index,
                    staticClass: "w-100 h-100 d-block mx-auto text-center",
                    attrs: { title: img.description }
                  },
                  [
                    _c("img", {
                      class: img.filter_class + " img-fluid",
                      attrs: {
                        src: img.url,
                        alt: _vm.altText(img),
                        onerror:
                          "this.onerror=null;this.src='/storage/no-preview.png'"
                      }
                    })
                  ]
                )
              }),
              1
            )
          ],
          1
        )
      ])
    : _c(
        "div",
        { staticClass: "w-100 h-100 p-0" },
        [
          _c(
            "carousel",
            {
              ref: "carousel",
              staticClass: "p-0 m-0",
              attrs: {
                centerMode: true,
                loop: false,
                "per-page": 1,
                paginationPosition: "bottom-overlay",
                paginationActiveColor: "#3897f0",
                paginationColor: "#dbdbdb"
              }
            },
            _vm._l(_vm.status.media_attachments, function(img, index) {
              return _c(
                "slide",
                {
                  key: "px-carousel-" + img.id + "-" + index,
                  staticStyle: {
                    background: "#000",
                    display: "flex",
                    "align-items": "center"
                  },
                  attrs: { title: img.description }
                },
                [
                  _c("img", {
                    class: img.filter_class + " img-fluid w-100 p-0",
                    attrs: {
                      src: img.url,
                      alt: _vm.altText(img),
                      onerror:
                        "this.onerror=null;this.src='/storage/no-preview.png'"
                    }
                  })
                ]
              )
            }),
            1
          )
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true&":
/*!**********************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true& ***!
  \**********************************************************************************************************************************************************************************************************************************************/
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
  return _vm.status.sensitive == true
    ? _c(
        "div",
        { staticClass: "content-label-wrapper" },
        [
          _c("div", { staticClass: "text-light content-label" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("p", { staticClass: "h4 font-weight-bold text-center" }, [
              _vm._v("\n\t\t\tSensitive Content\n\t\t")
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "text-center py-2" }, [
              _vm._v(
                "\n\t\t\t" +
                  _vm._s(
                    _vm.status.spoiler_text
                      ? _vm.status.spoiler_text
                      : "This post may contain sensitive content."
                  ) +
                  "\n\t\t"
              )
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "mb-0" }, [
              _c(
                "button",
                {
                  staticClass:
                    "btn btn-outline-light btn-block btn-sm font-weight-bold",
                  on: {
                    click: function($event) {
                      return _vm.toggleContentWarning()
                    }
                  }
                },
                [_vm._v("See Post")]
              )
            ])
          ]),
          _vm._v(" "),
          _c("blur-hash-image", {
            attrs: {
              width: "32",
              height: "32",
              punch: 1,
              hash: _vm.status.media_attachments[0].blurhash,
              alt: _vm.altText(_vm.status)
            }
          })
        ],
        1
      )
    : _c("div", [
        _c(
          "div",
          { attrs: { title: _vm.status.media_attachments[0].description } },
          [
            _c("img", {
              staticClass: "card-img-top",
              attrs: {
                src: _vm.status.media_attachments[0].url,
                loading: "lazy",
                alt: _vm.altText(_vm.status),
                width: _vm.width(),
                height: _vm.height(),
                onerror: "this.onerror=null;this.src='/storage/no-preview.png'"
              }
            })
          ]
        )
      ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "text-center" }, [
      _c("i", { staticClass: "far fa-eye-slash fa-2x" })
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=template&id=43194746&":
/*!***************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=template&id=43194746& ***!
  \***************************************************************************************************************************************************************************************************************************************/
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
  return _vm.status.sensitive == true
    ? _c("div", [
        _c(
          "details",
          { staticClass: "details-animated" },
          [
            _c("summary", [
              _c("p", { staticClass: "mb-0 lead font-weight-bold" }, [
                _vm._v(
                  _vm._s(
                    _vm.status.spoiler_text
                      ? _vm.status.spoiler_text
                      : "CW / NSFW / Hidden Media"
                  )
                )
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "font-weight-light" }, [
                _vm._v("(click to show)")
              ])
            ]),
            _vm._v(" "),
            _c(
              "b-carousel",
              {
                staticStyle: {
                  "text-shadow": "1px 1px 2px #333",
                  "background-color": "#000"
                },
                attrs: {
                  id: _vm.status.id + "-carousel",
                  controls: "",
                  "img-blank": "",
                  background: "#ffffff",
                  interval: 0
                }
              },
              _vm._l(_vm.status.media_attachments, function(vid, index) {
                return _c("b-carousel-slide", { key: vid.id + "-media" }, [
                  _c(
                    "video",
                    {
                      staticClass: "embed-responsive-item",
                      attrs: {
                        slot: "img",
                        preload: "none",
                        controls: "",
                        loop: "",
                        alt: vid.description,
                        width: "100%",
                        height: "100%",
                        poster: vid.preview_url
                      },
                      slot: "img"
                    },
                    [_c("source", { attrs: { src: vid.url, type: vid.mime } })]
                  )
                ])
              }),
              1
            )
          ],
          1
        )
      ])
    : _c(
        "div",
        [
          _c(
            "b-carousel",
            {
              staticStyle: {
                "text-shadow": "1px 1px 2px #333",
                "background-color": "#000"
              },
              attrs: {
                id: _vm.status.id + "-carousel",
                controls: "",
                "img-blank": "",
                background: "#ffffff",
                interval: 0
              }
            },
            _vm._l(_vm.status.media_attachments, function(vid, index) {
              return _c("b-carousel-slide", { key: vid.id + "-media" }, [
                _c(
                  "video",
                  {
                    staticClass: "embed-responsive-item",
                    attrs: {
                      slot: "img",
                      preload: "none",
                      controls: "",
                      loop: "",
                      alt: vid.description,
                      width: "100%",
                      height: "100%",
                      poster: vid.preview_url
                    },
                    slot: "img"
                  },
                  [_c("source", { attrs: { src: vid.url, type: vid.mime } })]
                )
              ])
            }),
            1
          )
        ],
        1
      )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=template&id=9ad5682a&":
/*!**********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=template&id=9ad5682a& ***!
  \**********************************************************************************************************************************************************************************************************************************/
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
  return _vm.status.sensitive == true
    ? _c("div", [
        _c("details", { staticClass: "details-animated" }, [
          _c("summary", [
            _c("p", { staticClass: "mb-0 lead font-weight-bold" }, [
              _vm._v(
                _vm._s(
                  _vm.status.spoiler_text
                    ? _vm.status.spoiler_text
                    : "CW / NSFW / Hidden Media"
                )
              )
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "font-weight-light" }, [
              _vm._v("(click to show)")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "embed-responsive embed-responsive-1by1" }, [
            _c(
              "video",
              {
                staticClass: "video",
                attrs: {
                  preload: "none",
                  loop: "",
                  poster: _vm.status.media_attachments[0].preview_url,
                  "data-id": _vm.status.id
                },
                on: {
                  click: function($event) {
                    return _vm.playOrPause($event)
                  }
                }
              },
              [
                _c("source", {
                  attrs: {
                    src: _vm.status.media_attachments[0].url,
                    type: _vm.status.media_attachments[0].mime
                  }
                })
              ]
            )
          ])
        ])
      ])
    : _c("div", { staticClass: "embed-responsive embed-responsive-16by9" }, [
        _c(
          "video",
          {
            staticClass: "video",
            attrs: {
              controls: "",
              preload: "metadata",
              loop: "",
              poster: _vm.status.media_attachments[0].preview_url,
              "data-id": _vm.status.id
            }
          },
          [
            _c("source", {
              attrs: {
                src: _vm.status.media_attachments[0].url,
                type: _vm.status.media_attachments[0].mime
              }
            })
          ]
        )
      ])
}
var staticRenderFns = []
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

/***/ "./node_modules/vue-tribute/dist/vue-tribute.es.js":
/*!*********************************************************!*\
  !*** ./node_modules/vue-tribute/dist/vue-tribute.es.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tributejs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tributejs */ "./node_modules/tributejs/dist/tribute.js");
/* harmony import */ var tributejs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tributejs__WEBPACK_IMPORTED_MODULE_0__);


var VueTribute = {
  name: "vue-tribute",
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  watch: {
    options: {
      immediate: false,
      deep: true,
      handler: function handler() {
        var _this = this;

        if (this.tribute) {
          setTimeout(function () {
            var $el = _this.$slots.default[0].elm;

            _this.tribute.detach($el);

            setTimeout(function () {
              $el = _this.$slots.default[0].elm;
              _this.tribute = new tributejs__WEBPACK_IMPORTED_MODULE_0___default.a(_this.options);

              _this.tribute.attach($el);

              $el.tributeInstance = _this.tribute;
            }, 0);
          }, 0);
        }
      }
    }
  },
  mounted: function mounted() {
    if (typeof tributejs__WEBPACK_IMPORTED_MODULE_0___default.a === "undefined") {
      throw new Error("[vue-tribute] cannot locate tributejs!");
    }

    var $el = this.$slots.default[0].elm;
    this.tribute = new tributejs__WEBPACK_IMPORTED_MODULE_0___default.a(this.options);
    this.tribute.attach($el);
    $el.tributeInstance = this.tribute;
    $el.addEventListener("tribute-replaced", function (e) {
      e.target.dispatchEvent(new Event("input", {
        bubbles: true
      }));
    });
  },
  beforeDestroy: function beforeDestroy() {
    var $el = this.$slots.default[0].elm;

    if (this.tribute) {
      this.tribute.detach($el);
    }
  },
  render: function render(h) {
    return h("div", {
      staticClass: "v-tribute"
    }, this.$slots.default);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueTribute.name, VueTribute);
}

/* harmony default export */ __webpack_exports__["default"] = (VueTribute);


/***/ }),

/***/ "./node_modules/zuck.js/dist/skins/snapgram.css":
/*!******************************************************!*\
  !*** ./node_modules/zuck.js/dist/skins/snapgram.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../css-loader??ref--9-1!../../../postcss-loader/src??ref--9-2!./snapgram.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/zuck.js/dist/skins/snapgram.css");

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

/***/ "./node_modules/zuck.js/dist/zuck.css":
/*!********************************************!*\
  !*** ./node_modules/zuck.js/dist/zuck.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../css-loader??ref--9-1!../../postcss-loader/src??ref--9-2!./zuck.css */ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/zuck.js/dist/zuck.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/zuck.js/src/zuck.js":
/*!******************************************!*\
  !*** ./node_modules/zuck.js/src/zuck.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
    zuck.js
    https://github.com/ramon82/zuck.js
    MIT License
*/
module.exports = (window => {
  /* Utilities */
  const query = function (qs) {
    return document.querySelectorAll(qs)[0];
  };

  const get = function (array, what) {
    if (array) {
      return array[what] || '';
    } else {
      return '';
    }
  };

  const each = function (arr, func) {
    if (arr) {
      const total = arr.length;

      for (let i = 0; i < total; i++) {
        func(i, arr[i]);
      }
    }
  };

  const setVendorVariable = function (ref, variable, value) {
    const variables = [
      variable.toLowerCase(),
      `webkit${variable}`,
      `MS${variable}`,
      `o${variable}`
    ];

    each(variables, (i, val) => {
      ref[val] = value;
    });
  };

  const addVendorEvents = function (el, func, event) {
    const events = [
      event.toLowerCase(),
      `webkit${event}`,
      `MS${event}`,
      `o${event}`
    ];

    each(events, (i, val) => {
      el.addEventListener(val, func, false);
    });
  };

  const onAnimationEnd = function (el, func) {
    addVendorEvents(el, func, 'AnimationEnd');
  };

  const onTransitionEnd = function (el, func) {
    if (!el.transitionEndEvent) {
      el.transitionEndEvent = true;

      addVendorEvents(el, func, 'TransitionEnd');
    }
  };

  const prepend = function (parent, child) {
    if (parent.firstChild) {
      parent.insertBefore(child, parent.firstChild);
    } else {
      parent.appendChild(child);
    }
  };

  const generateId = () => {
    return 'stories-' + Math.random().toString(36).substr(2, 9);
  };

  /* Zuckera */
  const ZuckJS = function (timeline, options) {
    const zuck = this;
    const option = function (name, prop) {
      const type = function (what) {
        return typeof what !== 'undefined';
      };

      if (prop) {
        if (type(options[name])) {
          return type(options[name][prop])
            ? options[name][prop]
            : optionsDefault[name][prop];
        } else {
          return optionsDefault[name][prop];
        }
      } else {
        return type(options[name]) ? options[name] : optionsDefault[name];
      }
    };

    const fullScreen = function (elem, cancel) {
      const func = 'RequestFullScreen';
      const elFunc = 'requestFullScreen'; // crappy vendor prefixes.

      try {
        if (cancel) {
          if (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
          ) {
            if (document.exitFullscreen) {
              document.exitFullscreen()
                .catch(() => {});
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen()
                .catch(() => {});
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen()
                .catch(() => {});
            }
          }
        } else {
          if (elem[elFunc]) {
            elem[elFunc]();
          } else if (elem[`ms${func}`]) {
            elem[`ms${func}`]();
          } else if (elem[`moz${func}`]) {
            elem[`moz${func}`]();
          } else if (elem[`webkit${func}`]) {
            elem[`webkit${func}`]();
          }
        }
      } catch (e) {
        console.warn('[Zuck.js] Can\'t access fullscreen');
      }
    };

    const translate = function (element, to, duration, ease) {
      const direction = to > 0 ? 1 : -1;
      const to3d = (Math.abs(to) / query('#zuck-modal').offsetWidth) * 90 * direction;

      if (option('cubeEffect')) {
        const scaling = to3d === 0 ? 'scale(0.95)' : 'scale(0.930,0.930)';

        setVendorVariable(
          query('#zuck-modal-content').style,
          'Transform',
          scaling
        );

        if (to3d < -90 || to3d > 90) {
          return false;
        }
      }

      const transform = !option('cubeEffect')
        ? `translate3d(${to}px, 0, 0)`
        : `rotateY(${to3d}deg)`;

      if (element) {
        setVendorVariable(element.style, 'TransitionTimingFunction', ease);
        setVendorVariable(element.style, 'TransitionDuration', `${duration}ms`);
        setVendorVariable(element.style, 'Transform', transform);
      }
    };

    const findPos = function (obj, offsetY, offsetX, stop) {
      let curleft = 0;
      let curtop = 0;

      if (obj) {
        if (obj.offsetParent) {
          do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;

            if (obj === stop) {
              break;
            }
          } while ((obj = obj.offsetParent));
        }

        if (offsetY) {
          curtop = curtop - offsetY;
        }

        if (offsetX) {
          curleft = curleft - offsetX;
        }
      }

      return [curleft, curtop];
    };

    if (typeof timeline === 'string') {
      timeline = document.getElementById(timeline);
    }

    if (!timeline.id) {
      timeline.setAttribute('id', generateId());
    }

    const timeAgo = function (time) {
      time = Number(time) * 1000;

      const dateObj = new Date(time);
      const dateStr = dateObj.getTime();
      let seconds = (new Date().getTime() - dateStr) / 1000;

      const language = option('language', 'time');

      const formats = [
        [60, ` ${language.seconds}`, 1], // 60
        [120, `1 ${language.minute}`, ''], // 60*2
        [3600, ` ${language.minutes}`, 60], // 60*60, 60
        [7200, `1 ${language.hour}`, ''], // 60*60*2
        [86400, ` ${language.hours}`, 3600], // 60*60*24, 60*60
        [172800, ` ${language.yesterday}`, ''], // 60*60*24*2
        [604800, ` ${language.days}`, 86400]
      ];

      let currentFormat = 1;
      if (seconds < 0) {
        seconds = Math.abs(seconds);

        currentFormat = 2;
      }

      let result = false;
      each(formats, (formatKey, format) => {
        if (seconds < format[0] && !result) {
          if (typeof format[2] === 'string') {
            result = format[currentFormat];
          } else if (format !== null) {
            result = Math.floor(seconds / format[2]) + format[1];
          }
        }
      });

      if (!result) {
        const day = dateObj.getDate();
        const month = dateObj.getMonth();
        const year = dateObj.getFullYear();

        return `${day}/${month + 1}/${year}`;
      } else {
        return result;
      }
    };

    /* options */
    const id = timeline.id;
    const optionsDefault = {
      rtl: false,
      skin: 'snapgram',
      avatars: true,
      stories: [],
      backButton: true,
      backNative: false,
      paginationArrows: false,
      previousTap: true,
      autoFullScreen: false,
      openEffect: true,
      cubeEffect: false,
      list: false,
      localStorage: true,
      callbacks: {
        onOpen: function (storyId, callback) {
          callback();
        },
        onView: function (storyId) {},
        onEnd: function (storyId, callback) {
          callback();
        },
        onClose: function (storyId, callback) {
          callback();
        },
        onNextItem: function (storyId, nextStoryId, callback) {
          callback();
        },
        onNavigateItem: function (storyId, nextStoryId, callback) {
          callback();
        }
      },
      template: {
        timelineItem (itemData) {
          return `
            <div class="story ${get(itemData, 'seen') === true ? 'seen' : ''}">
              <a class="item-link" href="${get(itemData, 'link')}">
                <span class="item-preview">
                  <img lazy="eager" src="${
                    (option('avatars') || !get(itemData, 'currentPreview'))
                    ? get(itemData, 'photo')
                    : get(itemData, 'currentPreview')
                  }" />
                </span>
                <span class="info" itemProp="author" itemScope itemType="http://schema.org/Person">
                  <strong class="name" itemProp="name">${get(itemData, 'name')}</strong>
                  <span class="time">${get(itemData, 'lastUpdatedAgo')}</span>
                </span>
              </a>
              
              <ul class="items"></ul>
            </div>`;
        },

        timelineStoryItem (itemData) {
          const reserved = ['id', 'seen', 'src', 'link', 'linkText', 'time', 'type', 'length', 'preview'];
          let attributes = `
            href="${get(itemData, 'src')}"
            data-link="${get(itemData, 'link')}"
            data-linkText="${get(itemData, 'linkText')}"
            data-time="${get(itemData, 'time')}"
            data-type="${get(itemData, 'type')}"
            data-length="${get(itemData, 'length')}"
          `;

          for (const dataKey in itemData) {
            if (reserved.indexOf(dataKey) === -1) {
              attributes += ` data-${dataKey}="${itemData[dataKey]}"`;
            }
          }

          return `<a ${attributes}>
                    <img loading="auto" src="${get(itemData, 'preview')}" />
                  </a>`;
        },

        viewerItem (storyData, currentStoryItem) {
          return `<div class="story-viewer">
                    <div class="head">
                      <div class="left">
                        ${option('backButton') ? '<a class="back">&lsaquo;</a>' : ''}

                        <span class="item-preview">
                          <img lazy="eager" class="profilePhoto" src="${get(storyData, 'photo')}" />
                        </span>

                        <div class="info">
                          <strong class="name">${get(storyData, 'name')}</strong>
                          <span class="time">${get(storyData, 'timeAgo')}</span>
                        </div>
                      </div>

                      <div class="right">
                        <span class="time">${get(currentStoryItem, 'timeAgo')}</span>
                        <span class="loading"></span>
                        <a class="close" tabIndex="2">&times;</a>
                      </div>
                    </div>

                    <div class="slides-pointers">
                      <div class="wrap"></div>
                    </div>

                    ${
                      option('paginationArrows')
                      ? `<div class="slides-pagination">
                          <span class="previous">&lsaquo;</span>
                          <span class="next">&rsaquo;</span>
                        </div>`
                      : ''
                    }
                  </div>`;
        },

        viewerItemPointer (index, currentIndex, item) {
          return `<span 
                    class="${currentIndex === index ? 'active' : ''} ${get(item, 'seen') === true ? 'seen' : ''}"
                    data-index="${index}" data-item-id="${get(item, 'id')}">
                      <b style="animation-duration:${get(item, 'length') === '' ? '3' : get(item, 'length')}s"></b>
                  </span>`;
        },

        viewerItemBody (index, currentIndex, item) {
          return `<div 
                    class="item ${get(item, 'seen') === true ? 'seen' : ''} ${currentIndex === index ? 'active' : ''}"
                    data-time="${get(item, 'time')}" data-type="${get(item, 'type')}" data-index="${index}" data-item-id="${get(item, 'id')}">
                    ${
                      get(item, 'type') === 'video'
                      ? `<video class="media" muted webkit-playsinline playsinline preload="auto" src="${get(item, 'src')}" ${get(item, 'type')}></video>
                        <b class="tip muted">${option('language', 'unmute')}</b>`
                      : `<img loading="auto" class="media" src="${get(item, 'src')}" ${get(item, 'type')} />
                    `}

                    ${
                      get(item, 'link')
                      ? `<a class="tip link" href="${get(item, 'link')}" rel="noopener" target="_blank">
                            ${!get(item, 'linkText') || get(item, 'linkText') === '' ? option('language', 'visitLink') : get(item, 'linkText')}
                          </a>`
                      : ''
                    }
                  </div>`;
        }
      },
      language: {
        unmute: 'Touch to unmute',
        keyboardTip: 'Press space to see next',
        visitLink: 'Visit link',
        time: {
          ago: 'ago',
          hour: 'hour ago',
          hours: 'hours ago',
          minute: 'minute ago',
          minutes: 'minutes ago',
          fromnow: 'from now',
          seconds: 'seconds ago',
          yesterday: 'yesterday',
          tomorrow: 'tomorrow',
          days: 'days ago'
        }
      }
    };

    /* modal */
    const ZuckModal = () => {
      let modalZuckContainer = query('#zuck-modal');

      if (!modalZuckContainer && !zuck.hasModal) {
        zuck.hasModal = true;

        modalZuckContainer = document.createElement('div');
        modalZuckContainer.id = 'zuck-modal';

        if (option('cubeEffect')) {
          modalZuckContainer.className = 'with-cube';
        }

        modalZuckContainer.innerHTML = '<div id="zuck-modal-content"></div>';
        modalZuckContainer.style.display = 'none';

        modalZuckContainer.setAttribute('tabIndex', '1');
        modalZuckContainer.onkeyup = ({ keyCode }) => {
          const code = keyCode;

          if (code === 27) {
            modal.close();
          } else if (code === 13 || code === 32) {
            modal.next();
          }
        };

        if (option('openEffect')) {
          modalZuckContainer.classList.add('with-effects');
        }

        if (option('rtl')) {
          modalZuckContainer.classList.add('rtl');
        }

        onTransitionEnd(modalZuckContainer, () => {
          if (modalZuckContainer.classList.contains('closed')) {
            modalContent.innerHTML = '';
            modalZuckContainer.style.display = 'none';
            modalZuckContainer.classList.remove('closed');
            modalZuckContainer.classList.remove('animated');
          }
        });

        document.body.appendChild(modalZuckContainer);
      }

      const modalContent = query('#zuck-modal-content');

      const moveStoryItem = function (direction) {
        const modalContainer = query('#zuck-modal');

        let target = '';
        let useless = '';
        let transform = 0;

        const modalSlider = query(`#zuck-modal-slider-${id}`);
        const slideItems = {
          previous: query('#zuck-modal .story-viewer.previous'),
          next: query('#zuck-modal .story-viewer.next'),
          viewing: query('#zuck-modal .story-viewer.viewing')
        };

        if (
          (!slideItems.previous && !direction) ||
            (!slideItems.next && direction)
        ) {
          if (!option('rtl')) {
            return false;
          }
        }

        if (!direction) {
          target = 'previous';
          useless = 'next';
        } else {
          target = 'next';
          useless = 'previous';
        }

        const transitionTime = 600;
        if (option('cubeEffect')) {
          if (target === 'previous') {
            transform = modalContainer.slideWidth;
          } else if (target === 'next') {
            transform = modalContainer.slideWidth * -1;
          }
        } else {
          transform = findPos(slideItems[target])[0] * -1;
        }

        translate(modalSlider, transform, transitionTime, null);

        setTimeout(() => {
          // set page data when transition complete
          if (option('rtl')) {
            const tmp = target;
            target = useless;
            useless = tmp;
          }

          if (target !== '' && slideItems[target] && useless !== '') {
            const currentStory = slideItems[target].getAttribute('data-story-id');
            zuck.internalData.currentStory = currentStory;

            const oldStory = query(`#zuck-modal .story-viewer.${useless}`);
            if (oldStory) {
              oldStory.parentNode.removeChild(oldStory);
            }

            if (slideItems.viewing) {
              slideItems.viewing.classList.add('stopped');
              slideItems.viewing.classList.add(useless);
              slideItems.viewing.classList.remove('viewing');
            }

            if (slideItems[target]) {
              slideItems[target].classList.remove('stopped');
              slideItems[target].classList.remove(target);
              slideItems[target].classList.add('viewing');
            }

            const newStoryData = getStoryMorningGlory(target);
            if (newStoryData) {
              createStoryViewer(newStoryData, target);
            }

            const storyId = zuck.internalData.currentStory;
            let items = query(`#zuck-modal [data-story-id="${storyId}"]`);

            if (items) {
              items = items.querySelectorAll('[data-index].active');
              const duration = items[0].firstElementChild;

              zuck.data[storyId].currentItem = parseInt(
                items[0].getAttribute('data-index'),
                10
              );

              items[0].innerHTML =
                  `<b style="${duration.style.cssText}"></b>`;
              onAnimationEnd(items[0].firstElementChild, () => {
                zuck.nextItem(false);
              });
            }

            translate(modalSlider, '0', 0, null);

            if (items) {
              const storyViewer = query(`#zuck-modal .story-viewer[data-story-id="${currentStory}"]`);

              playVideoItem(storyViewer, [items[0], items[1]], true);
            }

            option('callbacks', 'onView')(zuck.internalData.currentStory);
          }
        }, transitionTime + 50);
      };

      const createStoryViewer = function (storyData, className, forcePlay) {
        const modalSlider = query(`#zuck-modal-slider-${id}`);
        const storyItems = get(storyData, 'items');

        storyData.timeAgo = storyItems && storyItems[0] ? timeAgo(get(storyItems[0], 'time')) : '';

        let htmlItems = '';
        let pointerItems = '';

        const storyId = get(storyData, 'id');
        const slides = document.createElement('div');
        const currentItem = get(storyData, 'currentItem') || 0;
        const exists = query(`#zuck-modal .story-viewer[data-story-id="${storyId}"]`);

        if (exists) {
          return false;
        }

        slides.className = 'slides';
        each(storyItems, (i, item) => {
          item.timeAgo = timeAgo(get(item, 'time'));

          if (currentItem > i) {
            storyData.items[i].timeAgo = item.timeAgo;
            storyData.items[i].seen = true;
            item.seen = true;
          }

          pointerItems += option('template', 'viewerItemPointer')(i, currentItem, item);
          htmlItems += option('template', 'viewerItemBody')(i, currentItem, item);
        });

        slides.innerHTML = htmlItems;

        const video = slides.querySelector('video');
        const addMuted = function (video) {
          if (video.muted) {
            storyViewer.classList.add('muted');
          } else {
            storyViewer.classList.remove('muted');
          }
        };

        if (video) {
          video.onwaiting = e => {
            if (video.paused) {
              storyViewer.classList.add('paused');
              storyViewer.classList.add('loading');
            }
          };

          video.onplay = () => {
            addMuted(video);

            storyViewer.classList.remove('stopped');
            storyViewer.classList.remove('paused');
            storyViewer.classList.remove('loading');
          };

          video.onload = video.onplaying = video.oncanplay = () => {
            addMuted(video);

            storyViewer.classList.remove('loading');
          };

          video.onvolumechange = () => {
            addMuted(video);
          };
        }

        const storyViewerWrap = document.createElement('div');
        storyViewerWrap.innerHTML = option('template', 'viewerItem')(storyData, currentItem);

        const storyViewer = storyViewerWrap.firstElementChild;

        storyViewer.className = `story-viewer muted ${className} ${!forcePlay ? 'stopped' : ''} ${option('backButton') ? 'with-back-button' : ''}`;

        storyViewer.setAttribute('data-story-id', storyId);
        storyViewer.querySelector('.slides-pointers .wrap').innerHTML = pointerItems;

        each(storyViewer.querySelectorAll('.close, .back'), (i, el) => {
          el.onclick = e => {
            e.preventDefault();
            modal.close();
          };
        });

        storyViewer.appendChild(slides);

        if (className === 'viewing') {
          playVideoItem(storyViewer, storyViewer.querySelectorAll(`[data-index="${currentItem}"].active`), false);
        }

        each(storyViewer.querySelectorAll('.slides-pointers [data-index] > b'), (i, el) => {
          onAnimationEnd(el, () => {
            zuck.nextItem(false);
          });
        });

        if (className === 'previous') {
          prepend(modalSlider, storyViewer);
        } else {
          modalSlider.appendChild(storyViewer);
        }
      };

      const createStoryTouchEvents = function (modalSliderElement) {
        const modalContainer = query('#zuck-modal');
        const enableMouseEvents = true;

        const modalSlider = modalSliderElement;

        let position = {};
        let touchOffset = null;
        let isScrolling = null;
        let delta = null;
        let timer = null;
        let nextTimer = null;

        const touchStart = function (event) {
          const storyViewer = query('#zuck-modal .viewing');

          if (event.target.nodeName === 'A') {
            return;
          }

          const touches = event.touches ? event.touches[0] : event;
          const pos = findPos(query('#zuck-modal .story-viewer.viewing'));

          modalContainer.slideWidth = query('#zuck-modal .story-viewer').offsetWidth;
          modalContainer.slideHeight = query('#zuck-modal .story-viewer').offsetHeight;

          position = {
            x: pos[0],
            y: pos[1]
          };

          const clientX = touches.clientX;
          const clientY = touches.clientY;

          touchOffset = {
            x: clientX,
            y: clientY,
            time: Date.now(),
            valid: true
          };

          if (clientY < 80 || clientY > (modalContainer.slideHeight - 80)) {
            touchOffset.valid = false;
          } else {
            event.preventDefault();

            isScrolling = undefined;
            delta = {};

            if (enableMouseEvents) {
              modalSlider.addEventListener('mousemove', touchMove);
              modalSlider.addEventListener('mouseup', touchEnd);
              modalSlider.addEventListener('mouseleave', touchEnd);
            }
            modalSlider.addEventListener('touchmove', touchMove);
            modalSlider.addEventListener('touchend', touchEnd);

            if (storyViewer) {
              storyViewer.classList.add('paused');
            }

            pauseVideoItem();

            timer = setTimeout(() => {
              storyViewer.classList.add('longPress');
            }, 600);

            nextTimer = setTimeout(() => {
              clearInterval(nextTimer);
              nextTimer = false;
            }, 250);
          }
        };

        const touchMove = function (event) {
          const touches = event.touches ? event.touches[0] : event;
          const clientX = touches.clientX;
          const clientY = touches.clientY;

          if (touchOffset && touchOffset.valid) {
            delta = {
              x: clientX - touchOffset.x,
              y: clientY - touchOffset.y
            };

            if (typeof isScrolling === 'undefined') {
              isScrolling = !!(
                isScrolling || Math.abs(delta.x) < Math.abs(delta.y)
              );
            }

            if (!isScrolling && touchOffset) {
              event.preventDefault();

              translate(modalSlider, position.x + delta.x, 0, null);
            }
          }
        };

        const touchEnd = function (event) {
          const storyViewer = query('#zuck-modal .viewing');
          const lastTouchOffset = touchOffset;

          const duration = touchOffset ? Date.now() - touchOffset.time : undefined;
          const isValid = (Number(duration) < 300 && Math.abs(delta.x) > 25) || Math.abs(delta.x) > modalContainer.slideWidth / 3;
          const direction = delta.x < 0;

          const index = direction ? query('#zuck-modal .story-viewer.next') : query('#zuck-modal .story-viewer.previous');
          const isOutOfBounds = (direction && !index) || (!direction && !index);

          if (touchOffset && !touchOffset.valid) {

          } else {
            if (delta) {
              if (!isScrolling) {
                if (isValid && !isOutOfBounds) {
                  moveStoryItem(direction);
                } else {
                  translate(modalSlider, position.x, 300);
                }
              }

              touchOffset = undefined;

              if (enableMouseEvents) {
                modalSlider.removeEventListener('mousemove', touchMove);
                modalSlider.removeEventListener('mouseup', touchEnd);
                modalSlider.removeEventListener('mouseleave', touchEnd);
              }
              modalSlider.removeEventListener('touchmove', touchMove);
              modalSlider.removeEventListener('touchend', touchEnd);
            }

            const video = zuck.internalData.currentVideoElement;

            if (timer) {
              clearInterval(timer);
            }

            if (storyViewer) {
              playVideoItem(storyViewer, storyViewer.querySelectorAll('.active'), false);
              storyViewer.classList.remove('longPress');
              storyViewer.classList.remove('paused');
            }

            if (nextTimer) {
              clearInterval(nextTimer);
              nextTimer = false;

              const navigateItem = function () {
                if (!direction) {
                  if (lastTouchOffset.x > window.screen.availWidth / 3 || !option('previousTap')) {
                    if (option('rtl')) {
                      zuck.navigateItem('previous', event);
                    } else {
                      zuck.navigateItem('next', event);
                    }
                  } else {
                    if (option('rtl')) {
                      zuck.navigateItem('next', event);
                    } else {
                      zuck.navigateItem('previous', event);
                    }
                  }
                }
              };

              const storyViewerViewing = query('#zuck-modal .viewing');

              if (storyViewerViewing && video) {
                if (storyViewerViewing.classList.contains('muted')) {
                  unmuteVideoItem(video, storyViewerViewing);
                } else {
                  navigateItem();
                }
              } else {
                navigateItem();

                return false;
              }
            }
          }
        };

        modalSlider.addEventListener('touchstart', touchStart);
        if (enableMouseEvents) {
          modalSlider.addEventListener('mousedown', touchStart);
        }
      };

      return {
        show (storyId, page) {
          const modalContainer = query('#zuck-modal');

          const callback = function () {
            modalContent.innerHTML = `<div id="zuck-modal-slider-${id}" class="slider"></div>`;

            const storyData = zuck.data[storyId];
            const currentItem = storyData.currentItem || 0;
            const modalSlider = query(`#zuck-modal-slider-${id}`);

            createStoryTouchEvents(modalSlider);

            zuck.internalData.currentStory = storyId;
            storyData.currentItem = currentItem;

            if (option('backNative')) {
              window.location.hash = `#!${id}`;
            }

            const previousItemData = getStoryMorningGlory('previous');
            if (previousItemData) {
              createStoryViewer(previousItemData, 'previous');
            }

            createStoryViewer(storyData, 'viewing', true);

            const nextItemData = getStoryMorningGlory('next');
            if (nextItemData) {
              createStoryViewer(nextItemData, 'next');
            }

            if (option('autoFullScreen')) {
              modalContainer.classList.add('fullscreen');
            }

            const tryFullScreen = function () {
              if (
                modalContainer.classList.contains('fullscreen') &&
                  option('autoFullScreen') &&
                  window.screen.availWidth <= 1024
              ) {
                fullScreen(modalContainer);
              }

              modalContainer.focus();
            };

            if (option('openEffect')) {
              const storyEl = query(
                `#${id} [data-id="${storyId}"] .item-preview`
              );
              const pos = findPos(storyEl);

              modalContainer.style.marginLeft = `${pos[0] + storyEl.offsetWidth / 2}px`;
              modalContainer.style.marginTop = `${pos[1] + storyEl.offsetHeight / 2}px`;
              modalContainer.style.display = 'block';

              modalContainer.slideWidth = query('#zuck-modal .story-viewer').offsetWidth;

              setTimeout(() => {
                modalContainer.classList.add('animated');
              }, 10);

              setTimeout(() => {
                tryFullScreen();
              }, 300); // because effects
            } else {
              modalContainer.style.display = 'block';
              modalContainer.slideWidth = query('#zuck-modal .story-viewer').offsetWidth;

              tryFullScreen();
            }

            option('callbacks', 'onView')(storyId);
          };

          option('callbacks', 'onOpen')(storyId, callback);
        },
        next (unmute) {
          const callback = function () {
            const lastStory = zuck.internalData.currentStory;
            const lastStoryTimelineElement = query(
              `#${id} [data-id="${lastStory}"]`
            );

            if (lastStoryTimelineElement) {
              lastStoryTimelineElement.classList.add('seen');

              zuck.data[lastStory].seen = true;
              zuck.internalData.seenItems[lastStory] = true;

              saveLocalData('seenItems', zuck.internalData.seenItems);
              updateStorySeenPosition();
            }

            const stories = query('#zuck-modal .story-viewer.next');
            if (!stories) {
              modal.close();
            } else {
              if (option('rtl')) {
                moveStoryItem(false);
              } else {
                moveStoryItem(true);
              }
            }
          };

          option('callbacks', 'onEnd')(
            zuck.internalData.currentStory,
            callback
          );
        },
        close () {
          const modalContainer = query('#zuck-modal');

          const callback = function () {
            if (option('backNative')) {
              window.location.hash = '';
            }

            fullScreen(modalContainer, true);

            if (option('openEffect')) {
              modalContainer.classList.add('closed');
            } else {
              modalContent.innerHTML = '';
              modalContainer.style.display = 'none';
            }
          };

          option('callbacks', 'onClose')(zuck.internalData.currentStory, callback);
        }
      };
    };

    const modal = ZuckModal();

    /* parse functions */
    const parseItems = function (story, forceUpdate) {
      const storyId = story.getAttribute('data-id');
      const storyItems = document.querySelectorAll(`#${id} [data-id="${storyId}"] .items > li`);
      const items = [];

      if (!option('reactive') || forceUpdate) {
        each(storyItems, (i, { firstElementChild }) => {
          const a = firstElementChild;
          const img = a.firstElementChild;

          const item = {
            id: a.getAttribute('data-id'),
            src: a.getAttribute('href'),
            length: a.getAttribute('data-length'),
            type: a.getAttribute('data-type'),
            time: a.getAttribute('data-time'),
            link: a.getAttribute('data-link'),
            linkText: a.getAttribute('data-linkText'),
            preview: img.getAttribute('src')
          };

          // collect all attributes
          const all = a.attributes;
          // exclude the reserved options
          const reserved = ['data-id', 'href', 'data-length', 'data-type', 'data-time', 'data-link', 'data-linktext'];
          for (let z = 0; z < all.length; z++) {
            if (reserved.indexOf(all[z].nodeName) === -1) {
              item[all[z].nodeName.replace('data-', '')] = all[z].nodeValue;
            }
          }

          // destruct the remaining attributes as options
          items.push(item);
        });

        zuck.data[storyId].items = items;

        const callback = option('callbacks', 'onDataUpdate');
        if (callback) {
          callback(zuck.data, () => {});
        }
      }
    };

    const parseStory = function (story, returnCallback) {
      const storyId = story.getAttribute('data-id');

      let seen = false;

      if (zuck.internalData.seenItems[storyId]) {
        seen = true;
      }

      /*
      REACT
      if (seen) {
        story.classList.add('seen');
      } else {
        story.classList.remove('seen');
      }
      */

      try {
        if (!zuck.data[storyId]) {
          zuck.data[storyId] = {};
        }

        zuck.data[storyId].id = storyId; // story id
        zuck.data[storyId].photo = story.getAttribute('data-photo'); // story preview (or user photo)
        zuck.data[storyId].name = story.querySelector('.name').innerText;
        zuck.data[storyId].link = story.querySelector('.item-link').getAttribute('href');
        zuck.data[storyId].lastUpdated = story.getAttribute('data-last-updated');
        zuck.data[storyId].seen = seen;

        if (!zuck.data[storyId].items) {
          zuck.data[storyId].items = [];
          zuck.data[storyId].noItems = true;
        }
      } catch (e) {
        zuck.data[storyId] = {
          items: []
        };
      }

      story.onclick = e => {
        e.preventDefault();

        modal.show(storyId);
      };

      const callback = option('callbacks', 'onDataUpdate');
      if (callback) {
        callback(zuck.data, () => {});
      }
    };

    // BIBLICAL
    const getStoryMorningGlory = function (what) {
      // my wife told me to stop singing Wonderwall. I SAID MAYBE.

      const currentStory = zuck.internalData.currentStory;
      const whatElementYouMean = `${what}ElementSibling`;

      if (currentStory) {
        const foundStory = query(`#${id} [data-id="${currentStory}"]`)[whatElementYouMean];

        if (foundStory) {
          const storyId = foundStory.getAttribute('data-id');
          const data = zuck.data[storyId] || false;

          return data;
        }
      }

      return false;
    };

    const updateStorySeenPosition = function () {
      each(document.querySelectorAll(`#${id} .story.seen`), (i, el) => {
        const newData = zuck.data[el.getAttribute('data-id')];
        const timeline = el.parentNode;

        if (!option('reactive')) {
          timeline.removeChild(el);
        }

        zuck.update(newData, true);
      });
    };

    const playVideoItem = function (storyViewer, elements, unmute) {
      const itemElement = elements[1];
      const itemPointer = elements[0];

      if (!itemElement || !itemPointer) {
        return false;
      }

      const cur = zuck.internalData.currentVideoElement;
      if (cur) {
        cur.pause();
      }

      if (itemElement.getAttribute('data-type') === 'video') {
        const video = itemElement.getElementsByTagName('video')[0];
        if (!video) {
          zuck.internalData.currentVideoElement = false;

          return false;
        }

        const setDuration = function () {
          if (video.duration) {
            setVendorVariable(
              itemPointer.getElementsByTagName('b')[0].style,
              'AnimationDuration',
              `${video.duration}s`
            );
          }
        };

        setDuration();
        video.addEventListener('loadedmetadata', setDuration);
        zuck.internalData.currentVideoElement = video;

        video.play();

        if (unmute && unmute.target) {
          unmuteVideoItem(video, storyViewer);
        }
      } else {
        zuck.internalData.currentVideoElement = false;
      }
    };

    const pauseVideoItem = function () {
      const video = zuck.internalData.currentVideoElement;
      if (video) {
        try {
          video.pause();
        } catch (e) {}
      }
    };

    const unmuteVideoItem = function (video, storyViewer) {
      video.muted = false;
      video.volume = 1.0;
      video.removeAttribute('muted');
      video.play();

      if (video.paused) {
        video.muted = true;
        video.play();
      }

      if (storyViewer) {
        storyViewer.classList.remove('paused');
      }
    };

    /* data functions */
    const saveLocalData = function (key, data) {
      try {
        if (option('localStorage')) {
          const keyName = `zuck-${id}-${key}`;

          window.localStorage[keyName] = JSON.stringify(data);
        }
      } catch (e) {}
    };

    const getLocalData = function (key) {
      if (option('localStorage')) {
        const keyName = `zuck-${id}-${key}`;

        return window.localStorage[keyName]
          ? JSON.parse(window.localStorage[keyName])
          : false;
      } else {
        return false;
      }
    };

    /* api */
    zuck.data = option('stories') || {};
    zuck.internalData = {};
    zuck.internalData.seenItems = getLocalData('seenItems') || {};

    zuck.add = zuck.update = (data, append) => {
      const storyId = get(data, 'id');
      const storyEl = query(`#${id} [data-id="${storyId}"]`);
      const items = get(data, 'items');

      let story;
      let preview = false;

      if (items[0]) {
        preview = items[0].preview || '';
      }

      if (zuck.internalData.seenItems[storyId] === true) {
        data.seen = true;
      }

      data.currentPreview = preview;

      if (!storyEl) {
        const storyItem = document.createElement('div');
        storyItem.innerHTML = option('template', 'timelineItem')(data);

        story = storyItem.firstElementChild;
      } else {
        story = storyEl;
      }

      if (data.seen === false) {
        zuck.internalData.seenItems[storyId] = false;

        saveLocalData('seenItems', zuck.internalData.seenItems);
      }

      story.setAttribute('data-id', storyId);
      story.setAttribute('data-photo', get(data, 'photo'));
      story.setAttribute('data-last-updated', get(data, 'lastUpdated'));

      parseStory(story);

      if (!storyEl && !option('reactive')) {
        if (append) {
          timeline.appendChild(story);
        } else {
          prepend(timeline, story);
        }
      }

      each(items, (i, item) => {
        zuck.addItem(storyId, item, append);
      });

      if (!append) {
        updateStorySeenPosition();
      }
    };

    zuck.next = () => {
      modal.next();
    };

    zuck.remove = (storyId) => {
      const story = query(`#${id} > [data-id="${storyId}"]`);

      story.parentNode.removeChild(story);
    };

    zuck.addItem = (storyId, data, append) => {
      const story = query(`#${id} > [data-id="${storyId}"]`);

      if (!option('reactive')) {
        const li = document.createElement('li');
        const el = story.querySelectorAll('.items')[0];

        li.className = get(data, 'seen') ? 'seen' : '';
        li.setAttribute('data-id', get(data, 'id'));

        // wow, too much jsx
        li.innerHTML = option('template', 'timelineStoryItem')(data);

        if (append) {
          el.appendChild(li);
        } else {
          prepend(el, li);
        }
      }

      parseItems(story);
    };

    zuck.removeItem = (storyId, itemId) => {
      const item = query(`#${id} > [data-id="${storyId}"] [data-id="${itemId}"]`);

      if (!option('reactive')) {
        timeline.parentNode.removeChild(item);
      }
    };

    zuck.navigateItem = zuck.nextItem = (direction, event) => {
      const currentStory = zuck.internalData.currentStory;
      const currentItem = zuck.data[currentStory].currentItem;
      const storyViewer = query(`#zuck-modal .story-viewer[data-story-id="${currentStory}"]`);
      const directionNumber = direction === 'previous' ? -1 : 1;

      if (!storyViewer || storyViewer.touchMove === 1) {
        return false;
      }

      const currentItemElements = storyViewer.querySelectorAll(`[data-index="${currentItem}"]`);
      const currentPointer = currentItemElements[0];
      const currentItemElement = currentItemElements[1];

      const navigateItem = currentItem + directionNumber;
      const nextItems = storyViewer.querySelectorAll(`[data-index="${navigateItem}"]`);
      const nextPointer = nextItems[0];
      const nextItem = nextItems[1];

      if (storyViewer && nextPointer && nextItem) {
        const navigateItemCallback = function () {
          if (direction === 'previous') {
            currentPointer.classList.remove('seen');
            currentItemElement.classList.remove('seen');
          } else {
            currentPointer.classList.add('seen');
            currentItemElement.classList.add('seen');
          }

          currentPointer.classList.remove('active');
          currentItemElement.classList.remove('active');

          nextPointer.classList.remove('seen');
          nextPointer.classList.add('active');

          nextItem.classList.remove('seen');
          nextItem.classList.add('active');

          each(storyViewer.querySelectorAll('.time'), (i, el) => {
            el.innerText = timeAgo(nextItem.getAttribute('data-time'));
          });

          zuck.data[currentStory].currentItem = zuck.data[currentStory].currentItem + directionNumber;

          playVideoItem(storyViewer, nextItems, event);
        };

        let callback = option('callbacks', 'onNavigateItem');
        callback = !callback ? option('callbacks', 'onNextItem') : option('callbacks', 'onNavigateItem');

        callback(currentStory, nextItem.getAttribute('data-story-id'), navigateItemCallback);
      } else if (storyViewer) {
        if (direction !== 'previous') {
          modal.next(event);
        }
      }
    };

    const init = function () {
      if (timeline && timeline.querySelector('.story')) {
        each(timeline.querySelectorAll('.story'), (storyIndex, story) => {
          parseStory(story);
        });
      }

      if (option('backNative')) {
        if (window.location.hash === `#!${id}`) {
          window.location.hash = '';
        }

        window.addEventListener(
          'popstate',
          e => {
            if (window.location.hash !== `#!${id}`) {
              window.location.hash = '';
            }
          },
          false
        );
      }

      if (!option('reactive')) {
        const seenItems = getLocalData('seenItems');

        each(Object.keys(seenItems), (keyIndex, key) => {
          if (zuck.data[key]) {
            zuck.data[key].seen = seenItems[key];
          }
        });
      }

      each(option('stories'), (itemKey, item) => {
        zuck.add(item, true);
      });

      updateStorySeenPosition();

      const avatars = option('avatars') ? 'user-icon' : 'story-preview';
      const list = option('list') ? 'list' : 'carousel';
      const rtl = option('rtl') ? 'rtl' : '';

      timeline.className += ` stories ${avatars} ${list} ${(`${option('skin')}`).toLowerCase()} ${rtl}`;

      return zuck;
    };

    return init();
  };

  /* Helpers */
  ZuckJS.buildTimelineItem = (id, photo, name, link, lastUpdated, items) => {
    const timelineItem = {
      id,
      photo,
      name,
      link,
      lastUpdated,
      items: []
    };

    each(items, (itemIndex, itemArgs) => {
      timelineItem.items.push(ZuckJS.buildStoryItem.apply(ZuckJS, itemArgs));
    });

    return timelineItem;
  };

  ZuckJS.buildStoryItem = (id, type, length, src, preview, link, linkText, seen, time) => {
    return {
      id,
      type,
      length,
      src,
      preview,
      link,
      linkText,
      seen,
      time
    };
  };

  /* Legacy code */
  ZuckJS.buildItem = ZuckJS.buildStoryItem;

  // CommonJS and Node.js module support.
  if (true) {
    // Support Node.js specific `module.exports` (which can be a function)
    if ( true && module.exports) {
      exports = module.exports = ZuckJS;
    }
    // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
    exports.ZuckJS = ZuckJS;
  } else {}

  return ZuckJS;
})(window || {});


/***/ }),

/***/ "./resources/assets/js/components/AnnouncementsCard.vue":
/*!**************************************************************!*\
  !*** ./resources/assets/js/components/AnnouncementsCard.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AnnouncementsCard_vue_vue_type_template_id_043c5615_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true& */ "./resources/assets/js/components/AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true&");
/* harmony import */ var _AnnouncementsCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AnnouncementsCard.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/AnnouncementsCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css& */ "./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _AnnouncementsCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AnnouncementsCard_vue_vue_type_template_id_043c5615_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AnnouncementsCard_vue_vue_type_template_id_043c5615_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "043c5615",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/AnnouncementsCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/AnnouncementsCard.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/AnnouncementsCard.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AnnouncementsCard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css&":
/*!***********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css& ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=style&index=0&id=043c5615&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_style_index_0_id_043c5615_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_template_id_043c5615_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/AnnouncementsCard.vue?vue&type=template&id=043c5615&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_template_id_043c5615_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AnnouncementsCard_vue_vue_type_template_id_043c5615_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/NotificationCard.vue":
/*!*************************************************************!*\
  !*** ./resources/assets/js/components/NotificationCard.vue ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NotificationCard_vue_vue_type_template_id_0b80af52_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true& */ "./resources/assets/js/components/NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true&");
/* harmony import */ var _NotificationCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NotificationCard.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/NotificationCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _NotificationCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _NotificationCard_vue_vue_type_template_id_0b80af52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _NotificationCard_vue_vue_type_template_id_0b80af52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "0b80af52",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/NotificationCard.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/NotificationCard.vue?vue&type=script&lang=js&":
/*!**************************************************************************************!*\
  !*** ./resources/assets/js/components/NotificationCard.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./NotificationCard.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NotificationCard.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationCard_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true&":
/*!********************************************************************************************************!*\
  !*** ./resources/assets/js/components/NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true& ***!
  \********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationCard_vue_vue_type_template_id_0b80af52_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/NotificationCard.vue?vue&type=template&id=0b80af52&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationCard_vue_vue_type_template_id_0b80af52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NotificationCard_vue_vue_type_template_id_0b80af52_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/PostMenu.vue":
/*!*****************************************************!*\
  !*** ./resources/assets/js/components/PostMenu.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PostMenu_vue_vue_type_template_id_bb77b854_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PostMenu.vue?vue&type=template&id=bb77b854&scoped=true& */ "./resources/assets/js/components/PostMenu.vue?vue&type=template&id=bb77b854&scoped=true&");
/* harmony import */ var _PostMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PostMenu.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/PostMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css& */ "./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PostMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PostMenu_vue_vue_type_template_id_bb77b854_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PostMenu_vue_vue_type_template_id_bb77b854_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "bb77b854",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/PostMenu.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/PostMenu.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/assets/js/components/PostMenu.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./PostMenu.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=style&index=0&id=bb77b854&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_style_index_0_id_bb77b854_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/PostMenu.vue?vue&type=template&id=bb77b854&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/js/components/PostMenu.vue?vue&type=template&id=bb77b854&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_template_id_bb77b854_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./PostMenu.vue?vue&type=template&id=bb77b854&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/PostMenu.vue?vue&type=template&id=bb77b854&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_template_id_bb77b854_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PostMenu_vue_vue_type_template_id_bb77b854_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/StoryTimelineComponent.vue":
/*!*******************************************************************!*\
  !*** ./resources/assets/js/components/StoryTimelineComponent.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StoryTimelineComponent_vue_vue_type_template_id_3ffb4cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true& */ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true&");
/* harmony import */ var _StoryTimelineComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StoryTimelineComponent.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css& */ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css&");
/* harmony import */ var _StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StoryTimelineComponent.vue?vue&type=style&index=1&lang=css& */ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");







/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
  _StoryTimelineComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StoryTimelineComponent_vue_vue_type_template_id_3ffb4cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StoryTimelineComponent_vue_vue_type_template_id_3ffb4cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "3ffb4cbe",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/StoryTimelineComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryTimelineComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css&":
/*!****************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css& ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=0&id=3ffb4cbe&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_0_id_3ffb4cbe_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css& ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryTimelineComponent.vue?vue&type=style&index=1&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=style&index=1&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_style_index_1_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_template_id_3ffb4cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryTimelineComponent.vue?vue&type=template&id=3ffb4cbe&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_template_id_3ffb4cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryTimelineComponent_vue_vue_type_template_id_3ffb4cbe_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/Timeline.vue":
/*!*****************************************************!*\
  !*** ./resources/assets/js/components/Timeline.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Timeline_vue_vue_type_template_id_40ef44f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Timeline.vue?vue&type=template&id=40ef44f8&scoped=true& */ "./resources/assets/js/components/Timeline.vue?vue&type=template&id=40ef44f8&scoped=true&");
/* harmony import */ var _Timeline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timeline.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Timeline.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css& */ "./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Timeline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Timeline_vue_vue_type_template_id_40ef44f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Timeline_vue_vue_type_template_id_40ef44f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "40ef44f8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Timeline.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Timeline.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/assets/js/components/Timeline.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Timeline.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css&":
/*!**************************************************************************************************************!*\
  !*** ./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css& ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=style&index=0&id=40ef44f8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_style_index_0_id_40ef44f8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/Timeline.vue?vue&type=template&id=40ef44f8&scoped=true&":
/*!************************************************************************************************!*\
  !*** ./resources/assets/js/components/Timeline.vue?vue&type=template&id=40ef44f8&scoped=true& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_template_id_40ef44f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Timeline.vue?vue&type=template&id=40ef44f8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Timeline.vue?vue&type=template&id=40ef44f8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_template_id_40ef44f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Timeline_vue_vue_type_template_id_40ef44f8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/MixedAlbumPresenter.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MixedAlbumPresenter_vue_vue_type_template_id_66084274___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MixedAlbumPresenter.vue?vue&type=template&id=66084274& */ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=template&id=66084274&");
/* harmony import */ var _MixedAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MixedAlbumPresenter.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MixedAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MixedAlbumPresenter_vue_vue_type_template_id_66084274___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MixedAlbumPresenter_vue_vue_type_template_id_66084274___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/presenter/MixedAlbumPresenter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MixedAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MixedAlbumPresenter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MixedAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=template&id=66084274&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=template&id=66084274& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MixedAlbumPresenter_vue_vue_type_template_id_66084274___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MixedAlbumPresenter.vue?vue&type=template&id=66084274& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/MixedAlbumPresenter.vue?vue&type=template&id=66084274&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MixedAlbumPresenter_vue_vue_type_template_id_66084274___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MixedAlbumPresenter_vue_vue_type_template_id_66084274___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoAlbumPresenter_vue_vue_type_template_id_1c78113d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true& */ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true&");
/* harmony import */ var _PhotoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoAlbumPresenter.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css& */ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PhotoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PhotoAlbumPresenter_vue_vue_type_template_id_1c78113d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PhotoAlbumPresenter_vue_vue_type_template_id_1c78113d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1c78113d",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/presenter/PhotoAlbumPresenter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoAlbumPresenter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css&":
/*!***********************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--9-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--9-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=style&index=0&id=1c78113d&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_style_index_0_id_1c78113d_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true&":
/*!*********************************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true& ***!
  \*********************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_template_id_1c78113d_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue?vue&type=template&id=1c78113d&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_template_id_1c78113d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoAlbumPresenter_vue_vue_type_template_id_1c78113d_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoPresenter.vue":
/*!*********************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoPresenter.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PhotoPresenter_vue_vue_type_template_id_88c038d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true& */ "./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true&");
/* harmony import */ var _PhotoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PhotoPresenter.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css& */ "./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _PhotoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PhotoPresenter_vue_vue_type_template_id_88c038d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PhotoPresenter_vue_vue_type_template_id_88c038d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "88c038d8",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/presenter/PhotoPresenter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoPresenter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css&":
/*!******************************************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css& ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--9-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--9-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=style&index=0&id=88c038d8&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_style_index_0_id_88c038d8_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_template_id_88c038d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/PhotoPresenter.vue?vue&type=template&id=88c038d8&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_template_id_88c038d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PhotoPresenter_vue_vue_type_template_id_88c038d8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue":
/*!**************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/VideoAlbumPresenter.vue ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoAlbumPresenter_vue_vue_type_template_id_43194746___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoAlbumPresenter.vue?vue&type=template&id=43194746& */ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=template&id=43194746&");
/* harmony import */ var _VideoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoAlbumPresenter.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoAlbumPresenter_vue_vue_type_template_id_43194746___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoAlbumPresenter_vue_vue_type_template_id_43194746___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/presenter/VideoAlbumPresenter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoAlbumPresenter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoAlbumPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=template&id=43194746&":
/*!*********************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=template&id=43194746& ***!
  \*********************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoAlbumPresenter_vue_vue_type_template_id_43194746___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoAlbumPresenter.vue?vue&type=template&id=43194746& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoAlbumPresenter.vue?vue&type=template&id=43194746&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoAlbumPresenter_vue_vue_type_template_id_43194746___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoAlbumPresenter_vue_vue_type_template_id_43194746___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/presenter/VideoPresenter.vue":
/*!*********************************************************************!*\
  !*** ./resources/assets/js/components/presenter/VideoPresenter.vue ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoPresenter_vue_vue_type_template_id_9ad5682a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VideoPresenter.vue?vue&type=template&id=9ad5682a& */ "./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=template&id=9ad5682a&");
/* harmony import */ var _VideoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VideoPresenter.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VideoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoPresenter_vue_vue_type_template_id_9ad5682a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VideoPresenter_vue_vue_type_template_id_9ad5682a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/presenter/VideoPresenter.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoPresenter.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPresenter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=template&id=9ad5682a&":
/*!****************************************************************************************************!*\
  !*** ./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=template&id=9ad5682a& ***!
  \****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPresenter_vue_vue_type_template_id_9ad5682a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./VideoPresenter.vue?vue&type=template&id=9ad5682a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/presenter/VideoPresenter.vue?vue&type=template&id=9ad5682a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPresenter_vue_vue_type_template_id_9ad5682a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPresenter_vue_vue_type_template_id_9ad5682a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/timeline.js":
/*!*****************************************!*\
  !*** ./resources/assets/js/timeline.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('notification-card', __webpack_require__(/*! ./components/NotificationCard.vue */ "./resources/assets/js/components/NotificationCard.vue")["default"]);
Vue.component('photo-presenter', __webpack_require__(/*! ./components/presenter/PhotoPresenter.vue */ "./resources/assets/js/components/presenter/PhotoPresenter.vue")["default"]);
Vue.component('video-presenter', __webpack_require__(/*! ./components/presenter/VideoPresenter.vue */ "./resources/assets/js/components/presenter/VideoPresenter.vue")["default"]);
Vue.component('photo-album-presenter', __webpack_require__(/*! ./components/presenter/PhotoAlbumPresenter.vue */ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue")["default"]);
Vue.component('video-album-presenter', __webpack_require__(/*! ./components/presenter/VideoAlbumPresenter.vue */ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue")["default"]);
Vue.component('mixed-album-presenter', __webpack_require__(/*! ./components/presenter/MixedAlbumPresenter.vue */ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue")["default"]);
Vue.component('post-menu', __webpack_require__(/*! ./components/PostMenu.vue */ "./resources/assets/js/components/PostMenu.vue")["default"]);
Vue.component('timeline', __webpack_require__(/*! ./components/Timeline.vue */ "./resources/assets/js/components/Timeline.vue")["default"]);
Vue.component('announcements-card', __webpack_require__(/*! ./components/AnnouncementsCard.vue */ "./resources/assets/js/components/AnnouncementsCard.vue")["default"]);
Vue.component('story-component', __webpack_require__(/*! ./components/StoryTimelineComponent.vue */ "./resources/assets/js/components/StoryTimelineComponent.vue")["default"]);

/***/ }),

/***/ 6:
/*!***********************************************!*\
  !*** multi ./resources/assets/js/timeline.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/timeline.js */"./resources/assets/js/timeline.js");


/***/ })

},[[6,"/js/manifest"]]]);