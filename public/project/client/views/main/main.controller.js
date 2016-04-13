(function(){
    angular
        .module("Travelogue")
        .controller("MainController", mainController);

    function mainController($location) {
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();
    }
})();