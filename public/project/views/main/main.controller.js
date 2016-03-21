(function(){
    angular
        .module("Travelogue")
        .controller("MainTController", mainController);

    function mainController($scope, $location) {
        $scope.$location = $location;
    }
})();