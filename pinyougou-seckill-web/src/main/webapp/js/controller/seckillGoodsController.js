app.controller("seckillGoodsController",function($scope,seckillGoodsService,$location,$interval){
	// 读取列表数据绑定到表单中
	$scope.findList=function(){
		seckillGoodsService.findList().success(
				function(response){
					$scope.list=response;
				}
		);
	}
	// 查询实体
	$scope.findOneFromRedis=function(){
		$scope.id=$location.search()["id"];
		seckillGoodsService.findOneFromRedis($scope.id).success(
				function(response){
					$scope.entity=response;
					// 总秒数
					allsecond=Math.floor((new Date($scope.entity.endTime).getTime()-new Date().getTime())/1000);
					time=$interval(function(){
						if(allsecond>0){
							allsecond=allsecond-1;
							$scope.timeString=convertTimeString(allsecond);// 转换时间字符串
						}else{
							$interval.cancel(time);
							alert("秒杀结束");
						}
						
					},1000);
				}
		);
	}
	// 转换秒为 天小时分钟秒格式 XXX 天 10:22:33
	convertTimeString=function(allsecond){
		var day=Math.floor(allsecond/(60*60*24));// 天数
		var hour=Math.floor((allsecond-day*60*60*24)/(60*60));// 小时数
		var minute=Math.floor((allsecond-day*60*60*24-hour*60*60)/60);// 分钟
		var second=Math.floor(allsecond-day*60*60*24-hour*60*60-minute*60);// 秒
		var timeString="";
		if(day>0){
			timeString=day+"天";
		}
		return timeString+hour+":"+minute+":"+second;
	}
	// 提交订单
	$scope.submitOrder=function(){
	seckillGoodsService.submitOrder($scope.entity.id).success(
		function(response){
			if(response.success){
					alert("下单成功，请在 1 分钟内完成支付");
					location.href="pay.html";
				}else{
					alert(response.message);
			}
		}
	);
	}
});