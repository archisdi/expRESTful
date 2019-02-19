const DBContext = require('../common/db');

exports.findOne = async (conditions, attributes) => {
    const db = await DBContext.getInstance();
    return db.User.findOne({ where: conditions, attributes });
};

exports.findAll = async (conditions, attributes) => {
    const db = await DBContext.getInstance();
    return db.User.findAll({ where: conditions, attributes });
};

exports.create = async (data) => {
    const db = await DBContext.getInstance();
    return db.User.create(data);
};

module.exports = exports;
