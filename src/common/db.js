const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const { sequelize: config } = require('../config/database');

const basename = path.basename(__filename);
let modelsInitialized = false;
let models = null;

exports.initialize = async () => {
    models = {};
    const sequelize = new Sequelize(config.connection_string, config.options);

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

exports.startTransaction = async () => {
    if (!modelsInitialized) await exports.initialize();
    models.db_transaction = await models.context.transaction({
        isolationLevel: models.context.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED
    });
};

exports.endTransaction = () => {
    models.db_transaction = null;
};

exports.getTransaction = () => models.db_transaction;

exports.commit = async () => {
    if (models && models.db_transaction) {
        await models.db_transaction.commit();
        exports.endTransaction();
    }
};

exports.rollback = async () => {
    if (models && models.db_transaction) {
        await models.db_transaction.rollback();
        exports.endTransaction();
    }
};

exports.closeContext = async () => {
    let result = null;

    if (models && models.context) {
        console.info('Closing - DBContext'); // eslint-disable-line
        result = await models.context.close().catch((err) => {
            console.error(`Error Closing DBContext: ${err.stack}`); // eslint-disable-line
        });
        console.info('Closed - DBContext'); // eslint-disable-line
    }

    models = null;
    modelsInitialized = false;
    return result;
};

module.exports = exports;
