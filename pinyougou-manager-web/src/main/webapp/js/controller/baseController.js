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
		
		
	})