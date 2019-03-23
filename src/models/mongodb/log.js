const mongoose = require('mongoose');
const uuid = require('uuid');
require('mongoose-uuid2')(mongoose);

const { Schema, model, Types } = mongoose;
const options = { versionKey: false, timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toJSON: { virtuals: true } };

const LogSchema = new Schema({
    _id: {
        type: Types.UUID,
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
}, { ...options, collection: 'logs' });

module.exports = model('Log', LogSchema);
