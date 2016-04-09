var q = require('q');

module.exports = function (uuid, mongoose, db) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FieldModel = mongoose.model('Field', FieldSchema);
    var FormSchema = require("./form.schema.server.js")(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        createField: createField,
        deleteField: deleteField,
        findField: findField,
        updateField: updateField,
        findFieldsByFormId: findFieldsByFormId
    };

    return api;

    function findFormByTitle(title) {
        var deferred = q.defer();
        FormModel.findOne({title: title}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();
        FormModel.find({userId: userId}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findFormById (id) {
        var deferred = q.defer();
        FormModel.findById(id, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function findAllForms () {
        var deferred = q.defer();
        FormModel.find({}, function(err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteFormById (id) {
        var deferred = q.defer();
        FormModel.remove({_id: db.ObjectId(id)}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createFormForUser (userId, newForm) {
        var nForm = {
            title: newForm.title,
            userId: userId,
            fields: [],
            created: (new Date).getTime(),
            updated: (new Date).getTime()
        };

        var deferred = q.defer();

        FormModel.create(nForm, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function updateForm (id, form) {
        var newForm = {
            userId: form.userId,
            title: form.title,
            fields: form.fields,
            created: form.created,
            updated: (new Date).getTime()
        }

        var deferred = q.defer();

        form.updated = (new Date).getTime();
        FormModel.findByIdAndUpdate(id, {$set:newForm}, {new: true, upsert: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;
    }

    function createField(formId, field) {
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, {$push: {"fields": field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function deleteField(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findByIdAndUpdate(formId, {
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

    function findField(formId, fieldId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
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
                deferred.reject("Could not find field");
            }
        });
        return deferred.promise;
    }

    function findFieldsByFormId(formId) {
        var deferred = q.defer();
        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            }
            else {
                deferred.resolve(doc.fields);
            }
        });

        return deferred.promise;
    }

    function updateField(formId, field) {
        var deferred = q.defer();
        FormModel.update({_id: formId, "fields._id" : field._id}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
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