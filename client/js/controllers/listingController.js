angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
  function($scope, Listings) {
    /* Get all the listings, then bind it to the scope */
    Listings.getAll().then(function(response) {
      $scope.listings = response.data;
    }, function(error) {
      console.log('Unable to retrieve listings:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addListing = function() {
	  /**TODO
	  *Save the article using the Listings factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
	 /*Make object, push, create*/
		$scope.listings.push($scope.newListing);
		Listings.create($scope.newListing);
    alert($scope.newListing.emailaddress + " has been added")
    };

    $scope.deleteListing = function(id, index) {
	   /**TODO
        Delete the article using the Listings factory. If the removal is successful,
		navigate back to 'listing.list'. Otherwise, display the error.
       */
	   	if (confirm('Are you sure you want to delete "' + $scope.listings[index].name + '"?')) {
			$scope.listings.splice(index,1);
			Listings.delete(id);
		}
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.listings[index];
    };
  }
]);
