angular.module ('accessApp', ['ui.router']);
// le routage
angular.module ('accessApp').config (function ($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider.state ({ name: 'navclav', url: '/navclav', templateUrl: 'page-navclav.html' });
	$stateProvider.state ({ name: 'gnrl', url: '/generalites', templateUrl: 'page-general.html' });
	$urlRouterProvider.otherwise ('/generalites');
	$locationProvider.hashPrefix ('');
//	$locationProvider.html5Mode (true);
});