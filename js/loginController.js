/**
 * Created by zaq on 16/7/5.
 */

angular.module('myApp.controllers').controller('loginController',['$scope','$http','$ionicLoading','$ionicPopup','$timeout','$ionicHistory','$location',function($scope,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$location) {
    //登录
    $scope.login = function (value) {
        // $location.path('/index/homePage');
        // $http({
        //     url: "http://192.168.16.151:8888/",
        //     method: "POST",
        //     dataType:'json',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     data: "ssss"
        // }).success(function (result) {
        //     console.log(result);
        // }).error(function () {
        //     $scope.promptShow("网络错误！");
        //     $timeout(function () {
        //         $scope.lodingHide();
        //     }, 500);
        // });
       
        $scope.lodingShow();
        var userName = document.getElementById("userName").value;
        var passWord = document.getElementById("passWord").value;
        var url = myUrl + 'userServiceController.do?applogin&phoneId=1&userName=' + userName + '&passWord=' + passWord + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            // $scope.lodingHide();
            // console.log(result);
            if (result.msgCode == '0001'){
                localStorage.clear();
                localStorage.ydsw_userDetail = JSON.stringify(result);
                $scope.userDetail = JSON.parse(localStorage.ydsw_userDetail);
                //0-连锁 1-渠道 2-部门 3-销售代表 4-所属经销商 5-理货员 6-经销商业务员 7-省
                var menDianDetaillList = ['getChain','getChannel','getSaleDepartment','getSaleMan','getSelfJxs','getSaleMansOne','getSaleMansThree','getProvince'];
                for (var i = 0;i < menDianDetaillList.length;i++){
                    $scope.getMenDianOtherSummary(menDianDetaillList[i]);
                }
            }else {
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $scope.lodingHide();
                }, 1000);
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };
    
}]);