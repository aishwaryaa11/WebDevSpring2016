"use strict";
(function() {
    angular
        .module("Travelogue")
        .factory("DiaryExpandService", diaryExpandService);

    function diaryExpandService($http) { //as of now, a field is a diary entry
        var service = {
            createFieldForDiary: createFieldForDiary,
            getFieldsForDiary: getFieldsForDiary,
            getFieldForDiary: getFieldForDiary,
            deleteFieldFromDiary: deleteFieldFromDiary,
            updateField: updateField
        };

        return service;

        function createFieldForDiary(diaryId, field) {
            return $http.post("/api/project/diary/" + diaryId + "/field", field);
        }

        function getFieldsForDiary(diaryId) {
            return $http.get("/api/project/diary/" + diaryId + "/field");
        }

        function getFieldForDiary(diaryId, fieldId) {
            return $http.get("/api/project/diary/" + diaryId + "/field/" + fieldId);
        }

        function deleteFieldFromDiary(diaryId, fieldId) {
            return $http.delete("/api/project/diary/" + diaryId + "/field/" + fieldId);
        }

        function updateField(diaryId, fieldId, field) {
            return $http.put("/api/project/diary/" + diaryId + "/field/" + fieldId, field);
        }

    }
})();