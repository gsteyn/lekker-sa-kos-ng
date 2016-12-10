'user strict';

describe('lekkersakosApp.dish', function() {
    
    beforeEach(module('lekkersakosApp.dish'));
    
    describe('DishCtrl', function() {
        var scope;
        var dishCtrl;
        var queryPromise;
        var DishServiceStub, FlashMesageServiceStub;
        
        beforeEach(inject(function($q, $rootScope, $controller) {
            scope = $rootScope.$new();
            queryPromise = $q.defer();
            
            DishServiceStub = {
                query: function() {}
            };
            spyOn(DishServiceStub, 'query').and.callFake(function(success, error) {
                queryPromise.promise.then(success, error);
            });
            
            FlashMesageServiceStub = {
                error: function() {
                    return 'errorTest';
                }
            };
            spyOn(FlashMesageServiceStub, 'error');
            
            dishCtrl = $controller('DishCtrl', {
                '$scope': scope,
                'DishService': DishServiceStub,
                'FlashMessageService': FlashMesageServiceStub
            });
            
        }));
        
        describe('during init', function() {
            beforeEach(function() {
                dishCtrl.init();
            });
            
            it('should get a list of dishes from api', function() {
                queryPromise.resolve([
                    {
                        'name': 'Dish1'
                    }
                ]);
                
                // this is needed to ensure that the callback function for success is called
                scope.$root.$digest();
                
                expect(dishCtrl.dishes).toBeDefined();
                expect(dishCtrl.dishes.length).toEqual(1);
                expect(dishCtrl.selectedDish).toBeDefined();
            });
            
            it('should indicate an error if an error occurred while getting dishes', function() {
                dishCtrl.dishes = undefined;
                dishCtrl.selectedDish = undefined;
                
                queryPromise.reject('No dishes found');
                
                // this is needed to ensure that the callback function for error is called
                scope.$root.$digest();
                
                expect(dishCtrl.dishes).toBeUndefined();
                expect(dishCtrl.selectedDish).toBeUndefined();
            });
        });
        
        describe('when selecting dishes', function() {
            
            it('should set the selected dish to $ctrl.selectedDish', function() {
                var dishMock = {
                    'name': 'Dish1'
                };
                
                dishCtrl.selectDish(dishMock);
                
                expect(dishCtrl.selectedDish).toEqual(dishMock);
            });
            
        });
    });
    
});
