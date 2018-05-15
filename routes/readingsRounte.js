const Validator = require('jsonschema').validate;

const farmerSchema = require('../schemas/farmerSchema');

module.exports = (app, Farmer, FarmerReadings) => {
    app.get('/readings', (req, res) => {
        res.send({ readings: '50kg' });
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
                    FarmerReadings.create(readings).then(
                        reading => {
                            res.json(reading);
                        },
                        err => {}
                    );
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
