(function(){
    angular
        .module("Travelogue")
        .controller("DiaryExpandController", diaryExpandController);

    function diaryExpandController($scope, $rootScope, DiaryService, $location) {
        $scope.message = null;
        $scope.error = null;

        $scope.update = update;
        $scope.remove = remove;
        $scope.currentDiary = $rootScope.currentDiary;

        if (!$scope.currentDiary) {
            $location.url("/home");
        }

        function update(diary) {
            $scope.currentDiary = DiaryService.updateDiaryById($scope.currentDiary._id, diary);

            if (diary) {
                $scope.message = "Successfully updated Diary";
                $rootScope.currentDiary = $scope.currentDiary;
            } else {
                $scope.message = "Unable to update Diary. Try again.";
            }
        }

        function remove(diary) {
            $scope.currentDiary = DiaryService.deleteDiaryById($scope.currentDiary._id, diary);

            if (diary) {
                $scope.message = "Successfully updated Diary";
                $rootScope.currentDiary = $scope.currentDiary;
            } else {
                $scope.message = "Unable to update Diary. Try again.";
            }
        }
    }
})();