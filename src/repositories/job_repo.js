const BaseRepository = require('./base_repository');

class JobRepo extends BaseRepository {
    async create(key, value) {
        const redis = await this.getRedisInstance();
        return redis.set(`job-${key}`, value);
    }

    async get(key, value) {
        const redis = await this.getRedisInstance();
        return redis.get(`job-${key}`);
    }
}

module.exports = JobRepo;
