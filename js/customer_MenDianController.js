/**
 * Created by zaq on 16/7/5.
 */
angular.module('myApp.controllers').controller('customer_MenDianController',function($scope,$state,$http,$ionicLoading,$ionicPopup,$timeout,$ionicHistory,$ionicModal,$location,$stateParams) {
    $scope.closeModal = function() {
        $scope.modal.remove();
    };
    
    //点击客户管理内门店或者经销商列表跳转
    $scope.goToTheCustomerDetaill = function () {
        $scope.lodingShow();
        var url = '';
        if ($stateParams.customer_ManagerDetail_CUSTOMERID[$stateParams.customer_ManagerDetail_CUSTOMERID.length - 1] == '2'){
            url = myUrl + "app/getVistShopInfo.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&customerid=" + $stateParams.customer_ManagerDetail_CUSTOMERID.substring(0,$stateParams.customer_ManagerDetail_CUSTOMERID.length - 1) + '&callback=JSON_CALLBACK';
        }else {
            url = myUrl + "app/getJxsInfo.appjson?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&customerid=" + $stateParams.customer_ManagerDetail_CUSTOMERID.substring(0,$stateParams.customer_ManagerDetail_CUSTOMERID.length - 1) + '&callback=JSON_CALLBACK';
        }
        $http.jsonp(url).success(function (result) {
            $scope.lodingHide();
            // console.log(result);
            if (result.msgCode == '0001'){
                $scope.customer_MenDian = result.rows[0];
                // console.log($scope.customer_MenDian);
                if ($scope.customer_MenDian.PROVINCE){
                    $scope.getShiQuDetail('getCity',$scope.customer_MenDian.PROVINCE);
                }
                if ($scope.customer_MenDian.CITY){
                    $scope.getShiQuDetail('getCounty',$scope.customer_MenDian.PROVINCE,$scope.customer_MenDian.CITY);
                }
            }
            if (result.msgCode == '0002'){
                alert(result.msgDesc);
                $location.path('/login');
            }
            if (result.msgCode == '0003'){
                $scope.showAlert(result.msgDesc);
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
    $scope.goToTheCustomerDetaill();
    //编辑门店信息
    $scope.edit_MenDian = function () {
        $scope.isAddNewMenDian = false;//
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
    
    $scope.sumbitTheEdited_MenDian = function () {
        // $scope.lodingShow();
        if ($scope.customer_MenDian.CHAIN == undefined){
            $scope.customer_MenDian.CHAIN = '';
        }
        if ($scope.customer_MenDian.CHANNELS == undefined){
            $scope.customer_MenDian.CHANNELS = '';
        }
        if ($scope.customer_MenDian.CUSTNAME == undefined && $scope.isAddNewMenDian){
            $scope.showAlert("终端名称是必填项,请填写完整后提交!");
            return;
        }
        if ($scope.customer_MenDian.CUSTNAME == undefined){
            $scope.customer_MenDian.CUSTNAME = '';
        }

        if ($scope.customer_MenDian.CUSTNO == undefined){
            $scope.customer_MenDian.CUSTNO = '';
        }
        if ($scope.customer_MenDian.DEPARTCODE == undefined){
            $scope.customer_MenDian.DEPARTCODE = '';
        }
        if ($scope.customer_MenDian.DEPARTNAME == undefined && $scope.isAddNewMenDian){
            $scope.showAlert("部门名称是必填项,请选择后提交!");
            return;
        }
        if ($scope.customer_MenDian.DEPARTNAME == undefined){
            $scope.customer_MenDian.DEPARTNAME = '';
        }

        if ($scope.customer_MenDian.SALESMAN == undefined && $scope.isAddNewMenDian){
            $scope.showAlert("销售代表是必填项,请选择后提交!");
            return;
        }
        if ($scope.customer_MenDian.SALESMAN == undefined){
            $scope.customer_MenDian.SALESMAN = '';
        }
        if ($scope.customer_MenDian.DEALER == undefined){
            $scope.customer_MenDian.DEALER = '';
        }
        if ($scope.customer_MenDian.ADDRESS == undefined){
            $scope.customer_MenDian.ADDRESS = '';
        }
        if ($scope.customer_MenDian.LINKMAN == undefined){
            $scope.customer_MenDian.LINKMAN = '';
        }
        if ($scope.customer_MenDian.PHONE == undefined){
            $scope.customer_MenDian.PHONE = '';
        }
        if ($scope.customer_MenDian.PROVINCE == undefined && $scope.isAddNewMenDian){
            $scope.showAlert("省份是必填项,请选择后提交!");
            return;
        }
        if ($scope.customer_MenDian.PROVINCE == undefined){
            $scope.customer_MenDian.PROVINCE = '';
        }
        if ($scope.customer_MenDian.CITY == undefined && $scope.isAddNewMenDian){
            $scope.showAlert("市区是必填项,请选择后提交!");
            return;
        }
        if ($scope.customer_MenDian.CITY == undefined){
            $scope.customer_MenDian.CITY = '';
        }
        if ($scope.customer_MenDian.COUNTY == undefined && $scope.isAddNewMenDian){
            $scope.showAlert("县区是必填项,请选择后提交!");
            return;
        }
        if ($scope.customer_MenDian.COUNTY == undefined){
            $scope.customer_MenDian.COUNTY = '';
        }

        if ($scope.customer_MenDian.SALES_MAN1 == undefined || $scope.customer_MenDian.SALES_MAN1 == '无数据'){
            $scope.customer_MenDian.SALES_MAN1 = '';
        }
        if ($scope.customer_MenDian.SALES_MAN3 == undefined || $scope.customer_MenDian.SALES_MAN3 == '无数据'){
            $scope.customer_MenDian.SALES_MAN3 = '';
        }
        if ($scope.customer_MenDian.SALES_MAN_TEL == undefined){
            $scope.customer_MenDian.SALES_MAN_TEL = '';
        }
        if ($scope.customer_MenDian.CUSTOMERID == undefined){
            $scope.customer_MenDian.CUSTOMERID = '';
        }

        var countyId = '';//县区id
        var salesmanid = '';//销售代表id
        var dealerid = '';//所属经销商id
        if ($scope.xianQuList && $scope.xianQuList.rows.length > 0){
            for (var i = 0;i < $scope.xianQuList.rows.length;i++){
                if ($scope.customer_MenDian.COUNTY == $scope.xianQuList.rows[i].COUNTY){
                    countyId = $scope.xianQuList.rows[i].COUNTYID;
                    break;
                }
            }
        }else {
            countyId = '';
        }
        if ($scope.xiaoShouDaiBiaoList && $scope.xiaoShouDaiBiaoList.rows.length > 0){
            for (var j = 0;j < $scope.xiaoShouDaiBiaoList.rows.length;j++){
                if ($scope.customer_MenDian.SALESMAN == $scope.xiaoShouDaiBiaoList.rows[j].STAFF_NAME){
                    salesmanid = $scope.xiaoShouDaiBiaoList.rows[j].ID;
                    break;
                }
            }
        }else {
            salesmanid = '';
        }
        if ($scope.suoShuJxsList && $scope.suoShuJxsList.rows.length > 0){
            for (var k = 0;k < $scope.suoShuJxsList.rows.length;k++){
                if ($scope.customer_MenDian.DEALER == $scope.suoShuJxsList.rows[k].CUSTNAME){
                    dealerid = $scope.suoShuJxsList.rows[k].CUSTOMERID;
                    break;
                }
            }
        }else {
            dealerid = '';
        }
        var urlStr = 'updateShopInfo';
        if ($scope.isAddNewMenDian){
            urlStr = 'addShop';
        }
        var url = myUrl + "app/" + urlStr +".appjsone?sessionid=" + JSON.parse(localStorage.ydsw_userDetail).sessionid + "&custno=" + $scope.customer_MenDian.CUSTNO + "&custname=" + $scope.customer_MenDian.CUSTNAME + "&longitude=" + '' + "&latitude=" + '' + "&chain=" + $scope.customer_MenDian.CHAIN + "&channels=" + $scope.customer_MenDian.CHANNELS + "&departcode=" + $scope.customer_MenDian.DEPARTCODE + "&departname=" + $scope.customer_MenDian.DEPARTNAME + "&salesman=" + $scope.customer_MenDian.SALESMAN + "&dealer=" + $scope.customer_MenDian.DEALER + "&address=" + $scope.customer_MenDian.ADDRESS + "&linkman=" + $scope.customer_MenDian.LINKMAN + "&phone=" + $scope.customer_MenDian.PHONE + "&county=" + $scope.customer_MenDian.COUNTY + "&city=" + $scope.customer_MenDian.CITY + "&province=" + $scope.customer_MenDian.PROVINCE + "&salesman1=" + $scope.customer_MenDian.SALES_MAN1 + "&salesman3=" + $scope.customer_MenDian.SALES_MAN3 + "&sales_man_tel=" + $scope.customer_MenDian.SALES_MAN_TEL + "&customerid=" + $scope.customer_MenDian.CUSTOMERID + "&countyid=" + countyId + "&salesmanid=" + salesmanid + "&dealerid=" + dealerid + "&salesmanid1=" + "&salesmanid3=" +  '&callback=JSON_CALLBACK';
        $http.jsonp(url).success(function (result) {
            // console.log(result);
            $scope.lodingHide();
            if (result.msgCode == '0001'){
                $scope.showAlert(result.msgDesc);
                $scope.closeModal();
            }
            if (result.msgCode == '0006'){
                $scope.showAlert(result.msgDesc);
                $scope.closeModal();
            }
            if (result.msgCode == '0002'){
                alert(result.msgDesc);
                $location.path('/login');
            }
        }).error(function () {
            $scope.promptShow("网络错误！");
            $timeout(function () {
                $scope.lodingHide();
            }, 500);
        })
    };
});