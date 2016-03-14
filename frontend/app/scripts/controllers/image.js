'use strict';

angular.module('webApplicationApp').controller('ImageCtrl', function($scope, $http, API_URL) {
  $scope.gallery = new Array();
  var getImageContent = function(fileName) {
    $http.get(API_URL + 'image', {
      params: {
        filename: fileName
      }
    }).then(function(res) {            
      res.data.forEach(function(image) {
        $scope.gallery.push({
          source: image.source,
          number: image.number
        });        
      });      
    })
  };

  $http.get(API_URL + 'image')
    .success(function(images) {
      images.forEach(function(fileName) {
        getImageContent(fileName);
      });
    })
    .error(function(err) {
      alert('warning', 'Unable to load gallery items', err.message);
    })

});
