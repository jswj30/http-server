const { User } = require('../../models');
const session = require('express-session');

module.exports = {
    post: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    }
};