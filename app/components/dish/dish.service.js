(function() {
    "use strict";

    angular.module('lekkersakosApp.dish').service('DishService', function($q, $resource) {

        this.getAll = function() {
            var deferred = $q.defer();

            var resource = $resource('/api/dishes');
            resource.query().$promise.then(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        };

        this.getImageLocation = function(dishId) {
            var deferred = $q.defer();

            var resource = $resource('/api/dishes/image/:dishId');
            resource.get({dishId: dishId}).$promise.then(function(response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        };
    });
})();
