'use strict';

/**
 * @ngdoc function
 * @name eroadWmApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the eroadWmApp
 */
angular.module('eroadWmApp')
  .controller('MapCtrl', function ($scope) {
    $scope.coordsSaved = localStorage.getItem('eroad');
    $scope.coordsStorage = (localStorage.getItem('eroad')!==null) ? JSON.parse($scope.coordsSaved) : [];

    $scope.showCoords = function() {
    	var lat = 0, lng = 0, coordTmp;
    	var localDate, UTCDate, texto, UTCtime, localTime, zone;
    	var tz = new TimeZoneDB();

    	lat=((event.y-120)/(654/180)-90)/-1;
		lng = (event.x)/(1280/360)-180;	
		lat += 20;
		lng += 15;
      	
        tz.getJSON({
            key: 'SGJ9L8TGG1L3',
            lat: lat,
            lng: lng
        }, function(data){
        	localDate = new Date(data.timestamp*1000);
      		UTCDate = new Date((data.timestamp*1000) + (data.gmtOffset *1000));

          	texto = 'Lat: ' + lat + ' Long: ' + lng + '\n';
          	zone = (data.zoneName.length === 0) ? 'Unknown Zone' : data.zoneName;
          	texto += zone;
          	UTCtime = UTCDate.getHours() + ':' + UTCDate.getMinutes() + ':' + UTCDate.getSeconds();
      		texto += '\n UTC time ' + UTCtime;
      		localTime = localDate.getHours() + ':' + localDate.getMinutes() + ':' + localDate.getSeconds();
      		texto += '\n Local time ' + localTime;
           
      		texto += '\n\n Do you want to save it for future review?';
            if(window.confirm( texto )){
            	coordTmp = {Lat : lat, Long: lng, Zone: zone, UTCtime: UTCtime, localTime : localTime};
            	console.log(coordTmp);
                $scope.coordsStorage.push(coordTmp);
                coordTmp = ''; //clear the input after adding
                localStorage.setItem('eroad', JSON.stringify($scope.coordsStorage));

            }
        });
    };

  })
	.controller('LStorageCtrl', function ($scope) {
		$scope.coordsSaved = localStorage.getItem('eroad');
    	$scope.coordsStorage = (localStorage.getItem('eroad')!==null) ? JSON.parse($scope.coordsSaved) : [];
	});

