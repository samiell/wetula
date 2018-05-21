const Validator = require('jsonschema').validate;

const farmerSchema = require('../schemas/farmerSchema');
const errorMessage = require('../lib/errorMessage');

module.exports = (app, Farmer, FarmerHA, FarmerPA, FarmerPic, _) => {
    app.get('/farmers', (req, res) => {
        Farmer.findAll().then(f => {
            var farmers = [];

            f.forEach(farmer => {
                farmers.push(farmer.toPublicJSON());
            });

            res.send(farmers);
        });
    });

    app.get('/farmers/:farmerId', (req, res) => {
        const farmerId = req.params.farmerId;
        const where = { farmerId };

        Farmer.findOne({ where }).then(
            farmer => {
                if (farmer) {
                    res.send(farmer.toPublicJSON());
                } else {
                    res.status(404).send();
                }
            },
            err => {
                res.status(500).send();
            }
        );
    });

    app.post('/farmers', (req, res) => {
        if (req.body !== 'undefined') {
            const farmerInfo = _.pick(
                req.body.farmerInfo,
                'firstName',
                'lastName',
                'nickName',
                'dateOfBirth',
                'middleName',
                'gender',
                'telephone',
                'farmerId'
            );
            const farmerHomeAdd = _.pick(
                req.body.farmerHomeAdd,
                'town',
                'street',
                'houseNumber'
            );
            const farmerPostalAdd = _.pick(
                req.body.farmerPostalAdd,
                'town',
                'street',
                'postOfficeBox',
                'district',
                'region'
            );
            const farmerPicture = _.pick(req.body.farmerPicture, 'pictureUrl');

            if (!Validator(farmerInfo, farmerSchema.farmerInfo).valid) {
                const errors = Validator(farmerInfo, farmerSchema.farmerInfo)
                    .errors;
                return res.status(400).json(errors);
            }

            if (!Validator(farmerHomeAdd, farmerSchema.farmerHomeAdd).valid) {
                const errors = Validator(
                    farmerHomeAdd,
                    farmerSchema.farmerHomeAdd
                ).errors;
                return res.status(400).json(errors);
            }

            if (
                !Validator(farmerPostalAdd, farmerSchema.farmerPostalAdd).valid
            ) {
                const errors = Validator(
                    farmerPostalAdd,
                    farmerSchema.farmerPostalAdd
                ).errors;
                return res.status(400).json(errors);
            }

            if (!Validator(farmerPicture, farmerSchema.farmerPicture).valid) {
                const errors = Validator(
                    farmerPicture,
                    farmerSchema.farmerPicture
                ).errors;
                return res.status(400).json(errors);
            }

            farmerInfo.dateOfBirth = new Date(farmerInfo.dateOfBirth);

            FarmerHA.create(farmerHomeAdd)
                .then(farmerHA => {
                    return farmerHA;
                })
                .then(
                    farmerHA => {
                        Farmer.create(farmerInfo)
                            .then(farmer => {
                                farmer.setFarmerHomeAddress(farmerHA);
                                return farmer;
                            })
                            .then(
                                farmer => {
                                    FarmerPA.create(farmerPostalAdd)
                                        .then(farmerPA => {
                                            farmer.setFarmerPostalAddress(
                                                farmerPA
                                            );
                                            return farmer;
                                        })
                                        .then(farmer => {
                                            FarmerPic.create(
                                                farmerPicture
                                            ).then(
                                                farmerPic => {
                                                    farmer.setFarmerPicture(
                                                        farmerPic
                                                    );
                                                    farmer.reload();
                                                    res.json(
                                                        farmer.toPublicJSON()
                                                    );
                                                },
                                                err => {
                                                    res
                                                        .status(400)
                                                        .json(
                                                            errorMessage(
                                                                err.errors
                                                            )
                                                        );
                                                }
                                            );
                                        });
                                },
                                err => {
                                    res
                                        .status(400)
                                        .json(errorMessage(err.errors));
                                }
                            );
                    },
                    err => {
                        res.status(400).json(errorMessage(err.errors));
                    }
                );
        } else {
            res.status(500).send();
        }
    });
};
