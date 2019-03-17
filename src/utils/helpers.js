'use strict';

exports.parseDataObject = object => JSON.parse(JSON.stringify(object));

exports.offset = (page = 1, limit = 10) => ((page - 1) * limit);

module.exports = exports;
