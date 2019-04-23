angular.module('requests').controller('RequestsController', ['$scope', 'Requests',
  function($scope, Requests) {
    /* Get all the requests, then bind it to the scope */
    Requests.getAll().then(function(response) {
      $scope.requests = response.data;
    }, function(error) {
      console.log('Unable to retrieve requests:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addRequest = function() {
		$scope.requests.push($scope.newRequest);
		Requests.create($scope.newRequest);
    alert($scope.newRequest.emailaddress + " has been added")
    };

    $scope.deleteRequest = function(id, index) {
	   /**TODO
        Delete the article using the Requests factory. If the removal is successful,
		navigate back to 'request.list'. Otherwise, display the error.
       */
	   	if (confirm('Are you sure you want to delete "' + $scope.requests[index].emailaddress + '"?')) {
			$scope.requests.splice(index,1);
			Requests.delete(id);
		}
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.requests[index];
    };
  }
]);
