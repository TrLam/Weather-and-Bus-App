'use strict';

angular.module('weatherBusApp.helper', [])
.factory('helper', function() {
	var service = {};

	// Capitalize the first letter
	service.capitalizeFirst = function (str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	// Match time
	service.matchTime = function (str) {
		var regex = /(\d{1,2}:\d{2})(:\d{2} GMT)/i;
		return regex.exec(str)[1];
	};

	// Convert Epoch Time
	service.epochConv = function (str) {
		var date = new Date(Number(str));
		return service.matchTime(date.toString());
	};

	// Convert seconds to minutes in 00:00 string format
	service.secToMin = function (num) {
		var min = Math.floor((num / 60));
		min = min.toString();
		var sec = (num % 60);
		sec = sec.toString();
		var result = min + ' min ' + sec + ' sec';
		return result;
	};

	// Return true if it's after 6pm or before 6am
	service.night = function() {
		var date = new Date();
		var hour = date.getHours();
		return (hour > 18 || hour < 6) ? true : false;
	};

	return service
})