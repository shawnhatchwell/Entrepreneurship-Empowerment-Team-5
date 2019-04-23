angular.module('events', []).factory('Events', function($http) {
  var methods = {
    getAll: function() {
      return $http.get('api/events');
    },

	create: function(event) {
	  return $http.post('api/events', event);
    },

    delete: function(id) {
	   /**TODO
        return result of HTTP delete method
       */
       //help me
       return $http.delete('/api/events/'+id);
    },
    approve: function(id) {
       return $http.delete('/api/events/'+id);
    }
  };

  return methods;
});
