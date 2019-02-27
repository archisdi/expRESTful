const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    uuid: {
        type: String,
        default: uuid.v4
    },
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
