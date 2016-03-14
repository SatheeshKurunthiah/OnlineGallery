'use strict';

angular.module('webApplicationApp').controller('UploadCtrl', function($scope, $http, API_URL, Upload) {

  var upload = function(file) {
    console.log("Inside upload module");
    Upload.upload({
      url: API_URL + 'upload',
      file: file,
      fields: {
        isVisibleToAll: $scope.IsVisibleToAll
      }

    }).progress(function(evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ');
    }).success(function(data, status, headers, config) {
      console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
    }).error(function(data, status, headers, config) {
      console.log('error status: ' + status);
    });
  };

  $scope.submit = function() {
    alert('success', 'You are inside upload call');
    console.log("You are inside upload call");
    if ($scope.file && !$scope.file.$error) {
      upload($scope.file);
      console.log($scope.file.path);
      console.log($scope.file.name);
      console.log($scope.IsVisibleToAll);
    }
    //$http.post(API_URL + 'upload', {
    //    filePath: 'E:\Project Temp\New Text Document.txt'
    // });
  };

  $scope.onFileSelect = function($files) {
    $scope.files = angular.copy($files);
    console.log($scope.files); // Returns my object
  }

});
