"use strict";
(function() {
    angular
        .module("Travelogue")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            //logout: logout,
            getProfile: getProfile,
            getCurrentUser: getCurrentUser
        };

        return service;

        function findUserByCredentials(username, password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findUserById(userId) {
            return $http.get("/api/project/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/user/" + username);
        }

        function findAllUsers() {
            return $http.get("/api/project/user");
        }

        function createUser(user) {
            return $http.post("/api/project/user", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/project/user/" + userId, user);
        }

        function getProfile() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $http.get("/api/project/loggedin");
        }

        //function logout() {
        //    return $http.post("/api/project/logout");
        //}

    }
})();