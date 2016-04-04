"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController(UserService) {
        var vm = this;

        vm.message = null;
        vm.error = null;
        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        UserService.setCurrentUser(currentUser);
                        vm.currentUser = currentUser;
                    }
                });
        }
        init();

        function update(user) {
            UserService
                .updateUser(vm.currentUser._id, user)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        vm.message = "Successfully updated user";
                        UserService.setCurrentUser(userTemp);
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }
    }
})();