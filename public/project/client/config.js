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
                    checkAdmin : checkAdmin
                }
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn : checkLoggedIn
                }
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                resolve: {
                    checkLoggedIn : checkLoggedIn
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
            .when("/diary/:diaryId/fields", {
                templateUrl: "views/diary/diary-expand.view.html",
                controller: "DiaryExpandController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            })
    }


    function checkLoggedIn(UserService, $rootScope, $http, $q, $location) {
        var deferred = $q.defer();


        $http.get("/api/project/loggedin").success(function(user)
        {
            $rootScope.errorMessage = null;

            if (user !== '0') {
                console.log(user);
                UserService.setCurrentUser(user);
                deferred.resolve();
                return deferred.promise;
            }
            else {
                console.log(user);
                $rootScope.errorMessage = "You need to log in.";
                deferred.reject();
                $location.url("/home")
                return deferred.promise;
            }
        });
    }

    function checkAdmin($http, $q, $location, UserService) {
        var deferred = $q.defer();

        $http.get("/api/project/loggedin").success(function(user)
        {
            if (user.admin) {
                console.log(user);
                UserService.setCurrentUser(user);
                deferred.resolve();
            }
            else {
                deferred.reject();
                $location.url("/profile");
            }
        });
        return deferred.promise;
    }

})();