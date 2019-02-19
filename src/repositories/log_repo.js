const { MongoContext } = require('../common');

exports.create = async (datas) => {
    const mongo = await MongoContext.getInstance();
    return mongo.Log.create(datas);
};

module.exports = exports;
