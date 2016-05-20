/**
 * Created by Administrator on 2016-3-14.
 */
angular.module('myApp.mainController',[])
    .config(function($stateProvider,$ionicConfigProvider) {
        // $ionicConfigProvider.scrolling.jsScrolling(true);
        $stateProvider
            .state("login", {
                templateUrl: "login.html"
            })
            .state('homePage',{
                templateUrl: "homePage.html"
            })
            .state('punchTheClock',{
                templateUrl: "punchTheClock.html"
            })
            .state('travelOnBusiness',{
                templateUrl: "travelOnBusiness.html"
            })
            .state('askedForLeave',{
                templateUrl: "askedForLeave.html"
            })
            .state('customerManagement',{
                templateUrl:'customerManagement.html'
            })
            .state('customer_MenDianDetail',{
                templateUrl:'customer_MenDianDetail.html'
            })
            .state('edit_menDianSummary',{
                templateUrl:'edit_menDianSummary.html'
            })
    }).controller('mainController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal) {
    //判断访问浏览器的是安卓还是iOS
    // var ua = navigator.userAgent.toLowerCase();
    // if (/iphone|ipad|ipod/.test(ua)) {
    //     alert("iphone");
    // } else if (/android/.test(ua)) {
    //     alert("android");
    // }
    // $ionicModal.fromTemplateUrl('edit_menDianSummary.html', {
    //     scope: $scope,
    //     animation: 'slide-in-up'// <---- 改变这里，默认是'slide-in-up' 换成slide-in-left试试
    // }).then(function(modal) {
    //     $scope.modal = modal;
    // });
    // $scope.openModal = function() {
    //     $scope.modal.show();
    // };
    // $ionicModal.fromTemplateUrl('edit_menDianSummary.html', {
    //     scope: $scope,
    //     animation: 'slide-in-up'// <---- 改变这里，默认是'slide-in-up' 换成slide-in-left试试
    // }).then(function(modal) {
    //     $scope.modal = modal;
    //     $scope.modal.show();
    // });
    $scope.closeModal = function() {
        $scope.modal.remove();
    };
    // //Cleanup the modal when we're done with it!
    // $scope.$on('$destroy', function() {
    //     $scope.modal.remove();
    // });
    // // Execute action on hide modal
    // $scope.$on('modal.hidden', function() {
    //     // Execute action
    // });
    // // Execute action on remove modal
    // $scope.$on('modal.removed', function() {
    //     // Execute action
    // });

    //设置首页
    $state.go('login');

    $scope.isMenDianOrJxsGuanLi = 'menDian';
    $scope.userName = 'zf04';
    $scope.passWord = '000000';
    $scope.dayNames = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"][new Date().getDay()];
    $scope.todayDate = new Date();
    if(localStorage.ydsw_userDetail){
        $scope.userDetail = JSON.parse(localStorage.ydsw_userDetail);
    }
    $scope.punchTheclockDetail = [];
    // window.onload = function () {
    //     var url = 'http://192.168.16.225:9999/synear/orderReceiptController.do?getWechatConfigureList'+ '&url=' + window.location.href + '&callback=JSON_CALLBACK';
    //     $http.jsonp(url).success(function (result) {
    //         if (result.msgCode == "0002") {
    //             alert(result.msgDesc);
    //             $state.go("login");
    //         } else {
    //             wx.config({
    //                 debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //                 appId: 'wx79476edda797a503', // 必填，公众号的唯一标识
    //                 timestamp: result.timestamp, // 必填，生成签名的时间戳
    //                 nonceStr: result.noncestr, // 必填，生成签名的随机串
    //                 signature: result.signature,// 必填，签名，见附录1
    //                 jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'openLocation', 'getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //             });
    //             wx.hideOptionMenu();
    //         }
    //     }).error(function () {
    //         $scope.promptShow("网络错误！");
    //         $timeout(function () {
    //             $scope.lodingHide();
    //         }, 500);
    //     });
    // };


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
            console.log('点击了确定');
        });
    };
    //跳转到新的界面
    $scope.goToNewView = function (str) {
        $state.go(str);
    };
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

    //登录
    $scope.login = function (value) {
        $scope.lodingShow();
        var userName = document.getElementById("userName").value;
        var passWord = document.getElementById("passWord").value;
        var url = myUrl + 'userServiceController.do?applogin&phoneId=1&userName='+userName+'&passWord='+passWord + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            // $scope.lodingHide();
            // console.log(result);
            if (result.msgCode == '0001'){
                // localStorage.clear();
                localStorage.ydsw_userDetail = JSON.stringify(result);
                $scope.userDetail = JSON.parse(localStorage.ydsw_userDetail);
                //0-连锁 1-渠道 2-部门 3-销售代表 4-所属经销商 5-理货员 6-经销商业务员 7-省
                var menDianDetaillList = ['getChain','getChannel','getSaleDepartment','getSaleMan','getSelfJxs','getSaleMansOne','getSaleMansThree','getProvince'];
                for (var i = 0;i < menDianDetaillList.length;i++){
                    $scope.getMenDianOtherSummary(menDianDetaillList[i]);
                }
                // $state.go("homePage");
            }else {
                $scope.promptShow(result.msgDesc);
                $timeout(function () {
                    $scope.lodingHide();
                }, 1000);
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
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
                // $state.go('edit_menDianSummary');
                $state.go("homePage");
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })

    };
    //加载DOM的同时判断是否显示按钮
    $scope.isShowTheButton = function (str) {
        for (var i = 0;i< $scope.userDetail.function.length;i++){
            if (str == $scope.userDetail.function[i].name){
                return true;
            }
        }
    };
    //跳转到打卡页面并获取打卡所有详细信息
    $scope.goToThePunchTheClockView = function () {
        $scope.lodingShow();
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
        console.log($scope.dateArray);
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
                $state.go('punchTheClock');
            }else {
                alert(result.msgDesc);
                if (result.msgCode == "0002"){
                    $state.go("login");
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
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
        longitude =113.65;
        //纬度
        // $scope.baiduLatitude = position.coords.latitude;
        latitude = 34.86;
        address = '河南省惠济区英才街';
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
            $scope.lodingHide();
            if (result.msgCode == "0001"){
                // console.log(result);
                $scope.goToThePunchTheClockView();
            }else {
                alert(result.msgDesc);
                if (result.msgCode == "0002"){
                    $state.go("login");
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };
    //百度定位
    $scope.getLocationByBaiDu = function () {
        $scope.lodingShow();
        function getLocation(){
            var options={
                enableHighAccuracy:true,
                maximumAge:1000
            };
            if(navigator.geolocation){
                //浏览器支持geolocation
                navigator.geolocation.getCurrentPosition(onSuccess,onError,options);

            }else{
                //浏览器不支持geolocation
                alert("您的浏览器不支持定位！");
            }
        }

        //成功时
        function onSuccess(position){
            //返回用户位置
            //经度
            // $scope.baiduLongitude =position.coords.longitude;
            $scope.baiduLongitude =113.65418888040259;
            //纬度
            // $scope.baiduLatitude = position.coords.latitude;
            $scope.baiduLatitude = 34.86031504883444;
            //var map = new BMap.Map("allmap");
            var point = new BMap.Point($scope.baiduLongitude-0.008774687519,$scope.baiduLatitude+0.00374531687912);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function(rs){
                var addComp = rs.addressComponents;
                $scope.address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
                if (addComp){
                    $scope.pressAndClock($scope.baiduLongitude,$scope.baiduLatitude,$scope.address);
                }
                // alert($scope.baiduLongitude);
                // alert($scope.baiduLatitude);
                // alert($scope.address);
            });
        }
        //失败时
        function onError(error){
            $scope.lodingHide();
            switch(error.code){
                case 1:
                    alert("位置服务被拒绝");
                    break;

                case 2:
                    alert("暂时获取不到位置信息");
                    break;

                case 3:
                    alert("获取信息超时");
                    break;

                case 4:
                    alert("未知错误");
                    break;
            }

        }
        getLocation();

    };

    //提交差旅出差信息

    //提交请假信息
    $scope.askedForLeave = function () {
        if (document.getElementById('leaveSelect').value == "请选择类型"){
            $scope.showAlert("请选择一个请假类型!");
            return;
        }
        if (document.getElementById('dateTimeInput').value == ""){
            $scope.showAlert("请选择时间!");
            return;
        }
        if (document.getElementById('leaveTextarea').value == ""){
            $scope.showAlert("请填写请假内容!");
            return;
        }
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();
        if(m <= 9){
            m = '0'+m;
        }
        if(d <= 9){
            d = '0'+d;
        }
        var time = y+'-'+m+'-'+d;
        var url = myUrl + "app/addLeave.appjsone?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&leavetype=" + document.getElementById('leaveSelect').value + "&finishdate=" + document.getElementById('dateTimeInput').value + "&content=" + document.getElementById('leaveTextarea').value + "&cdate=" + time + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            if (result.msgCode == "0001"){
                // console.log(result);
                $scope.promptShow("您的请假信息提交成功！");
                $timeout(function () {
                    $scope.lodingHide();
                    $state.go('homePage');
                }, 1200);
                // document.getElementById('leaveSelect').value = "请选择类型";
                // document.getElementById('dateTimeInput').value = "";
                // document.getElementById('leaveTextarea').value = "";
            }else {
                alert(result.msgDesc);
                if (result.msgCode == "0002"){
                    $state.go("login");
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };
    //跳转到客户管理界面
    $scope.goToTheCustomerManagement = function () {
        //tab = 2;//2代表默认的是门店 1代表的是经销商
        $scope.customerTab = '2';//初始化请求状态是经销商还是门店
        $state.go('customerManagement');
        $scope.getShopOrJxsList();
    };
    //+ "&custname=新郑" 搜索时使用的
    $scope.isCustomerShowScroll = false;
    //获得门店或者经销商管理的数据
    $scope.getShopOrJxsList = function () {
        $scope.lodingShow();
        $scope.isCustomerShowScroll = false;//初始化下拉刷新
        $scope.storeDetailList = [];//初始化接受客户管理的数据数组
        $scope.customerPage = 1;//初始化页数
        $scope.isCustomerRun = false;//用于锁定上拉加载的线程
        var url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&page=1" +"&rows=10" + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            if (result.msgCode == '0001'){
                $scope.lodingHide();
                $scope.storeDetailList = result.rows;
                // console.log($scope.storeDetailList);
                $scope.isCustomerShowScroll = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else {
                $scope.isCustomerShowScroll = false;
                alert(result.msgDesc);
                if(result.msgCode == '0002'){
                    $state.go('login');
                }
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        });
    };

    //上拉加载更多客户管理
    $scope.loadMoreCustomer = function () {
        if ($scope.isCustomerRun){
            $scope.isCustomerRun = false;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }else {
            if ($scope.customerPage == 1) {
                $scope.customerPage+=1;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            } else {
                var url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&page=" + $scope.customerPage +"&rows=10" + '&callback=JSON_CALLBACK';
                $http.jsonp(url).success(function (result) {
                    if (result.msgCode == "0001") {
                        $scope.isCustomerRun = true;
                        if (result.rows.length != 0) {
                            $scope.storeDetailList = $scope.storeDetailList.concat(result.rows);
                            // console.log($scope.storeDetailList);
                            $scope.customerPage+=1;
                            $scope.$broadcast('scroll.infiniteScrollComplete');
                        } else {
                            $scope.isCustomerShowScroll = false;
                            $scope.promptShow("无更多数据！");
                            $timeout(function () {
                                $scope.lodingHide();
                            }, 500);
                        }
                    } else {
                        $scope.isCustomerShowScroll = false;
                        alert(result.msgDesc);
                        if (result.msgCode == "0002") {
                            $state.go('login');
                        }
                    }
                }).error(function () {
                    $scope.isCustomerShowScroll = false;
                    $scope.promptShow("网络错误！");
                    $timeout(function () {
                        $scope.lodingHide();
                    }, 500);
                });
            }
        }

    };
    //点击客户管理内门店或者经销商列表跳转
    $scope.goToTheCustomerDetaill = function (index) {
        $scope.lodingShow();
        var url = myUrl + "app/getVistShopInfo.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&customerid=" + $scope.storeDetailList[index].CUSTOMERID + '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            console.log(result);
            if (result.msgCode == '0001'){
                $scope.customer_MenDian = result.rows[0];
                console.log($scope.customer_MenDian);
                if ($scope.customer_MenDian.PROVINCE){
                    $scope.getShiQuDetail('getCity',$scope.customer_MenDian.PROVINCE);
                }
                if ($scope.customer_MenDian.CITY){
                    $scope.getShiQuDetail('getCounty',$scope.customer_MenDian.PROVINCE,$scope.customer_MenDian.CITY);
                }
            }
            if ($scope.customerTab == '2'){
                $state.go('customer_MenDianDetail');
            }
            if (result.msgCode == '0002'){
                alert(result.msgDesc);
                $state.go('login');
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };

    //编辑门店信息
    $scope.edit_MenDian = function () {
        $ionicModal.fromTemplateUrl('edit_menDianSummary.html', {
            scope: $scope,
            animation: 'slide-in-up'// <---- 改变这里，默认是'slide-in-up' 换成slide-in-left试试
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    //提交门店修改信息
    $scope.sumbitCustomer_menDian = function () {
        $scope.closeModal();
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
    $scope.sumbitTheEdited_MenDian = function () {
        $scope.lodingShow();
        if ($scope.customer_MenDian.CHAIN == undefined){
            $scope.customer_MenDian.CHAIN = '';
        }
        if ($scope.customer_MenDian.CHANNELS == undefined){
            $scope.customer_MenDian.CHANNELS = '';
        }
        var countyId = '';//县区id
        var salesmanid = '';//销售代表id
        var dealerid = '';//所属经销商id
        if ($scope.xianQuList.rows.length > 0){
            for (var i = 0;i < $scope.xianQuList.rows.length;i++){
                if ($scope.customer_MenDian.COUNTY == $scope.xianQuList.rows[i].COUNTY){
                    countyId = $scope.xianQuList.rows[i].COUNTYID;
                    break;
                }
            }
        }else {
            countyId = '';
        }
        if ($scope.xiaoShouDaiBiaoList.rows.length > 0){
            for (var j = 0;j < $scope.xiaoShouDaiBiaoList.rows.length;j++){
                if ($scope.customer_MenDian.SALESMAN == $scope.xiaoShouDaiBiaoList.rows[j].STAFF_NAME){
                    salesmanid = $scope.xiaoShouDaiBiaoList.rows[j].ID;
                    break;
                }
            }
        }else {
            salesmanid = '';
        }
        if ($scope.suoShuJxsList.rows.length > 0){
            for (var k = 0;k < $scope.suoShuJxsList.rows.length;k++){
                if ($scope.customer_MenDian.DEALER == $scope.suoShuJxsList.rows[k].CUSTNAME){
                    dealerid = $scope.suoShuJxsList.rows[k].CUSTOMERID;
                    break;
                }
            }
        }else {
            dealerid = '';
        }
        var url = myUrl + "app/updateShopInfo.appjsone?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&custno=" + $scope.customer_MenDian.CUSTNO + "&custname=" + $scope.customer_MenDian.CUSTNAME + "&longitude=" + '' + "&latitude=" + '' + "&chain=" + $scope.customer_MenDian.CHAIN + "&channels=" + $scope.customer_MenDian.CHANNELS + "&departcode=" + $scope.customer_MenDian.DEPARTCODE + "&departname=" + $scope.customer_MenDian.DEPARTNAME + "&salesman=" + $scope.customer_MenDian.SALESMAN + "&dealer=" + $scope.customer_MenDian.DEALER + "&address=" + $scope.customer_MenDian.ADDRESS + "&linkman=" + $scope.customer_MenDian.LINKMAN + "&phone=" + $scope.customer_MenDian.PHONE + "&county=" + $scope.customer_MenDian.COUNTY + "&city=" + $scope.customer_MenDian.CITY + "&province=" + $scope.customer_MenDian.PROVINCE + "&salesman1=" + $scope.customer_MenDian.SALES_MAN1 + "&salesman3=" + $scope.customer_MenDian.SALES_MAN3 + "&sales_man_tel=" + $scope.customer_MenDian.SALES_MAN_TEL + "&customerid=" + $scope.customer_MenDian.CUSTOMERID + "&countyid=" + countyId + "&salesmanid=" + salesmanid + "&dealerid=" + dealerid + "&salesmanid1=" + "&salesmanid3=" +  '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            if (result.msgCode == '0001'){
                $scope.showAlert('更新成功!');
                $scope.closeModal();
            }
            if (result.msgCode == '0006'){
                $scope.showAlert('更新失败!');
                $scope.closeModal();
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    }
});