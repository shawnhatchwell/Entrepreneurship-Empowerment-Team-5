angular.module('resources', []).factory('Resources', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('api/resources');
    },

	create: function(resource) {
	  return $http.post('api/resources', resource);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
       //help me
       return $http.delete('/api/resources/'+id);
    }
  };

  return methods;
});
