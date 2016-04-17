"use strict";
(function(){
    angular
        .module("Travelogue")
        .controller("RegisterController", registerController);

    function registerController(UserService, $location) {
        var vm = this;

        vm.message = null;
        vm.register = register;

        function init() {

        }
        init();

        function register(user) {
            if (user == null) {
                vm.message = "Please fill in the required fields";
                return ;
            }
            if (!user.username) {
                vm.message = "Please provide a username";
                return ;
            }
            if (!user.password || !user.verify) {
                vm.message = "Please provide a password";
                return ;
            }
            if (user.password != user.verify) {
                vm.message = "Passwords must match";
                return ;
            }
            if (!user.email) {
                vm.message = "Please provide an email address";
                return ;
            }

            //edit this so can check if user exists already
            //UserService
            //    .findUserByUsername(user.username)
            //    .then(function (response) {
            //        var userTemp = response.data;
            //        if (userTemp != null) {
            //            vm.message = "User already exists";
            //        } else {
            //            UserService
            //                .createUser(user)
            //                .then(function(response) {
            //                    var newUser = response.data;
            //                    if (newUser) {
            //                        UserService.setCurrentUser(newUser);
            //                        $location.path("/profile");
            //                    }
            //                });
            //        }
            //    });


            UserService
                .createUser(user)
                .then(function(response) {
                    if (response.statusCode == 11000){
                        vm.message = "User already exists";
                        return ;
                    }
                    var newUser = response.data;
                    if (newUser) {
                        UserService.setCurrentUser(newUser);
                        $location.path("/profile");
                    }
                });
        }
    }
})();