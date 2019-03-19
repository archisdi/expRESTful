const BaseRepository = require('./base_repository');
const { offset } = require('../utils/helpers');

class UserRepo extends BaseRepository {
    async find(id, attributes) {
        const db = await this.getDbInstance();
        return db.User.findOne({ where: { id }, attributes });
    }

    async findOne(conditions, attributes) {
        const db = await this.getDbInstance();
        return db.User.findOne({
            where: conditions,
            attributes
        });
    }

    async findAll(conditions, attributes) {
        const db = await this.getDbInstance();
        return db.User.findAll({ where: conditions, attributes });
    }

    async create(data) {
        const db = await this.getDbInstance();
        return db.User.create(data, { transaction: await this.getTransaction() });
    }

    async update(conditions, data) {
        const db = await this.getDbInstance();
        return db.User.update(data, {
            where: conditions,
            transaction: await this.getTransaction()
        });
    }

    async paginate(conditions, { page = 1, limit = 10 }, attributes) {
        const db = await this.getDbInstance();
        return db.User.findAndCountAll({
            where: conditions,
            limit,
            offset: offset(page, limit),
            attributes
        });
    }
}

module.exports = UserRepo;
