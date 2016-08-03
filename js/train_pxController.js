/**
 * Created by zaq on 16/7/28.
 */
angular.module('myApp.controllers').controller('train_pxController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams,$ionicScrollDelegate) {
    //返回顶部
    $scope.scrollTop = function() {
        $ionicScrollDelegate.$getByHandle('train_px').scrollTop();
    };
    $scope.train = {
        trainList:[],
        trainStyle:{
            "color": "coral",
            "font-size": "small"
        },
        btnType:"常见问题",
        isTrainShowScroll:false,
        pageNum:1,
        isFirst:true,
        searchStr:'',
        lineStyle:"width: 30%;border: double 1px;color: #ef473a",
        getTrainList:function(str) {
            getTrainList(str);
        },
        goToTrainDetail:function(index){
            goToTrainDetail(index);
        },
        changeType:function (str) {
            changeType(str);
        }
    };
    $timeout(function () {
        $scope.train.getTrainList();
    },500);
    function getTrainList(str) {

        if(str == "search"){
            $scope.scrollTop();
            $scope.train.pageNum = 1;
            $scope.train.isFirst = true;
            $scope.train.isTrainShowScroll = false;
            $scope.train.trainList = [];
        }
        if($scope.train.isFirst && $scope.train.pageNum == 2){
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.train.isFirst = false;
            return;
        }
        var subUrl = '';
        switch ($scope.train.btnType){
            case "常见问题":
                subUrl = "getProblemList.appjsonp";
                break;
            case "产品资料":
                subUrl = "getProductList.appjsonp";
                break;
            case "培训资料":
                subUrl = "getDocumentList.appjsonp";
                break;
        }
        $scope.lodingShow("加载中...");
        var url = myUrl + subUrl + "?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&page=" + $scope.train.pageNum + "&rows=10" + "&sname=" + $scope.train.searchStr + '&callback=JSON_CALLBACK';
        $http({
            method:'jsonp',
            url:url,
            timeout:60000
        }).success(function (result) {
            $scope.lodingHide();
            if(result.msgCode == '0001'){
                $scope.train.trainList = $scope.train.trainList.concat(result.rows);
                if(result.rows.length < 10){
                    $scope.train.isTrainShowScroll = false;
                }else {
                    $scope.train.isTrainShowScroll = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }
            $scope.train.pageNum+=1;
            //console.log($scope.train.trainList);
            if(result.msgCode == "0002"){
                $scope.train.isTrainShowScroll = false;
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $ionicLoading.hide();
                    $location.path('/login');
                }, 800);
            }
            if(result.msgCode == "0003"){
                $scope.train.isTrainShowScroll = false;
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $ionicLoading.hide();
                }, 800);
            }
        }).error(function (error) {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    }
    function goToTrainDetail(index) {
        localStorage.trainDetail_index = JSON.stringify($scope.train.trainList[index]);
        $location.path('/train_px_detail/' + $scope.train.btnType);
    }
    function changeType(str) {
        $scope.scrollTop();
        $scope.train.btnType = str;
        $scope.train.pageNum = 1;
        $scope.train.isFirst = true;
        $scope.train.searchStr = '';
        $scope.train.isTrainShowScroll = false;
        $scope.train.trainList = [];
        switch (str){
            case "常见问题":
                $scope.train.lineStyle = "width: 33%;border: double 1px;color: #ef473a";
                break;
            case "产品资料":
                $scope.train.lineStyle = "width: 33%;border: double 1px;color: #ef473a;margin-left: 33%";
                break;
            case "培训资料":
                $scope.train.lineStyle = "width: 33%;border: double 1px;color: #ef473a;margin-left: 66%";
                break;
        }
        getTrainList();
    }
});