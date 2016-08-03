/**
 * Created by zaq on 16/7/11.
 */
angular.module('myApp.controllers').controller('visitTaskSummarryController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    if($stateParams.visitTab == 2){
        var lenget = "getCustomerInfoApp.appjson";//门店
    }else{
        var lenget = "getVisitJxsInfo.appjson";//经销商
    }
    $scope.lodingShow("加载中...");
    var url = myUrl + lenget +  "?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&customerid=" + $stateParams.customerid + '&callback=JSON_CALLBACK';
    $http.jsonp(url).success(function (result) {
        console.log(result);
        if (result) {
            $scope.lodingHide();
            if(result.msgCode == "0001"){
                $scope.visitTask_Detail = result.rows[0];
                $scope.visitFstatus = localStorage.getItem($scope.visitTask_Detail.CUSTOMERID + 'visitFstatus');
            }
            if(result.msgCode == "0002"){
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $ionicLoading.hide();
                    $location.path('/login');
                }, 800);
            }
            if(result.msgCode == "0003"){
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $ionicLoading.hide();
                }, 500);
            }
        }
    }).error(function (error) {
        $scope.promptShow("网络错误！");
        $timeout(function () {
            $scope.lodingHide();
        }, 500);
    });
    $scope.goToTheJobTaskView = function () {
        if(localStorage.getItem($scope.visitTask_Detail.CUSTOMERID + 'visitFstatus') != '查看拜访信息'){
            localStorage.setItem($scope.visitTask_Detail.CUSTOMERID + 'visitFstatus','继续拜访');
        }
        $location.path("/jobTask_Main/" + $stateParams.visitTab + "/" + $scope.visitTask_Detail.CUSTOMERID + "/" + $stateParams.VISITINGTASKDATAID);
    }
});