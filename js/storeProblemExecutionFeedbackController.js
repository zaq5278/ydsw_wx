/**
 * Created by zaq on 16/7/18.
 */
angular.module('myApp.controllers').controller('storeProblemExecutionFeedbackController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    $scope.imglocalIdArray =[];
    $scope.divStyle = {
        "border-bottom":"double 1px #dddddd",
        "padding-bottom":"10px",
        "margin-top":'-20px'
    };
    $scope.allSummaryList = ['TP项-进场费用','TP项-新品陈列','TP项-DM','TP项-TG','TP项-排面陈列','TP项-通路促销','TP项-其他','CP项-业务宣传反馈','CP项-卖场特价','CP项-买赠反馈','CP项-其他','其他'];
    //调用微信拍照
    $scope.openCamera_DNWTFK = function (str) {
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds;// 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                var localId = localIds[localIds.length - 1];
                // $timeout(function () {
                //     // $scope.imglocalIdArray.push('imges/address.png');
                //     $scope.imglocalIdArray.push(localId);
                // },10);
                var myLabel = document.getElementById(str);
                var img = document.createElement("img");
                img.src = localId;
                img.style.width = '50px';
                img.style.height = '60px';
                img.style.marginLeft = "10px";
                myLabel.appendChild(img);
                localStorage.setItem($stateParams.customerid + 'DNWTFK','已完成');
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
    };

});