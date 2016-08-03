/**
 * Created by zaq on 16/7/11.
 */

angular.module('myApp.controllers').controller('jobTask_MainController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    if($stateParams.visitTab == 2){
        $scope.isMDOrJxs =  true;
    }else {
        $scope.isMDOrJxs =  false;
    }
    if(localStorage.getItem($stateParams.customerid + 'MTPZ') == '已完成'){
        $scope.isFinishPaiZhao = true;
    }
    //调用微信拍照
    $scope.openCamera_jobTask = function (str) {
        if($scope.isFinishPaiZhao){
            $scope.showAlert("您已经拍过照了!");
            return;
        }
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var localId = localIds[localIds.length - 1];
                $scope.isFinishPaiZhao = true;
                localStorage.setItem($stateParams.customerid + 'MTPZ','已完成');
                // $timeout(function () {
                //     wx.uploadImage({
                //         localId: localIds[localIds.length - 1], // 需要上传的图片的本地ID，由chooseImage接口获得
                //         isShowProgressTips: 1, // 默认为1，显示进度提示
                //         success: function (res) {
                //             var serverId = res.serverId; // 返回图片的服务器端ID
                //         }
                //     });
                // }, 100);

            }
        });
        if($scope.isFinishPaiZhao){
            return true;
        }
    };
    $scope.goToNewView = function (str) {
        if(str == "/checkFreezer/"){
            $location.path(str + $stateParams.customerid + "/" + $stateParams.VISITINGTASKDATAID);
        }else {
            $location.path(str + $stateParams.customerid);
        }
    };

    /*
    $scope.upFileToServer = function (localId) {
        //$scope.lodingShow("上传中...");
        // $http({
        //     url: upFileUrl,
        //     method: "POST",
        //     dataType:'json',
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //     },
        //     data: "&sessionid="+ JSON.parse(localStorage.ydsw_userDetail).sessionid + "&file=" + localId + "&waterMarkContent=222&waterMarkContent2=222222"
        //
        // }).success(function (result) {
        //    alert(result);
        // }).error(function () {
        //     $scope.promptShow("网络错误！");
        //     $timeout(function () {
        //         $scope.lodingHide();
        //     }, 800);
        // });
        var url = upFileUrl + "&sessionid="+ JSON.parse(localStorage.ydsw_userDetail).sessionid + "&file=" + 'imges/address.png' + "&waterMarkContent=222&waterMarkContent2=222222";
        $http.jsonp().success(function (result) {
            console.log(result);
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 800);
        });
    }
    */
});