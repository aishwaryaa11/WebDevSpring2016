"use strict";
(function(){
    angular
        .module("FormBuilderApp")
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
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                controllerAs: "model"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormController",
                controllerAs: "model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/form/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
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

        $http.get("/api/assignment/loggedin").success(function(user)
        {
            $rootScope.errorMessage = null;

            if (user !== '0') {
                console.log(user);
                UserService.setCurrentUser(user);
                deferred.resolve();
            }
            else {
                $rootScope.errorMessage = "You need to log in.";
                deferred.reject();
                $location.url("/home")
            }
        });
        return deferred.promise;
    }

    function checkAdmin($http, $q, $location, UserService) {
        var deferred = $q.defer();

        $http.get("/api/assignment/loggedin").success(function(user)
        {
            if (user.roles.indexOf("admin") > -1) {
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