module.exports = function(mongoose) {

    var DiaryExpandSchema = mongoose.Schema({
        title: String,
        text: String,
        tags: String,
        options: [{label: String, value: String}] //3 options: rating (stars), favorite?, flag for later
    }, {collection: 'project.fields'});
    return DiaryExpandSchema;
};