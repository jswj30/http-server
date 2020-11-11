const { User } = require('../../models');

module.exports = {
    post: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    }
};