const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    dateAdded: {type: Date, default: Date.now, required: true}, 
    destUrl: {type: String, required: true}, 
    slug: {type: String, required: true}, 
    shortUrl: {type: String, required: true}, 
    count: {type: Number, default: 0, required: true},
})

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;