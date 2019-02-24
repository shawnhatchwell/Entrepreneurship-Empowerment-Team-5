angular.module('listings').controller('ListingsController', ['$scope', 'Listings',
    function($scope, Listings) {
        Listings.getAll().then(function(response) {
            $scope.listings = response.data
        }, function(error) {
            console.log('Unable to retrieve listings:', error)
        })

        $scope.detailedInfo = undefined
        $scope.addListing = function() {
            $scope.listings.push($scope.newListing);//push new listing
            $scope.newListing = {}
        }

        $scope.deleteListing = function(code) {
            let index = fixTableError(code)//using function at bottom
            if (index !== null) {
              $scope.listings.splice(index, 1);
            }
        }

        $scope.showDetails = function(code) {
            let index = fixTableError(code)

            if (index !== null){
              $scope.detailedInfo = $scope.listings[index];//in order to find the right index that the user clicks
            }
        }

        function fixTableError(code) {
            for (let i = 0; i < $scope.listings.length; i++){//function for finding the right object
                if ($scope.listings[i]._id == code){
                    return i
                }
            }
            return null
        }
    }
])
