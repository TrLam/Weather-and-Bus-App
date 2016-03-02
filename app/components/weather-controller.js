'use strict';

angular.module('weatherBusApp')
.controller('WeatherCtrl', function (weather, $interval) {
	var vm = this;
	vm.main = [];
	vm.curTemp = {};
	vm.desc = {};
	vm.info = [];

	vm.store = function () {
		vm.curTemp = vm.main[0];
		vm.desc = vm.main[1];
        vm.info = vm.main.slice(2, vm.main.length);
	};

	vm.update = function () {
		return weather.getData()
		.then(function (weather) {
			vm.main = weather;
			vm.store();
		})
	}

	// Make the API call
	vm.update()
	.then(function () {
		$interval(vm.update, 1800000); // update every 30 minutes
	})

});