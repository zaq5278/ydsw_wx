/**
 * Created by zaq on 16/7/4.
 */
angular.module('myApp.controllers',[]).controller('mainController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location) {
    //返回首页
    $scope.goToMain = function () {
        window.location.href = "";
    };
    $scope.goBackView = function () {
        // window.history.go(-1);
        $ionicHistory.goBack();
    };
    $scope.goBackHtmlView = function () {
        window.history.go(-1);
    };
    $scope.lodingShow = function (str) {
        $ionicLoading.show({
            template: "<ion-spinner icon='android'></ion-spinner>",
            // + "<div>"+ str +"</div>",
            noBackdrop: true
        });
    };
    $scope.promptShow = function (str) {
        $ionicLoading.show({
            template: str,
            noBackdrop: true
        });
    };
    $scope.lodingHide = function () {
        $ionicLoading.hide();
    };
    $scope.showAlert = function (str) {
        var alertPopup = $ionicPopup.alert({
            title: "温馨提示！",
            template: str
        });
        alertPopup.then(function (res) {
            // console.log('点击了确定');
        });
    };
    var url = 'http://222.88.22.72:100/orderReceiptController.do?getWechatConfigureList'+ '&url=' + window.location.href.split("#")[0] + '&callback=JSON_CALLBACK';
    $http.jsonp(url).success(function (result) {
        console.log(result);
        if (result) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx79476edda797a503', // 必填，公众号的唯一标识
                timestamp: result.timestamp, // 必填，生成签名的时间戳
                nonceStr: result.noncestr, // 必填，生成签名的随机串
                signature: result.signature,// 必填，签名，见附录1
                jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.hideOptionMenu();
            // $location.path('login');
        }
    }).error(function (error) {
        $scope.promptShow("网络错误！");
        $timeout(function () {
            $scope.lodingHide();
        }, 500);
    });
    //没有时间的日期选择框架
    $scope.timeTouch = function (timeId, preset) {
        var currYear = (new Date()).getFullYear();
        $(timeId).mobiscroll().date();
        //初始化日期控件
        var opt = {
            preset: preset, //日期，可选：date\datetime\time\tree_list\image_text\select
            theme: 'android-ics light', //皮肤样式，可选：default\android\android-ics light\android-ics\ios\jqm\sense-ui\wp light\wp
            display: 'modal', //显示方式 ，可选：modal\inline\bubble\top\bottom
            mode: 'scroller', //日期选择模式，可选：scroller\clickpick\mixed
            lang: 'zh',
            dateFormat: 'yy-mm-dd', // 日期格式
            setText: '确定', //确认按钮名称
            cancelText: '取消',//取消按钮名籍我
            dateOrder: 'yymmdd', //面板中日期排列格式
            dayText: '日', monthText: '月', yearText: '年', //面板中年月日文字
            showNow: true,
            timeFormat: "HH:ii:ss",
            timeWheels: "HHiiss",
            nowText: "现在",
            startYear: currYear - 10, //开始年份
            endYear: currYear + 10 //结束年份
        };
        $(timeId).mobiscroll(opt);
    };
    
    if(localStorage.ydsw_userDetail){
        $scope.userDetail = JSON.parse(localStorage.ydsw_userDetail);
    }
    $scope.storeDetailList = [];
    $scope.userName = 'zf04';
    $scope.passWord = '778899';
    //获取位置信息
    $scope.getLocation_by_wx = function (str) {
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
                $scope.clickLongitude = longitude - 0.008774687519;//存放提交的时候的经度
                $scope.clickLatitude = latitude + 0.00374531687912;//存放提交的时候的纬度
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

    
    //获取渠道连锁经销商等等固定的缓存数据
    $scope.getMenDianOtherSummary = function (url) {
        var URL = myUrl + "app/" + url +".appjsonp?sessionid="+ JSON.parse(localStorage.ydsw_userDetail).sessionid + "&page=1&rows=200" + '&callback=JSON_CALLBACK';
        $http.jsonp(URL).success(function (result) {
            if (result){
                switch (url){
                    case 'getChain':
                        $scope.lianSuoList = result;
                        break;
                    case 'getChannel':
                        $scope.quDaoList = result;
                        break;
                    case 'getSaleDepartment':
                        $scope.buMenList = result;
                        break;
                    case 'getSaleMan':
                        $scope.xiaoShouDaiBiaoList = result;
                        // console.log($scope.xiaoShouDaiBiaoList);
                        break;
                    case 'getSelfJxs':
                        $scope.suoShuJxsList = result;
                        // console.log($scope.suoShuJxsList);
                        break;
                    case 'getSaleMansOne':
                        if (JSON.parse(result.rows).length > 0){
                            $scope.liHuoYuanList = result;
                        }else {
                            $scope.liHuoYuanList = {rows:[{USERNAME:'无数据'}]};
                        }
                        // console.log($scope.liHuoYuanList);
                        break;
                    case 'getSaleMansThree':
                        if (JSON.parse(result.rows).length > 0){
                            $scope.jxsYeWuYuanList = result;
                        }else {
                            $scope.jxsYeWuYuanList = {rows:[{USERNAME:'无数据'}]};
                        }
                        // console.log($scope.jxsYeWuYuanList);
                        break;
                    case 'getProvince':
                        $scope.shengFenList = result;
                        // console.log($scope.shengFenList);
                        break;
                }
            }
            if ($scope.lianSuoList && $scope.quDaoList && $scope.buMenList && $scope.xiaoShouDaiBiaoList && $scope.suoShuJxsList && $scope.liHuoYuanList && $scope.jxsYeWuYuanList && $scope.shengFenList){
                $scope.lodingHide();
                $location.path('/homePage');
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
    //根据省份动态获取市区信息
    $scope.getShiQuDetail = function (type,shengFen,shiQu) {
        var url = '';
        if (type == 'getCity'){
            url = myUrl + "app/" + type + ".appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&province=" + shengFen + '&callback=JSON_CALLBACK';
        }
        if (type == 'getCounty'){
            url = myUrl + "app/" + type + ".appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&province=" + shengFen + "&city=" + shiQu + '&callback=JSON_CALLBACK';
        }

        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            // console.log(result);
            // console.log(shengFen);
            // console.log(type);
            if (result.msgCode == '0001'){
                if (type == 'getCity'){
                    $scope.shiQuList = result;
                }
                if (type == 'getCounty'){
                    $scope.xianQuList = result;
                }

            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
});