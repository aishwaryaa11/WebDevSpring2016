(function(){
    angular
        .module("Travelogue")
        .controller("DiaryExpandController", diaryExpandController);

    function diaryExpandController(FieldService, FormService, $routeParams) {
        var vm = this;
        vm.currentField = null;
        vm.eField = null;
        vm.editField = editField;
        vm.commitEdit = commitEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;
        vm.reorder = reorder;
        vm.options =
            [
                'Single Line Text Field',
                'Multi Line Text Field',
            ];

        var formId = "000";
        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        vm.sortableOptions = {
            orderChanged: function(e) {
                vm.form.fields = vm.fields;
                FormService
                    .updateFormById(formId, vm.form)
                    .then(init);
            }
        };

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"}
            ];

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    vm.fields = response.data;
                    vm.eField = null;
                });
            FormService
                .findFormById(formId)
                .then(function (response)
                {
                    vm.form = response.data;
                })
        }

        init();

        function sendEdit(field) {
            vm.currentField = null;
            FieldService
                .updateField(formId, field._id, field)
                .then(init);
        }

        function reorder() {
            vm.form.fields = vm.fields;
            FormService
                .updateFormById(formId, vm.form)
                .then(init);
        }

        function deleteField(field) {
            vm.currentField = null;
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(init);
        }

        function translateFieldType(fieldType) {
            for (var k in optionMap) {
                console.log(optionMap[k].key + " " + optionMap[k].value);
                if (optionMap[k].key == fieldType){
                    return optionMap[k].value;
                }
            }
        }

        function addField(fieldType) {
            var field = {"label": "", "type": translateFieldType(fieldType), "placeholder": "", "options": null};
            console.log(field);
            FieldService
                .createFieldForForm(formId, field)
                .then(init);
        }


        function editField(field) {
            vm.eField = field;
            var optionList = [];
            var ol = vm.eField.options;
            for (var o in ol) {
                optionList.push(ol[o].label + ":" + ol[o].value)
            }
            vm.optionText = optionList.join("\n");
        }

        function commitEdit(field) {
            vm.eField = field;
            FieldService
                .updateField(formId, vm.eField._id, vm.eField)
                .then(init);
        }
    }
})();