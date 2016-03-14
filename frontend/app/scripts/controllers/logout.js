'use strict';

angular.module('webApplicationApp').controller('LogoutCtrl', function($auth, $state) {
  $auth.logout();
  $state.go('main');
});
