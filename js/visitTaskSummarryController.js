/**
 * Created by zaq on 16/7/11.
 */
angular.module('myApp.controllers').controller('visitTaskSummarryController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    $scope.storeTab = 1;
    if($scope.storeTab == 1){
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
                alert(result.msgDesc);
                $location.path('/login');
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
            lodingHide();
        }, 500);
    });
    $scope.goToTheJobTaskView = function () {
        $location.path("/jobTask_Main");
    }
});