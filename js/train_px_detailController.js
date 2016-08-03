/**
 * Created by zaq on 16/7/29.
 */
angular.module('myApp.controllers').controller('train_px_detailController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams,$ionicScrollDelegate) {
    $scope.train_detail = {
        summary:JSON.parse(localStorage.trainDetail_index),
        productDetail:'',
        btnType:$stateParams.btnType,
        getProductDetail:function (str) {
            getProductDetail(str);
        }
    };
    function getProductDetail() {
        var url = myUrl + "getProductDetail.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&productid=" + $scope.train_detail.summary.PRODUCTID + '&callback=JSON_CALLBACK';
        $http({
            method:'jsonp',
            url:url,
            timeout:60000
        }).success(function (result) {
            $scope.train_detail.productDetail = result.rows[0];
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
    if($stateParams.btnType == "产品资料"){
        getProductDetail();
    }
});