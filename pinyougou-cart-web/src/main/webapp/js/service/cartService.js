//购物车服务层
app.service("cartService",function($http){
	//购物车列表
	this.findCartList=function(){
		return $http.get("cart/findCartList.do");
	}
	this.addGoodsToCartList=function(itemId,num){
		return $http.get("cart/addGoodsToCartList.do?itemId="+itemId+"&num="+num);
	}
	
	this.sum=function(cartList){
		var totalValue={totalNum:0,totalMoney:0};//合计实体
		for(var i=0;i<cartList.length;i++){
			var cart=cartList[i];//购物车对象
			for (j=0;j<cart.orderItemList.length;j++){
				var orderItem=cart.orderItemList[j];//购物车明细对象
				totalValue.totalNum+=orderItem.num;
				totalValue.totalMoney+=orderItem.totalFee;
			}
		}
		return totalValue;
	}
	


});