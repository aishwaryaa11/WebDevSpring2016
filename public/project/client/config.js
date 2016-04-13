"use strict";
(function(){
    angular
        .module("Travelogue")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            })
            .when("/diary", {
                templateUrl: "views/diary/diary.view.html",
                controller: "DiaryController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/diary/:diaryId/diary-expand", {
                templateUrl: "views/diary/diary-expand.view.html",
                controller: "DiaryExpandController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            //.when("/photos", {
            //    templateUrl: "views/photos/photos.view.html",
            //    controller: "PhotosController",
            //    controllerAs: "model",
            //    resolve: {
            //        checkLoggedIn: checkLoggedIn
            //    }
            //})
            //.when("/photos/:photoId/photos-expand", {
            //    templateUrl: "views/photos/photos-expand.view.html",
            //    controller: "PhotosExpandController",
            //    controllerAs: "model",
            //    resolve: {
            //        checkLoggedIn: checkLoggedIn
            //    }
            //})
            .otherwise({
                redirectTo: "/home"
            })
    }


    function getLoggedIn(UserService, $q) {
        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response){
                var currentUser = response.data;
                UserService.setCurrentUser(currentUser);
                deferred.resolve();
            });

        return deferred.promise;
    }



    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService
            .getCurrentUser()
            .then(function(response) {
                var currentUser = response.data;
                if(currentUser) {
                    UserService.setCurrentUser(currentUser);
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/home");
                }
            });

        return deferred.promise;
    }

})();