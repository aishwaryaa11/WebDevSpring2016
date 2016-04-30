"use strict";
(function(){
    angular
        .module("Travelogue")
        .controller("ProfileController", profileController);

    function profileController(UserService, $location) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        delete currentUser.password;
                        UserService.setCurrentUser(currentUser);
                        vm.currentUser = currentUser;
                    }
                });
        }
        init();

        function update(user) {
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    init();
                });
        }

        function deleteUser(user) {
            UserService.deleteUserById(user._id)
                .then(function (response) {
                        UserService.setCurrentUser(null);
                        $location.path('/home');
                    }
                );

        }
    }
})();