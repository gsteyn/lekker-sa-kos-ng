(function() {
    "use strict";

    angular.module('lekkersakosApp').factory('FlashMessageService', function($rootScope) {

        var service = {};

        service.error = error;
        
        service.clear = clearFlashMessage;

        initService();

        return service;

        function initService() {
            $rootScope.$on('$locationChangeStart', function () {
                clearFlashMessage();
            });
        }

        function error(message, keepAfterLocationChange) {
            $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
        }
        
        function clearFlashMessage() {
            var flash = $rootScope.flash;
            if (flash) {
                if (!flash.keepAfterLocationChange) {
                    delete $rootScope.flash;
                } else {
                    flash.keepAfterLocationChange = false;
                }
            }
        }

    });
})();
