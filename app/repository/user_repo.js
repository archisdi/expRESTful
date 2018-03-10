const db = require('../models/sql');

exports.findOne = async conditions => db.User.findOne({
    where: conditions,
    attributes: ['id', 'name', 'username', 'password']
});

exports.findAll = async () => db.User.findAll({
    attributes: ['id', 'name', 'username']
});

exports.create = async data => db.User.create(data);

module.exports = exports;
