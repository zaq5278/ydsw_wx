/**
 * Created by zaq on 16/8/2.
 */

angular.module('myApp.controllers').controller('messageNotice_detailController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    $scope.msgNoticeDetail = {
        getMsgNoticeDetail:function () {
            getMsgNoticeDetail();
        }
    };
    function getMsgNoticeDetail() {
        var url = myUrl + "getNewsInfo.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&newsid=" + $stateParams.newsId + '&callback=JSON_CALLBACK';
        $http({
            method:'jsonp',
            url:url,
            timeout:60000
        }).success(function (result) {
            console.log(result);
            if(result.msgCode == "0001"){

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
        }).error(function (error) {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    }

    $timeout(function () {
        $scope.msgNoticeDetail.getMsgNoticeDetail();
    },500);
});