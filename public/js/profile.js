(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/profile"],{

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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Profile.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_masonry_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-masonry-css */ "./node_modules/vue-masonry-css/dist/vue-masonry.es2015.js");
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

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['profile-id', 'profile-layout', 'profile-settings', 'profile-username'],
  data: function data() {
    return {
      ids: [],
      profile: {},
      user: false,
      timeline: [],
      timelinePage: 2,
      min_id: 0,
      max_id: 0,
      loading: true,
      owner: false,
      layout: this.profileLayout,
      mode: 'grid',
      modes: ['grid', 'collections', 'bookmarks'],
      modalStatus: false,
      relationship: {},
      followers: [],
      followerCursor: 1,
      followerMore: true,
      following: [],
      followingCursor: 1,
      followingMore: true,
      warning: false,
      sponsorList: [],
      bookmarks: [],
      bookmarksPage: 2,
      collections: [],
      collectionsPage: 2,
      isMobile: false,
      ctxEmbedPayload: null,
      copiedEmbed: false,
      hasStory: null,
      followingModalSearch: null,
      followingModalSearchCache: null,
      followingModalTab: 'following',
      bookmarksLoading: true
    };
  },
  beforeMount: function beforeMount() {
    this.fetchRelationships();
    this.fetchProfile();
    var u = new URLSearchParams(window.location.search);
    var forceMetro = localStorage.getItem('pf_metro_ui.exp.forceMetro') == 'true';

    if (forceMetro == true || u.has('ui') && u.get('ui') == 'metro' && this.layout != 'metro') {
      this.layout = 'metro';
    }

    if (this.layout == 'metro' && u.has('t')) {
      if (this.modes.indexOf(u.get('t')) != -1) {
        if (u.get('t') == 'bookmarks') {
          return;
        }

        this.mode = u.get('t');
      }
    }
  },
  mounted: function mounted() {
    var _this = this;

    var u = new URLSearchParams(window.location.search);

    if (u.has('md') && u.get('md') == 'followers') {
      this.followersModal();
    }

    if (u.has('md') && u.get('md') == 'following') {
      this.followingModal();
    }

    if (document.querySelectorAll('body')[0].classList.contains('loggedIn') == true) {
      axios.get('/api/pixelfed/v1/accounts/verify_credentials').then(function (res) {
        _this.user = res.data;
        window._sharedData.curUser = res.data;
        window.App.util.navatar();

        if (res.data.id == _this.profileId || _this.relationship.following == true) {
          axios.get('/api/stories/v0/exists/' + _this.profileId).then(function (res) {
            _this.hasStory = res.data == true;
          });
        }
      });
    }

    if (window.outerWidth < 576) {
      $('nav.navbar').hide();
      this.isMobile = true;
    }
  },
  updated: function updated() {
    $('[data-toggle="tooltip"]').tooltip();
  },
  methods: {
    fetchProfile: function fetchProfile() {
      var _this2 = this;

      axios.get('/api/pixelfed/v1/accounts/' + this.profileId).then(function (res) {
        _this2.profile = res.data;
      }).then(function (res) {
        _this2.fetchPosts();
      });
    },
    fetchPosts: function fetchPosts() {
      var _this3 = this;

      var apiUrl = '/api/pixelfed/v1/accounts/' + this.profileId + '/statuses';
      axios.get(apiUrl, {
        params: {
          only_media: true,
          min_id: 1
        }
      }).then(function (res) {
        var data = res.data.filter(function (status) {
          return status.media_attachments.length > 0;
        });
        var ids = data.map(function (status) {
          return status.id;
        });
        _this3.ids = ids;
        _this3.min_id = Math.max.apply(Math, _toConsumableArray(ids));
        _this3.max_id = Math.min.apply(Math, _toConsumableArray(ids));
        _this3.modalStatus = _.first(res.data);
        _this3.timeline = data;

        _this3.ownerCheck();

        _this3.loading = false; //this.loadSponsor();
      })["catch"](function (err) {
        swal('Oops, something went wrong', 'Please release the page.', 'error');
      });
    },
    ownerCheck: function ownerCheck() {
      if ($('body').hasClass('loggedIn') == false) {
        this.owner = false;
        return;
      }

      this.owner = this.profile.id === this.user.id;
    },
    infiniteTimeline: function infiniteTimeline($state) {
      var _this4 = this;

      if (this.loading || this.timeline.length < 9) {
        $state.complete();
        return;
      }

      var apiUrl = '/api/pixelfed/v1/accounts/' + this.profileId + '/statuses';
      axios.get(apiUrl, {
        params: {
          only_media: true,
          max_id: this.max_id
        }
      }).then(function (res) {
        if (res.data.length && _this4.loading == false) {
          var data = res.data;
          var self = _this4;
          data.forEach(function (d) {
            if (self.ids.indexOf(d.id) == -1) {
              self.timeline.push(d);
              self.ids.push(d.id);
            }
          });
          var max = Math.min.apply(Math, _toConsumableArray(_this4.ids));

          if (max == _this4.max_id) {
            $state.complete();
            return;
          }

          _this4.min_id = Math.max.apply(Math, _toConsumableArray(_this4.ids));
          _this4.max_id = max;
          $state.loaded();
          _this4.loading = false;
        } else {
          $state.complete();
        }
      });
    },
    previewUrl: function previewUrl(status) {
      return status.sensitive ? '/storage/no-preview.png?v=' + new Date().getTime() : status.media_attachments[0].preview_url;
    },
    previewBackground: function previewBackground(status) {
      var preview = this.previewUrl(status);
      return 'background-image: url(' + preview + ');';
    },
    blurhHashMedia: function blurhHashMedia(status) {
      return status.sensitive ? null : status.media_attachments[0].preview_url;
    },
    switchMode: function switchMode(mode) {
      var _this5 = this;

      this.mode = _.indexOf(this.modes, mode) ? mode : 'grid';

      if (this.mode == 'bookmarks' && this.bookmarks.length == 0) {
        axios.get('/api/local/bookmarks').then(function (res) {
          _this5.bookmarks = res.data;
          _this5.bookmarksLoading = false;
        });
      }

      if (this.mode == 'collections' && this.collections.length == 0) {
        axios.get('/api/local/profile/collections/' + this.profileId).then(function (res) {
          _this5.collections = res.data;
        });
      }
    },
    reportProfile: function reportProfile() {
      var id = this.profile.id;
      window.location.href = '/i/report?type=user&id=' + id;
    },
    reportUrl: function reportUrl(status) {
      var type = status.in_reply_to ? 'comment' : 'post';
      var id = status.id;
      return '/i/report?type=' + type + '&id=' + id;
    },
    commentFocus: function commentFocus(status, $event) {
      var el = event.target;
      var card = el.parentElement.parentElement.parentElement;
      var comments = card.getElementsByClassName('comments')[0];

      if (comments.children.length == 0) {
        comments.classList.add('mb-2');
        this.fetchStatusComments(status, card);
      }

      var footer = card.querySelectorAll('.card-footer')[0];
      var input = card.querySelectorAll('.status-reply-input')[0];

      if (footer.classList.contains('d-none') == true) {
        footer.classList.remove('d-none');
        input.focus();
      } else {
        footer.classList.add('d-none');
        input.blur();
      }
    },
    likeStatus: function likeStatus(status, $event) {
      if ($('body').hasClass('loggedIn') == false) {
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
    shareStatus: function shareStatus(status, $event) {
      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/share', {
        item: status.id
      }).then(function (res) {
        status.reblogs_count = res.data.count;

        if (status.reblogged == true) {
          status.reblogged = false;
        } else {
          status.reblogged = true;
        }
      })["catch"](function (err) {
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
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
    remoteRedirect: function remoteRedirect(url) {
      window.location.href = window.App.config.site.url + '/i/redirect?url=' + encodeURIComponent(url);
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
      var sid = status.account.id;
      var uid = this.profile.id;

      if (sid == uid) {
        return true;
      } else {
        return false;
      }
    },
    fetchRelationships: function fetchRelationships() {
      var _this6 = this;

      if (document.querySelectorAll('body')[0].classList.contains('loggedIn') == false) {
        return;
      }

      axios.get('/api/pixelfed/v1/accounts/relationships', {
        params: {
          'id[]': this.profileId
        }
      }).then(function (res) {
        if (res.data.length) {
          _this6.relationship = res.data[0];

          if (res.data[0].blocking == true) {
            _this6.warning = true;
          }
        }
      });
    },
    muteProfile: function muteProfile() {
      var _this7 = this;

      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      var id = this.profileId;
      axios.post('/i/mute', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this7.fetchRelationships();

        _this7.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully muted ' + _this7.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    unmuteProfile: function unmuteProfile() {
      var _this8 = this;

      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      var id = this.profileId;
      axios.post('/i/unmute', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this8.fetchRelationships();

        _this8.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully unmuted ' + _this8.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    blockProfile: function blockProfile() {
      var _this9 = this;

      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      var id = this.profileId;
      axios.post('/i/block', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this9.warning = true;

        _this9.fetchRelationships();

        _this9.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully blocked ' + _this9.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    unblockProfile: function unblockProfile() {
      var _this10 = this;

      var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      var id = this.profileId;
      axios.post('/i/unblock', {
        type: 'user',
        item: id
      }).then(function (res) {
        _this10.fetchRelationships();

        _this10.$refs.visitorContextMenu.hide();

        swal('Success', 'You have successfully unblocked ' + _this10.profile.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    deletePost: function deletePost(status, index) {
      var _this11 = this;

      if ($('body').hasClass('loggedIn') == false || status.account.id !== this.profile.id) {
        return;
      }

      axios.post('/i/delete', {
        type: 'status',
        item: status.id
      }).then(function (res) {
        _this11.timeline.splice(index, 1);

        swal('Success', 'You have successfully deleted this post', 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    followProfile: function followProfile() {
      var _this12 = this;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/follow', {
        item: this.profileId
      }).then(function (res) {
        _this12.$refs.visitorContextMenu.hide();

        if (_this12.relationship.following) {
          _this12.profile.followers_count--;

          if (_this12.profile.locked == true) {
            window.location.href = '/';
          }
        } else {
          _this12.profile.followers_count++;
        }

        _this12.relationship.following = !_this12.relationship.following;
      })["catch"](function (err) {
        if (err.response.data.message) {
          swal('Error', err.response.data.message, 'error');
        }
      });
    },
    followingModal: function followingModal() {
      var _this13 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = encodeURI('/login?next=/' + this.profileUsername + '/');
        return;
      }

      if (this.profileSettings.following.list == false) {
        return;
      }

      if (this.followingCursor > 1) {
        this.$refs.followingModal.show();
        return;
      } else {
        axios.get('/api/pixelfed/v1/accounts/' + this.profileId + '/following', {
          params: {
            page: this.followingCursor
          }
        }).then(function (res) {
          _this13.following = res.data;
          _this13.followingModalSearchCache = res.data;
          _this13.followingCursor++;

          if (res.data.length < 10) {
            _this13.followingMore = false;
          }
        });
        this.$refs.followingModal.show();
        return;
      }
    },
    followersModal: function followersModal() {
      var _this14 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = encodeURI('/login?next=/' + this.profileUsername + '/');
        return;
      }

      if (this.profileSettings.followers.list == false) {
        return;
      }

      if (this.followerCursor > 1) {
        this.$refs.followerModal.show();
        return;
      } else {
        axios.get('/api/pixelfed/v1/accounts/' + this.profileId + '/followers', {
          params: {
            page: this.followerCursor
          }
        }).then(function (res) {
          var _this14$followers;

          (_this14$followers = _this14.followers).push.apply(_this14$followers, _toConsumableArray(res.data));

          _this14.followerCursor++;

          if (res.data.length < 10) {
            _this14.followerMore = false;
          }
        });
        this.$refs.followerModal.show();
        return;
      }
    },
    followingLoadMore: function followingLoadMore() {
      var _this15 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = encodeURI('/login?next=/' + this.profile.username + '/');
        return;
      }

      axios.get('/api/pixelfed/v1/accounts/' + this.profile.id + '/following', {
        params: {
          page: this.followingCursor,
          fbu: this.followingModalSearch
        }
      }).then(function (res) {
        if (res.data.length > 0) {
          var _this15$following;

          (_this15$following = _this15.following).push.apply(_this15$following, _toConsumableArray(res.data));

          _this15.followingCursor++;
          _this15.followingModalSearchCache = _this15.following;
        }

        if (res.data.length < 10) {
          _this15.followingModalSearchCache = _this15.following;
          _this15.followingMore = false;
        }
      });
    },
    followersLoadMore: function followersLoadMore() {
      var _this16 = this;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.get('/api/pixelfed/v1/accounts/' + this.profile.id + '/followers', {
        params: {
          page: this.followerCursor
        }
      }).then(function (res) {
        if (res.data.length > 0) {
          var _this16$followers;

          (_this16$followers = _this16.followers).push.apply(_this16$followers, _toConsumableArray(res.data));

          _this16.followerCursor++;
        }

        if (res.data.length < 10) {
          _this16.followerMore = false;
        }
      });
    },
    visitorMenu: function visitorMenu() {
      this.$refs.visitorContextMenu.show();
    },
    followModalAction: function followModalAction(id, index) {
      var _this17 = this;

      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'following';
      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        if (type == 'following') {
          _this17.following.splice(index, 1);

          _this17.profile.following_count--;
        }
      })["catch"](function (err) {
        if (err.response.data.message) {
          swal('Error', err.response.data.message, 'error');
        }
      });
    },
    momentBackground: function momentBackground() {
      var c = 'w-100 h-100 mt-n3 ';

      if (this.profile.header_bg) {
        c += this.profile.header_bg == 'default' ? 'bg-pixelfed' : 'bg-moment-' + this.profile.header_bg;
      } else {
        c += 'bg-pixelfed';
      }

      return c;
    },
    loadSponsor: function loadSponsor() {
      var _this18 = this;

      axios.get('/api/local/profile/sponsor/' + this.profileId).then(function (res) {
        _this18.sponsorList = res.data;
      });
    },
    showSponsorModal: function showSponsorModal() {
      this.$refs.sponsorModal.show();
    },
    goBack: function goBack() {
      if (window.history.length > 2) {
        window.history.back();
        return;
      } else {
        window.location.href = '/';
        return;
      }
    },
    copyProfileLink: function copyProfileLink() {
      navigator.clipboard.writeText(window.location.href);
      this.$refs.visitorContextMenu.hide();
    },
    formatCount: function formatCount(count) {
      return App.util.format.count(count);
    },
    statusUrl: function statusUrl(status) {
      return status.url;

      if (status.local == true) {
        return status.url;
      }

      return '/i/web/post/_/' + status.account.id + '/' + status.id;
    },
    profileUrl: function profileUrl(status) {
      return status.url;

      if (status.local == true) {
        return status.account.url;
      }

      return '/i/web/profile/_/' + status.account.id;
    },
    showEmbedProfileModal: function showEmbedProfileModal() {
      this.ctxEmbedPayload = window.App.util.embed.profile(this.profile.url);
      this.$refs.visitorContextMenu.hide();
      this.$refs.embedModal.show();
    },
    ctxCopyEmbed: function ctxCopyEmbed() {
      navigator.clipboard.writeText(this.ctxEmbedPayload);
      this.$refs.embedModal.hide();
      this.$refs.visitorContextMenu.hide();
    },
    storyRedirect: function storyRedirect() {
      window.location.href = '/stories/' + this.profileUsername;
    },
    followingModalSearchHandler: function followingModalSearchHandler() {
      var _this19 = this;

      var self = this;
      var q = this.followingModalSearch;

      if (q.length == 0) {
        this.following = this.followingModalSearchCache;
        this.followingModalSearch = null;
      }

      if (q.length > 0) {
        var url = '/api/pixelfed/v1/accounts/' + self.profileId + '/following?page=1&fbu=' + q;
        axios.get(url).then(function (res) {
          _this19.following = res.data;
        })["catch"](function (err) {
          self.following = self.followingModalSearchCache;
          self.followingModalSearch = null;
        });
      }
    },
    truncate: function truncate(str, len) {
      return _.truncate(str, {
        length: len
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryViewer.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
//
//
//


window.Zuck = __webpack_require__(/*! zuck.js */ "./node_modules/zuck.js/src/zuck.js");
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['pid'],
  data: function data() {
    return {
      loading: true,
      stories: {},
      preloadIndex: null
    };
  },
  beforeMount: function beforeMount() {
    this.fetchStories();
  },
  methods: {
    fetchStories: function fetchStories() {
      var self = this;
      axios.get('/api/stories/v0/profile/' + this.pid).then(function (res) {
        self.stories = res.data;

        if (res.data.length == 0) {
          window.location.href = '/';
          return;
        }

        self.preloadImages();
      })["catch"](function (err) {
        console.log(err); // window.location.href = '/';

        return;
      });
    },
    preloadImages: function preloadImages() {
      var self = this;

      for (var i = 0; i < this.stories[0].items.length; i++) {
        var preload = new Image();
        $(preload).on('load', function () {
          self.preloadIndex = i;

          if (i == self.stories[0].items.length) {
            self.loadViewer();
            return;
          }
        });
        preload.src = self.stories[0].items[i].src;
      }
    },
    loadViewer: function loadViewer() {
      var data = this.stories;

      if (!window.stories) {
        window.stories = new Zuck('storyContainer', {
          stories: data,
          localStorage: false,
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
              window.location.href = '/';
            }
          }
        });
        this.loading = false; // todo: refactor this mess

        document.querySelectorAll('#storyContainer .story')[0].click();
      }

      return;
    }
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.o-square[data-v-4bdda942] {\n\tmax-width: 320px;\n}\n.o-portrait[data-v-4bdda942] {\n\tmax-width: 320px;\n}\n.o-landscape[data-v-4bdda942] {\n\tmax-width: 320px;\n}\n.post-icon[data-v-4bdda942] {\n\tcolor: #fff;\n\tposition:relative;\n\tmargin-top: 10px;\n\tz-index: 9;\n\topacity: 0.6;\n\ttext-shadow: 3px 3px 16px #272634;\n}\n.font-size-16px[data-v-4bdda942] {\n\tfont-size: 16px;\n}\n.profile-website[data-v-4bdda942] {\n\tcolor: #003569;\n\ttext-decoration: none;\n\tfont-weight: 600;\n}\n.nav-topbar .nav-link[data-v-4bdda942] {\n\tcolor: #999;\n}\n.nav-topbar .nav-link .small[data-v-4bdda942] {\n\tfont-weight: 600;\n}\n.has-story[data-v-4bdda942] {\n\twidth: 84px;\n\theight: 84px;\n\tborder-radius: 50%;\n\tpadding: 4px;\n\tbackground: radial-gradient(ellipse at 70% 70%, #ee583f 8%, #d92d77 42%, #bd3381 58%);\n}\n.has-story img[data-v-4bdda942] {\n\twidth: 76px;\n\theight: 76px;\n\tborder-radius: 50%;\n\tpadding: 6px;\n\tbackground: #fff;\n}\n.has-story-lg[data-v-4bdda942] {\n\twidth: 159px;\n\theight: 159px;\n\tborder-radius: 50%;\n\tpadding: 4px;\n\tbackground: radial-gradient(ellipse at 70% 70%, #ee583f 8%, #d92d77 42%, #bd3381 58%);\n}\n.has-story-lg img[data-v-4bdda942] {\n\twidth: 150px;\n\theight: 150px;\n\tborder-radius: 50%;\n\tpadding: 6px;\n\tbackground:#fff;\n}\n.no-focus[data-v-4bdda942] {\n\tborder-color: none;\n\toutline: 0;\n\tbox-shadow: none;\n}\n.modal-tab-active[data-v-4bdda942] {\n\tborder-bottom: 1px solid #08d;\n}\n.btn-sec-alt[data-v-4bdda942]:hover {\n\tcolor: #ccc;\n\topacity: .7;\n\tbackground-color: transparent;\n\tborder-color: #6c757d;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n#storyContainer .story {\n\tmargin-right: 2rem;\n\twidth: 100%;\n\tmax-width: 64px;\n}\n.stories.carousel .story > .item-link > .item-preview {\n\theight: 64px;\n}\n#zuck-modal.with-effects {\n\twidth: 100%;\n}\n.stories.carousel .story > .item-link > .info .name {\n\tfont-weight: 600;\n\tfont-size: 12px;\n}\n.stories.carousel .story > .item-link > .info {\n}\n", ""]);

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css&");

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryViewer.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=template&id=4bdda942&scoped=true&":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/Profile.vue?vue&type=template&id=4bdda942&scoped=true& ***!
  \*****************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "w-100 h-100" },
    [
      _vm.owner && _vm.layout == "moment" ? _c("div", [_vm._m(0)]) : _vm._e(),
      _vm._v(" "),
      _vm.isMobile
        ? _c("div", { staticClass: "bg-white p-3 border-bottom" }, [
            _c(
              "div",
              {
                staticClass: "d-flex justify-content-between align-items-center"
              },
              [
                _c(
                  "div",
                  { staticClass: "cursor-pointer", on: { click: _vm.goBack } },
                  [_c("i", { staticClass: "fas fa-chevron-left fa-lg" })]
                ),
                _vm._v(" "),
                _c("div", { staticClass: "font-weight-bold" }, [
                  _vm._v(
                    "\n\t\t\t\t" + _vm._s(this.profileUsername) + "\n\n\t\t\t"
                  )
                ]),
                _vm._v(" "),
                _c("div", [
                  _c("a", {
                    staticClass:
                      "fas fa-ellipsis-v fa-lg text-muted text-decoration-none",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        return _vm.visitorMenu($event)
                      }
                    }
                  })
                ])
              ]
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.relationship && _vm.relationship.blocking && _vm.warning
        ? _c("div", { staticClass: "bg-white pt-3 border-bottom" }, [
            _c("div", { staticClass: "container" }, [
              _c("p", { staticClass: "text-center font-weight-bold" }, [
                _vm._v("Você bloqueou esta conta")
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "text-center font-weight-bold" }, [
                _vm._v("Clique "),
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
                  [_vm._v("aqui")]
                ),
                _vm._v(" para visualizar o perfil")
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
        ? _c("div", [
            _vm.layout == "metro"
              ? _c("div", { staticClass: "container" }, [
                  _c(
                    "div",
                    { class: _vm.isMobile ? "pt-5" : "pt-5 border-bottom" },
                    [
                      _c("div", { staticClass: "container px-0" }, [
                        _c("div", { staticClass: "row" }, [
                          _c(
                            "div",
                            { staticClass: "col-12 col-md-4 d-md-flex" },
                            [
                              _c(
                                "div",
                                { staticClass: "profile-avatar mx-md-auto" },
                                [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-block d-md-none mt-n3 mb-3"
                                    },
                                    [
                                      _c("div", { staticClass: "row" }, [
                                        _c("div", { staticClass: "col-4" }, [
                                          _vm.hasStory
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
                                                      "rounded-circle",
                                                    attrs: {
                                                      alt:
                                                        _vm.profileUsername +
                                                        "'s profile picture",
                                                      src: _vm.profile.avatar,
                                                      width: "77px",
                                                      height: "77px"
                                                    }
                                                  })
                                                ]
                                              )
                                            : _c("div", [
                                                _c("img", {
                                                  staticClass:
                                                    "rounded-circle border",
                                                  attrs: {
                                                    alt:
                                                      _vm.profileUsername +
                                                      "'s profile picture",
                                                    src: _vm.profile.avatar,
                                                    width: "77px",
                                                    height: "77px"
                                                  }
                                                })
                                              ])
                                        ]),
                                        _vm._v(" "),
                                        _c("div", { staticClass: "col-8" }, [
                                          _c(
                                            "div",
                                            {
                                              staticClass:
                                                "d-block d-md-none mt-3 py-2"
                                            },
                                            [
                                              _c(
                                                "ul",
                                                {
                                                  staticClass:
                                                    "nav d-flex justify-content-between"
                                                },
                                                [
                                                  _c(
                                                    "li",
                                                    { staticClass: "nav-item" },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "font-weight-light"
                                                        },
                                                        [
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "text-dark text-center"
                                                            },
                                                            [
                                                              _c(
                                                                "p",
                                                                {
                                                                  staticClass:
                                                                    "font-weight-bold mb-0"
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    _vm._s(
                                                                      _vm.formatCount(
                                                                        _vm
                                                                          .profile
                                                                          .statuses_count
                                                                      )
                                                                    )
                                                                  )
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c(
                                                                "p",
                                                                {
                                                                  staticClass:
                                                                    "text-muted mb-0 small"
                                                                },
                                                                [
                                                                  _vm._v(
                                                                    "Posts"
                                                                  )
                                                                ]
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "li",
                                                    { staticClass: "nav-item" },
                                                    [
                                                      _vm.profileSettings
                                                        .followers.count
                                                        ? _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "font-weight-light"
                                                            },
                                                            [
                                                              _c(
                                                                "a",
                                                                {
                                                                  staticClass:
                                                                    "text-dark cursor-pointer text-center",
                                                                  on: {
                                                                    click: function(
                                                                      $event
                                                                    ) {
                                                                      return _vm.followersModal()
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "p",
                                                                    {
                                                                      staticClass:
                                                                        "font-weight-bold mb-0"
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        _vm._s(
                                                                          _vm.formatCount(
                                                                            _vm
                                                                              .profile
                                                                              .followers_count
                                                                          )
                                                                        )
                                                                      )
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "p",
                                                                    {
                                                                      staticClass:
                                                                        "text-muted mb-0 small"
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "Seguidores"
                                                                      )
                                                                    ]
                                                                  )
                                                                ]
                                                              )
                                                            ]
                                                          )
                                                        : _vm._e()
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "li",
                                                    { staticClass: "nav-item" },
                                                    [
                                                      _vm.profileSettings
                                                        .following.count
                                                        ? _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "font-weight-light"
                                                            },
                                                            [
                                                              _c(
                                                                "a",
                                                                {
                                                                  staticClass:
                                                                    "text-dark cursor-pointer text-center",
                                                                  on: {
                                                                    click: function(
                                                                      $event
                                                                    ) {
                                                                      return _vm.followingModal()
                                                                    }
                                                                  }
                                                                },
                                                                [
                                                                  _c(
                                                                    "p",
                                                                    {
                                                                      staticClass:
                                                                        "font-weight-bold mb-0"
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        _vm._s(
                                                                          _vm.formatCount(
                                                                            _vm
                                                                              .profile
                                                                              .following_count
                                                                          )
                                                                        )
                                                                      )
                                                                    ]
                                                                  ),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "p",
                                                                    {
                                                                      staticClass:
                                                                        "text-muted mb-0 small"
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        "Seguindo"
                                                                      )
                                                                    ]
                                                                  )
                                                                ]
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
                                        ])
                                      ])
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "d-none d-md-block pb-3" },
                                    [
                                      _vm.hasStory
                                        ? _c(
                                            "div",
                                            {
                                              staticClass:
                                                "has-story-lg cursor-pointer shadow-sm",
                                              on: {
                                                click: function($event) {
                                                  return _vm.storyRedirect()
                                                }
                                              }
                                            },
                                            [
                                              _c("img", {
                                                staticClass:
                                                  "rounded-circle box-shadow cursor-pointer",
                                                attrs: {
                                                  alt:
                                                    _vm.profileUsername +
                                                    "'s profile picture",
                                                  src: _vm.profile.avatar,
                                                  width: "150px",
                                                  height: "150px"
                                                }
                                              })
                                            ]
                                          )
                                        : _c("div", [
                                            _c("img", {
                                              staticClass:
                                                "rounded-circle box-shadow",
                                              attrs: {
                                                alt:
                                                  _vm.profileUsername +
                                                  "'s profile picture",
                                                src: _vm.profile.avatar,
                                                width: "150px",
                                                height: "150px"
                                              }
                                            })
                                          ]),
                                      _vm._v(" "),
                                      _vm.sponsorList.patreon ||
                                      _vm.sponsorList.liberapay ||
                                      _vm.sponsorList.opencollective
                                        ? _c(
                                            "p",
                                            { staticClass: "text-center mt-3" },
                                            [
                                              _c(
                                                "button",
                                                {
                                                  staticClass:
                                                    "btn btn-outline-secondary font-weight-bold py-0",
                                                  attrs: { type: "button" },
                                                  on: {
                                                    click: _vm.showSponsorModal
                                                  }
                                                },
                                                [
                                                  _c("i", {
                                                    staticClass:
                                                      "fas fa-heart text-danger"
                                                  }),
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t\t\t\tDonate\n\t\t\t\t\t\t\t\t\t\t"
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ]
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
                                "col-12 col-md-8 d-flex align-items-center"
                            },
                            [
                              _c("div", { staticClass: "profile-details" }, [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "d-none d-md-flex username-bar pb-3 align-items-center"
                                  },
                                  [
                                    _c(
                                      "span",
                                      {
                                        staticClass:
                                          "font-weight-ultralight h3 mb-0"
                                      },
                                      [_vm._v(_vm._s(_vm.profile.username))]
                                    ),
                                    _vm._v(" "),
                                    _vm.profile.is_admin
                                      ? _c(
                                          "span",
                                          {
                                            staticClass: "pl-1 pb-2 fa-stack",
                                            attrs: {
                                              title: "Admin Account",
                                              "data-toggle": "tooltip"
                                            }
                                          },
                                          [
                                            _c("i", {
                                              staticClass:
                                                "fas fa-certificate fa-lg text-danger fa-stack-1x"
                                            }),
                                            _vm._v(" "),
                                            _c("i", {
                                              staticClass:
                                                "fas fa-crown text-white fa-sm fa-stack-1x",
                                              staticStyle: {
                                                "font-size": "9px"
                                              }
                                            })
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.profile.id != _vm.user.id &&
                                    _vm.user.hasOwnProperty("id")
                                      ? _c("span", [
                                          _vm.relationship.following == true
                                            ? _c(
                                                "span",
                                                { staticClass: "pl-4" },
                                                [
                                                  _c(
                                                    "a",
                                                    {
                                                      staticClass:
                                                        "btn btn-outline-secondary font-weight-bold btn-sm py-1 text-dark mr-2 px-3 btn-sec-alt",
                                                      staticStyle: {
                                                        border:
                                                          "1px solid #dbdbdb"
                                                      },
                                                      attrs: {
                                                        href:
                                                          "/account/direct/t/" +
                                                          _vm.profile.id,
                                                        "data-toggle":
                                                          "tooltip",
                                                        title: "Mensagem"
                                                      }
                                                    },
                                                    [_vm._v("Mensagem")]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "btn btn-outline-secondary font-weight-bold btn-sm py-1 text-dark btn-sec-alt",
                                                      staticStyle: {
                                                        border:
                                                          "1px solid #dbdbdb"
                                                      },
                                                      attrs: {
                                                        type: "button",
                                                        "data-toggle":
                                                          "tooltip",
                                                        title:
                                                          "Deixar de seguir"
                                                      },
                                                      on: {
                                                        click: _vm.followProfile
                                                      }
                                                    },
                                                    [
                                                      _c("i", {
                                                        staticClass:
                                                          "fas fa-user-check mx-3"
                                                      })
                                                    ]
                                                  )
                                                ]
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          !_vm.relationship.following
                                            ? _c(
                                                "span",
                                                { staticClass: "pl-4" },
                                                [
                                                  _c(
                                                    "button",
                                                    {
                                                      staticClass:
                                                        "btn btn-primary font-weight-bold btn-sm py-1 px-3",
                                                      attrs: {
                                                        type: "button",
                                                        "data-toggle":
                                                          "tooltip",
                                                        title: "Seguir"
                                                      },
                                                      on: {
                                                        click: _vm.followProfile
                                                      }
                                                    },
                                                    [_vm._v("Seguir")]
                                                  )
                                                ]
                                              )
                                            : _vm._e()
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _vm.owner && _vm.user.hasOwnProperty("id")
                                      ? _c("span", { staticClass: "pl-4" }, [
                                          _c(
                                            "a",
                                            {
                                              staticClass:
                                                "btn btn-outline-secondary btn-sm",
                                              staticStyle: {
                                                "font-weight": "600"
                                              },
                                              attrs: { href: "/settings/home" }
                                            },
                                            [_vm._v("Editar Perfil")]
                                          )
                                        ])
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c("span", { staticClass: "pl-4" }, [
                                      _c("a", {
                                        staticClass:
                                          "fas fa-ellipsis-h fa-lg text-dark text-decoration-none",
                                        attrs: { href: "#" },
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            return _vm.visitorMenu($event)
                                          }
                                        }
                                      })
                                    ])
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "font-size-16px" }, [
                                  _c(
                                    "div",
                                    {
                                      staticClass:
                                        "d-none d-md-inline-flex profile-stats pb-3"
                                    },
                                    [
                                      _c(
                                        "div",
                                        {
                                          staticClass: "font-weight-light pr-5"
                                        },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "text-dark" },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "font-weight-bold"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.formatCount(
                                                        _vm.profile
                                                          .statuses_count
                                                      )
                                                    )
                                                  )
                                                ]
                                              ),
                                              _vm._v(
                                                "\n\t\t\t\t\t\t\t\t\t\t\t\tPosts\n\t\t\t\t\t\t\t\t\t\t\t"
                                              )
                                            ]
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm.profileSettings.followers.count
                                        ? _c(
                                            "div",
                                            {
                                              staticClass:
                                                "font-weight-light pr-5"
                                            },
                                            [
                                              _c(
                                                "a",
                                                {
                                                  staticClass:
                                                    "text-dark cursor-pointer",
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.followersModal()
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "font-weight-bold"
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.formatCount(
                                                            _vm.profile
                                                              .followers_count
                                                          )
                                                        )
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\tSeguidores\n\t\t\t\t\t\t\t\t\t\t\t"
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.profileSettings.following.count
                                        ? _c(
                                            "div",
                                            {
                                              staticClass: "font-weight-light"
                                            },
                                            [
                                              _c(
                                                "a",
                                                {
                                                  staticClass:
                                                    "text-dark cursor-pointer",
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.followingModal()
                                                    }
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "span",
                                                    {
                                                      staticClass:
                                                        "font-weight-bold"
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.formatCount(
                                                            _vm.profile
                                                              .following_count
                                                          )
                                                        )
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(
                                                    "\n\t\t\t\t\t\t\t\t\t\t\t\tSeguindo\n\t\t\t\t\t\t\t\t\t\t\t"
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "p",
                                    {
                                      staticClass:
                                        "mb-0 d-flex align-items-center"
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass: "font-weight-bold pr-3"
                                        },
                                        [
                                          _vm._v(
                                            _vm._s(_vm.profile.display_name)
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _vm.profile.note
                                    ? _c("div", {
                                        staticClass: "mb-0",
                                        domProps: {
                                          innerHTML: _vm._s(_vm.profile.note)
                                        }
                                      })
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.profile.website
                                    ? _c("p", {}, [
                                        _c(
                                          "a",
                                          {
                                            staticClass: "profile-website",
                                            attrs: {
                                              href: _vm.profile.website,
                                              rel:
                                                "me external nofollow noopener",
                                              target: "_blank"
                                            },
                                            on: {
                                              click: function($event) {
                                                $event.preventDefault()
                                                return _vm.remoteRedirect(
                                                  _vm.profile.website
                                                )
                                              }
                                            }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.truncate(
                                                  _vm.profile.website,
                                                  24
                                                )
                                              )
                                            )
                                          ]
                                        )
                                      ])
                                    : _vm._e()
                                ])
                              ])
                            ]
                          )
                        ])
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "d-block d-md-none my-0 pt-3 border-bottom"
                    },
                    [
                      _vm.user && _vm.user.hasOwnProperty("id")
                        ? _c("p", { staticClass: "pt-3" }, [
                            _vm.owner
                              ? _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-outline-secondary bg-white btn-sm py-1 btn-block text-center font-weight-bold text-dark border border-lighter",
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.redirect("/settings/home")
                                      }
                                    }
                                  },
                                  [_vm._v("Editar Perfil")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            !_vm.owner && _vm.relationship.following
                              ? _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-outline-secondary bg-white btn-sm py-1 px-5 font-weight-bold text-dark border border-lighter",
                                    on: { click: _vm.followProfile }
                                  },
                                  [_vm._v("   Deixar de seguir   ")]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            !_vm.owner && !_vm.relationship.following
                              ? _c(
                                  "button",
                                  {
                                    staticClass:
                                      "btn btn-primary btn-sm py-1 px-5 font-weight-bold",
                                    on: { click: _vm.followProfile }
                                  },
                                  [
                                    _vm._v(
                                      _vm._s(
                                        _vm.relationship.followed_by
                                          ? "Seguir"
                                          : "     Follow     "
                                      )
                                    )
                                  ]
                                )
                              : _vm._e()
                          ])
                        : _vm._e()
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", {}, [
                    _c(
                      "ul",
                      {
                        staticClass:
                          "nav nav-topbar d-flex justify-content-center border-0"
                      },
                      [
                        _c("li", { staticClass: "nav-item border-top" }, [
                          _c(
                            "a",
                            {
                              class:
                                this.mode == "grid"
                                  ? "nav-link text-dark"
                                  : "nav-link",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.switchMode("grid")
                                }
                              }
                            },
                            [
                              _c("i", { staticClass: "fas fa-th" }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "d-none d-md-inline-block small pl-1"
                                },
                                [_vm._v("POSTS")]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("li", { staticClass: "nav-item px-0 border-top" }, [
                          _c(
                            "a",
                            {
                              class:
                                this.mode == "collections"
                                  ? "nav-link text-dark"
                                  : "nav-link",
                              attrs: { href: "#" },
                              on: {
                                click: function($event) {
                                  $event.preventDefault()
                                  return _vm.switchMode("collections")
                                }
                              }
                            },
                            [
                              _c("i", { staticClass: "fas fa-images" }),
                              _vm._v(" "),
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "d-none d-md-inline-block small pl-1"
                                },
                                [_vm._v("ÁLBUMS")]
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _vm.owner
                          ? _c("li", { staticClass: "nav-item border-top" }, [
                              _c(
                                "a",
                                {
                                  class:
                                    this.mode == "bookmarks"
                                      ? "nav-link text-dark"
                                      : "nav-link",
                                  attrs: { href: "#" },
                                  on: {
                                    click: function($event) {
                                      $event.preventDefault()
                                      return _vm.switchMode("bookmarks")
                                    }
                                  }
                                },
                                [
                                  _c("i", { staticClass: "fas fa-bookmark" }),
                                  _vm._v(" "),
                                  _c(
                                    "span",
                                    {
                                      staticClass:
                                        "d-none d-md-inline-block small pl-1"
                                    },
                                    [_vm._v("SALVOS")]
                                  )
                                ]
                              )
                            ])
                          : _vm._e()
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "container px-0" }, [
                    _c("div", { staticClass: "profile-timeline mt-md-4" }, [
                      _vm.mode == "grid"
                        ? _c(
                            "div",
                            { staticClass: "row" },
                            [
                              _vm._l(_vm.timeline, function(s, index) {
                                return _c(
                                  "div",
                                  {
                                    key: "tlob:" + index,
                                    staticClass: "col-4 p-1 p-md-3"
                                  },
                                  [
                                    _vm._o(
                                      _c(
                                        "a",
                                        {
                                          staticClass:
                                            "card info-overlay card-md-border-0",
                                          attrs: { href: _vm.statusUrl(s) }
                                        },
                                        [
                                          _c("div", { staticClass: "square" }, [
                                            s.sensitive
                                              ? _c(
                                                  "div",
                                                  {
                                                    staticClass:
                                                      "square-content"
                                                  },
                                                  [
                                                    _vm._m(1, true),
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
                                                  {
                                                    staticClass:
                                                      "square-content"
                                                  },
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
                                              {
                                                staticClass: "info-overlay-text"
                                              },
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
                                      ),
                                      0,
                                      "tlob:" + index
                                    )
                                  ]
                                )
                              }),
                              _vm._v(" "),
                              _vm.timeline.length == 0
                                ? _c("div", { staticClass: "col-12" }, [
                                    _vm._m(2)
                                  ])
                                : _vm._e()
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.timeline.length && _vm.mode == "grid"
                        ? _c(
                            "div",
                            [
                              _c(
                                "infinite-loading",
                                { on: { infinite: _vm.infiniteTimeline } },
                                [
                                  _c("div", {
                                    attrs: { slot: "no-more" },
                                    slot: "no-more"
                                  }),
                                  _vm._v(" "),
                                  _c("div", {
                                    attrs: { slot: "no-results" },
                                    slot: "no-results"
                                  })
                                ]
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.mode == "bookmarks"
                        ? _c("div", [
                            _vm.bookmarksLoading
                              ? _c("div", [_vm._m(3)])
                              : _c("div", [
                                  _vm.bookmarks.length
                                    ? _c(
                                        "div",
                                        { staticClass: "row" },
                                        _vm._l(_vm.bookmarks, function(
                                          s,
                                          index
                                        ) {
                                          return _c(
                                            "div",
                                            {
                                              staticClass:
                                                "col-4 p-1 p-sm-2 p-md-3"
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
                                                  _c(
                                                    "div",
                                                    { staticClass: "square" },
                                                    [
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
                                                      _c("div", {
                                                        staticClass:
                                                          "square-content",
                                                        style: _vm.previewBackground(
                                                          s
                                                        )
                                                      }),
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
                                                                        s.favourites_count
                                                                      )
                                                                    )
                                                                  ]
                                                                )
                                                              ]),
                                                              _vm._v(" "),
                                                              _c("span", [
                                                                _c("span", {
                                                                  staticClass:
                                                                    "fas fa-retweet fa-lg p-2 d-flex-inline"
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
                                                                        s.reblogs_count
                                                                      )
                                                                    )
                                                                  ]
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
                                    : _c("div", { staticClass: "col-12" }, [
                                        _vm._m(4)
                                      ])
                                ])
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.mode == "collections"
                        ? _c("div", [
                            _vm.collections.length
                              ? _c(
                                  "div",
                                  { staticClass: "row" },
                                  _vm._l(_vm.collections, function(c, index) {
                                    return _c(
                                      "div",
                                      {
                                        staticClass: "col-4 p-1 p-sm-2 p-md-3"
                                      },
                                      [
                                        _c(
                                          "a",
                                          {
                                            staticClass:
                                              "card info-overlay card-md-border-0",
                                            attrs: { href: c.url }
                                          },
                                          [
                                            _c(
                                              "div",
                                              { staticClass: "square" },
                                              [
                                                _c("div", {
                                                  staticClass: "square-content",
                                                  style:
                                                    "background-image: url(" +
                                                    c.thumb +
                                                    ");"
                                                })
                                              ]
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  }),
                                  0
                                )
                              : _c("div", [_vm._m(5)])
                          ])
                        : _vm._e()
                    ])
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.layout == "moment"
              ? _c("div", { staticClass: "mt-3" }, [
                  _c("div", {
                    class: _vm.momentBackground(),
                    staticStyle: { width: "100%", "min-height": "274px" }
                  }),
                  _vm._v(" "),
                  _c("div", { staticClass: "bg-white border-bottom" }, [
                    _c("div", { staticClass: "container" }, [
                      _c("div", { staticClass: "row" }, [
                        _c("div", { staticClass: "col-12 row mx-0" }, [
                          _c("div", { staticClass: "col-4 text-left mt-2" }, [
                            _vm.relationship && _vm.relationship.followed_by
                              ? _c("span", [
                                  _c(
                                    "span",
                                    {
                                      staticClass:
                                        "bg-light border border-secondary font-weight-bold small py-1 px-2 text-muted rounded"
                                    },
                                    [_vm._v("SEGUE VOCÊ")]
                                  )
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.profile.is_admin
                              ? _c("span", [
                                  _c(
                                    "span",
                                    {
                                      staticClass:
                                        "bg-light border border-danger font-weight-bold small py-1 px-2 text-danger rounded"
                                    },
                                    [_vm._v("ADMIN")]
                                  )
                                ])
                              : _vm._e()
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-4 text-center" }, [
                            _c("div", { staticClass: "d-block d-md-none" }, [
                              _c("img", {
                                staticClass: "rounded-circle box-shadow",
                                staticStyle: {
                                  "margin-top": "-60px",
                                  border: "5px solid #fff"
                                },
                                attrs: {
                                  src: _vm.profile.avatar,
                                  width: "110px",
                                  height: "110px"
                                }
                              })
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "d-none d-md-block" }, [
                              _c("img", {
                                staticClass: "rounded-circle box-shadow",
                                staticStyle: {
                                  "margin-top": "-90px",
                                  border: "5px solid #fff"
                                },
                                attrs: {
                                  src: _vm.profile.avatar,
                                  width: "172px",
                                  height: "172px"
                                }
                              })
                            ])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-4 text-right mt-2" }, [
                            _c(
                              "span",
                              { staticClass: "d-none d-md-inline-block pl-4" },
                              [
                                _c("a", {
                                  staticClass:
                                    "fas fa-rss fa-lg text-muted text-decoration-none",
                                  attrs: {
                                    href:
                                      "/users/" + _vm.profile.username + ".atom"
                                  }
                                })
                              ]
                            ),
                            _vm._v(" "),
                            _vm.owner
                              ? _c("span", { staticClass: "pl-md-4 pl-sm-2" }, [
                                  _c("a", {
                                    staticClass:
                                      "fas fa-cog fa-lg text-muted text-decoration-none",
                                    attrs: { href: "/settings/home" }
                                  })
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.profile.id != _vm.user.id &&
                            _vm.user.hasOwnProperty("id")
                              ? _c("span", { staticClass: "pl-md-4 pl-sm-2" }, [
                                  _c("a", {
                                    staticClass:
                                      "fas fa-cog fa-lg text-muted text-decoration-none",
                                    attrs: { href: "#" },
                                    on: {
                                      click: function($event) {
                                        $event.preventDefault()
                                        return _vm.visitorMenu($event)
                                      }
                                    }
                                  })
                                ])
                              : _vm._e(),
                            _vm._v(" "),
                            _vm.profile.id != _vm.user.id &&
                            _vm.user.hasOwnProperty("id")
                              ? _c("span", [
                                  _vm.relationship.following == true
                                    ? _c(
                                        "span",
                                        { staticClass: "pl-md-4 pl-sm-2" },
                                        [
                                          _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btn-outline-secondary font-weight-bold btn-sm",
                                              attrs: { type: "button" },
                                              on: {
                                                click: function($event) {
                                                  $event.preventDefault()
                                                  return _vm.followProfile()
                                                }
                                              }
                                            },
                                            [_vm._v("Deixar de seguir")]
                                          )
                                        ]
                                      )
                                    : _c(
                                        "span",
                                        { staticClass: "pl-md-4 pl-sm-2" },
                                        [
                                          _c(
                                            "button",
                                            {
                                              staticClass:
                                                "btn btn-primary font-weight-bold btn-sm",
                                              attrs: { type: "button" },
                                              on: {
                                                click: function($event) {
                                                  $event.preventDefault()
                                                  return _vm.followProfile()
                                                }
                                              }
                                            },
                                            [_vm._v("Seguir")]
                                          )
                                        ]
                                      )
                                ])
                              : _vm._e()
                          ])
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "col-12 text-center" }, [
                          _c("div", { staticClass: "profile-details my-3" }, [
                            _c(
                              "p",
                              {
                                staticClass:
                                  "font-weight-ultralight h2 text-center"
                              },
                              [_vm._v(_vm._s(_vm.profile.username))]
                            ),
                            _vm._v(" "),
                            _vm.profile.note
                              ? _c("div", {
                                  staticClass: "text-center text-muted p-3",
                                  domProps: {
                                    innerHTML: _vm._s(_vm.profile.note)
                                  }
                                })
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "div",
                              { staticClass: "pb-3 text-muted text-center" },
                              [
                                _c(
                                  "a",
                                  {
                                    staticClass: "text-lighter",
                                    attrs: { href: _vm.profile.url }
                                  },
                                  [
                                    _c(
                                      "span",
                                      { staticClass: "font-weight-bold" },
                                      [
                                        _vm._v(
                                          _vm._s(
                                            _vm.formatCount(
                                              _vm.profile.statuses_count
                                            )
                                          )
                                        )
                                      ]
                                    ),
                                    _vm._v(
                                      "\n\t\t\t\t\t\t\t\t\t\tPosts\n\t\t\t\t\t\t\t\t\t"
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _vm.profileSettings.followers.count
                                  ? _c(
                                      "a",
                                      {
                                        staticClass:
                                          "text-lighter cursor-pointer px-3",
                                        on: {
                                          click: function($event) {
                                            return _vm.followersModal()
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "font-weight-bold" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.formatCount(
                                                  _vm.profile.followers_count
                                                )
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t\tSeguidores\n\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.profileSettings.following.count
                                  ? _c(
                                      "a",
                                      {
                                        staticClass:
                                          "text-lighter cursor-pointer",
                                        on: {
                                          click: function($event) {
                                            return _vm.followingModal()
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "span",
                                          { staticClass: "font-weight-bold" },
                                          [
                                            _vm._v(
                                              _vm._s(
                                                _vm.formatCount(
                                                  _vm.profile.following_count
                                                )
                                              )
                                            )
                                          ]
                                        ),
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t\tSeguindo\n\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          ])
                        ])
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "container-fluid" }, [
                    _c("div", { staticClass: "profile-timeline mt-md-4" }, [
                      _vm.mode == "grid"
                        ? _c(
                            "div",
                            {},
                            [
                              _c(
                                "masonry",
                                {
                                  attrs: {
                                    cols: { default: 3, 700: 2, 400: 1 },
                                    gutter: { default: "5px" }
                                  }
                                },
                                _vm._l(_vm.timeline, function(s, index) {
                                  return _c("div", { staticClass: "p-1" }, [
                                    _c(
                                      "a",
                                      {
                                        class: [
                                          s.sensitive
                                            ? "card info-overlay card-md-border-0"
                                            : s.media_attachments[0]
                                                .filter_class +
                                              " card info-overlay card-md-border-0"
                                        ],
                                        attrs: { href: _vm.statusUrl(s) }
                                      },
                                      [
                                        _c("img", {
                                          staticClass: "img-fluid w-100",
                                          attrs: { src: _vm.previewUrl(s) }
                                        })
                                      ]
                                    )
                                  ])
                                }),
                                0
                              )
                            ],
                            1
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.timeline.length
                        ? _c(
                            "div",
                            [
                              _c(
                                "infinite-loading",
                                { on: { infinite: _vm.infiniteTimeline } },
                                [
                                  _c("div", {
                                    attrs: { slot: "no-more" },
                                    slot: "no-more"
                                  }),
                                  _vm._v(" "),
                                  _c("div", {
                                    attrs: { slot: "no-results" },
                                    slot: "no-results"
                                  })
                                ]
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ])
                  ])
                ])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.profile && _vm.following
        ? _c(
            "b-modal",
            {
              ref: "followingModal",
              attrs: {
                id: "following-modal",
                "hide-footer": "",
                centered: "",
                scrollable: "",
                title: "Following",
                "body-class": "list-group-flush py-3 px-0",
                "dialog-class": "follow-modal"
              }
            },
            [
              !_vm.loading
                ? _c(
                    "div",
                    {
                      staticClass: "list-group",
                      staticStyle: { "min-height": "60vh" }
                    },
                    [
                      _vm.owner == true
                        ? _c(
                            "div",
                            {
                              staticClass:
                                "list-group-item border-0 pt-0 px-0 mt-n2 mb-3"
                            },
                            [
                              _c(
                                "span",
                                {
                                  staticClass:
                                    "d-flex px-4 pb-0 align-items-center"
                                },
                                [
                                  _c("i", {
                                    staticClass: "fas fa-search text-lighter"
                                  }),
                                  _vm._v(" "),
                                  _c("input", {
                                    directives: [
                                      {
                                        name: "model",
                                        rawName: "v-model",
                                        value: _vm.followingModalSearch,
                                        expression: "followingModalSearch"
                                      }
                                    ],
                                    staticClass:
                                      "form-control border-0 shadow-0 no-focus",
                                    attrs: {
                                      type: "text",
                                      placeholder: "Buscar seguidores..."
                                    },
                                    domProps: {
                                      value: _vm.followingModalSearch
                                    },
                                    on: {
                                      keyup: _vm.followingModalSearchHandler,
                                      input: function($event) {
                                        if ($event.target.composing) {
                                          return
                                        }
                                        _vm.followingModalSearch =
                                          $event.target.value
                                      }
                                    }
                                  })
                                ]
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.owner == true
                        ? _c("div", {
                            staticClass:
                              "btn-group rounded-0 mt-n3 mb-3 border-top",
                            attrs: { role: "group", "aria-label": "Seguindo" }
                          })
                        : _c("div", {
                            staticClass: "btn-group rounded-0 mt-n3 mb-3",
                            attrs: { role: "group", "aria-label": "Seguindo" }
                          }),
                      _vm._v(" "),
                      _vm._l(_vm.following, function(user, index) {
                        return _c(
                          "div",
                          {
                            key: "following_" + index,
                            staticClass: "list-group-item border-0 py-1"
                          },
                          [
                            _c("div", { staticClass: "media" }, [
                              _c("a", { attrs: { href: user.url } }, [
                                _c("img", {
                                  staticClass: "mr-3 rounded-circle box-shadow",
                                  attrs: {
                                    src: user.avatar,
                                    alt: user.username + "’s avatar",
                                    width: "30px",
                                    loading: "lazy"
                                  }
                                })
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "media-body text-truncate" },
                                [
                                  _c(
                                    "p",
                                    {
                                      staticClass: "mb-0",
                                      staticStyle: { "font-size": "14px" }
                                    },
                                    [
                                      _c(
                                        "a",
                                        {
                                          staticClass:
                                            "font-weight-bold text-dark",
                                          attrs: { href: user.url }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t" +
                                              _vm._s(user.username) +
                                              "\n\t\t\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                    ]
                                  ),
                                  _vm._v(" "),
                                  !user.local
                                    ? _c(
                                        "p",
                                        {
                                          staticClass:
                                            "text-muted mb-0 text-truncate mr-3",
                                          staticStyle: { "font-size": "14px" },
                                          attrs: {
                                            title: user.acct,
                                            "data-toggle": "dropdown",
                                            "data-placement": "bottom"
                                          }
                                        },
                                        [
                                          _c(
                                            "span",
                                            { staticClass: "font-weight-bold" },
                                            [
                                              _vm._v(
                                                _vm._s(user.acct.split("@")[0])
                                              )
                                            ]
                                          ),
                                          _c(
                                            "span",
                                            { staticClass: "text-lighter" },
                                            [
                                              _vm._v(
                                                "@" +
                                                  _vm._s(
                                                    user.acct.split("@")[1]
                                                  )
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    : _c(
                                        "p",
                                        {
                                          staticClass:
                                            "text-muted mb-0 text-truncate",
                                          staticStyle: { "font-size": "14px" }
                                        },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t" +
                                              _vm._s(user.display_name) +
                                              "\n\t\t\t\t\t\t"
                                          )
                                        ]
                                      )
                                ]
                              ),
                              _vm._v(" "),
                              _vm.owner
                                ? _c("div", [
                                    _c(
                                      "a",
                                      {
                                        staticClass:
                                          "btn btn-outline-dark btn-sm font-weight-bold",
                                        attrs: { href: "#" },
                                        on: {
                                          click: function($event) {
                                            $event.preventDefault()
                                            return _vm.followModalAction(
                                              user.id,
                                              index,
                                              "following"
                                            )
                                          }
                                        }
                                      },
                                      [_vm._v("Seguindo")]
                                    )
                                  ])
                                : _vm._e()
                            ])
                          ]
                        )
                      }),
                      _vm._v(" "),
                      _vm.followingModalSearch && _vm.following.length == 0
                        ? _c(
                            "div",
                            { staticClass: "list-group-item border-0" },
                            [
                              _c(
                                "div",
                                {
                                  staticClass: "list-group-item border-0 pt-5"
                                },
                                [
                                  _c(
                                    "p",
                                    {
                                      staticClass: "p-3 text-center mb-0 lead"
                                    },
                                    [_vm._v("Nenhum resultado encontrado")]
                                  )
                                ]
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm.following.length > 0 && _vm.followingMore
                        ? _c(
                            "div",
                            {
                              staticClass: "list-group-item text-center",
                              on: {
                                click: function($event) {
                                  return _vm.followingLoadMore()
                                }
                              }
                            },
                            [
                              _c(
                                "p",
                                {
                                  staticClass:
                                    "mb-0 small text-muted font-weight-light cursor-pointer"
                                },
                                [_vm._v("Mais")]
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
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "followerModal",
          attrs: {
            id: "follower-modal",
            "hide-footer": "",
            centered: "",
            scrollable: "",
            title: "Followers",
            "body-class": "list-group-flush py-3 px-0",
            "dialog-class": "follow-modal"
          }
        },
        [
          _c(
            "div",
            { staticClass: "list-group" },
            [
              _vm.followers.length == 0
                ? _c("div", { staticClass: "list-group-item border-0" }, [
                    _c(
                      "p",
                      {
                        staticClass:
                          "text-center mb-0 font-weight-bold text-muted py-5"
                      },
                      [
                        _c("span", { staticClass: "text-dark" }, [
                          _vm._v(_vm._s(_vm.profileUsername))
                        ]),
                        _vm._v(" não tem seguidores ainda.")
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm._l(_vm.followers, function(user, index) {
                return _c(
                  "div",
                  {
                    key: "follower_" + index,
                    staticClass: "list-group-item border-0 py-1"
                  },
                  [
                    _c("div", { staticClass: "media mb-0" }, [
                      _c("a", { attrs: { href: user.url } }, [
                        _c("img", {
                          staticClass: "mr-3 rounded-circle box-shadow",
                          attrs: {
                            src: user.avatar,
                            alt: user.username + "’s avatar",
                            width: "30px",
                            height: "30px",
                            loading: "lazy"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "media-body mb-0" }, [
                        _c(
                          "p",
                          {
                            staticClass: "mb-0",
                            staticStyle: { "font-size": "14px" }
                          },
                          [
                            _c(
                              "a",
                              {
                                staticClass: "font-weight-bold text-dark",
                                attrs: { href: user.url }
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\t" +
                                    _vm._s(user.username) +
                                    "\n\t\t\t\t\t\t\t"
                                )
                              ]
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "p",
                          {
                            staticClass: "text-secondary mb-0",
                            staticStyle: { "font-size": "13px" }
                          },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\t\t" +
                                _vm._s(user.display_name) +
                                "\n\t\t\t\t\t\t"
                            )
                          ]
                        )
                      ])
                    ])
                  ]
                )
              }),
              _vm._v(" "),
              _vm.followers.length && _vm.followerMore
                ? _c(
                    "div",
                    {
                      staticClass: "list-group-item text-center",
                      on: {
                        click: function($event) {
                          return _vm.followersLoadMore()
                        }
                      }
                    },
                    [
                      _c(
                        "p",
                        {
                          staticClass:
                            "mb-0 small text-muted font-weight-light cursor-pointer"
                        },
                        [_vm._v("Mais")]
                      )
                    ]
                  )
                : _vm._e()
            ],
            2
          )
        ]
      ),
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
                  [_vm._v("\n\t\t\t\tCopiar Link\n\t\t\t")]
                ),
                _vm._v(" "),
                _vm.user && !_vm.owner && !_vm.relationship.following
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "list-group-item cursor-pointer text-center rounded text-dark",
                        on: { click: _vm.followProfile }
                      },
                      [_vm._v("\n\t\t\t\tSeguir\n\t\t\t")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.user && !_vm.owner && _vm.relationship.following
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "list-group-item cursor-pointer text-center rounded",
                        on: { click: _vm.followProfile }
                      },
                      [_vm._v("\n\t\t\t\tDeixar de seguir\n\t\t\t")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.user && !_vm.owner && !_vm.relationship.muting
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "list-group-item cursor-pointer text-center rounded",
                        on: { click: _vm.muteProfile }
                      },
                      [_vm._v("\n\t\t\t\tSilenciar\n\t\t\t")]
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
                      [_vm._v("\n\t\t\t\tUnmute\n\t\t\t")]
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
                      [_vm._v("\n\t\t\t\tReportar Perfil\n\t\t\t")]
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
                      [_vm._v("\n\t\t\t\tBloquear\n\t\t\t")]
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
                      [_vm._v("\n\t\t\t\tDesbloquear\n\t\t\t")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.user && _vm.owner
                  ? _c(
                      "div",
                      {
                        staticClass:
                          "list-group-item cursor-pointer text-center rounded text-dark",
                        on: {
                          click: function($event) {
                            return _vm.redirect("/settings/home")
                          }
                        }
                      },
                      [_vm._v("\n\t\t\t\tOpções\n\t\t\t")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item cursor-pointer text-center rounded text-muted font-weight-bold",
                    on: {
                      click: function($event) {
                        return _vm.$refs.visitorContextMenu.hide()
                      }
                    }
                  },
                  [_vm._v("\n\t\t\t\tCancelar\n\t\t\t")]
                )
              ])
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "sponsorModal",
          attrs: {
            id: "sponsor-modal",
            "hide-footer": "",
            title: "Sponsor " + _vm.profileUsername,
            centered: "",
            size: "md",
            "body-class": "px-5"
          }
        },
        [
          _c("div", [
            _c("p", { staticClass: "font-weight-bold" }, [
              _vm._v("External Links")
            ]),
            _vm._v(" "),
            _vm.sponsorList.patreon
              ? _c("p", { staticClass: "pt-2" }, [
                  _c(
                    "a",
                    {
                      staticClass: "font-weight-bold",
                      attrs: {
                        href: "https://" + _vm.sponsorList.patreon,
                        rel: "nofollow"
                      }
                    },
                    [_vm._v(_vm._s(_vm.sponsorList.patreon))]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.sponsorList.liberapay
              ? _c("p", { staticClass: "pt-2" }, [
                  _c(
                    "a",
                    {
                      staticClass: "font-weight-bold",
                      attrs: {
                        href: "https://" + _vm.sponsorList.liberapay,
                        rel: "nofollow"
                      }
                    },
                    [_vm._v(_vm._s(_vm.sponsorList.liberapay))]
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.sponsorList.opencollective
              ? _c("p", { staticClass: "pt-2" }, [
                  _c(
                    "a",
                    {
                      staticClass: "font-weight-bold",
                      attrs: {
                        href: "https://" + _vm.sponsorList.opencollective,
                        rel: "nofollow"
                      }
                    },
                    [_vm._v(_vm._s(_vm.sponsorList.opencollective))]
                  )
                ])
              : _vm._e()
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "embedModal",
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
              attrs: { rows: "6", disabled: "" },
              domProps: { value: _vm.ctxEmbedPayload },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.ctxEmbedPayload = $event.target.value
                }
              }
            }),
            _vm._v(" "),
            _c("hr"),
            _vm._v(" "),
            _c(
              "button",
              {
                class: _vm.copiedEmbed
                  ? "btn btn-primary btn-block btn-sm py-1 font-weight-bold disabed"
                  : "btn btn-primary btn-block btn-sm py-1 font-weight-bold",
                attrs: { disabled: _vm.copiedEmbed },
                on: { click: _vm.ctxCopyEmbed }
              },
              [
                _vm._v(
                  _vm._s(
                    _vm.copiedEmbed ? "Embed Code Copied!" : "Copy Embed Code"
                  )
                )
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "mb-0 px-2 small text-muted" }, [
              _vm._v("By using this embed, you agree to our "),
              _c("a", { attrs: { href: "/site/terms" } }, [
                _vm._v("Terms of Use")
              ])
            ])
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
    return _c("div", { staticClass: "bg-primary shadow" }, [
      _c(
        "p",
        {
          staticClass:
            "text-center text-white mb-0 py-3 font-weight-bold border-bottom border-info"
        },
        [
          _c("i", { staticClass: "fas fa-exclamation-triangle fa-lg mr-2" }),
          _vm._v(
            " The Moment UI layout has been deprecated and will be removed in a future release.\n\t\t\t"
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
    return _c("div", { staticClass: "py-5 text-center text-muted" }, [
      _c("p", [_c("i", { staticClass: "fas fa-camera-retro fa-2x" })]),
      _vm._v(" "),
      _c("p", { staticClass: "h2 font-weight-light pt-3" }, [
        _vm._v("Nenhum post")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c(
          "div",
          {
            staticClass:
              "p-1 p-sm-2 p-md-3 d-flex justify-content-center align-items-center",
            staticStyle: { height: "30vh" }
          },
          [_c("img", { attrs: { src: "/img/pixelfed-icon-grey.svg" } })]
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "py-5 text-center text-muted" }, [
      _c("p", [_c("i", { staticClass: "fas fa-bookmark fa-2x" })]),
      _vm._v(" "),
      _c("p", { staticClass: "h2 font-weight-light pt-3" }, [
        _vm._v("Nenhum post salvo")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "py-5 text-center text-muted" }, [
      _c("p", [_c("i", { staticClass: "fas fa-images fa-2x" })]),
      _vm._v(" "),
      _c("p", { staticClass: "h2 font-weight-light pt-3" }, [
        _vm._v("Nenhum álbum")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=template&id=be0d9900&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/StoryViewer.vue?vue&type=template&id=be0d9900& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
  return _c("div", { staticClass: "container" }, [
    _vm.loading ? _c("div", { staticClass: "row" }, [_vm._m(0)]) : _vm._e(),
    _vm._v(" "),
    _vm.stories.length != 0
      ? _c("div", [
          _c("div", {
            staticClass: "d-none m-3",
            attrs: { id: "storyContainer" }
          })
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-12 mt-5 pt-5" }, [
      _c("div", { staticClass: "text-center" }, [
        _c(
          "div",
          { staticClass: "spinner-border", attrs: { role: "status" } },
          [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
        )
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

/***/ "./node_modules/vue-masonry-css/dist/vue-masonry.es2015.js":
/*!*****************************************************************!*\
  !*** ./node_modules/vue-masonry-css/dist/vue-masonry.es2015.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * vue-masonry-css v1.0.3
 * https://github.com/paulcollett/vue-masonry-css
 * Released under the MIT License.
 */

// the component name `<masonry />`
// can be overridden with `Vue.use(Masonry, { name: 'the-masonry' });`
var componentName = 'masonry';

var props = {
  tag: {
    type: [String],
    default: 'div'
  },
  cols: {
    type: [Object, Number, String],
    default: 2
  },
  gutter: {
    type: [Object, Number, String],
    default: 0
  },
  css: {
    type: [Boolean],
    default: true
  },
  columnTag: {
    type: [String],
    default: 'div'
  },
  columnClass: {
    type: [String, Array, Object],
    default: function () { return []; }
  },
  columnAttr: {
    type: [Object],
    default: function () { return ({}); }
  }
};

// Get the resulting value from  `:col=` prop
// based on the window width
var breakpointValue = function (mixed, windowWidth) {
  var valueAsNum = parseInt(mixed);

  if(valueAsNum > -1) {
    return mixed;
  }else if(typeof mixed !== 'object') {
    return 0;
  }

  var matchedBreakpoint = Infinity;
  var matchedValue = mixed.default || 0;

  for(var k in mixed) {
    var breakpoint = parseInt(k);
    var breakpointValRaw = mixed[breakpoint];
    var breakpointVal = parseInt(breakpointValRaw);

    if(isNaN(breakpoint) || isNaN(breakpointVal)) {
      continue;
    }

    var isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint;

    if(isNewBreakpoint) {
      matchedBreakpoint = breakpoint;
      matchedValue = breakpointValRaw;
    }
  }

  return matchedValue;
};

var component = {
  props: props,

  data: function data() {
    return {
      displayColumns: 2,
      displayGutter: 0
    }
  },

  mounted: function mounted() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.reCalculate();
    });

    // Bind resize handler to page
    if(window) {
      window.addEventListener('resize', this.reCalculate);
    }
  },

  updated: function updated() {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.reCalculate();
    });
  },

  beforeDestroy: function beforeDestroy() {
    if(window) {
      window.removeEventListener('resize', this.reCalculate);
    }
  },

  methods: {
    // Recalculate how many columns to display based on window width
    // and the value of the passed `:cols=` prop
    reCalculate: function reCalculate() {
      var previousWindowWidth = this.windowWidth;

      this.windowWidth = (window ? window.innerWidth : null) || Infinity;

      // Window resize events get triggered on page height
      // change which when loading the page can result in multiple
      // needless calculations. We prevent this here.
      if(previousWindowWidth === this.windowWidth) {
        return;
      }

      this._reCalculateColumnCount(this.windowWidth);

      this._reCalculateGutterSize(this.windowWidth);
    },

    _reCalculateGutterSize: function _reCalculateGutterSize(windowWidth) {
      this.displayGutter = breakpointValue(this.gutter, windowWidth);
    },

    _reCalculateColumnCount: function _reCalculateColumnCount(windowWidth) {
      var newColumns = breakpointValue(this.cols, windowWidth);

      // Make sure we can return a valid value
      newColumns = Math.max(1, Number(newColumns) || 0);

      this.displayColumns = newColumns;
    },

    _getChildItemsInColumnsArray: function _getChildItemsInColumnsArray() {
      var this$1 = this;

      var columns = [];
      var childItems = this.$slots.default || [];

      // This component does not work with a child <transition-group /> ..yet,
      // so for now we think it may be helpful to ignore until we can find a way for support
      if(childItems.length === 1 && childItems[0].componentOptions && childItems[0].componentOptions.tag == 'transition-group') {
        childItems = childItems[0].componentOptions.children;
      }

      // Loop through child elements
      for (var i = 0, visibleItemI = 0; i < childItems.length; i++, visibleItemI++) {
        // skip Vue elements without tags, which includes
        // whitespace elements and also plain text
        if(!childItems[i].tag) {
          visibleItemI--;

          continue;
        }

        // Get the column index the child item will end up in
        var columnIndex = visibleItemI % this$1.displayColumns;

        if(!columns[columnIndex]) {
          columns[columnIndex] = [];
        }

        columns[columnIndex].push(childItems[i]);
      }

      return columns;
    }
  },

  render: function render(createElement) {
    var this$1 = this;

    var columnsContainingChildren = this._getChildItemsInColumnsArray();
    var isGutterSizeUnitless = parseInt(this.displayGutter) === this.displayGutter * 1;
    var gutterSizeWithUnit =  isGutterSizeUnitless ? ((this.displayGutter) + "px") : this.displayGutter;

    var columnStyle = {
      boxSizing: 'border-box',
      backgroundClip: 'padding-box',
      width: ((100 / this.displayColumns) + "%"),
      border: '0 solid transparent',
      borderLeftWidth: gutterSizeWithUnit
    };

    var columns = columnsContainingChildren.map(function (children, index) {
      /// Create column element and inject the children
      return createElement(this$1.columnTag, {
        key: index + '-' + columnsContainingChildren.length,
        style: this$1.css ? columnStyle : null,
        class: this$1.columnClass,
        attrs: this$1.columnAttr
      }, children); // specify child items here
    });

    var containerStyle = {
      display: ['-webkit-box', '-ms-flexbox', 'flex'],
      marginLeft: ("-" + gutterSizeWithUnit)
    };

    // Return wrapper with columns
    return createElement(
      this.tag, // tag name
      this.css ? { style: containerStyle } : null, // element options
      columns // column vue elements
    );
  }
};

var Plugin = function () {};

Plugin.install = function (Vue, options) {
  if (Plugin.installed) {
    return;
  }

  if(options && options.name) {
    Vue.component(options.name, component);
  } else {
    Vue.component(componentName, component);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (Plugin);


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

/***/ "./resources/assets/js/components/Profile.vue":
/*!****************************************************!*\
  !*** ./resources/assets/js/components/Profile.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Profile_vue_vue_type_template_id_4bdda942_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Profile.vue?vue&type=template&id=4bdda942&scoped=true& */ "./resources/assets/js/components/Profile.vue?vue&type=template&id=4bdda942&scoped=true&");
/* harmony import */ var _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Profile.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css& */ "./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Profile_vue_vue_type_template_id_4bdda942_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Profile_vue_vue_type_template_id_4bdda942_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "4bdda942",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/Profile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/Profile.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/assets/js/components/Profile.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css&":
/*!*************************************************************************************************************!*\
  !*** ./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css& ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=style&index=0&id=4bdda942&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_style_index_0_id_4bdda942_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/Profile.vue?vue&type=template&id=4bdda942&scoped=true&":
/*!***********************************************************************************************!*\
  !*** ./resources/assets/js/components/Profile.vue?vue&type=template&id=4bdda942&scoped=true& ***!
  \***********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_4bdda942_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Profile.vue?vue&type=template&id=4bdda942&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/Profile.vue?vue&type=template&id=4bdda942&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_4bdda942_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Profile_vue_vue_type_template_id_4bdda942_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/assets/js/components/StoryViewer.vue":
/*!********************************************************!*\
  !*** ./resources/assets/js/components/StoryViewer.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _StoryViewer_vue_vue_type_template_id_be0d9900___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StoryViewer.vue?vue&type=template&id=be0d9900& */ "./resources/assets/js/components/StoryViewer.vue?vue&type=template&id=be0d9900&");
/* harmony import */ var _StoryViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./StoryViewer.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/StoryViewer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./StoryViewer.vue?vue&type=style&index=0&lang=css& */ "./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _StoryViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _StoryViewer_vue_vue_type_template_id_be0d9900___WEBPACK_IMPORTED_MODULE_0__["render"],
  _StoryViewer_vue_vue_type_template_id_be0d9900___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/StoryViewer.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/StoryViewer.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/assets/js/components/StoryViewer.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryViewer.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************************************!*\
  !*** ./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryViewer.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/StoryViewer.vue?vue&type=template&id=be0d9900&":
/*!***************************************************************************************!*\
  !*** ./resources/assets/js/components/StoryViewer.vue?vue&type=template&id=be0d9900& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_template_id_be0d9900___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./StoryViewer.vue?vue&type=template&id=be0d9900& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/StoryViewer.vue?vue&type=template&id=be0d9900&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_template_id_be0d9900___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_StoryViewer_vue_vue_type_template_id_be0d9900___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./resources/assets/js/profile.js":
/*!****************************************!*\
  !*** ./resources/assets/js/profile.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('photo-presenter', __webpack_require__(/*! ./components/presenter/PhotoPresenter.vue */ "./resources/assets/js/components/presenter/PhotoPresenter.vue")["default"]);
Vue.component('video-presenter', __webpack_require__(/*! ./components/presenter/VideoPresenter.vue */ "./resources/assets/js/components/presenter/VideoPresenter.vue")["default"]);
Vue.component('photo-album-presenter', __webpack_require__(/*! ./components/presenter/PhotoAlbumPresenter.vue */ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue")["default"]);
Vue.component('video-album-presenter', __webpack_require__(/*! ./components/presenter/VideoAlbumPresenter.vue */ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue")["default"]);
Vue.component('mixed-album-presenter', __webpack_require__(/*! ./components/presenter/MixedAlbumPresenter.vue */ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue")["default"]);
Vue.component('post-menu', __webpack_require__(/*! ./components/PostMenu.vue */ "./resources/assets/js/components/PostMenu.vue")["default"]);
Vue.component('story-viewer', __webpack_require__(/*! ./components/StoryViewer.vue */ "./resources/assets/js/components/StoryViewer.vue")["default"]);
Vue.component('profile', __webpack_require__(/*! ./components/Profile.vue */ "./resources/assets/js/components/Profile.vue")["default"]);

/***/ }),

/***/ 4:
/*!**********************************************!*\
  !*** multi ./resources/assets/js/profile.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/profile.js */"./resources/assets/js/profile.js");


/***/ })

},[[4,"/js/manifest"]]]);