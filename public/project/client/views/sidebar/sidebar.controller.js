(function(){
    angular
        .module("Travelogue")
        .controller("SidebarController", sidebarController);

    function sidebarController($location) {
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();
    }
})();