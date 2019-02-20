const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');

const { mongodb: config } = require('../config/database');

const basename = path.basename(__filename);
let modelsInitialized = false;
let models = null;

exports.initialize = () => {
    models = {
        session: null
    };

    Mongoose.Promise = global.Promise;
    Mongoose.connect(config.connection_string, config.options);

    const modelsDir = path.join(__dirname, '../models/mongodb');
    fs.readdirSync(modelsDir)
        .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach((file) => {
            const model = require(path.join(modelsDir, file));
            models[model.modelName] = model;
        });

    models.ORMProvider = Mongoose;
    models.context = Mongoose;
    modelsInitialized = true;
};

exports.getInstance = async () => {
    if (!modelsInitialized) await exports.initialize();
    return models;
};

exports.startSession = async () => {
    if (!modelsInitialized) await exports.initialize();
    models.session = await models.context.startSession();
    models.session.startTransaction();
};

exports.endSession = () => {
    if (models && models.session) {
        models.session.endSession();
        models.session = null;
    }
};

exports.commit = async () => {
    if (models && models.session) {
        await models.session.commitTransaction();
        exports.endSession();
    }
};

exports.rollback = async () => {
    if (models && models.session) {
        await models.session.abortTransaction();
        exports.endSession();
    }
};

exports.getSession = () => models.session;

module.exports = exports;
