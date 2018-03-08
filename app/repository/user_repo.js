const db = require('../models/sql');

exports.findOne = async conditions => {
    return await db.User.findOne({
        where: conditions,
        attributes: ['id', 'name', 'username', 'password']
    });
}

exports.findAll = async () => {
    return await db.User.findAll({
        attributes: ['id', 'name', 'username']
    });
}

exports.create = async (data) => {
    return await db.User.create(data);
}

module.exports = exports;