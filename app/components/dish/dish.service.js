(function() {
    "use strict";

    angular.module('lekkersakosApp.dish').service('DishService', function($resource) {

        this.getAll = function() {
            var resource = $resource('/api/dishes');
            return resource.query().$promise;
        };

        this.getImageLocation = function(dishId) {
            var resource = $resource('/api/dishes/image/:dishId');
            return resource.get({dishId: dishId}).$promise;
        };
    });
})();
