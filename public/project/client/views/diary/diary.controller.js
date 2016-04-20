"use strict";
(function () {
    angular
        .module("Travelogue")
        .controller("DiaryController", diaryController);

    function diaryController(DiaryService, $rootScope, $location) {
        var vm = this;

        vm.deleteDiary = deleteDiary;
        vm.addDiary = addDiary;
        vm.updateDiary = updateDiary;
        vm.selectDiary = selectDiary;
        vm.diaries = [];
        vm.diary = null;
        vm.goToFields = goToFields;

        function renderDiaries (response) {
            vm.diaries = response.data;
        }

        function init () {
            DiaryService
                .findAllDiariesForUser($rootScope.currentUser._id)
                .then(renderDiaries);
            vm.diary = null;
        }

        init();

        function goToFields(diaryId) {
            $location.url("#/diary/" + diaryId + "/fields");
        }

        function deleteDiary (diary) {
            DiaryService
                .deleteDiaryById(diary._id)
                .then(init);
        }

        function addDiary (diary) {
            DiaryService
                .createDiaryForUser($rootScope.currentUser._id, diary)
                .then(init);
        }

        function updateDiary (diary) {
            DiaryService
                .updateDiaryById(diary._id, diary)
                .then(init);
        }

        function selectDiary (dIndex) {
            vm.diary = vm.diaries[dIndex];
        }
    }
})();