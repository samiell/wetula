module.exports = (sequelize, DataTypes) => {
    const FarmerPostalAddress = sequelize.define('farmer_postal_address', {
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
        post_office_box: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 45
            }
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 45
            }
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 45
            }
        }
    });

    return FarmerPostalAddress;
};