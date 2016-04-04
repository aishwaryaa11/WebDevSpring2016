module.exports = function(mongoose) {

    var FieldSchema = mongoose.Schema({
        label: String,
        fieldId: String,
        type: String,
        placeholder: String,
        options: [{label: String, value: String}]
    }, {collection: 'assignment.fields'});
    return FieldSchema;
};