module.exports = function(mongoose) {

    var DiaryExpandSchema = mongoose.Schema({
        label: String,
        type: String,
        userId: String,
        placeholder: String,
        options: [{label: String, value: String}], //2 options: diary body or tags
        created: Date,
        updated: Date
    }, {collection: 'project.fields'});
    return DiaryExpandSchema;
};