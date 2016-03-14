'use strict';

angular.module('webApplicationApp').config(function($urlRouterProvider, $stateProvider, $httpProvider, $authProvider, API_URL) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: '/views/main.html'
    })
    .state('gallery', {
      url: '/gallery',
      templateUrl: '/views/gallery.html',
      controller: 'GalleryCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/views/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: '/views/register.html',
      controller: 'RegisterCtrl'
    })
    .state('logout', {
      url: '/logout',
      controller: 'LogoutCtrl'
    })
    .state('upload', {
      url: '/upload',
      templateUrl: '/views/upload.html',
      controller: 'UploadCtrl'
    })
    .state('image', {
      url: '/image',
      templateUrl: '/views/images.html',
      controller: 'ImageCtrl'
    })
    .state('download', {
      url: '/download',
      controller: 'DownloadCtrl'
    })
    .state('changePassword', {
      url: '/changePassword',
      templateUrl: '/views/changePassword.html'
    })
    .state('viewProfile', {
      url: '/viewProfile',
      templateUrl: '/views/viewProfile.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: '/views/contact.html',
    });

  $authProvider.google({
    clientId: '711811706461-de1oglua6tu9kd3tjj3dnhhrikpbv2k9.apps.googleusercontent.com',
    url: API_URL + 'auth/google'
  })

  $authProvider.facebook({
    clientId: '890518281035211',
    url: API_URL + 'auth/facebook'
  })

  $authProvider.loginUrl = API_URL + 'login';
  $authProvider.signupUrl = API_URL + 'register';

  $httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/')

.run(function($window) {
  var params = $window.location.search.substring(1);

  if (params && $window.opener && $window.opener.location.origin === $window.location.origin) {
    var pair = params.split('=');
    var code = decodeURIComponent(pair[1]);

    $window.opener.postMessage(code, $window.location.origin);
  }
})
