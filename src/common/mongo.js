const fs = require('fs');
const path = require('path');
const Mongoose = require('mongoose');

const basename = path.basename(__filename);
let modelsInitialized = false;
let models = null;

exports.initialize = () => {
    models = {};
    Mongoose.Promise = global.Promise;
    Mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });

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

module.exports = exports;
