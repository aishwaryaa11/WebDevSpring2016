(function(){
    angular
        .module("Travelogue")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/diary", {
                templateUrl: "views/diary/diary.view.html",
                controller: "DiaryController"
            })
            .when("/diary-expand", {
                templateUrl: "views/diary/diary-expand.view.html",
                controller: "DiaryExpandController"
            })
            .when("/photos", {
                templateUrl: "views/photos/photos.view.html",
                controller: "PhotosController"
            })
            .otherwise("/home")
    }
})();