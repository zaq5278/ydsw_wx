/**
 * Created by zaq on 16/8/2.
 */
angular.module('myApp.controllers').controller('systemSettingsController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {
    $scope.sysSet = {
        getNetworkType:function () {
            getNetworkType();
        },
        modifyPassWord:function () {
            modifyPassWord();
        },
        oldPassWord:'',
        newPassWord1:'',
        newPassWord2:''
    };
    function getNetworkType() {
        wx.getNetworkType({
            success: function (res) {
                var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                $scope.showAlert("您的网络为" + networkType);
            }
        });
    }
    function modifyPassWord() {
        $scope.sysSet.oldPassWord = '';
        $scope.sysSet.newPassWord1 = '';
        $scope.sysSet.newPassWord2 = '';
        var myPopup = $ionicPopup.show({
            template: "<ion-item class='item-input'><span style='width: 70px;font-size: small'>原密码:</span><input placeholder='请输入原密码!' type='password' ng-model='sysSet.oldPassWord'></ion-item>" +
            "<ion-item class='item-input'><span style='width: 70px;font-size: small'>新密码:</span><input placeholder='请输入新密码!' type='password' ng-model='sysSet.newPassWord1'></ion-item>" +
            "<ion-item class='item-input'><span style='width: 70px;font-size: small'>新密码:</span><input placeholder='请输入新密码!' type='password' ng-model='sysSet.newPassWord2'></ion-item>",
            title: '修改密码',
            subTitle: '请输入以下选择进行密码修改!',
            scope: $scope,
            buttons: [
                { text: '取消' },
                {
                    text: '<b>确定</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if(!$scope.sysSet.oldPassWord && $scope.sysSet.oldPassWord != localStorage.passWord_ydsw_wx){
                            $scope.promptShow("您输入的原密码不正确!");
                            $timeout(function () {
                                $scope.lodingHide();
                            }, 1000);
                            e.preventDefault();
                            return;
                        }
                        if(!$scope.sysSet.newPassWord1 && !$scope.sysSet.newPassWord2){
                            $scope.promptShow("新密码不能为空!");
                            $timeout(function () {
                                $scope.lodingHide();
                            }, 1000);
                            e.preventDefault();
                            return;
                        }
                        if ($scope.sysSet.newPassWord1 != $scope.sysSet.newPassWord2){
                            $scope.promptShow("您输入的新密码不一致!");
                            $timeout(function () {
                                $scope.lodingHide();
                            }, 1000);
                            e.preventDefault();
                            return;
                        }else {
                            if($scope.sysSet.newPassWord1 == $scope.sysSet.oldPassWord){
                                $scope.promptShow("新旧密码不能一致!");
                                $timeout(function () {
                                    $scope.lodingHide();
                                }, 1000);
                                e.preventDefault();
                                return;
                            }
                        }
                        var url = myUrl + "updatePassword.appjsons?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&newpassword=" + $scope.sysSet.newPassWord1 + "&password=" + localStorage.passWord_ydsw_wx + '&callback=JSON_CALLBACK';
                        $http({
                            method:'jsonp',
                            url:url,
                            timeout:60000
                        }).success(function (result) {
                            console.log(result);
                            if(result.msgCode == "0001"){

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
                            }, 800);
                        });
                    }
                }
            ]
        });
    }
});