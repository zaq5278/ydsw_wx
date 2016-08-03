/**
 * Created by zaq on 16/7/5.
 */
angular.module('myApp.controllers').controller('customerManagerController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$ionicScrollDelegate) {
    $scope.closeModal = function() {
        $scope.modal.remove();
    };
    //返回顶部
    $scope.scrollTop = function() {
        $ionicScrollDelegate.$getByHandle('mainScroll').scrollTop();
    };
    $scope.isMenDianOrJxsGuanLi = 'menDian';
    $scope.customerTab = '2';//初始化请求状态是经销商还是门店
    $timeout(function () {
        $scope.getShopOrJxsList();
    }, 300);

    $scope.customer_search = '';
    //点击经销商管理按钮重新获取数据
    $scope.changeCustormerTabAndGetJxsList = function (tab) {
        if (tab == '1'){
            $scope.customerTab = tab;
            document.getElementById('menDianGuanLiBtn').style.backgroundColor = 'red';
            document.getElementById('menDianGuanLiBtn').style.color = 'white';
            document.getElementById('jxsGuanLiBtn').style.backgroundColor = 'white';
            document.getElementById('jxsGuanLiBtn').style.color = 'red';
            $scope.getShopOrJxsList();
        }else {
            $scope.customerTab = tab;
            document.getElementById('menDianGuanLiBtn').style.backgroundColor = 'white';
            document.getElementById('menDianGuanLiBtn').style.color = 'red';
            document.getElementById('jxsGuanLiBtn').style.backgroundColor = 'red';
            document.getElementById('jxsGuanLiBtn').style.color = 'white';
            $scope.getShopOrJxsList();
        }
        $scope.scrollTop();
        // console.log(document.getElementById('contentDiv'));
        // var contentDiv = document.getElementById("contentDiv");
        // var childs = contentDiv.childNodes;
        // for (var i = 0; i < childs.length; i++) {
        //     if (childs[i].className == 'scroll')
        //         childs = childs[i];
        // }
        // // console.log(childs);
        // childs.style.transform = 'translate3d(0,0,0) scale(1)';
    };
    //+ "&custname=新郑" 搜索时使用的
    $scope.isCustomerShowScroll = false;
    //获得门店或者经销商管理的数据
    $scope.getShopOrJxsList = function (str) {

        $scope.lodingShow("加载中...");
        $scope.isCustomerShowScroll = false;//初始化下拉刷新
        $scope.storeDetailList = [];//初始化接受客户管理的数据数组
        $scope.customerPage = 1;//初始化页数
        $scope.isCustomerRun = false;//用于锁定上拉加载的线程
        $scope.customer_MenDian = [];
        var url = '';
        if (str == "search"){
            //$scope.customer_search = true;
            url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&custname=" + document.getElementById("customer_search").value + "&page=1" +"&rows=10" + '&callback=JSON_CALLBACK';
            $scope.scrollTop();//返回顶部
        }else {
            url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&page=1" +"&rows=10" + '&callback=JSON_CALLBACK';
        }
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            // console.log(result);
            if (result.msgCode == '0001'){
                $scope.storeDetailList = result.rows;
                // console.log($scope.storeDetailList);
                $scope.isCustomerShowScroll = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }else {
                $scope.isCustomerShowScroll = false;
                //alert(result.msgDesc);
                $scope.promptShow('无更多数据!');
                $timeout(function () {
                    $scope.lodingHide();
                }, 500);
                if(result.msgCode == '0002'){
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
                var url = '';
                if (document.getElementById("customer_search").value){
                    url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&custname=" + document.getElementById("customer_search").value + "&page=" + $scope.customerPage +"&rows=10" + '&callback=JSON_CALLBACK';
                }else {
                    url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&page=" + $scope.customerPage +"&rows=10" + '&callback=JSON_CALLBACK';
                }
                // var url = myUrl + "app/getVistShopList.appjsonp?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&tab=" + $scope.customerTab + "&page=" + $scope.customerPage +"&rows=10" + '&callback=JSON_CALLBACK';
                $http.jsonp(url).success(function (result) {
                    if (result.msgCode == "0001") {
                        $scope.isCustomerRun = true;
                        if (result.rows.length != 0) {
                            if (result.rows.length < 10){
                                $scope.isCustomerShowScroll = false;
                                // $scope.$broadcast('scroll.infiniteScrollComplete');
                                // $scope.storeDetailList = $scope.storeDetailList.concat(result.rows);
                                $scope.promptShow("无更多数据！");
                                $timeout(function () {
                                    $scope.lodingHide();
                                }, 500);
                            }else {
                                $scope.storeDetailList = $scope.storeDetailList.concat(result.rows);
                                // console.log($scope.storeDetailList);
                                $scope.customerPage+=1;
                                $scope.$broadcast('scroll.infiniteScrollComplete');
                            }

                        } else {
                            $scope.isCustomerShowScroll = false;
                            $scope.promptShow("无更多数据！");
                            $timeout(function () {
                                $scope.lodingHide();
                            }, 500);
                        }
                    } else {
                        $scope.isCustomerShowScroll = false;
                        $scope.promptShow("无更多数据！");
                        $timeout(function () {
                            $scope.lodingHide();
                        }, 500);
                        if (result.msgCode == "0002") {
                            $scope.promptShow(result.msgDesc);
                            $timeout(function () {
                                $ionicLoading.hide();
                                $location.path('/login');
                            }, 800);
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
    //点击cell进行跳转
    $scope.goToCustomerDetaill_index = function (index) {
        if ($scope.customerTab == '2'){
            $location.path('/customer_MenDianDetail/'+ $scope.storeDetailList[index].CUSTOMERID + $scope.customerTab);
        }else {
            $location.path('/customer_JxsDetail/'+ $scope.storeDetailList[index].CUSTOMERID + $scope.customerTab);
        }

    };
    
    $scope.isAddNewMenDian = false;
    $scope.addNewMenDian = function () {
        $scope.customer_MenDian= [];
        $ionicModal.fromTemplateUrl('edit_menDianSummary.html', {
            scope: $scope,
            animation: 'slide-in-up'// <---- 改变这里，默认是'slide-in-up' 换成slide-in-left试试
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
        $scope.isAddNewMenDian = true;
    };
    
});