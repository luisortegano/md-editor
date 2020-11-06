const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// schema
const documentSchema = new mongoose.Schema({
    name: { type: String },
    date: { type: Date },
    content: { type: String },
});

module.exports = mongoose.model('documents', documentSchema);