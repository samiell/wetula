const userSchema = {};

const register_schema = {
    type: 'object',
    properties: {
        email: {
            'type': 'string',
            'pattern': '(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)'
        },
        password: {
            'type': 'string',
            'minLength': 7
        },
        username: {
            type: 'string',
            'minLength': 6
        }
    },
    required: ['email', 'password', 'username']
};

const login_schema = {
    type: 'object',
    properties: {
        'username': {
            'type': 'string',
            'minLength': 6
        },
        password: {
            'type': 'string',
            'minLength': 7
        }
    },
    required: ['password', 'username']
};

userSchema.login_schema = login_schema;
userSchema.register_schema = register_schema;

module.exports = userSchema;
