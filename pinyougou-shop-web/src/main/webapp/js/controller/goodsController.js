 //控制层 
app.controller('goodsController' ,function($scope,$controller   ,goodsService,uploadService,itemCatService){	
	
	$controller('baseController',{$scope:$scope});//继承
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		goodsService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		goodsService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		goodsService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}

	//保存 
	$scope.add=function(){				
		$scope.entity.goodsDesc.introduction=editor.html();
		goodsService.add($scope.entity).success(				
			function(response){
				debugger;
				if(response.success){
					debugger;
					alert(response.message);
					$scope.entity={};
					editor.html("");
				}else{
					
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		goodsService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
					$scope.selectIds=[];
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		goodsService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	//图片上传
	$scope.uploadFile=function(){
	    	uploadService.uploadFile().success(
	    			function(response){
	    				if(response.success){
	    					$scope.image_entity.url=response.message;
	    					}
	    				else{
	    					alert(response.message);
	    				}
	    			}
	    	);
	    }
	//定义初始化变量
	$scope.entity={goods:{},goodsDesc:{itemImages:[]}};
	//图片列表添加
	$scope.addImageEntity=function(){
		$scope.entity.goodsDesc.itemImages.push($scope.image_entity);
	}
	//从列表中删除图片
	$scope.removeImageEntity=function($index){
		$scope.entity.goodsDesc.itemImages.splice($index,1);
	}
		//商品分类1级下拉列表
	$scope.selectItemCat1List=function(){
		itemCatService.findByParentId(0).success(
			function(response){
				$scope.itemCat1List=response;
			}	
		);
	}
	//商品分类2级下拉列表
	$scope.$watch("entity.goods.category1_id",function(newValue,oldValue){
		itemCatService.findByParentId(newValue).success(
			function(response){
				$scope.itemCat2List=response;
			}	
		);
	});
	//商品分类3级下拉列表
	$scope.$watch("entity.goods.category2_id",function(newValue,oldValue){
		itemCatService.findByParentId(newValue).success(
			function(response){
				$scope.itemCat3List=response;
			}	
		);
	});
	//获取模板Id
	$scope.$watch("entity.goods.category3_id",function(newValue,oldValue){
	itemCatService.findOne(newValue).success(
			function(response){
				$scope.entity.goods.typeTemplateId=response.typeId;
			}
	);
	});
});	
