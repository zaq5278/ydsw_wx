/**
 * Created by zaq on 16/7/21.
 */
angular.module('myApp.controllers').controller('editMenDianOrJxsListController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams,$ionicScrollDelegate) {
    $scope.addCustomerBtnStutas = false;//用于判断是否点击了客户添加
    $scope.btnIsSelected = false;
    $scope.visitTask_DetailList = [];
    $scope.selfVisitTask = [];
    $scope.isEditShowScroll = false;
    $scope.editVisit_search = '';
    var pageNum = 1;
    var isFirstLoadMore = true;
    //返回顶部
    $scope.scrollTop = function() {
        $ionicScrollDelegate.$getByHandle('editMenDianOrJxs').scrollTop();
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
    //获取当天的拜访任务详情列表
    $scope.getVisitTask = function (str) {
        if(str == "search"){
            pageNum = 1;
            var para = $scope.editVisit_search;
            console.log(para);
            $scope.visitTask_DetailList = [];
        }else {
            var para = ''
        }
        if(isFirstLoadMore && pageNum == 2){
            isFirstLoadMore = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }
        var url = '';
        if(!$scope.addCustomerBtnStutas){//默认没点击客户添加
            if($stateParams.visitTab == '2'){//门店
                url = myUrl + "getSelfTaskShop.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&para=" + para + '&callback=JSON_CALLBACK';
            }else{//经销商
                url = myUrl + "getSelfTaskJxs.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&para=" + para + '&callback=JSON_CALLBACK';

            }
        }else {//点击客户添加后
            if($stateParams.visitTab == '2'){//门店
                url = myUrl + "getSelfShop.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&sname=" + para + "&page="+ pageNum +"&rows=15" + '&callback=JSON_CALLBACK';
            }else{//经销商
                url = myUrl + "getSelfJxs.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&visitdate=" + $scope.GetDateStr(0) + "&sname=" + para + "&page="+ pageNum +"&rows=15" + '&callback=JSON_CALLBACK';

            }
        }
        $scope.lodingShow("加载中...");
        $http({
            method:'jsonp',
            url:url,
            timeout:60000
        }).success(function (result) {
            //console.log(result);
            if (result) {
                $scope.lodingHide();
                if(result.msgCode == "0001"){
                    $scope.visitTask_DetailList = $scope.visitTask_DetailList.concat(result.rows);
                    if(!$scope.addCustomerBtnStutas){
                        $scope.selfVisitTask = result.rows;
                        //console.log($scope.selfVisitTask);
                    }
                    if($scope.addCustomerBtnStutas && $scope.visitTask_DetailList.length >= 15){
                        $scope.isEditShowScroll = true;
                        $timeout(function () {
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        },1000);
                        pageNum+=1;
                    }
                }
                if(result.msgCode == "0002"){
                    $scope.isEditShowScroll = false;
                    $scope.promptShow(result.msgDesc);
                    $timeout(function () {
                        $ionicLoading.hide();
                        $location.path('/login');
                    }, 800);
                }
                if(result.msgCode == "0003"){
                    $scope.isEditShowScroll = false;
                    $scope.promptShow(result.msgDesc);
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 800);
                }

            }
        }).error(function (error) {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };
    $timeout(function () {
        $scope.getVisitTask();
    }, 400);
    $scope.addCustomerInThisView = function () {
        $scope.addCustomerBtnStutas = true;
        pageNum = 1;
        $scope.editVisit_search = '';
        $scope.isEditShowScroll = false;
        $scope.visitTask_DetailList = [];
        $scope.scrollTop();
        $scope.getVisitTask();
    };
    //$scope.theSelectedImg = 'imges/tuoyuan.png';
    $scope.selectedImg = function (index) {
        if($scope.selfVisitTask){
            for(var i = 0;i < $scope.selfVisitTask.length;i++){
                if($scope.selfVisitTask[i].CUSTOMERID == $scope.visitTask_DetailList[index].CUSTOMERID){
                    return 'imges/storeAdd.png';
                }
            }
        }
        return 'imges/tuoyuan.png';
    };
    $scope.changeTheSelectStatus = function (event) {
        var imgSrc = window.location.href.split("#")[0] + 'imges/storeAdd.png';
        if(event.target.src == imgSrc){
            event.target.src = window.location.href.split("#")[0] + 'imges/tuoyuan.png';
            for (var i = 0;i < $scope.selfVisitTask.length;i++){
                if ($scope.visitTask_DetailList[this.$index].CUSTOMERID == $scope.selfVisitTask[i].CUSTOMERID){
                    $scope.selfVisitTask.splice(i,1);//删除
                }
            }
        }else {//新增
            event.target.src = imgSrc;
            $scope.selfVisitTask.push($scope.visitTask_DetailList[this.$index]);
        }
    };
    $scope.saveAndSubmit = function () {
        $scope.lodingShow("加载中...");
        var visitResult = [];
        var sublenget = '';
        if($scope.selfVisitTask.length < 1){
            visitResult.push({"customerid":"1","forder":"0"});
            visitResult.push({"customerid":"1","forder":"1"});
        }
        if($scope.selfVisitTask.length == 1 && $scope.selfVisitTask.length != 0){
            visitResult.push({"customerid":"1","forder":"1"});
            visitResult.push({"customerid":$scope.selfVisitTask[0].CUSTOMERID,"forder":'0'});
        }else {
            for(var i = 0;i < $scope.selfVisitTask.length;i++){
                visitResult.push({"customerid":$scope.selfVisitTask[i].CUSTOMERID,"forder":''+i+''});
            }
        }
        var customerIdArray = "";
        for(var j=0;j< visitResult.length;j++){
            for(var s in visitResult[j])
                customerIdArray += ("&"+s+"="+visitResult[j][s]);
        }
        //console.log(customerIdArray);
        if($stateParams.visitTab == 2){//门店
            sublenget = "app/addSelfTaskShop.appjsone";
        }else{//经销商
            sublenget = "app/addSelfTaskJxs.appjsone";
        }
        var url = myUrl + sublenget + "?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + customerIdArray + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            //console.log(result);
            if (result) {
                $scope.lodingHide();
                if(result.msgCode == "0001"){
                    $scope.promptShow(result.msgDesc);
                    $timeout(function () {
                        $ionicLoading.hide();
                        $scope.addCustomerBtnStutas = false;
                        $location.path('/customerVisit');
                    }, 800);
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
                    }, 800);
                }
            }
        }).error(function (error) {
            $scope.promptShow("网络错误!");
            $timeout(function () {
                $scope.lodingHide();
            }, 1000);
        });
    };
    $scope.removeTheCustomer = function (index) {
        $scope.selfVisitTask.splice(index,1);
        $scope.visitTask_DetailList.splice(index,1);
    }
});