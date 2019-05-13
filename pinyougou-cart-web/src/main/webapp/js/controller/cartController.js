//购物车控制层
app.controller("cartController",function($scope,cartService){
	//查询购物车列表

	$scope.findCartList=function(){
		cartService.findCartList().success(
				function(response){
					$scope.cartList=response;
					$scope.totalValue=cartService.sum($scope.cartList);
				}
		);
	}
	//添加商品到购物车
	$scope.addGoodsToCartList=function(itemId,num){
		cartService.addGoodsToCartList(itemId,num).success(
				function(response){
					if(response.success){
						$scope.findCartList();//刷新列表
					}else{
						alert(response.message);
					}
				}
		);
		
	}
	//查询用户收货地址
	$scope.findAddressList=function(){
		cartService.findListByUserId().success(
				function(response){
					$scope.addressList=response;
					for(var i=0; i<$scope.addressList.length;i++){
						if($scope.addressList[i].isDefault=="1"){
							$scope.address=$scope.addressList[i];
							break;
						}
					}
			}
		);
	}
	//将点击选中的地址对象赋值给变量
	$scope.selectAddress=function(address){
		$scope.address=address;
	}
	
	$scope.isSelectAddress=function(address){
		if($scope.address==address){
			return true;
			
		}else{
			return false;
		}
	}
	//支付模式
	$scope.order={paymentType:'1'};
	$scope.selectPayType=function(type){
		$scope.order.paymentType=type;
	}
	//提交订单
	$scope.submitOrder=function(){
		$scope.order.receiverAreaName=$scope.address.address;//地址
		$scope.order.receiverMobile=$scope.address.mobile;//手机
		$scope.order.receiver=$scope.address.contact;//联系人
		cartService.submitOrder($scope.order).success(
				function(response){
					if(response.success){
						if($scope.order.paymentType=="1"){
							location.href="pay.html";
						}else{
							location.href="paysuccess.html";
						}
					}else{
						alert(response.message);
					}
				}
		);
		
	}
});
