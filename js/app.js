
angular.module('myApp', ['ionic','myApp.controllers','myApp.services'])
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
}).config(function($stateProvider,$urlRouterProvider) {
  // $ionicConfigProvider.scrolling.jsScrolling(true);
  $stateProvider
      .state('index', {
          url: '/index',
          abstract: true,           //这里需要一个摘要或者主要的路由来管理其所属的路由
          templateUrl: "index.html"
      })

      .state('login', {
        url: '/login',
        views: {
          'index.main': {     //这里必须有一个父子关系的路由才能管控很多路由  index.main就相当于一个路由
              templateUrl: "login.html",
              controller:'loginController'
          }
        }
      })
      .state("homePage", {
        url: '/homePage',
        views: {
          'index.main': {  //所有被index.main管理的路由可以随意跳转
              templateUrl: "homePage.html",
              controller:'homePageController'
          }
        }
      })
      .state("punchTheClock", {
          url: '/punchTheClock',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "punchTheClock.html",
                  controller:"punchTheClockController"
              }
          }
      })
      .state("travelOnBusiness", {
          url: '/travelOnBusiness',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "travelOnBusiness.html",
                  controller:'travelController'
              }
          }
      })
      .state("askedForLeave", {
          url: '/askedForLeave',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "askedForLeave.html",
                  controller:'askedForLeaveController'
              }
          }
      })
      //客户管理下
      .state("customerManagement", {
          url: '/customerManagement',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "customerManagement.html",
                  controller: 'customerManagerController'
              }
          }
      })
      .state("customer_MenDianDetail", {
          url: '/customer_MenDianDetail:customer_ManagerDetail_CUSTOMERID',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "customer_MenDianDetail.html",
                  controller: 'customer_MenDianController'
              }
          }
      })
      .state("edit_menDianSummary", {
          url: '/edit_menDianSummary',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "edit_menDianSummary.html",
                  controller: 'customer_MenDianController'
              }
          }
      })
      .state("customer_JxsDetail", {
          url: '/customer_JxsDetail:customer_ManagerDetail_CUSTOMERID',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "customer_JxsDetail.html",
                  controller: 'customer_MenDianController'
              }
          }
      })
      //客户拜访
      .state('customerVisit', {
          url: '/customerVisit',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "customerVisit.html",
                  controller:'customerVisitController'
              }
          }
      });

  // .state('login',{
  //     templateUrl: "login.html"
  // })
  //     .state('homePage',{
  //         templateUrl: "homePage.html"
  //     })
  //     .state('punchTheClock',{
  //         templateUrl: "punchTheClock.html"
  //     })
  //     .state('travelOnBusiness',{
  //         templateUrl: "travelOnBusiness.html"
  //     })
  //     .state('askedForLeave',{
  //         templateUrl: "askedForLeave.html"
  //     })
  //     .state('customerManagement',{
  //         templateUrl:'customerManagement.html'
  //     })
  //     .state('customer_MenDianDetail',{
  //         templateUrl:'customer_MenDianDetail.html'
  //     })
  //     .state('edit_menDianSummary',{
  //         templateUrl:'edit_menDianSummary.html'
  //     })
  //     .state('customer_JxsDetail',{
  //         templateUrl:'customer_JxsDetail.html'
  //     });
  $urlRouterProvider.otherwise('/login');
});
// var myUrl_47 = 'http://222.88.22.72:100/userServiceController.do?';
// var myUrl = "http://100.100.1.55:8080/synear/";
//var myUrl = "http://171.8.66.195:8080/synear/";
// var myUrl = 'http://100.100.1.46:9999/';
var myUrl = "http://192.168.16.176:9999/synear/";

