const farmerSchema = {};

const farmerInfo = {
    type: 'object',
    properties: {
        firstName: {
            type: 'string',
            minLength: 3
        },
        farmerId: {
            type: 'string'
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
                    type: 'string',
                    enum: ['Male', 'Female']
                }
            ]
        },
        dateOfBirth: {
            type: 'string',
            pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}'
        }
    },
    required: [
        'firstName',
        'lastName',
        'telephone',
        'dateOfBirth',
        'gender',
        'farmerId'
    ]
};

const farmerHomeAdd = {
    type: 'object',
    properties: {
        town: {
            type: 'string',
            minLength: 3
        },
        street: {
            type: 'string'
        },
        houseNumber: {
            type: 'string'
        }
    },
    required: ['town', 'street', 'houseNumber']
};

const farmerPostalAdd = {
    type: 'object',
    properties: {
        town: {
            type: 'string'
        },
        street: {
            type: 'string'
        },
        postOfficeBox: {
            type: 'string'
        },
        district: {
            type: 'string'
        },
        region: {
            type: 'string'
        }
    },
    required: ['town', 'street', 'postOfficeBox', 'district', 'region']
};

const farmerPicture = {
    type: 'object',
    properties: {
        pictureUrl: {
            type: 'string',
            format: 'uri'
        }
    },
    required: ['pictureUrl']
};

const farmerReadings = {
    weight: {
        type: 'string'
    },
    farmerId: {
        type: 'string'
    },
    required: ['weight']
};

farmerSchema.farmerPostalAdd = farmerPostalAdd;
farmerSchema.farmerHomeAdd = farmerHomeAdd;
farmerSchema.farmerInfo = farmerInfo;
farmerSchema.farmerReadings = farmerReadings;
farmerSchema.farmerPicture = farmerPicture;

module.exports = farmerSchema;
