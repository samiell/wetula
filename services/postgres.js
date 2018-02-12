const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');

var sequelize;

if (env === 'production') {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        'dialect': 'postgress',
    });
} else {
    const keys = require('../instance/keys');
    sequelize = new Sequelize(keys.postgresURL);
}

const db = {};

db.User = sequelize.import('../models/user.js');
db.Farmer = sequelize.import('../models/farmer.js');
db.FarmerPicture = sequelize.import('../models/farmer_picture.js');
db.FarmerRegistration = sequelize.import('../models/farmer_registration.js');
db.FarmerPostalAddress = sequelize.import('../models/farmer_postal_address.js');
db.FarmerHomeAddress = sequelize.import('../models/farmer_home_address.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Farmer.belongsTo(db.FarmerPicture, { as: 'farmerPicture' });
db.Farmer.belongsTo(db.FarmerRegistration, { as: 'farmerRegistration' });
db.Farmer.belongsTo(db.FarmerPostalAddress, { as: 'farmerPostalAddress' });
db.Farmer.belongsTo(db.FarmerHomeAddress, { as: 'farmerHomeAddress' });

module.exports = db;