const bcrypt = require('bcryptjs');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const names = ['admin', 'archisdiningrat'];
        // for (let i = 0; i < 5; i++) {
        // }

        const users = names.map(item => ({
            name: item,
            username: item,
            password: bcrypt.hashSync(item, 8),
            created_at: new Date(),
            updated_at: new Date()
        }));

        return queryInterface.bulkInsert('users', users, {});
    }
};
