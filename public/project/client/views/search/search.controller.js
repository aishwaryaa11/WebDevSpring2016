(function () {
    "use strict";
    angular
        .module("Travelogue")
        .controller("SearchController", searchController);

    function searchController($location, SearchService) {
        var vm = this;

        vm.searchTerm = $location.search().query.toString();

        function renderResults(results) {
            vm.diaries = results.diaries;
            vm.users = results.users;

            vm.showUsers = vm.users.length !== 0;
            vm.showDiaries = vm.diaries.length !== 0;

        }

        function search() {
            SearchService.search(vm.searchTerm)
                .then(function (response) {
                    vm.results = response.data;
                    console.log(response);
                    renderResults(vm.results);
                });
        }

        search();

    }
})();