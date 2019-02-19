const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { sequelize: config } = require('../config/database');

const basename = path.basename(__filename);
let modelsInitialized = false;
let models = null;

exports.initialize = async () => {
    models = {};
    const sequelize = new Sequelize(config.table, config.username, config.password, config.options);

    const modelsDir = path.join(__dirname, '../models/sequelize');
    fs.readdirSync(modelsDir)
        .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
        .forEach((file) => {
            const model = sequelize.import(path.join(modelsDir, file));
            models[model.name] = model;
        });

    Object.keys(models).forEach((modelName) => {
        if (models[modelName].associate) {
            models[modelName].associate(models);
        }
    });

    models.ORMProvider = Sequelize;
    models.context = sequelize;
    modelsInitialized = true;
};

exports.getInstance = async () => {
    if (!modelsInitialized) await exports.initialize();
    return models;
};
