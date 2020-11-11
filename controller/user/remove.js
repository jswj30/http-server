const { User } = require('../../models');

module.exports = {
    get: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    }
}