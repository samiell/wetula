module.exports = (sequelize, DataTypes) => {
    const FarmerHomeAddress = sequelize.define('farmer_home_address', {
        town: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 45
            }
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 45
            }
        },
        houseNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 45
            }
        }
    });

    return FarmerHomeAddress;
};