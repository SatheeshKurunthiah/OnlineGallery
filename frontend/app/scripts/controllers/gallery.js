'use strict';

angular.module('webApplicationApp')
  .controller('GalleryCtrl', function($scope, $http, API_URL, alert) {
    $http.get(API_URL + 'gallery')
      .success(function(categories) {
        $scope.gallery = categories;
      })
      .error(function(err) {
        alert('warning', 'Unable to load gallery items', err.message);
      })
  });
