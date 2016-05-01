(function () {
    angular
        .module("Travelogue")
        .factory("SearchService", searchService);

    function searchService($http) {
        var api = {
            search: search
        };

        return api;

        function search(term) {
            return $http.get("/api/project/user/000/search?term=" + term);
        }
    }
})();