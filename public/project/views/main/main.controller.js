(function(){
    angular
        .module("Travelogue")
        .controller("MainController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();