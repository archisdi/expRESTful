'use strict';

module.exports = {
    up: (queryInterface, DataTypes) => queryInterface.createTable('users', {
        id: {
            type: DataTypes.UUID,
            field: 'id',
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'name'
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            field: 'username'
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'password'
        },
        refreshToken: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'refresh_token'
        },
        tokenValidity: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'token_validity'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'updated_at'
        }
    }),
    down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
};
