module.exports = (User) => {
    return {
        requireAuthentication: (req, res, next) => {
            const token = req.get('X-Auth-Token');

            User.findByToken(token).then(user => {
                req.user = user;
                next();
            }, err => {
                res.status(401).send();
            });
        }
    };
};