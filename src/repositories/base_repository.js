'use strict';

const { DBContext, MongoContext } = require('../common');

class BaseRepository {
    constructor() {
        this.db = null;
        this.mongo = null;
    }

    async getDbInstance() {
        if (!this.db) this.db = await DBContext.getInstance();
        return this.db;
    }

    async getMongoInstance() {
        if (!this.mongo) this.mongo = await MongoContext.getInstance();
        return this.mongo;
    }

    async getTransaction() { // eslint-disable-line
        return DBContext.getTransaction();
    }
}

module.exports = BaseRepository;
