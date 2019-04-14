
angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
function($scope, Listings) {
/* Get all the listings, then bind it to the scope */
Listings.getAll().then(function(response) {
  $scope.listings = response.data;
  console.log('able to retrieve listings:');//if error occurs
}, function(error) {
  console.log('Unable to retrieve listings:', error);
});

$scope.detailedInfo = undefined;
$scope.addListing = function() {

  var name      = $scope.newListing.name;
  var email     = $scope.newListing.email;//create list from factory
  var address   = $scope.newListing.address;
  var events    = $scope.newListing.event;

  Listings.create({
    "name": name,
    "email": email,//create listings with specified values
    "address": address
    "events": events
  }).then(function(response){

  }, function(error){
     console.log(error);//error
  });
};

$scope.deleteListing = function(id) {//delete at point
  Listings.delete(id).then(function(response){
  }, function(error){
     console.log(error);//check for errors
  });
};

$scope.showDetails = function(index) {
  $scope.detailedInfo = $scope.listings[index];//show details at index
};
}
]);
