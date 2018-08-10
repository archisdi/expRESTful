const Log = require('../models/mongodb/log');

exports.create = datas => Log.create(datas);

module.exports = exports;
