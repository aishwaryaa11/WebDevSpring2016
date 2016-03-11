(function(){
    angular
        .module("Travelogue")
        .controller("AdminController", adminController);

    function adminController($scope, UserService, $rootScope) {
        $scope.users = UserService.findAllUsers();

        $scope.message = null;
        $scope.error = null;

        $scope.addU = addU;
        $scope.updateU = updateU;
        $scope.deleteU = deleteU;
        $scope.selectU = selectU;

        var selectedUId = null;

        function addU(u) {
            if (typeof u !== "undefined" && u.username != "") {
                var newU = UserService.createUserAdmin(u);
                //$scope.users.push(newU);
            }
        }

        function updateU(u) {
            var newU = UserService.updateUserAdmin(selectedUId, u);
            if (newU) {
                $scope.message = "Successfully updated User";
            } else {
                $scope.message = "Unable to update User. Try again.";
            }
        }

        function deleteU(index) {
            selectedUId = $scope.users[index]._id;
            UserService.deleteUserById(selectedUId);
            //$scope.users.splice(index, 1);
        }

        function selectU(index) {
            selectedUId = $scope.users[index]._id;
            var user = UserService.findUserById(selectedUId);
            $scope.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles,
                email: user.email,
                age: user.age,
                location: user.location,
                gender: user.gender,
                aboutme: user.aboutme,
                placesbeen: user.placesbeen,
                placesfuture: user.placesfuture
            };
        }
    }
})();