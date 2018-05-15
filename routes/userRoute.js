const Validator = require('jsonschema').validate;

const userSchema = require('../schemas/userSchema');

module.exports = (app, User, _, bcrypt) => {
    app.get('/users', (req, res) => {
        User.findAll().then(u => {
            let users = [];

            u.forEach(user => {
                users.push(user.toPublicJSON());
            });

            res.send(users);
        });
    });

    app.get('/users/:id', (req, res) => {
        const id = parseInt(req.params.id, 10);

        User.findById(id).then(
            user => {
                if (user) {
                    res.send(user.toPublicJSON());
                }
                res.status(404).send();
            },
            err => {
                res.status(400).json(err);
            }
        );
    });

    app.post('/users', (req, res) => {
        const body = _.pick(req.body, 'email', 'password', 'username');

        if (!Validator(body, userSchema.register_schema).valid) {
            const errors = Validator(body, userSchema.register_schema).errors;
            return res.status(400).json(errors);
        }

        User.create(body).then(
            user => {
                res.json(user.toPublicJSON());
            },
            err => {
                res.status(400).json(err);
            }
        );
    });

    app.post('/users/login', (req, res) => {
        const body = _.pick(req.body, 'password', 'username');

        if (!Validator(body, userSchema.login_schema).valid) {
            const errors = Validator(body, userSchema.login_schema).errors;
            return res.status(400).json(errors);
        }

        const where = {
            username: body.username
        };

        User.findOne({ where: where }).then(
            user => {
                if (
                    !user ||
                    !bcrypt.compareSync(
                        body.password,
                        user.get('password_hash')
                    )
                ) {
                    return res.status(401).send();
                }

                const token = user.generateToken('authentication');

                if (token) {
                    res.header('X-Auth-Token', token).json(user.toPublicJSON());
                } else {
                    res.status(401).send();
                }
            },
            err => {
                res.status(500).send();
            }
        );
    });
};
