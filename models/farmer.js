const bcrypt = require('bcrypt');
const _ = require('underscore');
const JWT = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const keys = require('../instance/keys');

module.exports = (sequelize, DataTypes) => {
    const FarmerInfo = sequelize.define(
        'farmer_personal_information',
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            middleName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            nickName: {
                type: DataTypes.STRING,
                allowNull: true
            },
            farmerId: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telephone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isIn: [['Male', 'Female']]
                }
            },
            dateOfBirth: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            hooks: {}
        }
    );

    FarmerInfo.prototype.toPublicJSON = function() {
        var returnList = [
            'firstName',
            'lastName',
            'dateOfBirth',
            'gender',
            'telephone',
            'farmerId'
        ];

        if (this.nickName !== null) {
            returnList.push('nickName');
        }

        if (this.middleName !== null) {
            returnList.push('middleName');
        }

        return _.pick(this.toJSON(), returnList);
    };

    FarmerInfo.prototype.generateToken = function(type) {};

    return FarmerInfo;
};
