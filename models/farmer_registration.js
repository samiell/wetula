module.exports = (sequelize, DataTypes) => {
    const FarmerRegistration = sequelize.define('farmer_registration', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [5, 45]
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                max: 45
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                max: 8
            }
        }
    });

    return FarmerRegistration;
};