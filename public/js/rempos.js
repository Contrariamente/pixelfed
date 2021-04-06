(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["/js/rempos"],{

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

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemotePost.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
pixelfed.postComponent = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['status-id', 'status-username', 'status-template', 'status-url', 'status-profile-url', 'status-avatar', 'status-profile-id', 'profile-layout'],
  data: function data() {
    var _ref;

    return _ref = {
      config: window.App.config,
      status: false,
      media: {},
      user: false,
      reactions: {
        liked: false,
        shared: false
      },
      likes: [],
      likesPage: 1,
      shares: [],
      sharesPage: 1,
      replyText: '',
      replyStatus: {},
      replySensitive: false,
      relationship: {},
      results: [],
      pagination: {},
      min_id: 0,
      max_id: 0,
      reply_to_profile_id: 0,
      thread: false,
      showComments: false,
      warning: false,
      loaded: false,
      loading: null,
      replyingToId: this.statusId,
      replyingToUsername: this.statusUsername,
      replyToIndex: 0,
      replySending: false,
      emoji: window.App.util.emoji,
      showReadMore: true,
      showCaption: true,
      layout: this.profileLayout,
      showProfileMorePosts: false,
      profileMorePosts: []
    }, _defineProperty(_ref, "replySending", false), _defineProperty(_ref, "reactionBarLoading", true), _defineProperty(_ref, "profileUrl", null), _ref;
  },
  mounted: function mounted() {
    this.fetchRelationships();

    if (localStorage.getItem('pf_metro_ui.exp.rm') == 'false') {
      this.showReadMore = false;
    } else {
      this.showReadMore = true;
    }
  },
  updated: function updated() {
    $('.carousel').carousel();
    $('[data-toggle="tooltip"]').tooltip();

    if (this.showReadMore == true) {
      window.pixelfed.readmore();
    }
  },
  methods: {
    reportUrl: function reportUrl() {
      return '/i/report?type=post&id=' + this.status.id;
    },
    editUrl: function editUrl() {
      return this.status.url + '/edit';
    },
    timestampFormat: function timestampFormat() {
      var ts = new Date(this.status.created_at);
      return ts.toDateString();
    },
    fetchData: function fetchData() {
      var _this = this;

      var self = this;
      axios.get('/api/v2/profile/' + this.statusUsername + '/status/' + this.statusId).then(function (response) {
        self.status = response.data.status;
        self.media = self.status.media_attachments;
        self.likesPage = 2;
        self.sharesPage = 2;
        self.showCaption = !response.data.status.sensitive;

        if (self.status.comments_disabled == false) {
          self.showComments = true;

          _this.fetchComments();
        }

        self.profileUrl = '/i/web/profile/_/' + response.data.status.account.id;
        _this.loaded = true;
        setTimeout(function () {
          self.fetchProfilePosts();
        }, 3000);
        setTimeout(function () {
          self.fetchState();
          document.querySelectorAll('.status-comment .postCommentsContainer .comment-body a').forEach(function (i, e) {
            i.href = App.util.format.rewriteLinks(i);
          });
        }, 500);
      })["catch"](function (error) {
        swal('Oops!', 'An error occured, please try refreshing the page.', 'error');
      });
    },
    fetchState: function fetchState() {
      var self = this;
      axios.get('/api/v2/profile/' + this.statusUsername + '/status/' + this.statusId + '/state').then(function (res) {
        self.user = res.data.user;
        window._sharedData.curUser = self.user;
        window.App.util.navatar();
        self.likes = res.data.likes;
        self.shares = res.data.shares;
        self.reactions = res.data.reactions;
        self.reactionBarLoading = false;
      });
    },
    likesModal: function likesModal() {
      var _this2 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = '/login?next=' + encodeURIComponent('/p/' + this.status.shortcode);
        return;
      }

      if (this.status.favourites_count == 0) {
        return;
      }

      if (this.likes.length) {
        this.$refs.likesModal.show();
        return;
      }

      axios.get('/api/v2/likes/profile/' + this.statusUsername + '/status/' + this.statusId).then(function (res) {
        _this2.likes = res.data.data;

        _this2.$refs.likesModal.show();
      });
    },
    sharesModal: function sharesModal() {
      var _this3 = this;

      if (this.status.reblogs_count == 0 || $('body').hasClass('loggedIn') == false) {
        window.location.href = '/login?next=' + encodeURIComponent('/p/' + this.status.shortcode);
        return;
      }

      if (this.shares.length) {
        this.$refs.sharesModal.show();
        return;
      }

      axios.get('/api/v2/shares/profile/' + this.statusUsername + '/status/' + this.statusId).then(function (res) {
        _this3.shares = res.data.data;

        _this3.$refs.sharesModal.show();
      });
    },
    infiniteLikesHandler: function infiniteLikesHandler($state) {
      var _this4 = this;

      var api = '/api/v2/likes/profile/' + this.statusUsername + '/status/' + this.statusId;
      axios.get(api, {
        params: {
          page: this.likesPage
        }
      }).then(function (_ref2) {
        var data = _ref2.data;

        if (data.data.length > 0) {
          var _this4$likes;

          (_this4$likes = _this4.likes).push.apply(_this4$likes, _toConsumableArray(data.data));

          _this4.likesPage++;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    infiniteSharesHandler: function infiniteSharesHandler($state) {
      var _this5 = this;

      axios.get('/api/v2/shares/profile/' + this.statusUsername + '/status/' + this.statusId, {
        params: {
          page: this.sharesPage
        }
      }).then(function (_ref3) {
        var data = _ref3.data;

        if (data.data.length > 0) {
          var _this5$shares;

          (_this5$shares = _this5.shares).push.apply(_this5$shares, _toConsumableArray(data.data));

          _this5.sharesPage++;
          $state.loaded();
        } else {
          $state.complete();
        }
      });
    },
    likeStatus: function likeStatus(event) {
      var _this6 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
        return;
      }

      axios.post('/i/like', {
        item: this.status.id
      }).then(function (res) {
        _this6.status.favourites_count = res.data.count;

        if (_this6.reactions.liked == true) {
          _this6.reactions.liked = false;
          var user = _this6.user.id;
          _this6.likes = _this6.likes.filter(function (like) {
            return like.id !== user;
          });
        } else {
          _this6.reactions.liked = true;
          var _user = _this6.user;

          _this6.likes.unshift(_user);

          setTimeout(function () {
            event.target.classList.add('animate__animated', 'animate__bounce');
          }, 100);
        }
      })["catch"](function (err) {
        console.error(err);
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
      window.navigator.vibrate(200);
    },
    shareStatus: function shareStatus() {
      var _this7 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
        return;
      }

      axios.post('/i/share', {
        item: this.status.id
      }).then(function (res) {
        _this7.status.reblogs_count = res.data.count;

        if (_this7.reactions.shared == true) {
          _this7.reactions.shared = false;
          var user = _this7.user.id;
          _this7.shares = _this7.shares.filter(function (reaction) {
            return reaction.id !== user;
          });
        } else {
          _this7.reactions.shared = true;
          var _user2 = _this7.user;

          _this7.shares.push(_user2);
        }
      })["catch"](function (err) {
        console.error(err);
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
    },
    bookmarkStatus: function bookmarkStatus() {
      var _this8 = this;

      if ($('body').hasClass('loggedIn') == false) {
        window.location.href = '/login?next=' + encodeURIComponent(window.location.pathname);
        return;
      }

      axios.post('/i/bookmark', {
        item: this.status.id
      }).then(function (res) {
        if (_this8.reactions.bookmarked == true) {
          _this8.reactions.bookmarked = false;
        } else {
          _this8.reactions.bookmarked = true;
        }
      })["catch"](function (err) {
        swal('Error', 'Something went wrong, please try again later.', 'error');
      });
    },
    blockProfile: function blockProfile() {
      var _this9 = this;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/block', {
        type: 'user',
        item: this.status.account.id
      }).then(function (res) {
        _this9.$refs.ctxModal.hide();

        _this9.relationship.blocking = true;
        swal('Success', 'You have successfully blocked ' + _this9.status.account.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    unblockProfile: function unblockProfile() {
      var _this10 = this;

      if ($('body').hasClass('loggedIn') == false) {
        return;
      }

      axios.post('/i/unblock', {
        type: 'user',
        item: this.status.account.id
      }).then(function (res) {
        _this10.relationship.blocking = false;

        _this10.$refs.ctxModal.hide();

        swal('Success', 'You have successfully unblocked ' + _this10.status.account.acct, 'success');
      })["catch"](function (err) {
        swal('Error', 'Something went wrong. Please try again later.', 'error');
      });
    },
    deletePost: function deletePost(status) {
      if (!this.ownerOrAdmin()) {
        return;
      }

      var result = confirm('Are you sure you want to delete this post?');

      if (result) {
        if ($('body').hasClass('loggedIn') == false) {
          return;
        }

        axios.post('/i/delete', {
          type: 'status',
          item: this.status.id
        }).then(function (res) {
          swal('Success', 'You have successfully deleted this post', 'success');
          setTimeout(function () {
            window.location.href = '/';
          }, 3000);
        })["catch"](function (err) {
          swal('Error', 'Something went wrong. Please try again later.', 'error');
        });
      }
    },
    owner: function owner() {
      return this.user.id === this.status.account.id;
    },
    admin: function admin() {
      return this.user.is_admin == true;
    },
    ownerOrAdmin: function ownerOrAdmin() {
      return this.owner() || this.admin();
    },
    postReply: function postReply() {
      var self = this;
      this.replySending = true;

      if (this.replyText.length == 0 || this.replyText.trim() == '@' + this.status.account.acct) {
        self.replyText = null;
        $('textarea[name="comment"]').blur();
        return;
      }

      var data = {
        item: this.replyingToId,
        comment: this.replyText,
        sensitive: this.replySensitive
      };
      this.replyText = '';
      axios.post('/i/comment', data).then(function (res) {
        var entity = res.data.entity;

        if (entity.in_reply_to_id == self.status.id) {
          if (self.layout == 'metro') {
            self.results.push(entity);
          } else {
            self.results.unshift(entity);
          }

          var elem = $('.status-comments')[0];
          elem.scrollTop = elem.clientHeight * 2;
        } else {
          if (self.replyToIndex >= 0) {
            var el = self.results[self.replyToIndex];
            el.replies.push(entity);
            el.reply_count = el.reply_count + 1;
          }
        }

        self.$refs.replyModal.hide();
        self.replySending = false;
      });
    },
    deleteComment: function deleteComment(id, i) {
      var _this11 = this;

      axios.post('/i/delete', {
        type: 'comment',
        item: id
      }).then(function (res) {
        _this11.results.splice(i, 1);
      })["catch"](function (err) {
        swal('Something went wrong!', 'Please try again later', 'error');
      });
    },
    deleteCommentReply: function deleteCommentReply(id, i, pi) {
      var _this12 = this;

      axios.post('/i/delete', {
        type: 'comment',
        item: id
      }).then(function (res) {
        _this12.results[pi].replies.splice(i, 1);

        --_this12.results[pi].reply_count;
      })["catch"](function (err) {
        swal('Something went wrong!', 'Please try again later', 'error');
      });
    },
    l: function l(e) {
      var len = e.length;

      if (len < 10) {
        return e;
      }

      return e.substr(0, 10) + '...';
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
    },
    fetchComments: function fetchComments() {
      var _this13 = this;

      var url = '/api/v2/comments/' + this.statusProfileId + '/status/' + this.statusId;
      axios.get(url).then(function (response) {
        var self = _this13;
        _this13.results = _this13.layout == 'metro' ? _.reverse(response.data.data) : response.data.data;
        _this13.pagination = response.data.meta.pagination;

        if (_this13.results.length > 0) {
          $('.load-more-link').removeClass('d-none');
        }

        $('.postCommentsLoader').addClass('d-none');
        $('.postCommentsContainer').removeClass('d-none');
        setTimeout(function () {
          document.querySelectorAll('.status-comment .postCommentsContainer .comment-body a').forEach(function (i, e) {
            i.href = App.util.format.rewriteLinks(i);
          });
        }, 500);
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
    loadMore: function loadMore(e) {
      var _this14 = this;

      e.preventDefault();

      if (this.pagination.total_pages == 1 || this.pagination.current_page == this.pagination.total_pages) {
        $('.load-more-link').addClass('d-none');
        return;
      }

      $('.load-more-link').addClass('d-none');
      $('.postCommentsLoader').removeClass('d-none');
      var next = this.pagination.links.next;
      axios.get(next).then(function (response) {
        var self = _this14;
        var res = response.data.data;
        $('.postCommentsLoader').addClass('d-none');

        for (var i = 0; i < res.length; i++) {
          _this14.results.unshift(res[i]);
        }

        _this14.pagination = response.data.meta.pagination;
        $('.load-more-link').removeClass('d-none');
      });
    },
    likeReply: function likeReply(status, $event) {
      if ($('body').hasClass('loggedIn') == false) {
        swal('Login', 'Please login to perform this action.', 'info');
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
    truncate: function truncate(str, lim) {
      return _.truncate(str, {
        length: lim
      });
    },
    timeAgo: function timeAgo(ts) {
      return App.util.format.timeAgo(ts);
    },
    emojiReaction: function emojiReaction() {
      var em = event.target.innerText;

      if (this.replyText.length == 0) {
        this.reply_to_profile_id = this.status.account.id;
        this.replyText = em + ' ';
        $('textarea[name="comment"]').focus();
      } else {
        this.reply_to_profile_id = this.status.account.id;
        this.replyText += em + ' ';
        $('textarea[name="comment"]').focus();
      }
    },
    toggleCommentVisibility: function toggleCommentVisibility() {
      if (this.ownerOrAdmin() == false) {
        return;
      }

      var state = this.status.comments_disabled;
      var self = this;

      if (state == true) {
        // re-enable comments
        axios.post('/i/visibility', {
          item: self.status.id,
          disableComments: false
        }).then(function (res) {
          self.status.comments_disabled = false;
          self.$refs.ctxModal.hide();
          window.location.reload();
        })["catch"](function (err) {
          return;
        });
      } else {
        // disable comments
        axios.post('/i/visibility', {
          item: self.status.id,
          disableComments: true
        }).then(function (res) {
          self.status.comments_disabled = true;
          self.showComments = false;
          self.$refs.ctxModal.hide();
        })["catch"](function (err) {
          return;
        });
      }
    },
    fetchRelationships: function fetchRelationships() {
      var _this15 = this;

      if (document.querySelectorAll('body')[0].classList.contains('loggedIn') == false) {
        this.fetchData();
        return;
      } else {
        axios.get('/api/pixelfed/v1/accounts/relationships', {
          params: {
            'id[]': this.statusProfileId
          }
        }).then(function (res) {
          if (res.data[0] == null) {
            _this15.fetchData();

            return;
          }

          _this15.relationship = res.data[0];

          if (res.data[0].blocking == true) {
            _this15.loaded = true;
            _this15.warning = true;
            return;
          } else {
            _this15.fetchData();

            return;
          }
        });
      }
    },
    visibilityModal: function visibilityModal() {
      switch (this.status.visibility) {
        case 'public':
          swal('Public Post', 'This post is visible to everyone.', 'info');
          break;

        case 'unlisted':
          swal('Unlisted Post', 'This post is visible on profiles and with a direct links. It is not displayed on timelines.', 'info');
          break;

        case 'private':
          swal('Private Post', 'This post is only visible to followers.', 'info');
          break;
      }
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
    redirect: function redirect(url) {
      window.location.href = url;
    },
    permalinkUrl: function permalinkUrl(reply) {
      var showOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var profile = reply.account;

      if (profile.local == true) {
        return reply.url;
      } else {
        return showOrigin ? reply.url : '/i/web/post/_/' + profile.id + '/' + reply.id;
      }
    },
    fetchProfilePosts: function fetchProfilePosts() {
      if (!$('body').hasClass('loggedIn') && this.loaded) {
        return;
      }

      var self = this;
      var apiUrl = '/api/pixelfed/v1/accounts/' + this.statusProfileId + '/statuses';
      axios.get(apiUrl, {
        params: {
          only_media: true,
          min_id: 1,
          limit: 9
        }
      }).then(function (res) {
        var data = res.data.filter(function (status) {
          return status.media_attachments.length > 0 && status.id != self.statusId && status.sensitive == false;
        });
        var ids = data.map(function (status) {
          return status.id;
        });

        if (data.length >= 3) {
          self.showProfileMorePosts = true;
        }

        self.profileMorePosts = data.slice(0, 6);
      });
    },
    previewUrl: function previewUrl(status) {
      return status.sensitive ? '/storage/no-preview.png?v=' + new Date().getTime() : status.media_attachments[0].preview_url;
    },
    previewBackground: function previewBackground(status) {
      var preview = this.previewUrl(status);
      return 'background-image: url(' + preview + ');';
    },
    getStatusUrl: function getStatusUrl(status) {
      var showOrigin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (status.local == true || showOrigin == true) {
        return status.url;
      }

      return '/i/web/post/_/' + status.account.id + '/' + status.id;
    },
    showTaggedPeopleModal: function showTaggedPeopleModal() {
      if (!$('body').hasClass('loggedIn') && this.loaded) {
        return;
      }

      this.$refs.taggedModal.show();
    },
    untagMe: function untagMe() {
      var _this16 = this;

      this.$refs.taggedModal.hide();
      var id = this.user.id;
      axios.post('/api/local/compose/tag/untagme', {
        status_id: this.statusId,
        profile_id: id
      }).then(function (res) {
        _this16.status.taggedPeople = _this16.status.taggedPeople.filter(function (t) {
          return t.id != id;
        });
        swal('Untagged', 'You have been untagged from this post.', 'success');
      })["catch"](function (err) {
        swal('An Error Occurred', 'Please try again later.', 'error');
      });
    },
    copyPostUrl: function copyPostUrl() {
      navigator.clipboard.writeText(this.statusUrl);
      return;
    },
    moderatePost: function moderatePost(action, $event) {
      var status = this.status;
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
                // this.feed = this.feed.filter(f => {
                //   return f.id != status.id;
                // });
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
    ctxMenu: function ctxMenu() {
      this.$refs.ctxModal.show();
      return;
    },
    closeCtxMenu: function closeCtxMenu(truncate) {
      this.$refs.ctxModal.hide();
    },
    ctxModMenu: function ctxModMenu() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxModModal.show();
    },
    ctxModMenuClose: function ctxModMenuClose() {
      this.$refs.ctxModal.hide();
      this.$refs.ctxModModal.hide();
    },
    ctxMenuCopyLink: function ctxMenuCopyLink() {
      var status = this.status;
      navigator.clipboard.writeText(status.url);
      this.closeCtxMenu();
      return;
    },
    ctxMenuFollow: function ctxMenuFollow() {
      var _this17 = this;

      var id = this.status.account.id;
      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        var username = _this17.status.account.acct;
        _this17.relationship.following = true;

        _this17.$refs.ctxModal.hide();

        setTimeout(function () {
          swal('Follow successful!', 'You are now following ' + username, 'success');
        }, 500);
      });
    },
    ctxMenuUnfollow: function ctxMenuUnfollow() {
      var _this18 = this;

      var id = this.status.account.id;
      axios.post('/i/follow', {
        item: id
      }).then(function (res) {
        var username = _this18.status.account.acct;
        _this18.relationship.following = false;

        _this18.$refs.ctxModal.hide();

        setTimeout(function () {
          swal('Unfollow successful!', 'You are no longer following ' + username, 'success');
        }, 500);
      });
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.status-comments[data-v-7e9f6706],\n.reactions[data-v-7e9f6706] {\n  background: #fff;\n}\n.postPresenterContainer[data-v-7e9f6706] {\n  background: #fff;\n}\n@media(min-width: 720px) {\n.postPresenterContainer[data-v-7e9f6706] { \n    min-height: 600px;\n}\n}\n[data-v-7e9f6706]::-webkit-scrollbar {\n    width: 0px;\n    background: transparent;\n}\n.reply-btn[data-v-7e9f6706] {\n  position: absolute;\n  bottom: 12px;\n  right: 20px;\n  width: 60px;\n  text-align: center;\n  border-radius: 0 3px 3px 0;\n}\n.text-lighter[data-v-7e9f6706] {\n  color:#B8C2CC !important;\n}\n.text-break[data-v-7e9f6706] {\n  overflow-wrap: break-word;\n}\n.comments p[data-v-7e9f6706] {\n  margin-bottom: 0;\n}\n.comment-reaction[data-v-7e9f6706] {\n  font-size: 80%;\n}\n.show-reply-bar[data-v-7e9f6706] {\n  display: inline-block;\n  border-bottom: 1px solid #999;\n  height: 0;\n  margin-right: 16px;\n  vertical-align: middle;\n  width: 24px;\n}\n.comment-thread[data-v-7e9f6706] {\n  margin-top: 1rem;\n}\n.emoji-reactions .nav-item[data-v-7e9f6706] {\n  font-size: 1.2rem;\n  padding: 9px;\n  cursor: pointer;\n}\n.emoji-reactions[data-v-7e9f6706]::-webkit-scrollbar {\n  width: 0px;\n  height: 0px;\n  background: transparent;\n}\n@media (min-width: 1200px) {\n.container[data-v-7e9f6706] {\n    max-width: 1100px;\n}\n}\n\n", ""]);

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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--9-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--9-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/assets/js/components/RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
      !_vm.loaded
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
      _vm.loaded && _vm.warning
        ? _c("div", { staticClass: "bg-white mt-n4 pt-3 border-bottom" }, [
            _c("div", { staticClass: "container" }, [
              _c("p", { staticClass: "text-center font-weight-bold" }, [
                _vm._v("You are blocking this account")
              ]),
              _vm._v(" "),
              _c("p", { staticClass: "text-center font-weight-bold" }, [
                _c(
                  "a",
                  {
                    staticClass: "btn btn-primary font-weight-bold px-5",
                    attrs: { href: "#" },
                    on: {
                      click: function($event) {
                        $event.preventDefault()
                        _vm.warning = false
                        _vm.fetchData()
                      }
                    }
                  },
                  [_vm._v("View Status")]
                )
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.loaded && _vm.warning == false
        ? _c("div", { staticClass: "postComponent" }, [
            _c("div", { staticClass: "container px-0" }, [
              _c(
                "div",
                {
                  staticClass:
                    "card card-md-rounded-0 status-container orientation-unknown shadow-none border"
                },
                [
                  _c("div", { staticClass: "row px-0 mx-0" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "d-flex d-md-none align-items-center justify-content-between card-header bg-white w-100"
                      },
                      [
                        _c("div", { staticClass: "d-flex" }, [
                          _c(
                            "div",
                            {
                              staticClass: "status-avatar mr-2",
                              on: {
                                click: function($event) {
                                  return _vm.redirect(_vm.profileUrl)
                                }
                              }
                            },
                            [
                              _c("img", {
                                staticClass: "cursor-pointer",
                                staticStyle: { "border-radius": "12px" },
                                attrs: {
                                  src: _vm.statusAvatar,
                                  width: "24px",
                                  height: "24px"
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "username" }, [
                            _c(
                              "span",
                              {
                                staticClass:
                                  "username-link font-weight-bold text-dark cursor-pointer",
                                on: {
                                  click: function($event) {
                                    return _vm.redirect(_vm.profileUrl)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(_vm.statusUsername))]
                            ),
                            _vm._v(" "),
                            _vm.status.account.is_admin
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
                                      staticStyle: { "font-size": "7px" }
                                    })
                                  ]
                                )
                              : _vm._e(),
                            _vm._v(" "),
                            _c(
                              "p",
                              {
                                staticClass: "mb-0",
                                staticStyle: { "font-size": "10px" }
                              },
                              [
                                _vm.loaded && _vm.status.taggedPeople.length
                                  ? _c("span", { staticClass: "mb-0" }, [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "font-weight-light cursor-pointer",
                                          staticStyle: { color: "#718096" },
                                          attrs: {
                                            title: "Tagged People",
                                            "data-toggle": "tooltip",
                                            "data-placement": "bottom"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.showTaggedPeopleModal()
                                            }
                                          }
                                        },
                                        [
                                          _c("i", {
                                            staticClass:
                                              "fas fa-tag text-lighter"
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            { staticClass: "font-weight-bold" },
                                            [
                                              _vm._v(
                                                _vm._s(
                                                  _vm.status.taggedPeople.length
                                                ) + " Tagged People"
                                              )
                                            ]
                                          )
                                        ]
                                      )
                                    ])
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.loaded &&
                                _vm.status.place != null &&
                                _vm.status.taggedPeople.length
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "px-2 font-weight-bold text-lighter"
                                      },
                                      [_vm._v("•")]
                                    )
                                  : _vm._e(),
                                _vm._v(" "),
                                _vm.loaded && _vm.status.place != null
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "mb-0 cursor-pointer text-truncate",
                                        staticStyle: { color: "#718096" },
                                        on: {
                                          click: function($event) {
                                            return _vm.redirect(
                                              "/discover/places/" +
                                                _vm.status.place.id +
                                                "/" +
                                                _vm.status.place.slug
                                            )
                                          }
                                        }
                                      },
                                      [
                                        _c("i", {
                                          staticClass:
                                            "fas fa-map-marked-alt text-lighter"
                                        }),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          { staticClass: "font-weight-bold" },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.status.place.name) +
                                                ", " +
                                                _vm._s(_vm.status.place.country)
                                            )
                                          ]
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _vm.user != false
                          ? _c("div", { staticClass: "float-right" }, [
                              _c("div", { staticClass: "post-actions" }, [
                                _c("div", [
                                  _c(
                                    "button",
                                    {
                                      staticClass:
                                        "btn btn-link text-dark no-caret",
                                      attrs: { title: "Post options" },
                                      on: {
                                        click: function($event) {
                                          return _vm.ctxMenu()
                                        }
                                      }
                                    },
                                    [
                                      _c("span", {
                                        staticClass:
                                          "fas fa-ellipsis-v text-muted"
                                      })
                                    ]
                                  )
                                ])
                              ])
                            ])
                          : _vm._e()
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "col-12 col-md-8 px-0 mx-0" }, [
                      _c(
                        "div",
                        {
                          staticClass:
                            "postPresenterContainer d-none d-flex justify-content-center align-items-center",
                          staticStyle: { background: "#000" }
                        },
                        [
                          _vm.status.pf_type === "photo"
                            ? _c(
                                "div",
                                { staticClass: "w-100" },
                                [
                                  _c("photo-presenter", {
                                    attrs: { status: _vm.status }
                                  })
                                ],
                                1
                              )
                            : _vm.status.pf_type === "video"
                            ? _c(
                                "div",
                                { staticClass: "w-100" },
                                [
                                  _c("video-presenter", {
                                    attrs: { status: _vm.status }
                                  })
                                ],
                                1
                              )
                            : _vm.status.pf_type === "photo:album"
                            ? _c(
                                "div",
                                { staticClass: "w-100" },
                                [
                                  _c("photo-album-presenter", {
                                    attrs: { status: _vm.status }
                                  })
                                ],
                                1
                              )
                            : _vm.status.pf_type === "video:album"
                            ? _c(
                                "div",
                                { staticClass: "w-100" },
                                [
                                  _c("video-album-presenter", {
                                    attrs: { status: _vm.status }
                                  })
                                ],
                                1
                              )
                            : _vm.status.pf_type === "photo:video:album"
                            ? _c(
                                "div",
                                { staticClass: "w-100" },
                                [
                                  _c("mixed-album-presenter", {
                                    attrs: { status: _vm.status }
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
                                  [_vm._v("Error: Problem rendering preview.")]
                                )
                              ])
                        ]
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "div",
                      {
                        staticClass:
                          "col-12 col-md-4 px-0 d-flex flex-column border-left border-md-left-0"
                      },
                      [
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-md-flex d-none align-items-center justify-content-between card-header py-3 bg-white"
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass:
                                  "d-flex align-items-center status-username text-truncate"
                              },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass: "status-avatar mr-2",
                                    on: {
                                      click: function($event) {
                                        return _vm.redirect(_vm.profileUrl)
                                      }
                                    }
                                  },
                                  [
                                    _c("img", {
                                      staticClass: "cursor-pointer",
                                      staticStyle: { "border-radius": "12px" },
                                      attrs: {
                                        src: _vm.statusAvatar,
                                        width: "24px",
                                        height: "24px"
                                      }
                                    })
                                  ]
                                ),
                                _vm._v(" "),
                                _c("div", { staticClass: "username" }, [
                                  _c(
                                    "span",
                                    {
                                      staticClass:
                                        "username-link font-weight-bold text-dark cursor-pointer",
                                      on: {
                                        click: function($event) {
                                          return _vm.redirect(_vm.profileUrl)
                                        }
                                      }
                                    },
                                    [_vm._v(_vm._s(_vm.statusUsername))]
                                  ),
                                  _vm._v(" "),
                                  _vm.status.account.is_admin
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
                                            staticStyle: { "font-size": "7px" }
                                          })
                                        ]
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _c(
                                    "p",
                                    {
                                      staticClass: "mb-0",
                                      staticStyle: { "font-size": "10px" }
                                    },
                                    [
                                      _vm.loaded &&
                                      _vm.status.taggedPeople.length
                                        ? _c("span", { staticClass: "mb-0" }, [
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "font-weight-light cursor-pointer",
                                                staticStyle: {
                                                  color: "#718096"
                                                },
                                                attrs: {
                                                  title: "Tagged People",
                                                  "data-toggle": "tooltip",
                                                  "data-placement": "bottom"
                                                },
                                                on: {
                                                  click: function($event) {
                                                    return _vm.showTaggedPeopleModal()
                                                  }
                                                }
                                              },
                                              [
                                                _c("i", {
                                                  staticClass:
                                                    "fas fa-tag text-lighter"
                                                }),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold"
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.status.taggedPeople
                                                          .length
                                                      ) + " Tagged People"
                                                    )
                                                  ]
                                                )
                                              ]
                                            )
                                          ])
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.loaded &&
                                      _vm.status.place != null &&
                                      _vm.status.taggedPeople.length
                                        ? _c(
                                            "span",
                                            {
                                              staticClass:
                                                "px-2 font-weight-bold text-lighter"
                                            },
                                            [_vm._v("•")]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _vm.loaded && _vm.status.place != null
                                        ? _c(
                                            "span",
                                            {
                                              staticClass:
                                                "mb-0 cursor-pointer text-truncate",
                                              staticStyle: { color: "#718096" },
                                              on: {
                                                click: function($event) {
                                                  return _vm.redirect(
                                                    "/discover/places/" +
                                                      _vm.status.place.id +
                                                      "/" +
                                                      _vm.status.place.slug
                                                  )
                                                }
                                              }
                                            },
                                            [
                                              _c("i", {
                                                staticClass:
                                                  "fas fa-map-marked-alt text-lighter"
                                              }),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                {
                                                  staticClass:
                                                    "font-weight-bold"
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(
                                                      _vm.status.place.name
                                                    ) +
                                                      ", " +
                                                      _vm._s(
                                                        _vm.status.place.country
                                                      )
                                                  )
                                                ]
                                              )
                                            ]
                                          )
                                        : _vm._e()
                                    ]
                                  )
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _c("div", { staticClass: "float-right" }, [
                              _c("div", { staticClass: "post-actions" }, [
                                _vm.user != false
                                  ? _c("div", [
                                      _c(
                                        "button",
                                        {
                                          staticClass:
                                            "btn btn-link text-dark no-caret",
                                          attrs: { title: "Post options" },
                                          on: {
                                            click: function($event) {
                                              return _vm.ctxMenu()
                                            }
                                          }
                                        },
                                        [
                                          _c("span", {
                                            staticClass:
                                              "fas fa-ellipsis-v text-muted"
                                          })
                                        ]
                                      )
                                    ])
                                  : _vm._e()
                              ])
                            ])
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "div",
                          {
                            staticClass:
                              "d-flex flex-md-column flex-column-reverse h-100",
                            staticStyle: { "overflow-y": "auto" }
                          },
                          [
                            _c(
                              "div",
                              { staticClass: "card-body status-comments pt-0" },
                              [
                                _c("div", { staticClass: "status-comment" }, [
                                  _vm.status.content.length
                                    ? _c("div", { staticClass: "pt-3" }, [
                                        _vm.showCaption != true
                                          ? _c("div", [
                                              _c(
                                                "span",
                                                { staticClass: "py-3" },
                                                [
                                                  _c(
                                                    "a",
                                                    {
                                                      staticClass:
                                                        "text-dark font-weight-bold mr-1",
                                                      attrs: {
                                                        href: _vm.profileUrl,
                                                        title:
                                                          _vm.status.account
                                                            .username
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.truncate(
                                                            _vm.status.account
                                                              .username,
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
                                                      staticClass: "text-break"
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
                                                            click: function(
                                                              $event
                                                            ) {
                                                              _vm.showCaption = true
                                                            }
                                                          }
                                                        },
                                                        [_vm._v("Show")]
                                                      )
                                                    ]
                                                  )
                                                ]
                                              )
                                            ])
                                          : _c("div", [
                                              _c(
                                                "p",
                                                {
                                                  class: [
                                                    _vm.status.content.length >
                                                    620
                                                      ? "mb-1 read-more"
                                                      : "mb-1"
                                                  ],
                                                  staticStyle: {
                                                    overflow: "hidden"
                                                  }
                                                },
                                                [
                                                  _c(
                                                    "a",
                                                    {
                                                      staticClass:
                                                        "font-weight-bold pr-1 text-dark text-decoration-none",
                                                      attrs: {
                                                        href: _vm.profileUrl
                                                      }
                                                    },
                                                    [
                                                      _vm._v(
                                                        _vm._s(
                                                          _vm.statusUsername
                                                        )
                                                      )
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c("span", {
                                                    staticClass: "comment-text",
                                                    attrs: {
                                                      id:
                                                        _vm.status.id +
                                                        "-status-readmore"
                                                    },
                                                    domProps: {
                                                      innerHTML: _vm._s(
                                                        _vm.status.content
                                                      )
                                                    }
                                                  })
                                                ]
                                              )
                                            ]),
                                        _vm._v(" "),
                                        _c("hr")
                                      ])
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.showComments
                                    ? _c("div", [
                                        _vm._m(0),
                                        _vm._v(" "),
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "postCommentsContainer d-none"
                                          },
                                          [
                                            _c(
                                              "p",
                                              {
                                                staticClass:
                                                  "mb-1 text-center load-more-link d-none my-4"
                                              },
                                              [
                                                _c(
                                                  "a",
                                                  {
                                                    staticClass: "text-dark",
                                                    attrs: {
                                                      href: "#",
                                                      title:
                                                        "Load more comments",
                                                      "data-toggle": "tooltip",
                                                      "data-placement": "bottom"
                                                    },
                                                    on: { click: _vm.loadMore }
                                                  },
                                                  [
                                                    _c(
                                                      "svg",
                                                      {
                                                        staticClass:
                                                          "bi bi-plus-circle",
                                                        staticStyle: {
                                                          "font-size": "2em"
                                                        },
                                                        attrs: {
                                                          width: "1em",
                                                          height: "1em",
                                                          viewBox: "0 0 16 16",
                                                          fill: "currentColor",
                                                          xmlns:
                                                            "http://www.w3.org/2000/svg"
                                                        }
                                                      },
                                                      [
                                                        _c("path", {
                                                          attrs: {
                                                            "fill-rule":
                                                              "evenodd",
                                                            d:
                                                              "M8 3.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H4a.5.5 0 010-1h3.5V4a.5.5 0 01.5-.5z",
                                                            "clip-rule":
                                                              "evenodd"
                                                          }
                                                        }),
                                                        _vm._v(" "),
                                                        _c("path", {
                                                          attrs: {
                                                            "fill-rule":
                                                              "evenodd",
                                                            d:
                                                              "M7.5 8a.5.5 0 01.5-.5h4a.5.5 0 010 1H8.5V12a.5.5 0 01-1 0V8z",
                                                            "clip-rule":
                                                              "evenodd"
                                                          }
                                                        }),
                                                        _vm._v(" "),
                                                        _c("path", {
                                                          attrs: {
                                                            "fill-rule":
                                                              "evenodd",
                                                            d:
                                                              "M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z",
                                                            "clip-rule":
                                                              "evenodd"
                                                          }
                                                        })
                                                      ]
                                                    )
                                                  ]
                                                )
                                              ]
                                            ),
                                            _vm._v(" "),
                                            _c(
                                              "div",
                                              { staticClass: "comments mt-3" },
                                              _vm._l(_vm.results, function(
                                                reply,
                                                index
                                              ) {
                                                return _c(
                                                  "div",
                                                  {
                                                    key:
                                                      "tl" +
                                                      reply.id +
                                                      "_" +
                                                      index,
                                                    staticClass: "pb-4 media"
                                                  },
                                                  [
                                                    _c("img", {
                                                      staticClass:
                                                        "rounded-circle border mr-3",
                                                      attrs: {
                                                        src:
                                                          reply.account.avatar,
                                                        width: "42px",
                                                        height: "42px"
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
                                                        reply.sensitive == true
                                                          ? _c("div", [
                                                              _c(
                                                                "span",
                                                                {
                                                                  staticClass:
                                                                    "py-3"
                                                                },
                                                                [
                                                                  _c(
                                                                    "a",
                                                                    {
                                                                      staticClass:
                                                                        "text-dark font-weight-bold mr-1",
                                                                      attrs: {
                                                                        href:
                                                                          reply
                                                                            .account
                                                                            .url,
                                                                        title:
                                                                          reply
                                                                            .account
                                                                            .username
                                                                      }
                                                                    },
                                                                    [
                                                                      _vm._v(
                                                                        _vm._s(
                                                                          _vm.truncate(
                                                                            reply
                                                                              .account
                                                                              .username,
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
                                                                      staticClass:
                                                                        "text-break"
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
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "span",
                                                                        {
                                                                          staticClass:
                                                                            "text-primary cursor-pointer pl-1",
                                                                          on: {
                                                                            click: function(
                                                                              $event
                                                                            ) {
                                                                              reply.sensitive = false
                                                                            }
                                                                          }
                                                                        },
                                                                        [
                                                                          _vm._v(
                                                                            "Show"
                                                                          )
                                                                        ]
                                                                      )
                                                                    ]
                                                                  )
                                                                ]
                                                              )
                                                            ])
                                                          : _c("div", [
                                                              _c(
                                                                "p",
                                                                {
                                                                  staticClass:
                                                                    "d-flex justify-content-between align-items-top read-more",
                                                                  staticStyle: {
                                                                    "overflow-y":
                                                                      "hidden"
                                                                  }
                                                                },
                                                                [
                                                                  _c("span", [
                                                                    _c(
                                                                      "a",
                                                                      {
                                                                        staticClass:
                                                                          "text-dark font-weight-bold mr-1 text-break",
                                                                        attrs: {
                                                                          href:
                                                                            reply
                                                                              .account
                                                                              .url,
                                                                          title:
                                                                            reply
                                                                              .account
                                                                              .username
                                                                        }
                                                                      },
                                                                      [
                                                                        _vm._v(
                                                                          _vm._s(
                                                                            _vm.truncate(
                                                                              reply
                                                                                .account
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
                                                                        "word-break":
                                                                          "break-all"
                                                                      },
                                                                      domProps: {
                                                                        innerHTML: _vm._s(
                                                                          reply.content
                                                                        )
                                                                      }
                                                                    })
                                                                  ]),
                                                                  _vm._v(" "),
                                                                  _c(
                                                                    "span",
                                                                    {
                                                                      staticStyle: {
                                                                        "min-width":
                                                                          "38px"
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "span",
                                                                        {
                                                                          on: {
                                                                            click: function(
                                                                              $event
                                                                            ) {
                                                                              return _vm.likeReply(
                                                                                reply,
                                                                                $event
                                                                              )
                                                                            }
                                                                          }
                                                                        },
                                                                        [
                                                                          _c(
                                                                            "i",
                                                                            {
                                                                              class: [
                                                                                reply.favourited
                                                                                  ? "fas fa-heart fa-sm text-danger"
                                                                                  : "far fa-heart fa-sm text-lighter"
                                                                              ]
                                                                            }
                                                                          )
                                                                        ]
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "post-menu",
                                                                        {
                                                                          staticClass:
                                                                            "d-inline-block px-2",
                                                                          attrs: {
                                                                            status: reply,
                                                                            profile:
                                                                              _vm.user,
                                                                            size:
                                                                              "sm",
                                                                            modal:
                                                                              "true"
                                                                          },
                                                                          on: {
                                                                            deletePost: function(
                                                                              $event
                                                                            ) {
                                                                              return _vm.deleteComment(
                                                                                reply.id,
                                                                                index
                                                                              )
                                                                            }
                                                                          }
                                                                        }
                                                                      )
                                                                    ],
                                                                    1
                                                                  )
                                                                ]
                                                              ),
                                                              _vm._v(" "),
                                                              _c("p", {}, [
                                                                _vm._o(
                                                                  _c("a", {
                                                                    staticClass:
                                                                      "text-muted mr-3 text-decoration-none small",
                                                                    staticStyle: {
                                                                      width:
                                                                        "20px"
                                                                    },
                                                                    attrs: {
                                                                      href: _vm.permalinkUrl(
                                                                        reply
                                                                      )
                                                                    },
                                                                    domProps: {
                                                                      textContent: _vm._s(
                                                                        _vm.timeAgo(
                                                                          reply.created_at
                                                                        )
                                                                      )
                                                                    }
                                                                  }),
                                                                  0,
                                                                  "tl" +
                                                                    reply.id +
                                                                    "_" +
                                                                    index
                                                                ),
                                                                _vm._v(" "),
                                                                reply.favourites_count
                                                                  ? _c(
                                                                      "span",
                                                                      {
                                                                        staticClass:
                                                                          "text-muted comment-reaction font-weight-bold mr-3"
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
                                                                      "text-muted comment-reaction font-weight-bold cursor-pointer",
                                                                    on: {
                                                                      click: function(
                                                                        $event
                                                                      ) {
                                                                        return _vm.replyFocus(
                                                                          reply,
                                                                          index,
                                                                          true
                                                                        )
                                                                      }
                                                                    }
                                                                  },
                                                                  [
                                                                    _vm._v(
                                                                      "Reply"
                                                                    )
                                                                  ]
                                                                )
                                                              ]),
                                                              _vm._v(" "),
                                                              reply.reply_count >
                                                              0
                                                                ? _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "cursor-pointer",
                                                                      on: {
                                                                        click: function(
                                                                          $event
                                                                        ) {
                                                                          return _vm.toggleReplies(
                                                                            reply
                                                                          )
                                                                        }
                                                                      }
                                                                    },
                                                                    [
                                                                      _c(
                                                                        "span",
                                                                        {
                                                                          staticClass:
                                                                            "show-reply-bar"
                                                                        }
                                                                      ),
                                                                      _vm._v(
                                                                        " "
                                                                      ),
                                                                      _c(
                                                                        "span",
                                                                        {
                                                                          staticClass:
                                                                            "comment-reaction font-weight-bold text-muted"
                                                                        },
                                                                        [
                                                                          _vm._v(
                                                                            _vm._s(
                                                                              reply.thread
                                                                                ? "Hide"
                                                                                : "View"
                                                                            ) +
                                                                              " Replies (" +
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
                                                              reply.thread ==
                                                              true
                                                                ? _c(
                                                                    "div",
                                                                    {
                                                                      staticClass:
                                                                        "comment-thread"
                                                                    },
                                                                    _vm._l(
                                                                      reply.replies,
                                                                      function(
                                                                        s,
                                                                        sindex
                                                                      ) {
                                                                        return _c(
                                                                          "div",
                                                                          {
                                                                            key:
                                                                              "cr" +
                                                                              s.id +
                                                                              "_" +
                                                                              index,
                                                                            staticClass:
                                                                              "pb-3 media"
                                                                          },
                                                                          [
                                                                            _c(
                                                                              "img",
                                                                              {
                                                                                staticClass:
                                                                                  "rounded-circle border mr-3",
                                                                                attrs: {
                                                                                  src:
                                                                                    s
                                                                                      .account
                                                                                      .avatar,
                                                                                  width:
                                                                                    "25px",
                                                                                  height:
                                                                                    "25px"
                                                                                }
                                                                              }
                                                                            ),
                                                                            _vm._v(
                                                                              " "
                                                                            ),
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
                                                                                      "d-flex justify-content-between align-items-top read-more",
                                                                                    staticStyle: {
                                                                                      "overflow-y":
                                                                                        "hidden"
                                                                                    }
                                                                                  },
                                                                                  [
                                                                                    _c(
                                                                                      "span",
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
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
                                                                                        _c(
                                                                                          "span",
                                                                                          {
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
                                                                                          }
                                                                                        )
                                                                                      ]
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
                                                                                    _c(
                                                                                      "span",
                                                                                      {
                                                                                        staticClass:
                                                                                          "pl-2",
                                                                                        staticStyle: {
                                                                                          "min-width":
                                                                                            "38px"
                                                                                        }
                                                                                      },
                                                                                      [
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
                                                                                            _c(
                                                                                              "i",
                                                                                              {
                                                                                                class: [
                                                                                                  s.favourited
                                                                                                    ? "fas fa-heart fa-sm text-danger"
                                                                                                    : "far fa-heart fa-sm text-lighter"
                                                                                                ]
                                                                                              }
                                                                                            )
                                                                                          ]
                                                                                        ),
                                                                                        _vm._v(
                                                                                          " "
                                                                                        ),
                                                                                        _c(
                                                                                          "post-menu",
                                                                                          {
                                                                                            staticClass:
                                                                                              "d-inline-block pl-2",
                                                                                            attrs: {
                                                                                              status: s,
                                                                                              profile:
                                                                                                _vm.user,
                                                                                              size:
                                                                                                "sm",
                                                                                              modal:
                                                                                                "true"
                                                                                            },
                                                                                            on: {
                                                                                              deletePost: function(
                                                                                                $event
                                                                                              ) {
                                                                                                return _vm.deleteCommentReply(
                                                                                                  s.id,
                                                                                                  sindex,
                                                                                                  index
                                                                                                )
                                                                                              }
                                                                                            }
                                                                                          }
                                                                                        )
                                                                                      ],
                                                                                      1
                                                                                    )
                                                                                  ]
                                                                                ),
                                                                                _vm._v(
                                                                                  " "
                                                                                ),
                                                                                _c(
                                                                                  "p",
                                                                                  {},
                                                                                  [
                                                                                    _vm._o(
                                                                                      _c(
                                                                                        "a",
                                                                                        {
                                                                                          staticClass:
                                                                                            "text-muted mr-3 text-decoration-none small",
                                                                                          staticStyle: {
                                                                                            width:
                                                                                              "20px"
                                                                                          },
                                                                                          attrs: {
                                                                                            href:
                                                                                              s.url
                                                                                          },
                                                                                          domProps: {
                                                                                            textContent: _vm._s(
                                                                                              _vm.timeAgo(
                                                                                                s.created_at
                                                                                              )
                                                                                            )
                                                                                          }
                                                                                        }
                                                                                      ),
                                                                                      1,
                                                                                      "cr" +
                                                                                        s.id +
                                                                                        "_" +
                                                                                        index
                                                                                    ),
                                                                                    _vm._v(
                                                                                      " "
                                                                                    ),
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
                                                                                                  ? "1 like"
                                                                                                  : s.favourites_count +
                                                                                                      " likes"
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
                                                                      }
                                                                    ),
                                                                    0
                                                                  )
                                                                : _vm._e()
                                                            ])
                                                      ]
                                                    )
                                                  ]
                                                )
                                              }),
                                              0
                                            )
                                          ]
                                        )
                                      ])
                                    : _vm._e()
                                ])
                              ]
                            ),
                            _vm._v(" "),
                            _vm.reactionBarLoading
                              ? _c(
                                  "div",
                                  {
                                    staticClass:
                                      "card-body flex-grow-0 py-4 text-center"
                                  },
                                  [_vm._m(1)]
                                )
                              : _c(
                                  "div",
                                  { staticClass: "card-body flex-grow-0 py-1" },
                                  [
                                    _vm.loaded && _vm.user.hasOwnProperty("id")
                                      ? _c(
                                          "div",
                                          {
                                            staticClass:
                                              "reactions my-2 pb-1 d-flex justify-content-between"
                                          },
                                          [
                                            _c("h3", {
                                              class: [
                                                _vm.reactions.liked
                                                  ? "fas fa-heart text-danger mr-3 m-0 cursor-pointer"
                                                  : "far fa-heart pr-3 m-0 like-btn cursor-pointer"
                                              ],
                                              attrs: { title: "Like" },
                                              on: { click: _vm.likeStatus }
                                            }),
                                            _vm._v(" "),
                                            !_vm.status.comments_disabled
                                              ? _c("h3", {
                                                  staticClass:
                                                    "far fa-comment mr-3 m-0 cursor-pointer",
                                                  attrs: { title: "Comment" },
                                                  on: {
                                                    click: function($event) {
                                                      return _vm.replyFocus(
                                                        _vm.status
                                                      )
                                                    }
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _c("h3", {
                                              staticClass:
                                                "fas fa-expand m-0 mr-3 cursor-pointer",
                                              on: {
                                                click: function($event) {
                                                  return _vm.redirect(
                                                    _vm.status
                                                      .media_attachments[0].url
                                                  )
                                                }
                                              }
                                            }),
                                            _vm._v(" "),
                                            _vm.status.visibility == "public"
                                              ? _c("h3", {
                                                  class: [
                                                    _vm.reactions.bookmarked
                                                      ? "fas fa-bookmark text-warning m-0 mr-3 cursor-pointer"
                                                      : "far fa-bookmark m-0 mr-3 cursor-pointer"
                                                  ],
                                                  attrs: { title: "Bookmark" },
                                                  on: {
                                                    click: _vm.bookmarkStatus
                                                  }
                                                })
                                              : _vm._e(),
                                            _vm._v(" "),
                                            _vm.status.visibility == "public"
                                              ? _c("h3", {
                                                  class: [
                                                    _vm.reactions.shared
                                                      ? "fas fa-retweet m-0 text-primary cursor-pointer"
                                                      : "fas fa-retweet m-0 share-btn cursor-pointer"
                                                  ],
                                                  attrs: { title: "Share" },
                                                  on: { click: _vm.shareStatus }
                                                })
                                              : _vm._e()
                                          ]
                                        )
                                      : _vm._e(),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "reaction-counts font-weight-bold mb-0"
                                      },
                                      [
                                        _c(
                                          "span",
                                          {
                                            staticStyle: { cursor: "pointer" },
                                            on: { click: _vm.likesModal }
                                          },
                                          [
                                            _c(
                                              "span",
                                              { staticClass: "like-count" },
                                              [
                                                _vm._v(
                                                  _vm._s(
                                                    _vm.status
                                                      .favourites_count || 0
                                                  )
                                                )
                                              ]
                                            ),
                                            _vm._v(" likes\n                  ")
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _vm.status.visibility == "public"
                                          ? _c(
                                              "span",
                                              {
                                                staticClass: "float-right",
                                                staticStyle: {
                                                  cursor: "pointer"
                                                },
                                                on: { click: _vm.sharesModal }
                                              },
                                              [
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "share-count pl-4"
                                                  },
                                                  [
                                                    _vm._v(
                                                      _vm._s(
                                                        _vm.status
                                                          .reblogs_count || 0
                                                      )
                                                    )
                                                  ]
                                                ),
                                                _vm._v(
                                                  " shares\n                  "
                                                )
                                              ]
                                            )
                                          : _vm._e()
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        staticClass:
                                          "timestamp pt-2 d-flex align-items-bottom justify-content-between"
                                      },
                                      [
                                        _c(
                                          "a",
                                          {
                                            staticClass: "small text-muted",
                                            attrs: {
                                              href: _vm.statusUrl,
                                              title: _vm.status.created_at
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n                    " +
                                                _vm._s(_vm.timestampFormat()) +
                                                "\n                  "
                                            )
                                          ]
                                        ),
                                        _vm._v(" "),
                                        _c(
                                          "span",
                                          {
                                            staticClass:
                                              "small text-muted text-capitalize cursor-pointer",
                                            on: { click: _vm.visibilityModal }
                                          },
                                          [
                                            _vm._v(
                                              _vm._s(_vm.status.visibility)
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
                        _vm.showComments
                          ? _c(
                              "div",
                              {
                                staticClass:
                                  "card-footer bg-white sticky-md-bottom p-0"
                              },
                              [
                                _vm.user.length == 0
                                  ? _c(
                                      "div",
                                      { staticClass: "comment-form-guest p-3" },
                                      [
                                        _c("a", { attrs: { href: "/login" } }, [
                                          _vm._v("Login")
                                        ]),
                                        _vm._v(
                                          " to like or comment.\n              "
                                        )
                                      ]
                                    )
                                  : _c(
                                      "form",
                                      {
                                        staticClass:
                                          "border-0 rounded-0 align-middle",
                                        attrs: {
                                          method: "post",
                                          action: "/i/comment",
                                          "data-id": _vm.statusId,
                                          "data-truncate": "false"
                                        }
                                      },
                                      [
                                        _c("textarea", {
                                          staticClass:
                                            "form-control border-0 rounded-0",
                                          staticStyle: {
                                            height: "56px",
                                            "line-height": "18px",
                                            "max-height": "80px",
                                            resize: "none",
                                            "padding-right": "4.2rem"
                                          },
                                          attrs: {
                                            name: "comment",
                                            placeholder: "Add a comment…",
                                            autocomplete: "off",
                                            autocorrect: "off"
                                          },
                                          on: {
                                            click: function($event) {
                                              return _vm.replyFocus(_vm.status)
                                            }
                                          }
                                        }),
                                        _vm._v(" "),
                                        _c("input", {
                                          staticClass:
                                            "d-inline-block btn btn-link font-weight-bold reply-btn text-decoration-none",
                                          attrs: {
                                            type: "button",
                                            value: "Post",
                                            disabled: ""
                                          }
                                        })
                                      ]
                                    )
                              ]
                            )
                          : _vm._e()
                      ]
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _vm.showProfileMorePosts
                ? _c("div", { staticClass: "container" }, [
                    _c(
                      "p",
                      {
                        staticClass: "text-lighter px-3 mt-5",
                        staticStyle: {
                          "font-weight": "600",
                          "font-size": "15px"
                        }
                      },
                      [
                        _vm._v("More posts from "),
                        _c(
                          "a",
                          {
                            staticClass: "text-dark",
                            attrs: { href: _vm.profileUrl }
                          },
                          [_vm._v(_vm._s(this.statusUsername))]
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c("div", { staticClass: "profile-timeline mt-md-4" }, [
                      _c(
                        "div",
                        { staticClass: "row" },
                        _vm._l(_vm.profileMorePosts, function(s, index) {
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
                                    attrs: { href: _vm.getStatusUrl(s) }
                                  },
                                  [
                                    _c(
                                      "div",
                                      {
                                        class: [
                                          s.sensitive
                                            ? "square"
                                            : "square " +
                                              s.media_attachments[0]
                                                .filter_class
                                        ]
                                      },
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
                                          staticClass: "square-content",
                                          style: _vm.previewBackground(s)
                                        }),
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
                                                        _vm._s(s.reblogs_count)
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
                                ),
                                2,
                                "tlob:" + index
                              )
                            ]
                          )
                        }),
                        0
                      )
                    ])
                  ])
                : _vm._e()
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "likesModal",
          attrs: {
            id: "l-modal",
            "hide-footer": "",
            centered: "",
            title: "Likes",
            "body-class": "list-group-flush py-3 px-0"
          }
        },
        [
          _c(
            "div",
            { staticClass: "list-group" },
            [
              _vm._l(_vm.likes, function(user, index) {
                return _c(
                  "div",
                  {
                    key: "modal_likes_" + index,
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
                            width: "30px"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "media-body" }, [
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
                                  "\n                " +
                                    _vm._s(user.username) +
                                    "\n              "
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
                                  [_vm._v(_vm._s(user.acct.split("@")[0]))]
                                ),
                                _c("span", { staticClass: "text-lighter" }, [
                                  _vm._v("@" + _vm._s(user.acct.split("@")[1]))
                                ])
                              ]
                            )
                          : _c(
                              "p",
                              {
                                staticClass: "text-muted mb-0 text-truncate",
                                staticStyle: { "font-size": "14px" }
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(user.display_name) +
                                    "\n            "
                                )
                              ]
                            )
                      ])
                    ])
                  ]
                )
              }),
              _vm._v(" "),
              _c(
                "infinite-loading",
                {
                  attrs: { spinner: "spiral" },
                  on: { infinite: _vm.infiniteLikesHandler }
                },
                [
                  _c("div", { attrs: { slot: "no-more" }, slot: "no-more" }),
                  _vm._v(" "),
                  _c("div", {
                    attrs: { slot: "no-results" },
                    slot: "no-results"
                  })
                ]
              )
            ],
            2
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "sharesModal",
          attrs: {
            id: "s-modal",
            "hide-footer": "",
            centered: "",
            title: "Shares",
            "body-class": "list-group-flush py-3 px-0"
          }
        },
        [
          _c(
            "div",
            { staticClass: "list-group" },
            [
              _vm._l(_vm.shares, function(user, index) {
                return _c(
                  "div",
                  {
                    key: "modal_shares_" + index,
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
                            width: "30px"
                          }
                        })
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "media-body" }, [
                        _c("div", { staticClass: "d-inline-block" }, [
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
                                    "\n                  " +
                                      _vm._s(user.username) +
                                      "\n                "
                                  )
                                ]
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "p",
                            {
                              staticClass: "text-muted mb-0",
                              staticStyle: { "font-size": "14px" }
                            },
                            [
                              _vm._v(
                                "\n                  " +
                                  _vm._s(user.display_name) +
                                  "\n                "
                              )
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c("p", { staticClass: "float-right" })
                      ])
                    ])
                  ]
                )
              }),
              _vm._v(" "),
              _c(
                "infinite-loading",
                {
                  attrs: { spinner: "spiral" },
                  on: { infinite: _vm.infiniteSharesHandler }
                },
                [
                  _c("div", { attrs: { slot: "no-more" }, slot: "no-more" }),
                  _vm._v(" "),
                  _c("div", {
                    attrs: { slot: "no-results" },
                    slot: "no-results"
                  })
                ]
              )
            ],
            2
          )
        ]
      ),
      _vm._v(" "),
      _c(
        "b-modal",
        {
          ref: "taggedModal",
          attrs: {
            id: "tagged-modal",
            "hide-footer": "",
            centered: "",
            title: "Tagged People",
            "body-class": "list-group-flush py-3 px-0"
          }
        },
        [
          _c(
            "div",
            { staticClass: "list-group" },
            _vm._l(_vm.status.taggedPeople, function(taguser, index) {
              return _c(
                "div",
                {
                  key: "modal_taggedpeople_" + index,
                  staticClass: "list-group-item border-0 py-1"
                },
                [
                  _c("div", { staticClass: "media" }, [
                    _c("a", { attrs: { href: "/" + taguser.username } }, [
                      _c("img", {
                        staticClass: "mr-3 rounded-circle box-shadow",
                        attrs: {
                          src: taguser.avatar,
                          alt: taguser.username + "’s avatar",
                          width: "30px"
                        }
                      })
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "media-body" }, [
                      _c(
                        "p",
                        {
                          staticClass: "pt-1 d-flex justify-content-between",
                          staticStyle: { "font-size": "14px" }
                        },
                        [
                          _c(
                            "a",
                            {
                              staticClass: "font-weight-bold text-dark",
                              attrs: { href: "/" + taguser.username }
                            },
                            [
                              _vm._v(
                                "\n                " +
                                  _vm._s(taguser.username) +
                                  "\n              "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          taguser.id == _vm.user.id
                            ? _c(
                                "button",
                                {
                                  staticClass:
                                    "btn btn-outline-primary btn-sm py-1 px-3",
                                  on: {
                                    click: function($event) {
                                      return _vm.untagMe()
                                    }
                                  }
                                },
                                [_vm._v("Untag Me")]
                              )
                            : _vm._e()
                        ]
                      )
                    ])
                  ])
                ]
              )
            }),
            0
          ),
          _vm._v(" "),
          _c(
            "p",
            {
              staticClass: "mb-0 text-center small text-muted font-weight-bold"
            },
            [
              _c("a", { attrs: { href: "/site/kb/tagging-people" } }, [
                _vm._v("Learn more")
              ]),
              _vm._v(" about Tagging People.")
            ]
          )
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
            _vm.user &&
            _vm.user.id != _vm.status.account.id &&
            _vm.relationship &&
            _vm.relationship.following
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
            _vm.user &&
            _vm.user.id != _vm.status.account.id &&
            _vm.relationship &&
            !_vm.relationship.following
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
                    return _vm.ctxMenuCopyLink()
                  }
                }
              },
              [_vm._v("Copy Link")]
            ),
            _vm._v(" "),
            _vm.status && _vm.user.id == _vm.status.account.id
              ? _c(
                  "div",
                  {
                    staticClass: "list-group-item rounded cursor-pointer",
                    on: { click: _vm.toggleCommentVisibility }
                  },
                  [
                    _vm._v(
                      _vm._s(_vm.showComments ? "Disable" : "Enable") +
                        " Comments"
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.status && _vm.user.id == _vm.status.account.id
              ? _c(
                  "a",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer text-dark text-decoration-none",
                    attrs: { href: _vm.editUrl() }
                  },
                  [_vm._v("Edit")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.user && _vm.user.is_admin == true
              ? _c(
                  "div",
                  {
                    staticClass: "list-group-item rounded cursor-pointer",
                    on: {
                      click: function($event) {
                        return _vm.ctxModMenu()
                      }
                    }
                  },
                  [_vm._v("ModTools")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.status &&
            _vm.user.id != _vm.status.account.id &&
            !_vm.relationship.blocking &&
            !_vm.user.is_admin
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer font-weight-bold text-danger",
                    on: {
                      click: function($event) {
                        return _vm.blockProfile()
                      }
                    }
                  },
                  [_vm._v("Block")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.status &&
            _vm.user.id != _vm.status.account.id &&
            _vm.relationship.blocking &&
            !_vm.user.is_admin
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer font-weight-bold text-danger",
                    on: {
                      click: function($event) {
                        return _vm.unblockProfile()
                      }
                    }
                  },
                  [_vm._v("Unblock")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.user &&
            _vm.user.id != _vm.status.account.id &&
            !_vm.user.is_admin
              ? _c(
                  "a",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer font-weight-bold text-danger text-decoration-none",
                    attrs: { href: _vm.reportUrl() }
                  },
                  [_vm._v("Report")]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.status &&
            (_vm.user.is_admin || _vm.user.id == _vm.status.account.id)
              ? _c(
                  "div",
                  {
                    staticClass:
                      "list-group-item rounded cursor-pointer font-weight-bold text-danger",
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
            _c(
              "div",
              {
                staticClass: "list-group-item rounded cursor-pointer",
                on: { click: _vm.toggleCommentVisibility }
              },
              [
                _vm._v(
                  _vm._s(_vm.showComments ? "Disable" : "Enable") + " Comments"
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
                    return _vm.moderatePost("unlist")
                  }
                }
              },
              [_vm._v("Unlist from Timelines")]
            ),
            _vm._v(" "),
            _vm.status.sensitive
              ? _c(
                  "div",
                  {
                    staticClass: "list-group-item rounded cursor-pointer",
                    on: {
                      click: function($event) {
                        return _vm.moderatePost("remcw")
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
                        return _vm.moderatePost("addcw")
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
          ref: "replyModal",
          attrs: {
            id: "ctx-reply-modal",
            "hide-footer": "",
            centered: "",
            rounded: "",
            "title-html": _vm.replyingToUsername
              ? "Reply to <span class=text-dark>" +
                _vm.replyingToUsername +
                "</span>"
              : "",
            "title-tag": "p",
            "title-class": "font-weight-bold text-muted",
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
                  value: _vm.replyText,
                  expression: "replyText"
                }
              ],
              staticClass: "form-control",
              staticStyle: {
                border: "none",
                "font-size": "18px",
                resize: "none",
                "white-space": "pre-wrap",
                outline: "none"
              },
              attrs: { rows: "4", placeholder: "Reply here ..." },
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
            _c("div", { staticClass: "border-top border-bottom my-2" }, [
              _c(
                "ul",
                {
                  staticClass: "nav align-items-center emoji-reactions",
                  staticStyle: { "overflow-x": "scroll", "flex-wrap": "unset" }
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
                staticClass: "d-flex justify-content-between align-items-center"
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
                          "\n          "
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "d-flex align-items-center" }, [
                  _c(
                    "div",
                    { staticClass: "custom-control custom-switch mr-3" },
                    [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.replySensitive,
                            expression: "replySensitive"
                          }
                        ],
                        staticClass: "custom-control-input",
                        attrs: { type: "checkbox", id: "replyModalCWSwitch" },
                        domProps: {
                          checked: Array.isArray(_vm.replySensitive)
                            ? _vm._i(_vm.replySensitive, null) > -1
                            : _vm.replySensitive
                        },
                        on: {
                          change: function($event) {
                            var $$a = _vm.replySensitive,
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 &&
                                  (_vm.replySensitive = $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  (_vm.replySensitive = $$a
                                    .slice(0, $$i)
                                    .concat($$a.slice($$i + 1)))
                              }
                            } else {
                              _vm.replySensitive = $$c
                            }
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "label",
                        {
                          class: [
                            _vm.replySensitive
                              ? "custom-control-label font-weight-bold text-dark"
                              : "custom-control-label text-lighter"
                          ],
                          attrs: { for: "replyModalCWSwitch" }
                        },
                        [_vm._v("Mark as NSFW")]
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass:
                        "btn btn-primary btn-sm py-2 px-4 lead text-uppercase font-weight-bold",
                      attrs: { disabled: _vm.replyText.length == 0 },
                      on: {
                        click: function($event) {
                          $event.preventDefault()
                          return _vm.postReply()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n          " +
                          _vm._s(
                            _vm.replySending == true ? "POSTING" : "POST"
                          ) +
                          "\n        "
                      )
                    ]
                  )
                ])
              ]
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
    return _c("div", { staticClass: "postCommentsLoader text-center py-2" }, [
      _c("div", { staticClass: "spinner-border", attrs: { role: "status" } }, [
        _c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])
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
      [_c("span", { staticClass: "sr-only" }, [_vm._v("Loading...")])]
    )
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

/***/ "./resources/assets/js/components/RemotePost.vue":
/*!*******************************************************!*\
  !*** ./resources/assets/js/components/RemotePost.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _RemotePost_vue_vue_type_template_id_7e9f6706_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true& */ "./resources/assets/js/components/RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true&");
/* harmony import */ var _RemotePost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RemotePost.vue?vue&type=script&lang=js& */ "./resources/assets/js/components/RemotePost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css& */ "./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _RemotePost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _RemotePost_vue_vue_type_template_id_7e9f6706_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _RemotePost_vue_vue_type_template_id_7e9f6706_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "7e9f6706",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/assets/js/components/RemotePost.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/assets/js/components/RemotePost.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/assets/js/components/RemotePost.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemotePost.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css&":
/*!****************************************************************************************************************!*\
  !*** ./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--9-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--9-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=style&index=0&id=7e9f6706&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_9_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_9_2_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_style_index_0_id_7e9f6706_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/assets/js/components/RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true&":
/*!**************************************************************************************************!*\
  !*** ./resources/assets/js/components/RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_template_id_7e9f6706_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/assets/js/components/RemotePost.vue?vue&type=template&id=7e9f6706&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_template_id_7e9f6706_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_RemotePost_vue_vue_type_template_id_7e9f6706_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



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

/***/ "./resources/assets/js/rempos.js":
/*!***************************************!*\
  !*** ./resources/assets/js/rempos.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

Vue.component('photo-presenter', __webpack_require__(/*! ./components/presenter/PhotoPresenter.vue */ "./resources/assets/js/components/presenter/PhotoPresenter.vue")["default"]);
Vue.component('video-presenter', __webpack_require__(/*! ./components/presenter/VideoPresenter.vue */ "./resources/assets/js/components/presenter/VideoPresenter.vue")["default"]);
Vue.component('photo-album-presenter', __webpack_require__(/*! ./components/presenter/PhotoAlbumPresenter.vue */ "./resources/assets/js/components/presenter/PhotoAlbumPresenter.vue")["default"]);
Vue.component('video-album-presenter', __webpack_require__(/*! ./components/presenter/VideoAlbumPresenter.vue */ "./resources/assets/js/components/presenter/VideoAlbumPresenter.vue")["default"]);
Vue.component('mixed-album-presenter', __webpack_require__(/*! ./components/presenter/MixedAlbumPresenter.vue */ "./resources/assets/js/components/presenter/MixedAlbumPresenter.vue")["default"]);
Vue.component('post-menu', __webpack_require__(/*! ./components/PostMenu.vue */ "./resources/assets/js/components/PostMenu.vue")["default"]);
Vue.component('remote-post', __webpack_require__(/*! ./components/RemotePost.vue */ "./resources/assets/js/components/RemotePost.vue")["default"]);

/***/ }),

/***/ 23:
/*!*********************************************!*\
  !*** multi ./resources/assets/js/rempos.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /workspace/pixelfed/resources/assets/js/rempos.js */"./resources/assets/js/rempos.js");


/***/ })

},[[23,"/js/manifest"]]]);