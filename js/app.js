
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
          url: '/customer_MenDianDetail/:customer_ManagerDetail_CUSTOMERID',
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
          url: '/customer_JxsDetail/:customer_ManagerDetail_CUSTOMERID',
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
      })
      //门店或者经销商拜访的第一个页面详情
      .state('menDianSummary_visit', {
          url: '/menDianSummary_visit/:customerid/:visitTab',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "menDianSummary_visit.html",
                  controller:'visitTaskSummarryController'
              }
          }
      })
      //拜访任务步骤页面 8 或者 5
      .state('jobTask_Main', {
          url: '/jobTask_Main/:visitTab',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "jobTask_Main.html",
                  controller:'jobTask_MainController'
              }
          }
      })
      //门店拜访促销员管理
      .state('promotionManagement', {
          url: '/promotionManagement',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "promotionManagement.html",
                  controller:'promotionManagementController'
              }
          }
      })
      //店内问题反馈
      .state('storeProblemFeedback', {
          url: '/storeProblemFeedback',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "storeProblemFeedback.html",
                  controller:'storeProblemFeedbackController'
              }
          }
      })
      //拜访小结
      .state('visitSummary', {
          url: '/visitSummary',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "visitSummary.html",
                  controller:'visitSummaryController'
              }
          }
      })
      //店内问题执行反馈
      .state('storeProblemExecutionFeedback', {
          url: '/storeProblemExecutionFeedback',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "storeProblemExecutionFeedback.html",
                  controller:'storeProblemExecutionFeedbackController'
              }
          }
      })
      //库存盘点
      .state('inventory_MenDian', {
          url: '/inventory_MenDian',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "inventory_MenDian.html",
                  controller:'inventory_MenDianController'
              }
          }
      })
      //库存盘点详情页面
      .state('inventory_Detail', {
          url: '/inventory_Detail',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "inventory_Detail.html",
                  controller:'inventory_DetailController'
              }
          }
      })
      //排面品相统计
      .state('surfaceQualityStatistics', {
          url: '/surfaceQualityStatistics',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "surfaceQualityStatistics.html"
              }
          }
      })
      //排面品相统计详情
      .state('surfaceQualityStatistics_Detail', {
          url: '/surfaceQualityStatistics_Detail',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "surfaceQualityStatistics_Detail.html"
              }
          }
      })
      //冰柜核查
      .state('checkFreezer', {
          url: '/checkFreezer',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "checkFreezer.html",
                  controller:'checkFreezerController'
              }
          }
      })
      //拜访交谈照片
      .state('visitChatPhotos', {
          url: '/visitChatPhotos',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "visitChatPhotos.html"
              }
          }
      })
      //拜访交谈照片
      .state('communicationRecord', {
          url: '/communicationRecord',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "communicationRecord.html"
              }
          }
      })
      //库存量(件)分类列表
      .state('stockClassification', {
          url: '/stockClassification',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "stockClassification.html"
              }
          }
      })
      //库存量(件)分类列表
      .state('stockClassification_Detail', {
          url: '/stockClassification_Detail',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "stockClassification_Detail.html"
              }
          }
      })
      //库存实景
      .state('stockRealPhotos', {
          url: '/stockRealPhotos',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "stockRealPhotos.html"
              }
          }
      })
      //自定义拜访任务
      .state('editMenDianOrJxsList', {
          url: '/editMenDianOrJxsList/:visitTab',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "editMenDianOrJxsList.html",
                  controller:'editMenDianOrJxsListController'
              }
          }
      });


  $urlRouterProvider.otherwise('/login');
});
// var myUrl_47 = 'http://222.88.22.72:100/userServiceController.do?';
// var myUrl = "http://100.100.1.55:8080/synear/";
var myUrl = "http://171.8.66.195:8080/synear/";
// var myUrl = 'http://100.100.1.46:9999/';
//var myUrl = "http://192.168.16.176:9999/synear/";

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