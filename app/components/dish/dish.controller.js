(function() {
    "use strict";

    angular.module('lekkersakosApp.dish').controller('DishCtrl', function(DishService, FlashMessageService) {

        var $ctrl = this;

        $ctrl.searchTerm = '';
        $ctrl.orderBy = 'name';
        $ctrl.orderReverse = false;

        $ctrl.init = function() {
            DishService.query(function(data) {
                $ctrl.dishes = data;
                
                if ($ctrl.dishes && $ctrl.dishes.length > 0) {
                    $ctrl.selectedDish = $ctrl.dishes[0];
                }
            }, function(error) {
                FlashMessageService.error(error);
            });
        };
        
        $ctrl.selectDish = function(dish) {
            $ctrl.selectedDish = dish;
        };

    });
})();
