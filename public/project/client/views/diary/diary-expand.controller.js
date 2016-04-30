(function(){
    angular
        .module("Travelogue")
        .controller("DiaryExpandController", diaryExpandController);

    function diaryExpandController(diaryExpandService, DiaryService, $routeParams) {
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

        var diaryId = "000";
        if ($routeParams.diaryId) {
            diaryId = $routeParams.diaryId;
        }

        vm.sortableOptions = {
            orderChanged: function(e) {
                vm.diary.fields = vm.fields;
                DiaryService
                    .updateDiaryById(diaryId, vm.diary)
                    .then(init);
            }
        };

        var optionMap =
            [
                {key: "Single Line Text Field", value: "TEXT"},
                {key: "Multi Line Text Field", value: "TEXTAREA"}
            ];

        function init() {
            diaryExpandService
                .getFieldsForDiary(diaryId)
                .then(function (response) {
                    vm.fields = response.data;
                    vm.eField = null;
                });
            DiaryService
                .findDiaryById(diaryId)
                .then(function (response)
                {
                    vm.diary = response.data;
                })
        }

        init();

        function sendEdit(field) {
            vm.currentField = null;
            diaryExpandService
                .updateField(diaryId, field._id, field)
                .then(init);
        }

        function reorder() {
            vm.diary.fields = vm.fields;
            DiaryService
                .updateDiaryById(diaryId, vm.diary)
                .then(init);
        }

        function deleteField(field) {
            vm.currentField = null;
            diaryExpandService
                .deleteFieldFromDiary(diaryId, field._id)
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
            var field = {"title": "", "type": translateFieldType(fieldType), "placeholder": "", "options": null};
            console.log(field);
            diaryExpandService
                .createFieldForDiary(diaryId, field)
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
            diaryExpandService
                .updateField(diaryId, vm.eField._id, vm.eField)
                .then(init);
        }
    }
})();