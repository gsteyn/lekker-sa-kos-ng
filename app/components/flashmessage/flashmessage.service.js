(function() {
    "use strict";

    angular.module('lekkersakosApp').factory('FlashMessageService', function($rootScope) {

        var service = {};

        service.error = error;
        
        service.clear = clearFlashMessage;

        return service;

        function error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error'
            };
        }
        
        function clearFlashMessage() {
            delete $rootScope.flash;
        }

    });
})();
