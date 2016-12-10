(function() {
    "use strict";

    angular.module('lekkersakosApp', [
        'ngRoute',
        'ngResource',
        'lekkersakosApp.dish'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dish', {
          templateUrl: 'components/dish/dish.html',
          controller: 'DishCtrl',
          controllerAs: '$ctrl'
        })
        .otherwise({redirectTo: '/dish'});
    }]);

})();
