const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    url: {
        type: String,
        required: 'url required'
    },
    payload: {
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', LogSchema);
