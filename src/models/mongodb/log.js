const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    action: {
        type: String,
        required: 'action required'
    },
    details: {
        type: Object
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('Log', LogSchema);
