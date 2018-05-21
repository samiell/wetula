const bcrypt = require('bcrypt');
const _ = require('underscore');
const JWT = require('jsonwebtoken');
const cryptojs = require('crypto-js');

const keys = require('../instance/keys');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    len: 5
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            salt: {
                type: DataTypes.STRING
            },
            password_hash: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.VIRTUAL,
                allowNull: false,
                validate: {
                    len: [7, 100]
                },
                set: function(password) {
                    const salt = bcrypt.genSaltSync(10);
                    const hashedPassword = bcrypt.hashSync(password, salt);

                    this.setDataValue('password', password);
                    this.setDataValue('salt', salt);
                    this.setDataValue('password_hash', hashedPassword);
                }
            }
        },
        {
            hooks: {
                beforeValidate: (user, options) => {
                    if (
                        typeof user.email === 'string' &&
                        typeof user.username === 'string'
                    ) {
                        user.email = user.email.toLowerCase();
                        user.username = user.username.toLowerCase();
                    }
                }
            }
        }
    );

    User.findByToken = function(token) {
        return new Promise(function(resolve, reject) {
            try {
                const decodedJWT = JWT.verify(token, keys.jwtSK);
                const bytes = cryptojs.AES.decrypt(
                    decodedJWT.token,
                    keys.cryptojsSK
                );
                const tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                User.findById(tokenData.id).then(
                    user => {
                        if (user) {
                            resolve(user);
                        } else {
                            reject();
                        }
                    },
                    error => {
                        reject();
                    }
                );
            } catch (error) {
                reject();
            }
        });
    };

    User.prototype.toPublicJSON = function() {
        return _.pick(this.toJSON(), 'email', 'username');
    };

    User.prototype.generateToken = function(type) {
        if (!_.isString(type)) {
            return undefined;
        }

        try {
            const stringData = JSON.stringify({
                id: this.get('id'),
                type: type
            });
            const encryptedData = cryptojs.AES.encrypt(
                stringData,
                keys.cryptojsSK
            ).toString();
            const token = JWT.sign({ token: encryptedData }, keys.jwtSK);
            return token;
        } catch (error) {
            return undefined;
        }
    };

    return User;
};
