module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'id'
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
    }, { tableName: 'users' });
};
