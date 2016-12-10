(function() {
    "use strict";

    angular.module('lekkersakosApp.dish', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dish', {
            templateUrl: 'dish/dish.html',
            controller: 'DishCtrl'
        });
    }]);

})();
