const mongoose = require('mongoose');

exports.initialize = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true });
};

module.exports = exports;
