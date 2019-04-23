angular.module('events').controller('EventsController', ['$scope', 'Events',
  function($scope, Events) {
    /* Get all the events, then bind it to the scope */
    Events.getAll().then(function(response) {
      $scope.events = response.data;
    }, function(error) {
      console.log('Unable to retrieve events:', error);
    });

    $scope.detailedInfo = undefined;

    $scope.addEvent = function() {
    alert($scope.newEvent.event + " has been added");
	  /**TODO
	  *Save the article using the Events factory. If the object is successfully
	  saved redirect back to the list page. Otherwise, display the error
	 */
	 /*Make object, push, create*/
		$scope.events.push($scope.newEvent);
		Events.create($scope.newEvent);
    };

    $scope.approveEvent = function() {
      if (confirm('Are you sure you want to approve "' + $scope.events[index].event + '"?')) {
      //$scope.events.splice(index,1);
      //Events.delete(id);
    }
    };

    $scope.deleteEvent = function(id, index) {
	   /**TODO
        Delete the article using the Events factory. If the removal is successful,
		navigate back to 'event.list'. Otherwise, display the error.
       */
	   	if (confirm('Are you sure you want to delete "' + $scope.events[index].event + '"?')) {
			$scope.events.splice(index,1);
			Events.delete(id);
		}
    };

    $scope.showDetails = function(index) {
      $scope.detailedInfo = $scope.events[index];
    };
  }
]);
