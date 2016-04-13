(function(){
    angular
        .module("Travelogue")
        .controller("MainTController", mainController);

    function mainController($location) {
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();
    }
})();