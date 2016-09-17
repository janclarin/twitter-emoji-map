(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    ListController.$inject = ['$interval', 'countryService'];

    function ListController($interval, countryService) {
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