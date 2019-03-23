'use strict';

exports.parseDataObject = object => JSON.parse(JSON.stringify(object));

exports.offset = (page = 1, limit = 10) => ((page - 1) * limit);

exports.isEmptyObject = object => !Object.keys(object).length;

exports.isEmptyArray = array => array.length === 0;

module.exports = exports;
