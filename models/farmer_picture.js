module.exports = (sequelize, DataTypes) => {
    const FarmerPicture = sequelize.define('farmer_picture', {
        picture_url: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return FarmerPicture;
};