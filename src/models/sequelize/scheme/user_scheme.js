'use strict';

module.exports = DataTypes => ({
    id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    uuid: {
        type: DataTypes.UUID,
        field: 'uuid',
        defaultValue: DataTypes.UUIDV4
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
});
