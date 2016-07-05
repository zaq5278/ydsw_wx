/**
 * Created by zaq on 16/7/4.
 */
angular.module('myApp.services',[])
    
    .factory('Login',function () {
        return {
            login: function() {
                return "11s";
            }
        };
    })
    .factory('VisitTask', function() {
        return {
            get: function() {
                return "sss";
            }
        };
    })
    .factory('StoreDetailList', function($http,$ionicLoading) {
        
        var aa = '';
    return {
        get: function() {
            $ionicLoading.show();
            return aa;
        }
    };
});