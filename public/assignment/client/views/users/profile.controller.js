"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", profileController);

    function profileController (UserService, $location) {
        var vm = this;
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            vm.user = UserService.getCurrentUser();
            vm.user.emails = vm.user.emails.toString();
            vm.user.phones = vm.user.phones.toString();
            vm.user.roles = vm.user.roles.toString();
            console.log(vm.user);

        }

        init();

        function update (user) {
            if (user.phones.length > 0) {
                user.phones = user.phones.split(",");
            }
            else {
                user.phones = [];
            }
            if (user.emails.length > 0) {
                user.emails = user.emails.split(",");
            }
            else {
                user.emails = [];
            }
            if (user.roles.length > 0) {
                user.roles = user.roles.split(",");
            }
            else {
                user.roles = [];
            }
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