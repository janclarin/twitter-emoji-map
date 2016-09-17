/**
 * List service.
 */
(function() {
   'use strict';

    angular
        .module('app')
        .factory('countryService', countryService);

    countryService.$inject = ['$http'];

    function countryService($http) {
        var apiUrl = '/api/';

        return {
            get: get,
        };

        function get() {
            return $http.get(
                apiUrl + '/countries/'
            ).then(function (response) {
                return response.data;
            });
        }
    }
})();