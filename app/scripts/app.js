'use strict';

/**
 * @ngdoc overview
 * @name eroadWmApp
 * @description
 * # eroadWmApp
 *
 * Main module of the application.
 */
var app = angular
  .module('eroadWmApp', [
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/local_storage', {
        templateUrl: 'views/local_storage.html',
        controller: 'LStorageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});