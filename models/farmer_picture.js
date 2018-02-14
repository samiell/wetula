module.exports = (sequelize, DataTypes) => {
    const FarmerPicture = sequelize.define('farmer_picture', {
        pictureUrl: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return FarmerPicture;
};