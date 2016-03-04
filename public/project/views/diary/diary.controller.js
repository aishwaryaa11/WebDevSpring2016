(function(){
    angular
        .module("Travelogue")
        .controller("DiaryController", diaryController);

    function diaryController($scope, DiaryService, $rootScope) {
        $scope.diaries = DiaryService.findAllFormsForUser($rootScope.currentUser._id);

        $scope.addD = addD;
        $scope.updateD = updateD;
        $scope.deleteD = deleteD;
        $scope.selectD = selectD;

        var selectedDId = null;

        function addD(d) {
            if (typeof d !== "undefined" && d.title != "") {
                var newD = DiaryService.createFormForUser($rootScope.currentUser._id, d);
                $scope.forms.push(newD);
            }
        }

        function updateD(d) {
            var newD = DiaryService.updateFormById(selectedDId, d);
        }

        function deleteD(index) {
            selectedDId = $scope.diaries[index]._id;
            DiaryService.deleteDiaryById(selectedDId);
            $scope.diaries.splice(index, 1);
        }

        function selectD(index) {
            selectedDId = $scope.diaries[index]._id;
            var d = DiaryService.findFormById(selectedDId);
            $scope.d = {
                _id: d._id,
                title: d.title,
                userId: d.userId
            };
        }
    }
})();