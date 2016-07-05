/**
 * Created by zaq on 16/7/5.
 */
angular.module('myApp.controllers').controller('homePageController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {

    $scope.dayNames = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][new Date().getDay()];
    $scope.todayDate = new Date();
    //跳转到新的界面
    $scope.goToNewView = function (str) {
        $scope.travelCameraImg = '';
        if (str == 'travelOnBusiness'){
            $scope.getLocation_by_wx();
        }
        $location.path(str);
    };
    //加载DOM的同时判断是否显示按钮
    $scope.isShowTheButton = function (str) {
        for (var i = 0;i< $scope.userDetail.function.length;i++){
            if (str == $scope.userDetail.function[i].name){
                return true;
            }
        }
    };
});