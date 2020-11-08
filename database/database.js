const Sequelize = require('sequelize');

const connection = new Sequelize('blognode', 'blognode', '3664444root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;