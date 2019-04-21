angular.module('listings', []).factory('Listings', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('api/calEvents');
    },

	create: function(listing) {
	  return $http.post('api/calEvents', listing);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
       return $http.delete('/api/calEvents/'+id);
    }
  };

  return methods;
});
