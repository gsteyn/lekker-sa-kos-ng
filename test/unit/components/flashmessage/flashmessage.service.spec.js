'user strict';

describe('lekkersakosApp', function() {
    
    beforeEach(module('lekkersakosApp'));
    
    describe('FlashMessageService', function() {
        var rootScope;
        var FlashMessageService;
        
        beforeEach(inject(function($rootScope, _FlashMessageService_) {
            rootScope = $rootScope;
            FlashMessageService = _FlashMessageService_;
        })); 
        
        it('service should be defined', function() {
            expect(FlashMessageService).toBeDefined();
        });
        
        describe('when using the service', function() {
            var errorMock;
            
            beforeEach(function() {
                errorMock = 'errorMock';
                FlashMessageService.error(errorMock);
            });
            
            it('and calling error() an error message must be placed in $rootScope', function() {
                expect(rootScope.flash).toBeDefined();
                expect(rootScope.flash.type).toEqual('error');
                expect(rootScope.flash.message).toEqual(errorMock);
            });
            
            it('and calling clear() $rootScope should not have a flash object', function() {
                FlashMessageService.clear();
                
                expect(rootScope.flash).toBeUndefined();
            });
            
        });
        
    });
    
});
