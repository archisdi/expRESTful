const db = require('../models/sequelize');

exports.findOne = (conditions, attributes) => db.User.findOne({ where: conditions, attributes });

exports.findAll = (conditions, attributes) => db.User.findAll({ where: conditions, attributes });

exports.create = data => db.User.create(data);

module.exports = exports;
