const Sequelize = require('sequelize');

const connection = new Sequelize('blognode', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;