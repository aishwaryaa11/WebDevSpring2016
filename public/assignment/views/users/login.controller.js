(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", loginController);

    function loginController($scope, UserService, $rootScope, $location) {
        $scope.message = null;
        $scope.login = login;

        function login(user) {
            var userTemp = UserService.findUserByCredentials(user.username, user.password);
            if (userTemp != null) {
                $rootScope.currentUser = userTemp;
                if (userTemp.roles != null && userTemp.roles.indexOf("admin") >= 0) {
                    $location.url("/admin");
                } else {
                    $location.url("/profile");
                }
            } else {
                $scope.message = "Cannot find user. Try again.";
                return ;
            }
        }
    }
})();