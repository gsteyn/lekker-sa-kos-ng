'user strict';

describe('lekkersakosApp.dish', function() {
   
    beforeEach(module('lekkersakosApp'));
    beforeEach(module('lekkersakosApp.dish'));
    
    describe('DishService', function() {
        var API_URL = '/api/dishes';
        var $httpBackend;
        var DishService;
        
        beforeEach(inject(function(_$httpBackend_, _DishService_) {
            $httpBackend = _$httpBackend_;
            DishService = _DishService_;
        }));
        
        it('service should be defined', function() {
            expect(DishService).toBeDefined();
        });
        
        describe('when calling getAll', function() {
            
            it('should call /api/dishes', function() {
                var responseMock = [
                    { name: 'Dish1' },
                    { name: 'Dish2' }
                ];
                
                $httpBackend.expectGET(/\/api\/dishes/).respond(responseMock);
                
                var dishesPromise = DishService.getAll();
                dishesPromise.then(function(response) {
                    expect(response).toBeDefined();
                    expect(response.length).toEqual(2);
                });
                
                $httpBackend.flush();
            });
            
        });
        
        describe('when calling getImageLocation', function() {
            
            it('should call /api/dishes/image/:dishId', function() {
                var responseMock = {
                    'imageLocation': 'test/location'
                };
                
                $httpBackend.expectGET(/\/api\/dishes\/image\/.*/).respond(responseMock);
                
                var imagePromise = DishService.getImageLocation('1');
                imagePromise.then(function(response) {
                    expect(response).toBeDefined();
                });
                
                $httpBackend.flush();
            });
            
        });
    });
    
});
