(function() {
    'use strict';

    angular
        .module('app')
        .controller('CountryController', CountryController);

    CountryController.$inject = ['$interval', 'countryService'];

    function CountryController($interval, countryService) {
        var vm = this;
        vm.countries = [];

        $interval(function() {
            countryService.get()
                .then(function(countries) {
                    vm.countries = countries;
                });
        }, 1000);
    }
})();