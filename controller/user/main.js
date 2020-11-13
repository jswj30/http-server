const { Todo, User, Complete, JoinTable } = require('../../models');

module.exports = {
    get: async (req, res) => {
        let test = await User.findAll(
            {
                where: { id: 1 },
                include: [{ model: Todo }]
            });

        let test2 = await Todo.findAll(
            {
                where: { userId: 1 },
                include: [{ model: Complete }]
            });

        console.log(test2[0]);
        //console.log(test[0].Todos);
    },
    post: (req, res) => {
        console.log(req.body);
        res.sendStatus(500);
    }
}