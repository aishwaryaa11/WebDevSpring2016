(function(){
    angular
        .module("Travelogue")
        .controller("ProfileController", profileController);

    function profileController($scope, $rootScope, UserService, $location) {
        $scope.message = null;
        $scope.error = null;

        $scope.update = update;
        $scope.currentUser = $rootScope.currentUser;

        if (!$scope.currentUser) {
            $location.url("/home");
        }

        function update(user) {
            $scope.currentUser = UserService.updateUser($scope.currentUser._id, user);

            if (user) {
                $scope.message = "Successfully updated User";
                $rootScope.currentUser = $scope.currentUser;
            } else {
                $scope.message = "Unable to update User. Try again.";
            }
        }
    }
})();