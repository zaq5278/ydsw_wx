/**
 * Created by zaq on 16/7/5.
 */
angular.module('myApp.controllers').controller('travelController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {
    //提交差旅请求

    //调用微信拍照
    $scope.openCamera = function () {
        if($scope.travelCameraImg){
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
                $scope.travelCameraImg = true;
                document.getElementById("travelCameraImg").src = localId;
                $timeout(function () {
                    wx.uploadImage({
                        localId: localIds[localIds.length - 1], // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回图片的服务器端ID
                        }
                    });
                }, 100);
                return localId;
            }
        })
    };
});