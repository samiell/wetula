const PORT = process.env.PORT || 5010;

const express = require('express');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const db = require('./services/postgres');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ 'Greet': 'Hello Express App' });
});

require('./routes/userRoute')(app, db.User, _, bcrypt);

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Server running on port ' + PORT);
    });
});
