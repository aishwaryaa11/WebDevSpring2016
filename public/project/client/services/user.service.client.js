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
            logout: logout,
            getProfile: getProfile,
            getCurrentUser: getCurrentUser,
            findUserByDiaryId: findUserByDiaryId,
            register: register,
            login: login,
            adminCreateUser: adminCreateUser,
            adminFindAllUsers: adminFindAllUsers,
            adminFindUser: adminFindUser,
            adminDeleteUser: adminDeleteUser,
            adminUpdateUser: adminUpdateUser
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

        function logout() {
            setCurrentUser(null);
            return $http.post("/api/project/logout");
        }

        function login(username, password) {
            var cred = {username: username, password: password};
            return $http.post("/api/project/login", cred);

        }

        function register(user) {
            return $http.post("/api/project/register", user);
        }

        function findUserByDiaryId(diaryId) {
            return $http.get("/api/project/diary/" + diaryId + "/user");
        }

        function adminCreateUser(user) {
            return $http.post("/api/project/admin/user", user);
        }

        function adminFindAllUsers() {
            return $http.get("/api/project/admin/user");
        }

        function adminFindUser(user) {
            return $http.get("/api/project/admin/user/" + user._id);
        }

        function adminUpdateUser(user) {
            return $http.put("/api/project/admin/user/" + user._id, user);
        }

        function adminDeleteUser(user) {
            return $http.delete("/api/project/admin/user/" + user._id);
        }

    }
})();