(function() {
	
    angular.module('langular', [
            'ui.router',
            'ngResource',
			'ngCookies'
        ])
        .config([
            '$stateProvider',
            '$urlRouterProvider',
            function(
                $stateProvider,
                $urlRouterProvider
            ) {
				
				$urlRouterProvider.otherwise('/home');
				
                $stateProvider.state('home', {
                        url: "/home",
                        templateUrl: 'template/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'self'
                    })
                    .state('guestbook', {
                        url: "/guestbook",
                        templateUrl: 'template/guestbook/guestbook.html',
                        controller: 'GuestbookController',
                        controllerAs: 'guestbook',
                    })
                    .state('login', {
                        url: "/login",
                        templateUrl: 'template/login/login.html',
                        controller: 'LoginController',
                        controllerAs: 'self',
                    });
            }
        ]);
}()); 