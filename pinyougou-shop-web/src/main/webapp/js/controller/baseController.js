app.controller("baseController",function($scope){		
		//分页
		$scope.paginationConf = {
				currentPage: 1,
				totalItems: 10,
				itemsPerPage: 10,
				perPageOptions: [10, 20, 30, 40, 50],
				onChange: function(){
				 $scope.reloadList();//重新加载
				}
		}
		$scope.reloadList=function(){
			$scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
		}
		
		//复选框id集合
		$scope.selectIds=[];
		$scope.updateSelection=function($event,id){
			if($event.target.checked){
				$scope.selectIds.push(id);
			}else{
				var dex=$scope.selectIds.indexOf(id);
				$scope.selectIds.splice(dex,1);
			}
		}
		//json转换为字符串
		$scope.jsonToString=function(jsonString,key){
			var json=JSON.parse(jsonString);
			var value="";
			for(var i=0;i<json.length;i++){
				if(i>0){value+=",";}
				value+=json[i][key];
			}
			return value;
		}
		//查询商品规格key是否存在
		$scope.searchObjectByKey=function(list,key,value){
			for(var i=0; i<list.length;i++){
				if(list[i][key]==value){
					return list[i];
				}
			}
			return null;
		}
		
		
	})