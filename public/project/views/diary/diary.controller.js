(function(){
    angular
        .module("Travelogue")
        .controller("DiaryController", diaryController);

    function diaryController($scope, DiaryService, $rootScope) {
        $scope.forms = DiaryService.findAllFormsForUser($rootScope.currentUser._id);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var selectedFormId = null;

        function addForm(form) {
            if (typeof form !== "undefined" && form.title != "") {
                var newForm = DiaryService.createFormForUser($rootScope.currentUser._id, form);
                $scope.forms.push(newForm);
            }
        }

        function updateForm(form) {
            var newForm = DiaryService.updateFormById(selectedFormId, form);
        }

        function deleteForm(index) {
            selectedFormId = $scope.forms[index]._id;
            DiaryService.deleteFormById(selectedFormId);
            $scope.forms.splice(index, 1);
        }

        function selectForm(index) {
            selectedFormId = $scope.forms[index]._id;
            var form = DiaryService.findFormById(selectedFormId);
            $scope.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };
        }
    }
})();