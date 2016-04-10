"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormsController);

    function FormsController(FormService, $rootScope, $location) {
        var vm = this;

        vm.deleteForm = deleteForm;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.selectForm = selectForm;
        vm.forms = [];
        vm.form = null;
        vm.goToFields = goToFields;

        function renderForms (response) {
            vm.forms = response.data;
        }

        function init () {
            FormService
                .findAllFormsForUser($rootScope.currentUser._id)
                .then(renderForms);
            vm.form = null;
        }

        init();

        function goToFields(formId) {
            $location.url("#/form/" + formId + "/fields");
        }

        function deleteForm (form) {
            FormService
                .deleteFormById(form._id)
                .then(init);
        }

        function addForm (form) {
            FormService
                .createFormForUser($rootScope.currentUser._id, form)
                .then(init);
        }

        function updateForm (form) {
            FormService
                .updateFormById(form._id, form)
                .then(init);
        }

        function selectForm (fIndex) {
            vm.form = vm.forms[fIndex];
        }
    }
})();