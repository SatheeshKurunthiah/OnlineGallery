'use strict';

angular.module('webApplicationApp').controller('DownloadCtrl', function($scope, $http, API_URL) {
  $scope.submit = function(item) {
    alert('success', 'You are inside download call');
    console.log("inside frontend download call")
    $http.get(API_URL + 'download', {
      responseType: 'arraybuffer',
      transformRequest: [],
      params: {
        id: item._id,
        filename: item.fileName
      }
    }).then(function(res) {

        try {

          var blob = new Blob([res.data], {
            type: 'application/octet-stream'
          });

          saveAs(blob, item.fileName);
        } catch (err) {
          console.log("Not supported in browser - " + err.message);
        }

      },
      function(err) {
        console.log(err);
      });
  };
});
