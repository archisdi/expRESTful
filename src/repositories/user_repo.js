const BaseRepository = require('./base_repository');

class UserRepo extends BaseRepository {
    async find(id, attributes) {
        const db = await this.getDbInstance();
        return db.User.findOne({ where: { id }, attributes });
    }

    async findOne(conditions, attributes) {
        const db = await this.getDbInstance();
        return db.User.findOne({ where: conditions, attributes });
    }

    async findAll(conditions, attributes) {
        const db = await this.getDbInstance();
        return db.User.findAll({ where: conditions, attributes });
    }

    async create(data) {
        const db = await this.getDbInstance();
        return db.User.create(data, { transaction: await this.getTransaction() });
    }
}

module.exports = UserRepo;
