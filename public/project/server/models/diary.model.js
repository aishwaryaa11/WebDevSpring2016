var q = require('q');

module.exports = function (mongoose, db) {

    var DiarySchema = require("./diary.schema.server.js")(mongoose);
    var DiaryModel = mongoose.model('Diary', DiarySchema);

    var api = {
        createDiaryForUser: createDiaryForUser,
        deleteDiaryById: deleteDiaryById,
        findAllDiaries: findAllDiaries,
        findDiaryById: findDiaryById,
        updateDiary: updateDiary,
        findDiariesByUserId: findDiariesByUserId,
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findAllFields: findAllFields,
        findFieldsByDiaryId: findFieldsByDiaryId,
        findFieldsByUserId: findFieldsByUserId,
        searchFieldsByName: searchFieldsByName,
        searchDiariesByName: searchDiariesByName
    };

    return api;


    function searchDiariesByName(term) {
        var deferred = q.defer();

        DiaryModel.find({"title": {$regex: term, $options: "i"}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function searchFieldsByName(term) {
        var deferred = q.defer();

        DiaryModel.find({"fields.title": {$regex: term, $options: "i"}}, {"fields":true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function findDiariesByUserId(userId) {
        var deferred = q.defer();
        DiaryModel.find({userId: userId}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findDiaryById (id) {
        var deferred = q.defer();
        DiaryModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllDiaries () {
        var deferred = q.defer();
        DiaryModel.find({}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteDiaryById (id) {
        var deferred = q.defer();
        DiaryModel.remove({_id: id}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createDiaryForUser (newDiary) {
        var nDiary = {
            title: newDiary.title,
            notes: newDiary.notes,
            userId: newDiary.userId,
            fields: [],
            created: (new Date).getTime(),
            updated: (new Date).getTime()
        };

        var deferred = q.defer();

        DiaryModel.create(nDiary, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateDiary (diary) {
        var newDiary = {
            userId: diary.userId,
            title: diary.title,
            notes: diary.notes,
            fields: diary.fields,
            created: diary.created,
            updated: (new Date).getTime()
        }

        var deferred = q.defer();

        DiaryModel.findByIdAndUpdate(diary._id, {$set:newDiary}, {new: true, upsert: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }


    function createField(diaryId, field) {
        var deferred = q.defer();
        DiaryModel.findByIdAndUpdate(diaryId, {$push: {"fields": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }


    function deleteField(diaryId, fieldId) {
        var deferred = q.defer();
        DiaryModel.findByIdAndUpdate(diaryId, {$pull: {fields: {_id: fieldId} }},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findField(fieldId) {
        var deferred = q.defer();
        DiaryModel.findOne({"fields._id" : fieldId}, {"fields.$": 1}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                var field = doc.fields[0];
                deferred.resolve(field);
            }
        });
        return deferred.promise;
    }

    function findFieldsByDiaryId(diaryId) {
        var deferred = q.defer();
        DiaryModel.findOne({_id : diaryId}, {'fields':true,'_id':false}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc.fields);
            }
        });
        return deferred.promise;
    }

    function updateField(diaryId, field) {
        var deferred = q.defer();
        DiaryModel.update({_id: diaryId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(doc)
                }
            });
        return deferred.promise;
    }

    function findAllFields() {
        var deferred = q.defer();
        DiaryModel.find({}, {'fields':true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findFieldsByUserId(userId) {
        var deferred = q.defer();
        DiaryModel.find({"fields.userId" : {$in : [userId]}}, {"fields":true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                if (doc[0]) {
                    deferred.resolve(doc[0].fields)
                }
                else {
                    deferred.resolve(doc[0]);
                }
            }
        });
        return deferred.promise;
    }
};