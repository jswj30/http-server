const { User } = require('../../models');

module.exports = {
    get: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    },
    post: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    }
};