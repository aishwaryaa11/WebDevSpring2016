(function(){
    angular
        .module("Travelogue")
        .controller("PhotosController", photosController);

    function photosController($scope, PhotoService, $rootScope) {
        $scope.photos = PhotoService.findAllPhotosForUser($rootScope.currentUser._id);

        $scope.addP = addP;
        $scope.updateP = updateP;
        $scope.deleteP = deleteP;
        $scope.selectP = selectP;

        var selectedPId = null;

        function addP(p) {
            if (typeof p !== "undefined" && p.title != "") {
                var newP = PhotoService.createPhotoForUser($rootScope.currentUser._id, p);
                $scope.photos.push(newP);
            }
        }

        function updateP(p) {
            var newP = PhotoService.updatePhotoById(selectedPId, p);
        }

        function deleteP(index) {
            selectedPId = $scope.photos[index]._id;
            PhotoService.deletePhotoById(selectedPId);
            $scope.photos.splice(index, 1);
        }

        function selectP(index) {
            selectedPId = $scope.photos[index]._id;
            var p = PhotoService.findPhotoById(selectedPId);
            $scope.p = {
                _id: p._id,
                title: p.title,
                images: p.images,
                tags: p.tags,
                userId: p.userId
            };
        }
    }
})();