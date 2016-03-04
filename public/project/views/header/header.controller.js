(function(){
    angular
        .module("Travelogue")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, $rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();