module.exports = function(mongoose) {

    var DiaryExpandSchema = require('./diary-expand.schema.server.js')(mongoose);

    var DiarySchema = mongoose.Schema({
        userId: String,
        title: String,
        notes: String,
        fields: [DiaryExpandSchema],
        created: Date,
        updated: Date
    }, {collection: 'project.diaries'});
    return DiarySchema;
};