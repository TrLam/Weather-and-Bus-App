'use strict';

angular.module('weatherBusApp.bus', [])
.constant('BUS_API', 'http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=ttc&r=')
.factory('bus', ['server', 'helper', 'BUS_API', function (server, helper, BUS_API) {
  var service = {};
  service.dataArray = [];
  var dataIcon = {
    'routeWithDir':'/wbApp/img/route.png',
    'busStop': '/wbApp/img/bus-stop.png',
    'arrivalTime': '/wbApp/img/time.png',
    'message': '/wbApp/img/warning.png'
  };

  // Get bus data from Next Bus API
  service.getPredictions = function (route, id) {
    var path = route + '&stopId=' + id;
    return server.get(BUS_API, path);
  };

  // Convert data from XML to JSON
  service.convertData = function (route, id) {
    return service.getPredictions(route, id)
    .then(function (service) {
      var x2js = new X2JS();
      var rawData = x2js.xml_str2json(service);
      return rawData;
    })
  };

  // Select necessary data then store in corresponding array or object
  service.storeDirection = function(direction, stopTitle) {
    var dirObj = {'info': {}, 'display': []};
    // Note: When there is only one prediction left, prediction is just an object (not an array)
    var prediction = direction.prediction['0'] || direction.prediction;
    var epochTime = prediction._epochTime;
    var arrivalTime = helper.epochConv(epochTime);
    
    // INFO OBJECT
    // Add time to Arrival
    dirObj.info.seconds = Number(prediction._seconds);
    // Add minute and second string format
    dirObj.info.minSec = helper.secToMin(dirObj.info.seconds);
    // Add trip tag
    dirObj.info.tripTag = prediction._tripTag;
    
    // DISPLAY ARRAY
    // Add routeTitle with route direction
    dirObj.display.push({'icon': dataIcon.routeWithDir, 'altTag': 'Route', 'value': direction._title});
    // Add bus stop
    dirObj.display.push({'icon': dataIcon.busStop, 'altTag': 'Bus Stop Number', 'value': stopTitle}); 
    // Add converted time
    dirObj.display.push({'icon': dataIcon.arrivalTime, 'altTag': 'Arrival Time', 'value': arrivalTime});    
    
    return dirObj;
  };

  service.storePredictions = function (predictions) {
    // Check if there are any predictions
    if (!predictions.hasOwnProperty('_dirTitleBecauseNoPredictions')) {
      var directions = predictions.direction;
      // Check if multiple direction is available
      if (Array.isArray(directions)) {
        for (var i = 0; i < directions.length; i += 1) {
          service.dataArray.push(service.storeDirection(directions[i], predictions._stopTitle));
        }
      }
      else {
        service.dataArray.push(service.storeDirection(directions, predictions._stopTitle));
      }
    }
    else { // If there is no prediction left, add message
      service.dataArray.push({'icon': dataIcon.routeWithDir, 'altTag': 'Route', 'value': predictions._dirTitleBecauseNoPredictions});
      service.dataArray.push({'icon': dataIcon.message, 'altTag': 'Message', 'value': 'No current prediction. Please check back later.'});
    }
  };

  // Make API call and store data
  service.getBusData = function (route, id) {
    return service.convertData(route, id)
    .then(function (result) {
      // Reset service.dataArray
      service.dataArray = [];
      // IF STATEMENT HERE
      if (!result.body.hasOwnProperty('Error')) { // Check if there is any error
        var predictions = result.body.predictions;
        if (Array.isArray(predictions)) {
          for (var i = 0; i < predictions.length; i += 1) {
            // If predictions is an array, only add the direction that is still running at the time
            if (!predictions[i].hasOwnProperty('_dirTitleBecauseNoPredictions')) {
              service.storePredictions(predictions[i]);
            }
          };
          if (service.dataArray.length === 0 && predictions[0].hasOwnProperty('_dirTitleBecauseNoPredictions')) {
            // No prediction in this list has a running route
            service.dataArray.push({'icon': dataIcon.message, 'altTag': 'Message', 'value': 'No current prediction. Please check back later.'});
          }
        }
        else {
          service.storePredictions(predictions);
        }
      }
      else {
        if (!route) {
          service.dataArray.push({'icon': dataIcon.message, 'altTag': 'Message', 'value': 'There is no route to track. The magic pencil below will help you add a new route.'});
        }
        else {
          service.dataArray.push({'noMatch': result.body.Error.__text});
        }
      }
      return service.dataArray;
    });
  }

  return service
}]);