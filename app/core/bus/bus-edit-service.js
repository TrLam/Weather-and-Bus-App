'use strict';

angular.module('weatherBusApp.busEdit', [])
.factory('busEdit', function () {
  var service = {};
  service.routeObj = {
    '71': '6954', // Default value
    '134': '4661'
  };
  service.keyList = Object.keys(service.routeObj);

  service.removeBus = function (route) {
    delete service.routeObj[route];
    service.keyList = Object.keys(service.routeObj); // Update keyList
  };

  service.addBus = function (route, id) {
    service.routeObj[route]= id;
    service.keyList = Object.keys(service.routeObj); // Update keyList

  };

  service.edit = function (removed, route, id) {
    if (removed) {
      service.removeBus(removed);
    }
    if (route && service.keyList.length < 3) { // Add new route
      service.addBus(route, id);
    }
  }

  return service;

});