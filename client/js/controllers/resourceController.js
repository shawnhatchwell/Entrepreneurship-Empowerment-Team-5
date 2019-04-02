angular.module('resources').controller('ResourcesController', ['$scope', 'Resources',
  function($scope, Resources) {
    /* Get all the resources, then bind it to the scope */
    Resources.getAll().then(function(response) {
      $scope.resources = response.data;
    }, function(error) {
      console.log('Unable to retrieve resources:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addResource = function() {
	  /**TODO
	  *Save the article using the Resources factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
	 /*Make object, push, create*/
		$scope.resources.push($scope.newResource);
		Resources.create($scope.newResource);
    alert($scope.newResource.title + " has been added")
    };

    $scope.deleteResource = function(id, index) {
	   /**TODO
        Delete the article using the Resources factory. If the removal is successful,
		navigate back to 'resource.list'. Otherwise, display the error.
       */
	   	if (confirm('Are you sure you want to delete "' + $scope.resources[index].title + '"?')) {
			$scope.resources.splice(index,1);
			Resources.delete(id);
		}
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.resources[index];
    };
  }
]);
