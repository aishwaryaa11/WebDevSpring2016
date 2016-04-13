"use strict";
(function() {
    angular
        .module("Travelogue")
        .factory("DiaryService", diaryService);

    function diaryService($http) {

        var service = {
            createDiaryForUser: createDiaryForUser,
            findAllDiariesForUser: findAllDiariesForUser,
            findDiaryById: findDiaryById,
            findAllDiaries: findAllDiaries,
            deleteDiaryById: deleteDiaryById,
            updateDiaryById: updateDiaryById
        };

        return service;

        function createDiaryForUser(userId, diary) {
            return $http.post("/api/project/user/" + userId + "/diary", diary);
        }

        function findAllDiariesForUser(userId) {
            return $http.get("/api/project/user/" + userId + "/diary");
        }

        function findDiaryById(diaryId) {
            return $http.get("/api/project/diary/" + diaryId);
        }

        function findAllDiaries() {
            return $http.get("/api/project/diary");
        }

        function deleteDiaryById(diaryId) {
            return $http.delete("/api/project/diary/" + diaryId);
        }

        function updateDiaryById(diaryId, newDiary) {
            return $http.put("/api/project/diary/" + diaryId, newDiary);
        }
    }
})();