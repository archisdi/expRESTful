const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    action: {
        type: String,
        required: 'url required'
    },
    details: {
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Log', LogSchema);
