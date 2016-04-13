var q = require('q');

module.exports = function (uuid, mongoose, db) {

    var DiaryExpandSchema = require("./diary-expand.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('DiaryExpand', DiaryExpandSchema);
    var DiarySchema = require("./diary.schema.server.js")(mongoose);
    var DiaryModel = mongoose.model('Diary', DiarySchema);

    var api = {
        createDiaryForUser: createDiaryForUser,
        deleteDiaryById: deleteDiaryById,
        findAllDiaries: findAllDiaries,
        findDiaryById: findDiaryById,
        updateDiary: updateDiary,
        findDiaryByTitle: findDiaryByTitle,
        findDiariesByUserId: findDiariesByUserId,
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByDiaryId: findFieldsByDiaryId
    };

    return api;

    function findDiaryByTitle(title) {
        var deferred = q.defer();
        DiaryModel.findOne({title: title}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

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

    function createDiaryForUser (userId, newDiary) {
        var nDiary = {
            title: newDiary.title,
            notes: newDiary.notes,
            userId: userId,
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

    function updateDiary (id, diary) {
        var newDiary = {
            userId: diary.userId,
            title: diary.title,
            notes: diary.notes,
            fields: diary.fields,
            created: diary.created,
            updated: (new Date).getTime()
        }

        var deferred = q.defer();

        diary.updated = (new Date).getTime();
        DiaryModel.findByIdAndUpdate(id, {$set:newDiary}, {new: true, upsert: true}, function (err, doc) {
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
        DiaryModel.findByIdAndUpdate(diaryId, {
                $pull: {fields:
                {_id: fieldId}
                }},
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

    function findField(diaryId, fieldId) {
        var deferred = q.defer();
        DiaryModel.findById(diaryId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                for (f in doc.fields) {
                    if (doc.fields[f]._id === fieldId) {
                        deferred.resolve(doc.fields[f]);
                        return deferred.promise;
                    }
                }
                deferred.reject("Could not find entry");
            }
        });
        return deferred.promise;
    }

    function findFieldsByDiaryId(diaryId) {
        var deferred = q.defer();
        DiaryModel.findById(diaryId, function (err, doc) {
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
        DiaryModel.update({_id: diaryId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }
};