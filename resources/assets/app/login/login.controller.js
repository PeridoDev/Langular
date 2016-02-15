// queryParams = $window.location.href.match(/\?name=(.*)/)
// $scope.name = queryParams == null? "...": queryParams[1];
// $scope.location = $window.location.href;

/*
 *	LoginController
 */

(function() {

    angular.module('langular')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$timeout', '$scope', '$cookies'];


    function LoginController($timeout, $scope, $cookies) {
    	
		var self = this;
		self.token = $cookies.get('XSRF-TOKEN');

    }

}());