const Validator = require('jsonschema').validate;

const farmerSchema = require('../schemas/farmerSchema');
const errorMessage = require('../lib/errorMessage');

module.exports = (app, Farmer, FarmerReadings) => {
    app.get('/readings', (req, res) => {
        FarmerReadings.findAll().then(
            readings => {
                if (readings) {
                    var farmerReadings = [];

                    readings.forEach(reading => {
                        farmerReadings.push(reading.toPublicJSON());
                    });

                    res.send(farmerReadings);
                } else {
                    res.status(404).send();
                }
            },
            err => {
                res.status(500).send();
            }
        );
    });

    app.get('/readings/:farmerId', (req, res) => {
        const farmerId = req.params.farmerId;

        const where = { farmerId };

        FarmerReadings.findAll({ where }).then(
            readings => {
                if (readings && readings.length > 0) {
                    var farmerReadings = [];

                    readings.forEach(reading => {
                        farmerReadings.push(reading.toPublicJSON());
                    });

                    res.send(farmerReadings);
                } else {
                    res.status(404).send();
                }
            },
            err => {
                res.status(500).send();
            }
        );
    });

    app.post('/readings/:farmerId', (req, res) => {
        if (req.body.weight) {
            const farmerId = req.params.farmerId;

            const readings = {
                weight: req.body.weight,
                dateOfReading: Date.now(),
                farmerId: farmerId
            };

            if (!Validator(readings, farmerSchema.farmerReadings).valid) {
                const errors = Validator(readings, farmerSchema.farmerReadings)
                    .errors;
                return res.status(400).json(errors);
            }

            const where = { farmerId };

            Farmer.findOne({ where }).then(
                farmer => {
                    if (farmer) {
                        FarmerReadings.create(readings).then(
                            reading => {
                                res.json(reading);
                            },
                            err => {
                                res.status(400).json(errorMessage(err.errors));
                            }
                        );
                    } else {
                        res.status(404).send();
                    }
                },
                err => {
                    res.status(500).send();
                }
            );
        } else {
            res.status(500).send();
        }
    });
};
