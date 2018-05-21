const _ = require('underscore');

module.exports = (sequelize, DataTypes) => {
    const FarmerReadings = sequelize.define(
        'farmer_readings',
        {
            weight: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dateOfReading: {
                type: DataTypes.DATE,
                allowNull: false
            },
            farmerId: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            hooks: {}
        }
    );

    FarmerReadings.prototype.toPublicJSON = function() {
        var returnList = ['weight', 'farmerId', 'id'];

        return _.pick(this.toJSON(), returnList);
    };

    return FarmerReadings;
};
