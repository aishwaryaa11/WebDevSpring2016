"use strict";
(function(){
    angular
        .module("Travelogue")
        .controller("LoginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;

        vm.login = login;
        vm.message = null;

        function init() {

        }
        init();

        function login(user) {
            if(!user) {
                vm.message = "User does not exist";
                return;
            }
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        UserService.setCurrentUser(userTemp);
                        if (userTemp.roles != null && userTemp.roles.indexOf("admin") >= 0) {
                            $location.path("/admin");
                        } else {
                            $location.path("/profile");
                        }
                    } else {
                        vm.message = "User does not exist";
                    }
                });
        }
    }
})();