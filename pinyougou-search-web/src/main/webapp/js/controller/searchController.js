app.controller("searchController",function($scope,searchService,$location){
	//搜索
	$scope.search=function(){
		if($scope.searchMap.keywords==""){
			return;
		}
		$scope.searchMap.pageNo= parseInt($scope.searchMap.pageNo) ;
		searchService.search($scope.searchMap).success(
				function(response){
					$scope.resultMap=response;
					buildPageLabel();
				}
		);
		
	}
	//添加搜索项
	$scope.searchMap={"keywords":"","category":"","brand":"","spec":{},"price":"","pageNo":1,"pageSize":40,"sort":"","sortField":""};
	$scope.addSearchItem=function(key,value){
		if(key=="category"||key=="brand"||key=="price"){//如果点击的是分类或者是品牌
			$scope.searchMap[key]=value;
		}else{//否则是规格
			$scope.searchMap.spec[key]=value;
		}
		$scope.search();//执行搜索
	}
	//移除复合搜索条件
	$scope.removeSearchItem=function(key){
		if(key=="category"||key=="brand"||key=="price"){//如果是分类或品牌
			$scope.searchMap[key]="";
		}else{//否则是规格
			delete $scope.searchMap.spec[key];//移除此属性
		}
		$scope.search();//执行搜索
	}
	//页码逻辑
	buildPageLabel=function(){
		$scope.pageLabel=[];
		var firstPage=1;//开始页码
		var lastPage=$scope.resultMap.totalPages;//截止页码
		$scope.firstDot=true;//前面有点
		$scope.lastDot=true;//后边有点
		if($scope.resultMap.totalPages>5){//如果总页数大于 5 页,显示部分页码
			
			if($scope.searchMap.pageNo<=3){//如果当前页小于等于 3
				lastPage=5;
				$scope.firstDot=false;
			}else if($scope.searchMap.pageNo>=$scope.resultMap.totalPages-2){//如果当前页大于等于最大页码-2
				firstPage=$scope.resultMap.totalPages-4;
				$scope.lastDot=false;
			}else{ //显示当前页为中心的 5 页
				firstPage=$scope.searchMap.pageNo-2;
				lastPage=$scope.searchMap.pageNo+2;
			}
			
		}else{
			$scope.firstDot=false;
			$scope.lastDot=false;
		}
		//循环产生页码标签
		for(var i=firstPage;i<=lastPage;i++){
			$scope.pageLabel.push(i);
		}
	}
	//根据用户点击或者输入的页码进行跳转
	$scope.queryByPage=function(pageNo){
		
		if(pageNo<1 || pageNo>$scope.resultMap.totalPages){
			return;
			}
		$scope.searchMap.pageNo=pageNo;
		$scope.search();//执行搜索
	}
	
	//判断当前页是否为第一页
	$scope.first=function(){
		if($scope.searchMap.pageNo==1){
			return true;
		}else{
			return false;
		}
	}
	//判断当前页是否为最后页
	$scope.last=function(){
		if($scope.resultMap.totalPages==$scope.searchMap.pageNo){
			return true;
		}else{
			return false;
		}
	}
	//排序
	$scope.sortSearch=function(sortField,sort){
		$scope.searchMap.sort=sort;
		$scope.searchMap.sortField=sortField;
		$scope.search();//执行搜索
	}
	//判断关键字是不是品牌
	$scope.keywordsIsBrand=function(){
		for(var i=0;i<$scope.resultMap.brandList.length;i++){
			if($scope.searchMap.keywords.indexOf($scope.resultMap.brandList[i].text)>=0){
				return true;//关键字包含品牌
			}
			
		}
		return false;
	}
	//加载首页查询条件
	$scope.loadkeywords=function(){
		var value=$location.search()["keywords"];
		$scope.searchMap.keywords=value;
		$scope.search();//执行搜索
	}
});