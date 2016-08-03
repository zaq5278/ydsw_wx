/**
 * Created by zaq on 16/7/19.
 */
angular.module('myApp.controllers').controller('checkFreezerController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    $scope.getFreezerList = function () {
        $scope.lodingShow("加载中...");
        var url = myUrl + 'app/getIceboxCheck.appjson?sessionid=' + JSON.parse(localStorage.ydsw_userDetail).sessionid +'&customerid=' + $stateParams.customerid + '&visitingtaskdataid=' + $stateParams.VISITINGTASKDATAID + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            console.log(result);
            $scope.freezerList = result.rows;
            if(result.msgCode == "0002"){
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $ionicLoading.hide();
                    $location.path('/login');
                }, 1000);
            }
            if(result.msgCode == "0003"){
                $scope.promptShow('没有数据!');
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
    $timeout(function () {
       $scope.getFreezerList();
    },500);
    $scope.scan_byWX = function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                alert(result);
            }
        });
    }
});