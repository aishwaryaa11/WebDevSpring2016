"use strict";
(function () {
    angular
        .module("Travelogue")
        .controller("HeaderController", headerController);

    function headerController(UserService, $location, $scope) {
        var vm = this;
        $scope.logout = logout;
        vm.search = search;
        vm.searchTerm = "";

        function logout() {
            UserService.setCurrentUser(null);
            UserService.logout();
        }

        function search(searchTerm){
            $location.path("/search");
            $location.search("query", searchTerm);
        }
    }
})();