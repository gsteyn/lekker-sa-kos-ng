(function() {
    "use strict";

    angular.module('lekkersakosApp.dish').factory('DishService', function($resource) {

        // can add :id (or any other url criteria) to bolster the type of functions $resource can do.
        return $resource('/api/dishes');

    });
})();
