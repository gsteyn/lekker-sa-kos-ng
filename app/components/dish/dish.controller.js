(function() {
    "use strict";

    angular.module('lekkersakosApp.dish').controller('DishCtrl', function(DishService) {

        var $ctrl = this;

        $ctrl.searchTerm = '';
        $ctrl.orderBy = 'name';
        $ctrl.orderReverse = false;

        $ctrl.init = function() {
            DishService.getAll().then(function(response) {
                $ctrl.dishes = response;
            });
        };
        
        $ctrl.selectDish = function(dish) {
            $ctrl.selectedDish = dish;
            $ctrl.imageSource = './img/image-not-found.png';
            
            DishService.getImageLocation(dish.id).then(function(response) {
                $ctrl.imageSource = response.imageLocation;
            });
        };

    });
})();
