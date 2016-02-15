'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    angular.module('langular', ['ui.router', 'ngResource', 'ngCookies']).config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {
            url: "/home",
            templateUrl: 'template/home/home.html',
            controller: 'HomeController',
            controllerAs: 'self'
        }).state('guestbook', {
            url: "/guestbook",
            templateUrl: 'template/guestbook/guestbook.html',
            controller: 'GuestbookController',
            controllerAs: 'self'
        }).state('login', {
            url: "/login",
            templateUrl: 'template/login/login.html',
            controller: 'LoginController',
            controllerAs: 'self'
        });
    }]);
})();
/*
 *	GuestbookController
 */

(function () {

    angular.module('langular').controller('GuestbookController', GuestbookController);

    GuestbookController.$inject = ['Guestbook'];

    function GuestbookController(Guestbook) {

        var self = this;

        self.guestbook = new Guestbook();

        self.guestbook.load();
    }
})();
/*
 *	HomeController
 */

(function () {

    angular.module('langular').controller('HomeController', HomeController);

    function HomeController() {}
})();
// queryParams = $window.location.href.match(/\?name=(.*)/)
// $scope.name = queryParams == null? "...": queryParams[1];
// $scope.location = $window.location.href;

/*
 *	LoginController
 */

(function () {

    angular.module('langular').controller('LoginController', LoginController);

    LoginController.$inject = ['$timeout', '$scope', '$cookies'];

    function LoginController($timeout, $scope, $cookies) {

        var self = this;
        self.token = $cookies.get('XSRF-TOKEN');
    }
})();
angular.module('langular').factory('Guestbook', Guestbook);

Guestbook.$inject = ['Message', '$timeout'];

function Guestbook(Message, $timeout) {

    return function () {
        function Guestbook() {
            _classCallCheck(this, Guestbook);

            this.longDelayTime = 1000;
            this.isLocked = false;
            this.isLongDelay = undefined;
            this.hasFailed = false; // TODO: implementera on failed
            this.messages = [];
            this.input = "";
        }

        _createClass(Guestbook, [{
            key: 'lock',
            value: function lock() {

                var self = this;
                self.isLocked = true;
                $timeout(function () {

                    if (self.isLocked) {

                        self.isLongDelay = true;
                    }
                }, self.longDelayTime);
            }
        }, {
            key: 'unlock',
            value: function unlock() {

                this.isLocked = false;
                delete this.isLongDelay;
            }
        }, {
            key: 'load',
            value: function load() {
                var self = this;
                self.lock();
                Message.index({
                    onSuccess: function onSuccess(value) {

                        self.messages = value;
                        self.unlock();
                    }
                });
            }
        }, {
            key: 'postMessage',
            value: function postMessage() {
                self = this;
                self.lock();

                var message = new Message({
                    text: self.input
                });

                message.store({
                    onSuccess: function onSuccess() {

                        self.input = "";

                        self.load();
                    }
                });
            }
        }, {
            key: 'deleteMessage',
            value: function deleteMessage(message) {

                var self = this;
                self.lock();

                message.delete({
                    onSuccess: function onSuccess() {

                        self.load();
                    }
                });
            }
        }]);

        return Guestbook;
    }();
}
angular.module('langular').factory('Message', Message);

Message.$inject = ['$resource'];

function Message($resource) {

    return function () {
        function Message(args) {
            _classCallCheck(this, Message);

            if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object') {
                this.id = args.id;
                this.text = args.text;
                this.created_at = args.created_at;
                this.updated_at = args.updated_at;
            }
        }

        _createClass(Message, [{
            key: 'store',
            value: function store(args) {

                args = (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' ? args : {};
                var onSuccess = typeof args.onSuccess === 'function' ? args.onSuccess : function (value) {};
                var onFail = typeof args.onFail === 'function' ? args.onFail : function (value) {};

                Message.resource().save({
                    text: this.text
                }).$promise.then(function (value) {
                    onSuccess();
                }, function (error) {

                    onFail(error);
                });
            }
        }, {
            key: 'delete',
            value: function _delete(args) {

                args = (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' ? args : {};
                var onSuccess = typeof args.onSuccess === 'function' ? args.onSuccess : function (value) {};
                var onFail = typeof args.onFail === 'function' ? args.onFail : function (value) {};

                Message.resource().delete({
                    id: this.id
                }).$promise.then(function (value) {
                    onSuccess();
                }, function (error) {

                    onFail(error);
                });
            }
        }], [{
            key: 'makeCollection',
            value: function makeCollection(data) {

                var collection = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var item = _step.value;


                        collection.push(new Message(item));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return collection;
            }
        }, {
            key: 'resource',
            value: function resource() {

                return $resource('api/message/:id');
            }
        }, {
            key: 'index',
            value: function index(args) {

                args = (typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' ? args : {};
                var onSuccess = typeof args.onSuccess === 'function' ? args.onSuccess : function (value) {};
                var onFail = typeof args.onFail === 'function' ? args.onFail : function (value) {};

                Message.resource().query().$promise.then(function (value) {

                    var collection = Message.makeCollection(value);
                    onSuccess(collection);
                }, function (error) {

                    onFail(error);
                });
            }
        }]);

        return Message;
    }();
}
//# sourceMappingURL=all.js.map
