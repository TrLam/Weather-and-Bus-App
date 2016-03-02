// This service makes the API calls
// using url and path provided in the get function
'use strict';

angular.module('weatherBusApp.server', [])
.factory('server', function ($http) {
	var service = {};
	service.get = function (url, path) {
		return $http.get(url + path)
		  .then(function (response) {
		  	return response.data;
		  });
	};
	return service;
});