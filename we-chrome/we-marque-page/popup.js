/* pas de alert
document fait référence à la popup
*/
angular.module ('appLink', []);
angular.module ('appLink').controller ('controllerShow', function ($scope, $http, $location){
	const file = 'links.json';
	const config ={ responseType: "json" };
	const rootUrl = '';
	$scope.listLinks =[];
	$scope.listTags =[];
	$scope.choice = 'important';
	// recuperer les liens
	$scope.printLinks = function(){
		$http.get (file, config).then (function (response){
			$scope.listLinks = response.data[$scope.choice];
			console.log ($scope.choice, $scope.listLinks);
		});
	}
	// récupérer les clefs
	$http.get (file, config).then (function (response){
		$scope.listTags = Object.keys (response.data);
		console.log ($scope.listTags);
	});
	$scope.printLinks();
});
angular.module ('appLink').filter ('uppercaseOne', function(){
	return function (line){
		var maj = line[0].toUpperCase();
		var newLine = maj + line.substr (1);
		return newLine;
}});