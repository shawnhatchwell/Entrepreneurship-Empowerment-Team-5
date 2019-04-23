angular.module('requests', []).factory('Requests', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('api/requests');
    },

	create: function(request) {
	  return $http.post('api/requests', request);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
       //help me
       return $http.delete('/api/requests/'+id);
    }
  };

  return methods;
});
