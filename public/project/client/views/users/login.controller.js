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
                return ;
            }
            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp !== '0') {
                        UserService.setCurrentUser(userTemp);
                        if (userTemp.admin == true) {
                            $location.path("/admin");
                            //return ;
                        } else {
                            $location.path("/profile");
                            //return ;
                        }
                    } else {
                        vm.message = "User does not exist";
                        return ;
                    }
                });

        }
    }
})();