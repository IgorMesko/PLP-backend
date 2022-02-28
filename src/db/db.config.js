const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'database',
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    define: {
        freezeTableName: true,
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    },
});

module.exports = sequelize;