/**
 * Created by zaq on 16/7/18.
 */
angular.module('myApp.controllers').controller('inventory_MenDianController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$ionicScrollDelegate) {
    //返回顶部
    $scope.scrollTop = function() {
        $ionicScrollDelegate.$getByHandle('productScroll').scrollTop();
    };
    $scope.isFirstGet = true;//用于第一次进入请求避免第二次请求的传递
    //获取所有产品的列表
    $scope.getTheProductList = function () {
        if($scope.pageNum == 1){
            $scope.lodingShow("加载中...");
        }
        if($scope.isFirstGet && $scope.pageNum == 2){
            $scope.isFirstGet = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            return;
        }
        var url = myUrl + 'getProductList.appjsonp?sessionid=' + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&page=" + $scope.pageNum + "&rows=15" + "&sname=" +  $scope.product_search + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            console.log(result);
            if (result.msgCode == "0001") {
                if($scope.pageNum == 1){
                    $scope.lodingHide();
                    $scope.productList = result.rows;
                }else {
                    $scope.isFirstGet = false;
                    $scope.productList = $scope.productList.concat(result.rows);
                    $scope.$broadcast('scroll.infiniteScrollComplete');

                }
                if(result.rows.length < 10){
                    $scope.isProductListShowScroll = false;
                }else {
                    $scope.isProductListShowScroll = true;
                }
                //console.log("ss");

                $scope.pageNum += 1;
            }
            if(result.msgCode == "0003"){
                $scope.lodingHide();
                $scope.isProductListShowScroll = false;
                $scope.productList = '';
                $scope.showAlert(result.msgDesc);
            }
            if(result.msgCode == '0002'){
                $scope.promptShow('需要重新登录!');
                $timeout(function () {
                    $scope.lodingHide();
                    $location.path('/login');
                }, 1000);
            }
        }).error(function () {
            $scope.isProductListShowScroll = false;
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });

    };

    $scope.searchProductFormList = function () {
        $scope.isSearchOpen = true;
        $scope.pageNum = 1;
        $scope.isProductListShowScroll = false;
        $scope.scrollTop();
        $scope.getTheProductList();
    };
    $timeout(function () {
        $scope.pageNum = 1;
        $scope.product_search = '';
        $scope.isSearchOpen = false;//每次进入产品列表的时候这个判断是否开始查询的变量置为false,否则查询开始再进的时候不能滑动
        $scope.isProductListShowScroll = false;
        $scope.getTheProductList();
    },500);
});