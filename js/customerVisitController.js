/**
 * Created by zaq on 16/7/4.
 */
angular.module('myApp.controllers').controller('customerVisitController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$ionicScrollDelegate) {
    //返回顶部
    $scope.scrollTop = function() {
        $ionicScrollDelegate.$getByHandle('contentDiv').scrollTop();
    };
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

    $scope.menDian_DetailList = [];
    $scope.menDianBtn_Class = 'button-light';//默认选中的class
    $scope.jxsBtn_Class = 'button-assertive';//取消选中的class
    $scope.visitTab = '2';
    $scope.visitDate = $scope.GetDateStr(0);
    $scope.btn1_ChoseDate_Class = 'background-color: #eeeeee;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';//默认选中日期的class
    $scope.btn2_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';//取消选中日期的class
    $scope.btn3_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';//取消选中日期的class
    $scope.finishVisitNum = 0;
    //获取当天的拜访任务详情列表
    $scope.getVisitTask = function () {
        $scope.lodingShow("加载中...");
        var url = myUrl + "getVisitList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.visitDate + "&tab=" + $scope.visitTab + "&page=1" + "&rows=10" + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            //console.log(result);
            if (result) {
                $scope.lodingHide();
                if(result.msgCode == "0001"){
                    $scope.visitTask_DetailList = result.rows;
                    for (var i in $scope.visitTask_DetailList){
                        if($scope.visitTask_DetailList[i].FSTATUS == '已完成'){
                            $scope.finishVisitNum += 1;
                        }
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
        $location.path('/menDianSummary_visit/' + $scope.visitTask_DetailList[index].CUSTOMERID + "/" + $scope.visitTab);
    };
    //点击顶部切换经销商或者门店
    $scope.changeVisitTab = function (tab) {
        $scope.visitDate = $scope.GetDateStr(0);
        $scope.finishVisitNum = 0;
        $scope.btn1_ChoseDate_Class = 'background-color: #eeeeee;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
        $scope.btn2_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
        $scope.btn3_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
        $scope.scrollTop();
        if (tab == '1'){
            $scope.visitTab = tab;
            $scope.menDianBtn_Class = 'button-assertive';
            $scope.jxsBtn_Class = 'button-light';
            $scope.getVisitTask();
        }else {
            $scope.visitTab = tab;
            $scope.menDianBtn_Class = 'button-light';
            $scope.jxsBtn_Class = 'button-assertive';
            $scope.getVisitTask();
        }
    };
    $scope.changeDate = function (num) {
        switch (num){
            case 0:
                $scope.btn1_ChoseDate_Class = 'background-color: #eeeeee;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                $scope.btn2_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                $scope.btn3_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                break;
            case 1:
                $scope.btn1_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                $scope.btn2_ChoseDate_Class = 'background-color: #eeeeee;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                $scope.btn3_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                break;
            case 2:
                $scope.btn1_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                $scope.btn2_ChoseDate_Class = 'background-color: transparent;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                $scope.btn3_ChoseDate_Class = 'background-color: #eeeeee;font-size: 15px;padding: 0 2px 0 2px;width: 100%;border-radius: 30px';
                break;
        }
        $scope.finishVisitNum = 0;
        $scope.visitDate = $scope.GetDateStr(num);
        $scope.getVisitTask();
    }
});