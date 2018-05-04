const bcrypt = require('bcryptjs');
const moment = require('moment');
const UserSchema = require('./scheme/user_scheme');

module.exports = function (sequelize, DataTypes) {
    const Member = sequelize.define('User', UserSchema(DataTypes), {
        tableName: 'users'
    });

    Member.associate = (models) => {
        // Member.belongsTo(models.model_name, {
        //     foreignKey: 'model_name_id',
        //     targetKey: 'id'
        // });
    };

    Member.prototype.validateAuth = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    Member.prototype.validateRefresh = function (password) {
        return moment() < moment(this.tokenValidity);
    };

    return Member;
};
