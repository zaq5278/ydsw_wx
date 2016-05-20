/**
 * Created by zaq on 16/5/5.
 */
/**
 * Created by Administrator on 2016-3-14.
 */
angular.module('myApp.mainController1',[])
    .config(function($stateProvider) {
        $stateProvider
            .state("test", {
                templateUrl: "test.html"
            })
    })
    .controller('mainController1',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory) {
        $scope.aa = function () {
            alert("aa");
        };

});
