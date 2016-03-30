'use strict';

angular.module('weatherBusApp', [
  'ui.router',
  'weatherBusApp.server',
  'weatherBusApp.helper',
  'weatherBusApp.weather',
  'weatherBusApp.bus',
  'weatherBusApp.busEdit'
]).
config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('show', {
		url: '/',
		templateUrl: 'partials/show.html',
		controller: 'BusCtrl as busctrl'
	})
	.state('edit', {
		url: '/edit',
		templateUrl: 'partials/edit.html',
		controller: 'EditCtrl as editctrl'
	})
})
.run(function ($log) {
	$log.info('All ready!');
});