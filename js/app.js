
angular.module('myApp', ['ionic','myApp.mainController'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
// var myUrl = 'http://222.88.22.72:100/userServiceController.do?';
// var myUrl = "http://100.100.1.55:8080/synear/";
   var myUrl = "http://171.8.66.195:8080/synear/";
// var myUrl = 'http://100.100.1.46:9999/';


