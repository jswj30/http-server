const { Todo, User } = require('../../models');

module.exports = {
    get: async (req, res) => {
        let test = await User.findAll(
            {
                where: { id: 1 },
                include: [{ model: Todo }]
            });

        console.log(test[0].Todos);
    },
    post: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    }
}