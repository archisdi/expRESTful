const mongoose = require('mongoose');
const UUID = require('uuid');

const Schema = mongoose.Schema;

const LogSchema = new Schema({
    id: {
        type: String,
        default: UUID.v4
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
}, { versionKey: false, collection: 'logs' });

module.exports = mongoose.model('Log', LogSchema);
