const farmerSchema = {};

const register_schema = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            minLength: 3
        },
        lastName: {
            type: 'string',
            minLength: 3
        },
        middleName: {
            type: 'string',
            minLength: 3
        },
        nickName: {
            type: 'string',
            minLength: 3
        },
        telephone: {
            type: 'string',
            pattern: '^[0-9]{3}-[0-9]{3}-[0-9]{4}'
        },
        gender: {
            type: 'string',
            oneOf: [
                {
                    "type": "string",
                    "enum": ["Male", "Female"]
                }
            ]
        },
        dateOfBirth: {
            type: 'string',
            pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
        }
    },
    required: ['firstName', 'lastName', 'telephone', 'dateOfBirth', 'gender']
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

farmerSchema.login_schema = login_schema;
farmerSchema.register_schema = register_schema;

module.exports = farmerSchema;
