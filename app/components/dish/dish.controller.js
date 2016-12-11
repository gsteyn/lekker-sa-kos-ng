(function() {
    "use strict";

    angular.module('lekkersakosApp.dish').controller('DishCtrl', function(DishService, FlashMessageService) {

        var $ctrl = this;

        $ctrl.searchTerm = '';
        $ctrl.orderBy = 'name';
        $ctrl.orderReverse = false;

        $ctrl.init = function() {
            DishService.getAll().then(function(response) {
                $ctrl.dishes = response;
                FlashMessageService.clear();
            }, function() {
                FlashMessageService.error('Unfortunately we could not retrieve the dishes.');
            });
        };
        
        $ctrl.selectDish = function(dish) {
            $ctrl.selectedDish = dish;
            $ctrl.imageSource = './img/image-not-found.png';
            
            DishService.getImageLocation(dish.id).then(function(response) {
                $ctrl.imageSource = response.imageLocation;
                FlashMessageService.clear();
            }, function() {
                FlashMessageService.error('Unfortunately we could not retrieve the image.');
            });
        };

    });
})();
