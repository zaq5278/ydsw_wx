/**
 * Created by zaq on 16/8/2.
 */

angular.module('myApp.controllers').controller('messageNoticeController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams,$ionicScrollDelegate) {
    $scope.msgNotice = {
        getMsgNotice:function () {
            getMsgNotice();
        },
        msgArray:[],
        goToMsgNoticeDetail:function (index) {
            goToMsgNoticeDetail(index);
        }
    };
    function getMsgNotice() {
        var url = myUrl + "getNewsList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&page=" + 1 + "&rows=10" + '&callback=JSON_CALLBACK';
        $http({
            method:'jsonp',
            url:url,
            timeout:60000
        }).success(function (result) {
            console.log(result);
            if(result.msgCode == "0001"){
                $scope.msgNotice.msgArray = result.rows;
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
    function goToMsgNoticeDetail(index) {
        $location.path("/messageNotice_detail/" + $scope.msgNotice.msgArray[index].NEWSID);
    }
    $timeout(function () {
        $scope.msgNotice.getMsgNotice();
    },500);
});