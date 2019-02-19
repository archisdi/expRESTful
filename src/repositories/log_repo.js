const { MongoContext } = require('../common');

exports.create = async (data) => {
    const mongo = await MongoContext.getInstance();
    return mongo.Log.create(data);
};

module.exports = exports;
