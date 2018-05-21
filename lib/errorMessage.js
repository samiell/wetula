const _ = require('underscore');

module.exports = error => {
    return _.pick(
        error[0],
        'message',
        'origin',
        'path',
        'type',
        'validatorArgs',
        'validatorKey',
        'validatorName',
        'value'
    );
};
