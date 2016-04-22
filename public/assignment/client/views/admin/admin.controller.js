"use strict";
(function(){
    angular
        .module("FormBuilderApp")
        .controller("AdminController", adminController);

    function adminController(UserService) {
        var vm = this;
        vm.users = [];
        vm.user = null;
        vm.deleteUser = deleteUser;
        vm.addUser = addUser;
        vm.updateUser = updateUser;
        vm.selectUser = selectUser;
        vm.ascending = true;
        vm.userSort = userSort;
        vm.sortOnFirstName = sortOnFirstName;
        vm.sortOnUsername = sortOnUsername;
        vm.sortOnLastName = sortOnLastName;

        function init() {
            UserService
                .adminFindAllUsers()
                .then(function (response) {
                    vm.users = response.data;
                });
        }
        init();

        function deleteUser(user) {
            UserService
                .adminDeleteUser(user)
                .then(init);
        }

        function updateUser(user) {
            UserService
                .adminUpdateUser(user)
                .then(init);
            vm.user = null;
        }

        function addUser(user) {
            UserService
                .adminCreateUser(user)
                .then(init);
            vm.user = null;
        }

        function selectUser(index) {
            vm.user = vm.users[index];
        }

        function userSort(func) {
            vm.users.sort(func);
            vm.ascending = !vm.ascending;
            console.log(vm.ascending);
        }

        function sortOnUsername(a, b) {
            var ret = 0;
            if (a.username < b.username) {ret = -1;}
            else if (a.username === b.username) {ret = 0;}
            else {ret = 1;}

                if(vm.ascending) {ret = ret * -1;}

                return ret;
        }

        function sortOnFirstName(a, b) {
            var ret = 0;
            if (a.firstName < b.firstName) {ret = -1;}
            else if (a.firstName === b.firstName) {ret = 0;}
            else {ret = 1;}

                if(vm.ascending) {ret = ret * -1;}

                return ret;
        }

        function sortOnLastName(a, b) {
            var ret = 0;
            if (a.lastName < b.lastName) {ret = -1;}
            else if (a.lastName === b.lastName) {ret = 0;}
            else {ret = 1;}

                if(vm.ascending) {ret = ret * -1;}

                return ret;
        }
    }

})();