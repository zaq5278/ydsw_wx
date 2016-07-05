/**
 * Created by zaq on 16/7/4.
 */
angular.module('myApp.services',[])

    .factory('SingleCase', function($http,$location,$ionicLoading,$timeout) {
        var promptShow = function (str) {
            $ionicLoading.show({
                template: str,
                noBackdrop: true
            });
        };
        return {
            getVisitTaskSummary: function(visitdate) {
                
            }
        };
    });
