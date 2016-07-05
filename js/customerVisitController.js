/**
 * Created by zaq on 16/7/4.
 */
angular.module('myApp.controllers').controller('customerVisitController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,SingleCase) {
    
    //获取时间 今天 明天 后天
    $scope.GetDateStr = function (AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        if(m >= 10){m=m;}else{m="0" + m;}
        var d = dd.getDate();
        if(d >= 10){d=d;}else{d="0" + d;}
        return y+"-"+m+"-"+d;
    };
    //获取当天的拜访任务详情列表
    $scope.getVisitTask = function () {
        var url = myUrl + "getVisitList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&tab=2" + "&page=1" + "&rows=10" + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            console.log(result);
            if (result) {
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
    };
    $timeout(function () {
        $scope.getVisitTask();
    }, 500);

    $scope.myAlert =function (str) {
        alert(str);
    }
});