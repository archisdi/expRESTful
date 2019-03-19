const bcrypt = require('bcryptjs');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
    const Member = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        refresh_token: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        token_validity: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'users',
        freezeTableName: true,
        underscored: true,
        paranoid: true /** Soft deletes */
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
        return moment() < moment(this.token_validity);
    };

    return Member;
};
