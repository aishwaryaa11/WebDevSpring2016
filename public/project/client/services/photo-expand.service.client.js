"use strict";
(function() {
    angular
        .module("Travelogue")
        .factory("PhotoExpandService", photoExpandService);

    function photoExpandService($http) { //as of now, a field is a photo entry
        var service = {
            createFieldForPhoto: createFieldForPhoto,
            getFieldsForPhoto: getFieldsForPhoto,
            getFieldForPhoto: getFieldForPhoto,
            deleteFieldFromPhoto: deleteFieldFromPhoto,
            updateField: updateField
        };

        return service;

        function createFieldForPhoto(photoId, field) {
            return $http.post("/api/project/diary/" + photoId + "/field", field);
        }

        function getFieldsForPhoto(photoId) {
            return $http.get("/api/project/photo/" + photoId + "/field");
        }

        function getFieldForPhoto(photoId, fieldId) {
            return $http.get("/api/project/photo/" + photoId + "/field/" + fieldId);
        }

        function deleteFieldFromPhoto(photoId, fieldId) {
            return $http.delete("/api/project/photo/" + photoId + "/field/" + fieldId);
        }

        function updateField(photoId, fieldId, field) {
            return $http.put("/api/project/photo/" + photoId + "/field/" + fieldId, field);
        }

    }
})();