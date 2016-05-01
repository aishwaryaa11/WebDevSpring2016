module.exports = function(mongoose) {

    var DiaryExpandSchema = mongoose.Schema({
        label: String,
        type: String,
        userId: String,
        diaryId: String,
        placeholder: String,
        created: Date,
        updated: Date
    }, {collection: 'project.fields'});
    return DiaryExpandSchema;
};