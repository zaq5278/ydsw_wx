/**
 * Created by zaq on 16/7/18.
 */
angular.module('myApp.controllers').controller('promotionManagementController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    //促销员信息
    $scope.salesPromotion = {
        cc_name:'',
        lc_name:'',
        cc_num:'',
        lc_num:'',
        remarks:''
    };
    //调用微信拍照
    $scope.openCamera_CXYGL = function (str) {
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
                localStorage.setItem($stateParams.customerid + 'CXYGL','已完成');
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
    $scope.saveAndNext = function () {
        if(!$scope.salesPromotion.cc_name){
            $scope.showAlert("请输入长促姓名!");
            return;
        }
        if(!$scope.salesPromotion.lc_name){
            $scope.showAlert("请输入临促姓名!");
            return;
        }
        if(!$scope.salesPromotion.cc_num){
            $scope.showAlert("请输入长促数量!");
            return;
        }
        if(!$scope.salesPromotion.lc_num){
            $scope.showAlert("请输入临促数量!");
            return;
        }
        if(localStorage.getItem($stateParams.customerid + 'CXYGL') != '已完成'){
            $scope.showAlert("请拍照!");
            return;
        }
        if(!$scope.salesPromotion.remarks){
            $scope.showAlert("请输入备注!");
            return;
        }
    }
});