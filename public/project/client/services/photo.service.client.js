"use strict";
(function() {
    angular
        .module("Travelogue")
        .factory("PhotoService", photoService);

    function photoService($http) {

        var service = {
            createPhotoForUser: createPhotoForUser,
            findAllPhotosForUser: findAllPhotosForUser,
            findPhotoById: findPhotoById,
            findAllPhotos: findAllPhotos,
            deletePhotoById: deletePhotoById,
            updatePhotoById: updatePhotoById
        };

        return service;

        function createPhotoForUser(userId, photo) {
            return $http.post("/api/project/user/" + userId + "/photo", photo);
        }

        function findAllPhotosForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/photo");
        }

        function findPhotoById(photoId) {
            return $http.get("/api/project/photo/" + photoId);
        }

        function findAllPhotos() {
            return $http.get("/api/project/photo");
        }

        function deletePhotoById(photoId) {
            return $http.delete("/api/project/photo/" + photoId);
        }

        function updatePhotoById(photoId, newPhoto) {
            return $http.put("/api/project/photo/" + photoId, newPhoto);
        }
    }
})();