const BaseRepository = require('./base_repository');

class LogRepo extends BaseRepository {
    async create(data) {
        const mongo = await this.getMongoInstance();
        return mongo.Log.create(data);
    }
}

module.exports = LogRepo;
