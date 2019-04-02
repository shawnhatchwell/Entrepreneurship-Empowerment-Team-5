/* register the modules the application depends upon here*/
angular.module('listings', []);
angular.module('resources', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['listings','resources']);