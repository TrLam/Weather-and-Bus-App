'use strict';

angular.module('weatherBusApp')
.controller('BusCtrl', function (bus, busEdit, helper, $interval) {
	var vm = this;
	vm.main = [];
    vm.stopRunning = false; // true when there is no more prediction for all versions of route (A, B, C, etc.)
    vm.inPromise = null; // Variable to hold the $interval promise
    vm.count = 0; // counter to make sure app update bus info every minute
    
    // From busEdit service
    vm.routeObj = busEdit.routeObj;
    vm.keyList = busEdit.keyList;
    vm.empty = []
    vm.emptyLen =  3 - vm.keyList.length;
    for (var i = 0; i < vm.emptyLen; i +=1) {
        vm.empty[i] = i;
    };

    // Update time to arrival when
    // *** seconds <= 0
    // *** every minute
    vm.update = function (route, id) {
        return function () {
            for (var i = 0; i < vm.main.length; i += 1) {
                if (vm.main[i].info.seconds <= 0) {
                    bus.getBusData(route, id)
                    .then (function (bus) {
                        vm.main = bus; 
                    });
                }
                else {
                    vm.main[i].info.seconds -= 1;
                    vm.main[i].info.minSec = helper.secToMin(vm.main[i].info.seconds);
                }
            }
            vm.count += 1; 
            if (vm.count >= 60) {
                vm.count = 0; // Reset vm.count
                bus.getBusData(route, id)
                .then (function (bus) {
                    vm.main = bus; 
                });
            }
        };
	};

    // Cancel $interval promise
    vm.cancel = function () {
        if (vm.inPromise) {
            $interval.cancel(vm.inPromise);
        }
    };

    // Make API call
    vm.request = function (route, id) {
        vm.cancel(); // Clear running function
        vm.stopRunning = false; // Reset vm.stopRunning
        bus.getBusData(route, id)
        .then(function (bus) {
            vm.main = bus;
        })
        .then(function () {
            if (vm.main[0].hasOwnProperty('info')) {
                vm.inPromise = $interval(vm.update(route, id), 1000);
            }
            else {
                vm.stopRunning = true;
                $interval.cancel();
            }
        })
    };
    vm.request(vm.keyList[0], vm.routeObj[vm.keyList[0]]);  // For demo only

});