
angular.module('myApp', ['ionic','chart.js','myApp.controllers','myApp.services'])
.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider,ChartJsProvider) {
  // $ionicConfigProvider.scrolling.jsScrolling(true);
    $ionicConfigProvider.templates.maxPrefetch(0);//禁止预加载,加快首页速度
    // 配置图表颜色
    // ChartJsProvider.setOptions({
    //     chartColors: ['#FF5252', '#FF8A80'],
    //     responsive: true
    // });
    // // 配置图表线
    // ChartJsProvider.setOptions('line', {
    //     showLines: false
    // });
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
              //controller:'UploaderController'
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
          cache:false,
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "customerVisit.html",
                  controller:'customerVisitController'
              }
          }
      })
      //门店或者经销商拜访的第一个页面详情
      .state('menDianSummary_visit', {
          url: '/menDianSummary_visit/:customerid/:visitTab/:VISITINGTASKDATAID',
          cache:false,
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "menDianSummary_visit.html",
                  controller:'visitTaskSummarryController'
              }
          }
      })
      //拜访任务步骤页面 8 或者 5
      .state('jobTask_Main', {
          url: '/jobTask_Main/:visitTab/:customerid/:VISITINGTASKDATAID',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "jobTask_Main.html",
                  controller:'jobTask_MainController'
              }
          }
      })
      //门店拜访促销员管理
      .state('promotionManagement', {
          url: '/promotionManagement/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "promotionManagement.html",
                  controller:'promotionManagementController'
              }
          }
      })
      //店内问题反馈
      .state('storeProblemFeedback', {
          url: '/storeProblemFeedback/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "storeProblemFeedback.html",
                  controller:'storeProblemFeedbackController'
              }
          }
      })
      //拜访小结
      .state('visitSummary', {
          url: '/visitSummary/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "visitSummary.html",
                  controller:'visitSummaryController'
              }
          }
      })
      //店内执行反馈
      .state('storeProblemExecutionFeedback', {
          url: '/storeProblemExecutionFeedback/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "storeProblemExecutionFeedback.html",
                  controller:'storeProblemExecutionFeedbackController'
              }
          }
      })
      //库存盘点
      .state('inventory_MenDian', {
          url: '/inventory_MenDian/:customerid',
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
          url: '/surfaceQualityStatistics/:customerid',
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
          url: '/checkFreezer/:customerid/:VISITINGTASKDATAID',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "checkFreezer.html",
                  controller:'checkFreezerController'
              }
          }
      })
      //拜访交谈照片
      .state('visitChatPhotos', {
          url: '/visitChatPhotos/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "visitChatPhotos.html"
              }
          }
      })
      //沟通记录
      .state('communicationRecord', {
          url: '/communicationRecord/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "communicationRecord.html"
              }
          }
      })
      //库存量(件)分类列表
      .state('stockClassification', {
          url: '/stockClassification/:customerid',
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
          url: '/stockRealPhotos/:customerid',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "stockRealPhotos.html"
              }
          }
      })
      //自定义拜访任务
      .state('editMenDianOrJxsList', {
          url: '/editMenDianOrJxsList/:visitTab',
          cache:false,
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "editMenDianOrJxsList.html",
                  controller:'editMenDianOrJxsListController'
              }
          }
      })
      //培训
      .state('train_px', {
          url: '/train_px',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "train_px.html",
                  controller:'train_pxController'
              }
          }
      })
      //培训详情
      .state('train_px_detail', {
          url: '/train_px_detail/:btnType',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "train_px_detail.html",
                  controller:'train_px_detailController'
              }
          }
      })
      //报表查询
      .state('reportQuery', {
          url: '/reportQuery',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "reportQuery.html",
                  controller:'reportQueryController'
              }
          }
      })
      //消息通知
      .state('messageNotice', {
          url: '/messageNotice',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "messageNotice.html",
                  controller:'messageNoticeController'
              }
          }
      })
      //消息通知详情
      .state('messageNotice_detail', {
          url: '/messageNotice_detail/:newsId',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "messageNotice_detail.html",
                  controller:'messageNotice_detailController'
              }
          }
      })
      //系统设置
      .state('systemSettings', {
          url: '/systemSettings',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "systemSettings.html",
                  controller:'systemSettingsController'
              }
          }
      })
      //系统设置
      .state('aboutUs', {
          url: '/aboutUs',
          views: {
              'index.main': {  //所有被index.main管理的路由可以随意跳转
                  templateUrl: "aboutUs.html"
              }
          }
      });


  $urlRouterProvider.otherwise('/login');
});
// var myUrl_47 = 'http://222.88.22.72:100/userServiceController.do?';
// var myUrl = "http://100.100.1.55:8080/synear/";
var myUrl = "http://171.8.66.195:8080/synear/";
//var upFileUrl = "http://171.8.66.195:8080/synear/app/addAttachment.appjsonu";//正式
//var upFileUrl = "http://192.168.16.176:9999/synear/app/addAttachment.appjsonu";
// var myUrl = 'http://100.100.1.46:9999/';
//var myUrl = "http://192.168.16.176:9999/synear/";
/*.directive('fileModel', ['$parse', function ($parse) {
 return {
 restrict: 'A',
 link: function(scope, element, attrs, ngModel) {
 var model = $parse(attrs.fileModel);
 var modelSetter = model.assign;
 element.bind('change', function(event){
 scope.$apply(function(){
 modelSetter(scope, element[0].files[0]);
 });
 //附件预览
 scope.file = (event.srcElement || event.target).files[0];
 console.log(scope.file);
 scope.getFile(scope.file);
 });
 }
 };
 }]).controller('UploaderController', function($scope, fileReader,$http,$timeout){
 $scope.getFile = function (file) {
 fileReader.readAsDataUrl(file, $scope)
 .then(function(result) {
 //console.log(result.split(',')[1]);
 $scope.imageSrc = result;
 $scope.myImage = result.split(',')[1];
 //$scope.upLoadFile(result.split(',')[1]);
 });
 };
 $scope.upLoadFile = function (data) {
 $http({
 url: upFileUrl,
 method: "POST",
 dataType:'json',
 headers: {
 'Content-Type': 'application/x-www-form-urlencoded'
 },
 transformRequest: angular.identity,
 params: {
 "sessionid":JSON.parse(localStorage.ydsw_userDetail).sessionid,
 "file":$scope.myImage,
 "waterMarkContent":222,
 "waterMarkContent2":2222
 }
 //data: "?sessionid="+ JSON.parse(localStorage.ydsw_userDetail).sessionid + "&waterMarkContent=222&waterMarkContent2=333" + "&file=sss"
 }).success(function (result) {
 console.log(result);
 }).error(function () {
 $scope.promptShow("网络错误！");
 $timeout(function () {
 $scope.lodingHide();
 }, 800);
 });
 };
 // var postData = {
 //     vacationType: $scope.leave.type,
 //     reason: $scope.leave.reason,
 //     familyRelation: +$scope.leave.type == 7 ? $scope.leave.relation : "",
 //     startTime: startTime,
 //     endTime: endTime,
 //     fileName: $scope.imageSrc,
 //     workDelivers: workDelivers,
 //     ccmailNickNames: sendPersons,
 //     realDays: +$scope.leave.type == 8 ? $scope.leave.timeLong : ""
 // };
 // var promise = postMultipart('/maldives/leave/save', postData);
 // function postMultipart(url, data) {
 //     var fd = new FormData();
 //     angular.forEach(data, function(val, key) {
 //         fd.append(key, val);
 //     });
 //     var args = {
 //         method: 'POST',
 //         url: url,
 //         data: fd,
 //         headers: {'Content-Type': undefined},
 //         transformRequest: angular.identity
 //     };
 //     return $http(args);
 // }
 })*/