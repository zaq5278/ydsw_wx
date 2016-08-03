/**
 * Created by zaq on 16/7/18.
 */
angular.module('myApp.controllers').controller('storeProblemFeedbackController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$log) {
    $scope.feedbackContent = {
        value:''
    };
    $scope.goToNext = function () {
        if(!$scope.feedbackContent.value){
            $scope.showAlert("请输入反馈内容!");
        }
       $log.info($scope.feedbackContent.value);
    };

});