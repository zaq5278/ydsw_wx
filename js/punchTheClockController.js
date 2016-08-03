/**
 * Created by zaq on 16/7/5.
 */
angular.module('myApp.controllers').controller('punchTheClockController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {


    $scope.punchTheclockDetail = [];
    //获取位置信息
    $scope.getLocation_by_wx_self = function (str) {
        $scope.lodingShow("加载中...");
        // var baidu_url = "http://api.map.baidu.com/geoconv/v1/?coords=" + '113.6542,34.86024' + "&ak=uCgec5YyeCeFkPLILZLS2guLOraELess&output=json" + '&callback=JSON_CALLBACK';
        // $http.jsonp(baidu_url).success(function (data) {
        //     console.log(data);
        //     longitude = data.result[0].x;
        //     latitude = data.result[0].y;
        // }).error(function () {
        //     $scope.promptShow("网络错误！");
        //     $timeout(function () {
        //         $scope.lodingHide();
        //     }, 500);
        // });
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                // var speed = res.speed; // 速度，以米/每秒计
                // var accuracy = res.accuracy; // 位置精度
                // var point = new BMap.Point(parseFloat(longitude), parseFloat(latitude));
                // var point = new BMap.Point(113.654144,34.860686);
                $scope.clickLongitude = parseFloat(longitude) - 0.008774687519;//存放提交的时候的经度
                $scope.clickLatitude = parseFloat(latitude) + 0.00374531687912;//存放提交的时候的纬度
                var point = new BMap.Point(parseFloat($scope.clickLongitude), parseFloat($scope.clickLatitude));
                var gc = new BMap.Geocoder();
                gc.getLocation(point, function (rs) {
                    var addComp = rs.addressComponents;
                    $timeout(function () {
                        $scope.userLocation = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取到的位置信息
                        if(str == 'daka'){
                            $scope.pressAndClock($scope.clickLongitude,$scope.clickLatitude,$scope.userLocation);
                        }
                    });

                });
            },
            cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
            }
        });
    };

    //跳转到打卡页面并获取打卡所有详细信息
    $scope.goToThePunchTheClockView = function () {
        $scope.lodingShow("加载中...");
        // http://222.88.22.71:8089/sinian/bodyGet?lenget=getInOut.appjson&bodyget=%7B%22sessionid%22%3Anull%2C%22wdate%22%3A%222016-05-09%22%7D
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        if(m <= 9){
            m = '0'+m;
        }
        $scope.dateArray = [];//用于存放到目前为止的日期的数组
        for (var i = d;i >= 1;i--){
            if (i<=9){
                i = '0' + i;
            }
            $scope.dateArray = $scope.dateArray.concat(m + "-" + i);
        }
        // console.log($scope.dateArray);
        if(d <= 9){
            d = '0'+d;
        }
        var time = y+'-'+m+'-'+d;
        // var url = myUrl + "app/addWork.appjsonc?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&dime=2016-05-09" + "&longitude=&latitude=&address=" + '&callback=JSON_CALLBACK';
        var url = myUrl + "app/getInOut.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&wdate=" + time + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            if (result.msgCode == "0001"){
                $scope.punchTheclockDetail = result.rows;
                // console.log(result);

                $location.path('/punchTheClock');
            }else {
                if (result.msgCode == "0002"){
                    $scope.promptShow(result.msgDesc);
                    $timeout(function () {
                        $ionicLoading.hide();
                        $location.path('/login');
                    }, 800);
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
    $timeout(function () {
        $scope.goToThePunchTheClockView();
    }, 500);

    //加载打卡详细信息动态获取需要的数据
    $scope.getTheClockSummary = function (clockDate,type,index) {
        for (var i = 0;i < $scope.punchTheclockDetail.length;i++){
            if (clockDate == $scope.punchTheclockDetail[i].FDATE && type == $scope.punchTheclockDetail[i].DWORK){
                if (type == '下班' && $scope.punchTheclockDetail[i].OUTSHORTADDR){
                    document.getElementById('shangbanImg'+index).style.backgroundColor = '#11c1f3';
                }
                if (type == '上班' && $scope.punchTheclockDetail[i].SHORTADDR){
                    if (document.getElementById('xiabanImg'+index)){
                        document.getElementById('xiabanImg'+index).style.backgroundColor = '#11c1f3';
                    }
                }
                return $scope.punchTheclockDetail[i];
            }
        }
    };
    //点击打卡按钮进行打卡
    $scope.pressAndClock = function (longitude,latitude,address) {
        // longitude =113.65;
        // //纬度
        // // $scope.baiduLatitude = position.coords.latitude;
        // latitude = 34.86;
        // address = '河南省惠济区英才街';
        // alert(longitude);
        // alert(latitude);
        // alert(address);
        var date = new Date();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if (h <= 9){
            h = '0' + h;
        }
        if (m <= 9){
            m = '0' + m;
        }
        if (s <= 9){
            s = '0' + s;
        }
        var dTime = h + ":" + m + ":" + s;
        var url = myUrl + "app/addWork.appjsonc?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&dtime=" + dTime + "&longitude=" + longitude + "&latitude=" + latitude + "&address=" + address + "&shortaddr=" + address + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            if (result.msgCode == "0001"){
                // console.log(result);
                $scope.goToThePunchTheClockView();

            }else {
                if (result.msgCode == "0002"){
                    alert(result.msgDesc);
                    $location.path("/login");
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };



});