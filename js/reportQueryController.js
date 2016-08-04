/**
 * Created by zaq on 16/7/29.
 */
angular.module('myApp.controllers').controller('reportQueryController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {
    // $timeout(function () {
    //     $scope.labels = ["对对对", "In-Store Sales", "Mail-Order Sales",''];
    //     $scope.override =  2;
    //     $scope.data = [200, 400,300,0];
    // },500);
    $scope.report = {
        getReportQuery:function () {
            getReportQuery();
        },
        labels:[],
        pieData:[],
        barData:[],
        series:['计划拜访', '已完成'],
        options:{legend:{display:true}},
        lineStyle:"width: 50%;border: double 1px;color: #ef473a",
        changeType:function (str) {
            changeType(str);
        },
        isShowTuXing:true,
        reportDetailArray:[]

    };
    function getReportQuery() {
        var ALLNUMArray = [];
        var FINISHArray = [];
        var url = myUrl + "visitReport.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&page=" + 1 + "&rows=3" + '&callback=JSON_CALLBACK';
        $http({
            method:'jsonp',
            url:url,
            timeout:60000
        }).success(function (result) {
            $scope.lodingHide();
            //console.log(result);
            if (result) {
                if(result.msgCode == "0001"){
                    for (var i = 0;i < result.rows.length;i++){
                        $scope.report.labels.push(result.rows[i].VISITDATE);
                        ALLNUMArray.push(result.rows[i].ALLNUM);
                        FINISHArray.push(result.rows[i].HAVENUM);
                    }
                    $scope.report.pieData = ALLNUMArray;
                    $scope.report.barData.push(ALLNUMArray);
                    $scope.report.barData.push(FINISHArray);
                    $scope.report.reportDetailArray = result.rows;
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

            }
        }).error(function (error) {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    }
    $timeout(function () {
        getReportQuery();
    },500);
    function changeType(str) {
        switch (str){
            case "图形":
                $scope.report.isShowTuXing = true;
                $scope.report.lineStyle = "width: 50%;border: double 1px;color: #ef473a";
                break;
            case "数据":
                $scope.report.isShowTuXing = false;
                $scope.report.lineStyle = "width: 50%;border: double 1px;color: #ef473a;margin-left: 50%";
                break;
        }
    }
});