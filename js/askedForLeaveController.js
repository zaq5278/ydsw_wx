/**
 * Created by zaq on 16/7/5.
 */
angular.module('myApp.controllers').controller('askedForLeaveController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {

    //提交请假信息
    $scope.askedForLeave = function () {
        if (document.getElementById('leaveSelect').value == "请选择类型"){
            $scope.showAlert("请选择一个请假类型!");
            return;
        }
        if (document.getElementById('dateTimeInput').value == ""){
            $scope.showAlert("请选择时间!");
            return;
        }
        if (document.getElementById('leaveTextarea').value == ""){
            $scope.showAlert("请填写请假内容!");
            return;
        }
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        if(m <= 9){
            m = '0'+m;
        }
        if(d <= 9){
            d = '0'+d;
        }
        var time = y+'-'+m+'-'+d;
        var url = myUrl + "app/addLeave.appjsone?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&leavetype=" + document.getElementById('leaveSelect').value + "&finishdate=" + document.getElementById('dateTimeInput').value + "&content=" + document.getElementById('leaveTextarea').value + "&cdate=" + time + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            if (result.msgCode == "0001"){
                // console.log(result);
                $scope.promptShow("您的请假信息提交成功！");
                $timeout(function () {
                    $scope.lodingHide();
                    $location.path("/homePage");
                }, 1200);
                // document.getElementById('leaveSelect').value = "请选择类型";
                // document.getElementById('dateTimeInput').value = "";
                // document.getElementById('leaveTextarea').value = "";
            }else {
                alert(result.msgDesc);
                if (result.msgCode == "0002"){
                    $location.path("/login");
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };
});