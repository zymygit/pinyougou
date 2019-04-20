app.controller("loginController",function($scope,loginService){
	loginService.loginName().success(
			function(response){
				$scope.name=response.loginName;
			}
	);
});