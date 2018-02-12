const Validator = require('jsonschema').validate;

const farmerSchema = require('../schemas/farmerSchema');

module.exports = (app, Farmer, FarmerHA, FarmerPA, _) => {

    app.get('/api/farmers', (req, res) => {

        Farmer.findAll().then(f => {
            var farmers = [];

            f.forEach(farmer => {
                farmers.push(farmer.toPublicJSON());
            });

            res.send(farmers);
        });
    });

    app.post('/api/farmers', (req, res) => {
        const farmerInfo = _.pick(req.body.farmerInfo, 'firstName', 'lastName', 'nickName', 'dateOfBirth', 'middleName', 'gender', 'telephone');
        const farmerHomeAdd = _.pick(req.body.farmerHomeAdd, 'town', 'street', 'houseNumber');

        if (!(Validator(farmerInfo, farmerSchema.register_schema).valid)) {
            const errors = Validator(farmerInfo, farmerSchema.register_schema).errors;
            return res.status(400).json(errors);
        }

        farmerInfo.dateOfBirth = new Date(farmerInfo.dateOfBirth);

        FarmerHA.create(farmerHomeAdd).then(farmerHA => {
            return farmerHA;
        }).then(farmerHA => {
            Farmer.create(farmerInfo).then(farmer => {
                farmer.setFarmerHomeAddress(farmerHA);
                res.json(farmer.toPublicJSON());
            }, err => {
                res.status(400).json(err);
            });
        }, err => {
            res.status(400).json(err);
        });
    });
};