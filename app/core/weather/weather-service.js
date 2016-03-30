'use strict';

angular.module('weatherBusApp.weather', [])
.constant('WEATHER_API', 'http://api.openweathermap.org/data/2.5/weather?q=')
.factory('weather', ['server', 'WEATHER_API', 'helper', function (server, WEATHER_API, helper) {
  var service = {};
  var dataIcon = {
    'desc': {
      'clear': '/wbApp/img/sunny.png',
      'clear night': '/wbApp/img/moon.png',
      'clouds': '/wbApp/img/clouds.png',
      'few clouds': '/wbApp/img/clouds.png',
      'scattered clouds': '/wbApp/img/clouds.png',
      'broken clouds': '/wbApp/img/clouds.png',
      'shower rain': '/wbApp/img/rain.png',
      'rain': '/wbApp/img/rain.png',
      'thunderstorm': '/wbApp/img/thunderstorm.png',
      'snow': '/wbApp/img/snow.png',
      'mist': '/wbApp/img/mist.png'
    },
    'windSpeed': '/wbApp/img/wind-speed.png',
    'snow': '/wbApp/img/snow.png',
    'rain': '/wbApp/img/rain.png'
  };

  // Get weather data from Open Weather Map API
  service.getWeather = function () {
    var path = 'Toronto,ca&units=metric&APPID=84bfed3a5ac4e59fb03a3ecfa172f325';
    return server.get(WEATHER_API, path);
  };

  // Select necessary data then store in an array
  service.getData = function () {
    var dataArray = [];

    return service.getWeather()
    .then(function (service) {
      var mainDesc = service.weather[0].main.toLowerCase();
      var descIcon = '';
      // Add current temperature. dataArray[0]
      dataArray.push({'value': Math.ceil(service.main.temp), 'unit': '\u2103'});
      // Check if it's night time and the sky is clear
      if (helper.night() && mainDesc === 'clear') {
        descIcon = dataIcon.desc['clear night'];
      }
      else {
        descIcon = dataIcon.desc[mainDesc];
      };
      // Add main description. dataArray[1]
      dataArray.push({'icon': descIcon, 'altTag': 'Description', 'value': helper.capitalizeFirst(service.weather[0].description)});
      // Add wind speed
      dataArray.push({'icon': dataIcon.windSpeed, 'altTag': 'Wind Speed', 'value': (service.wind.speed * 3.6).toFixed(2), 'unit': 'km/h'});
      // Add snow or rain volume. If there are both snow and rain, display snow volume
      if (service.hasOwnProperty('snow')) {
        dataArray.push({'icon': dataIcon.snow, 'altTag': 'Snow Volume', 'value': service.snow[(Object.keys(service.snow))[0]], 'unit':'mm'});
      }
      else if (service.hasOwnProperty('rain')) {
        dataArray.push({'icon': dataIcon.rain, 'altTag': 'Rain Volume', 'value': service.rain[(Object.keys(service.rain))[0]], 'unit':'mm'});
      };
      return dataArray;
    })
  };

  return service;
}]);