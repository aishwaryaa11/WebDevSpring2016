"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController(UserService, $location, $scope) {
        $scope.logout = logout;
        $scope.$location = $location;

        function logout() {
            UserService.setCurrentUser(null);
            UserService.logout();
        }
    }
})();