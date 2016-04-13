"use strict";
(function () {
    angular
        .module("Travelogue")
        .controller("HeaderController", headerController);

    function headerController($rootScope, $location, $scope) {
        $scope.logout = logout;
        $scope.$location = $location;

        function logout() {
            $rootScope.currentUser = null;
            UserService.getCurrentUser()
        }
    }
})();