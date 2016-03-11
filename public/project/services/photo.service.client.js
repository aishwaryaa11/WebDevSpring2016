(function() {
    angular
        .module("Travelogue")
        .factory("PhotoService", photoService);

    function photoService() {

        var photos = [
            {"_id": "000", "title": "Contacts", "images": "image1", "tags": "LOL", "userId": 123},
            {"_id": "010", "title": "ToDo",  "images": "image2, image3",   "userId": 123},
            {"_id": "020", "title": "CDs", "images": "image4",  "userId": 234}
        ];


        var service = {
            createPhotoForUser: createPhotoForUser,
            findAllPhotosForUser: findAllPhotosForUser,
            findPhotoById: findPhotoById,
            findAllPhotos: findAllPhotos,
            deletePhotoById: deletePhotoById,
            updatePhotoById: updatePhotoById
        };

        return service;

        function createPhotoForUser(userId, photo, callback) {
            var newP = {
                _id: (new Date).getTime(),
                title: photo.title,
                images: photo.images,
                tags: photo.tags,
                userId: userId
            };

            photos.push(newP);
            return newP;
        }

        function findAllPhotosForUser(userId, callback) {
            var res = [];
            for (var f in photos) {
                if (photos[f].userId == userId) {
                    res.push(photos[f]);
                }
            }

            return res;
        }

        function findPhotoById(PId, callback) {
            for (var f in photos) {
                if (photos[f]._id == PId) {
                    return photos[f];
                }
            }

            return null;
        }

        function findAllPhotos(callback) {
            return photos;
        }

        function deletePhotoById(PId, callback) {
            var photo = findPhotoById(PId);
            if (photo != null) {
                photos.splice(photos.indexOf(photo), 1);
            } else {
                return null;
            }
        }

        function updatePhotoById(PId, newP, callback) {
            var Temp = findPhotoById(PId);
            if (Temp != null) {
                Temp.title = newP.title;
                Temp.images = newP.images;
                Temp.tags = newP.tags;
                Temp.userId = newP.userId;
                return Temp;
            } else {
                return null;
            }
        }
    }
})();