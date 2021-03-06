const PORT = process.env.PORT || 5010;

const express = require('express');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const db = require('./services/postgres');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ App: 'Wetula API' });
});

require('./routes/userRoute')(app, db.User, _, bcrypt);
require('./routes/readingsRounte')(app, db.Farmer, db.FarmerReadings);
require('./routes/farmerRoute')(
    app,
    db.Farmer,
    db.FarmerHomeAddress,
    db.FarmerPostalAddress,
    db.FarmerPicture,
    _
);

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT);
    });
});
