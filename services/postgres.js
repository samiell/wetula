const Sequelize = require('sequelize');
const keys = require('../instance/keys');

const sequelize = new Sequelize(keys.postgresURL);

const db = {};

db.User = sequelize.import('../models/user.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;