//控制层 
app.controller('goodsController' ,function($scope,$controller   ,goodsService,uploadService,itemCatService,typeTemplateService){	
	
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
	$scope.entity={goods:{},goodsDesc:{itemImages:[],specificationItems:[]}};
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
	//获取品牌下拉列表
	$scope.$watch("entity.goods.typeTemplateId",function(newValue,oldValue){
		typeTemplateService.findOne(newValue).success(
				function(response){
					$scope.typeTemplate=response;
					$scope.typeTemplate.brandIds=JSON.parse($scope.typeTemplate.brandIds);
					//扩展属性列表
					$scope.entity.goodsDesc.customAttributeItems=JSON.parse($scope.typeTemplate.customAttributeItems);
				}
	);
		//查询规格
		typeTemplateService.findSpecList(newValue).success(
				function(response){
					$scope.specList=response;
				}
		);
	});
	//保存勾选的规格
	$scope.updateSpecAttribute=function($event,name,value){
		var Object=$scope.searchObjectByKey($scope.entity.goodsDesc.specificationItems,"attributeName",name);
		if(Object!=null){
			if($event.target.checked){
				Object.attributeValue.push(value);
			}else{
				Object.attributeValue.splice(Object.attributeValue.indexOf(value),1);
			}
			if(Object.attributeValue.length==0){
				$scope.entity.goodsDesc.specificationItems.splice($scope.entity.goodsDesc.specificationItems.indexOf(Object),1);
			}
		}else{
			$scope.entity.goodsDesc.specificationItems.push({"attributeName":name,"attributeValue":[value]});
		}
	}
	
	//sku商品录入
	$scope.createItemList=function(){
		$scope.entity.itemList=[{spec:{},price:0,num:99999,status:"0",isDefault:"0"}];
		var items=$scope.entity.goodsDesc.specificationItems;
		for(var i=0;i<items.length;i++){
			$scope.entity.itemList=addColum($scope.entity.itemList,items[i].attributeName,items[i].attributeValue);
		}
	}
	//添加列的值
	addColum=function(list,name,value){
		var newList=[];
		for(var i=0;i<list.length;i++){
			var oldItem=list[i];
			for(var j=0;j<value.length;j++){
				var newItem=JSON.parse(JSON.stringify(oldItem));
				newItem.spec[name]=value[j];
				newList.push(newItem);
			}
		}
		return newList;
	}
});	
