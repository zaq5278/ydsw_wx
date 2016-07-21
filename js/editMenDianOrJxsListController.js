/**
 * Created by zaq on 16/7/21.
 */
angular.module('myApp.controllers').controller('editMenDianOrJxsListController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    $scope.addCustomerBtnStutas = false;//用于判断是否点击了客户添加
    $scope.btnIsSelected = false;
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
        var url = '';
        if(!$scope.addCustomerBtnStutas){//默认没点击客户添加
            if($stateParams.visitTab == '2'){//门店
                url = myUrl + "getSelfTaskShop.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&para=" + '' + '&callback=JSON_CALLBACK';
            }else{//经销商
                url = myUrl + "getSelfTaskJxs.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&para=" + '' + '&callback=JSON_CALLBACK';

            }
        }else {//点击客户添加后
            if($stateParams.visitTab == '2'){//门店
                url = myUrl + "getSelfShop.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&para=" + '' + '&callback=JSON_CALLBACK';
            }else{//经销商
                url = myUrl + "getSelfJxs.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&para=" + '' + '&callback=JSON_CALLBACK';

            }
        }
        $scope.lodingShow("加载中...");
        $http.jsonp(url).success(function (result) {
            console.log(result);
            if (result) {
                $scope.lodingHide();
                if(result.msgCode == "0001"){
                    $scope.visitTask_DetailList = result.rows;
                    if(!$scope.addCustomerBtnStutas){
                        $scope.selfVisitTask = result.rows;
                    }
                }
                if(result.msgCode == "0002"){
                    alert(result.msgDesc);
                    $location.path('/login');
                }
                if(result.msgCode == "0003"){
                    $scope.visitTask_DetailList = '';
                    $scope.promptShow(result.msgDesc);
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 800);
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
    $scope.addCustomerInThisView = function () {
        $scope.addCustomerBtnStutas = true;
        $scope.getVisitTask();
    };
    $scope.checkBtnIsSelected = function (index) {

        for(var i = 0;i < $scope.selfVisitTask.length;i++){
            if($scope.selfVisitTask[i].CUSTOMERID == $scope.visitTask_DetailList[index].CUSTOMERID){
                $scope.btnIsSelected = true;

                break;
            }else {
                $scope.btnIsSelected = false;
            }
            console.log($scope.btnIsSelected);
        }
    }
});