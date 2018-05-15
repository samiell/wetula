module.exports = (sequelize, DataTypes) => {
    const FarmerReadings = sequelize.define('farmer_readings', {
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
    });

    return FarmerReadings;
};
