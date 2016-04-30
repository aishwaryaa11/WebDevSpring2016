"use strict";
(function(){
    angular
        .module("Travelogue")
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
            UserService.updateUser(user._id, user)
                .then(function (response) {
                    init();
                });
        }
    }
})();