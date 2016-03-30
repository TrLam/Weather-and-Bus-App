'use strict';

angular.module('weatherBusApp')
.controller('EditCtrl', ['bus', 'busEdit', '$state', function (bus, busEdit, $state) {
  var vm = this;
  vm.routeObj = busEdit.routeObj;
  vm.keyList =  busEdit.keyList;
  vm.removed = '';
  vm.newRoute = '';
  vm.newID = '';
  vm.noMatch = false;
  vm.noMatchMessage = '';

  vm.edit = function () {
    bus.getBusData(vm.newRoute, vm.newID)
    .then(function (result) {
      if (result[0].hasOwnProperty('noMatch')) {
        vm.noMatchMessage = result[0].noMatch;
        vm.noMatch = true;
      }
      else {
        busEdit.edit(vm.removed, vm.newRoute, vm.newID);
        vm.removed = '';
        vm.noMatch = false;
        $state.go('show');
      }
    });
  }
}]);