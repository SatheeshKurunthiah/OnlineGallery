'use strict';

angular.module('webApplicationApp').controller('RegisterCtrl', function($scope, alert, $auth, $state) {
  $scope.submit = function() {
    $auth.signup({
      email: $scope.email,
      password: $scope.password
    })
      .then(function(res) {
        alert('success', 'Account Created!', 'Welcome, ' + res.data.user.email + '!');
        $state.go('main');
      })
      .catch(function(err) {
        if (err) console.log(err);
        alert('warning', 'Unable to create account :(', err.data.message);
      });
  };
});
