"use strict";
(function() {
    angular
        .module("FormBuilderApp")
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
            logout: logout,
            getProfile: getProfile,
            getCurrentUser: getCurrentUser,
            adminCreateUser: adminCreateUser,
            adminFindAllUsers: adminFindAllUsers,
            adminFindUser: adminFindUser,
            adminDeleteUser: adminDeleteUser,
            adminUpdateUser: adminUpdateUser
        };

        return service;

        function findUserByCredentials(username, password) {
            return $http.post("/api/assignment/login", {username: username, password: password});
        }

        function findUserById(userId) {
            return $http.get("/api/assignment/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/assignment/user/" + username);
        }

        function findAllUsers() {
            return $http.get("/api/assignment/user");
        }

        function createUser(user) {
            return $http.post("/api/assignment/register", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId);
        }

        function updateUser(userId, user) {
            return $http.put("/api/assignment/user/" + userId, user);
        }

        function getProfile() {
            return $rootScope.currentUser;
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser() {
            return $rootScope.currentUser;
        }

        function logout() {
            return $http.post("/api/assignment/logout");
        }

        function adminCreateUser(user) {
            return $http.post("/api/assignment/admin/user", user);
        }

        function adminFindAllUsers() {
            return $http.get("/api/assignment/admin/user");
        }

        function adminFindUser(user) {
            return $http.get("/api/assignment/admin/user/" + user._id);
        }

        function adminUpdateUser(user) {
            return $http.put("/api/assignment/admin/user/" + user._id, user);
        }

        function adminDeleteUser(user) {
            return $http.delete("/api/assignment/admin/user/" + user._id);
        }

    }
})();