'use strict';

const tableName = 'users';

module.exports = {
    up: (queryInterface, DataTypes) => queryInterface.createTable(tableName, {
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
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable(tableName)
};
