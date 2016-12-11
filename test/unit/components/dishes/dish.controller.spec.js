'user strict';

describe('lekkersakosApp.dish', function() {
    
    beforeEach(module('lekkersakosApp.dish'));
    
    describe('DishCtrl', function() {
        var scope;
        var dishCtrl;
        var queryPromise, imagePromise;
        var DishServiceStub, FlashMessageServiceStub;
        
        beforeEach(inject(function($q, $rootScope, $controller) {
            scope = $rootScope.$new();
            queryPromise = $q.defer();
            imagePromise = $q.defer();
            
            DishServiceStub = {
                getAll: function() {},
                getImageLocation: function() {}
            };
            spyOn(DishServiceStub, 'getAll').and.callFake(function() {
                return queryPromise.promise;
            });
            spyOn(DishServiceStub, 'getImageLocation').and.callFake(function() {
                return imagePromise.promise;
            });
            
            FlashMessageServiceStub = {
                error: function() {},
                clear: function() {}
            };
            spyOn(FlashMessageServiceStub, 'error');
            
            dishCtrl = $controller('DishCtrl', {
                '$scope': scope,
                'DishService': DishServiceStub,
                'FlashMessageService': FlashMessageServiceStub
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
                
                // needed to ensure that the then() function of the promise is called
                scope.$root.$digest();
                
                expect(dishCtrl.dishes).toBeDefined();
                expect(dishCtrl.dishes.length).toEqual(1);
            });
            
            it('should indicate an error if an error occurred while getting dishes', function() {
                dishCtrl.dishes = undefined;
                dishCtrl.selectedDish = undefined;
                
                queryPromise.reject('No dishes found');
                
                // needed to ensure that the then() function of the promise is called
                scope.$root.$digest();
                
                expect(dishCtrl.dishes).toBeUndefined();
                expect(dishCtrl.selectedDish).toBeUndefined();
            });
        });
        
        describe('when selecting dishes', function() {
            var dishMock;
            
            beforeEach(function() {
                dishMock = {
                    'id': 1,
                    'name': 'Dish1'
                };
                
                dishCtrl.selectDish(dishMock);
            });
            
            it('should retrieve the image of the selected dish', function() {
                var imageLocationMock = {
                    'imageLocation': 'test/location'
                };
                
                imagePromise.resolve(imageLocationMock);
                
                // needed to ensure that the then() function of the promise is called
                scope.$root.$digest();
                
                expect(dishCtrl.selectedDish).toEqual(dishMock);
                expect(dishCtrl.imageSource).toEqual(imageLocationMock.imageLocation);
            });
            
            it('should display an error if an error occurred', function() {
                imagePromise.reject('An error occurred');
                
                // needed to ensure that the then() function of the promise is called
                scope.$root.$digest();
                
                expect(FlashMessageServiceStub.error).toHaveBeenCalled();
            });
            
        });
    });
    
});
