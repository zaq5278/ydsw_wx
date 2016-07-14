/**
 * Created by zaq on 16/7/4.
 */
angular.module('myApp.controllers').controller('customerVisitController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,SingleCase) {
    $scope.menDian_DetailList = [];
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
        $scope.lodingShow("加载中...");
        var url = myUrl + "getVisitList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&tab=2" + "&page=1" + "&rows=10" + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
           // console.log(result);
            if (result) {
                $scope.lodingHide();
                if(result.msgCode == "0001"){
                    $scope.visitTask_DetailList = result.rows;
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
    };
    $timeout(function () {
        $scope.getVisitTask();
    }, 300);

    $scope.isShowFinishImg = function (index) {
        if($scope.visitTask_DetailList){
            if($scope.visitTask_DetailList[index].FSTATUS == '已完成'){
                return true;
            }else {
                return false;
            }
        }else {
            return false;
        }
    };
    $scope.goToTheMenDianSummary_visit = function (index) {
        var storageName = $scope.visitTask_DetailList[index].CUSTOMERID + 'visitFstatus';
        if($scope.visitTask_DetailList[index].FSTATUS== '已完成'){
            localStorage.setItem(storageName,'查看拜访信息');
        }else {
            if(localStorage.getItem(storageName) != '继续拜访'){
                localStorage.setItem(storageName,'开始拜访');
            }
        }
        $location.path('/menDianSummary_visit/' + $scope.visitTask_DetailList[index].CUSTOMERID);
    }
});