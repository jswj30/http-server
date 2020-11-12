const { User } = require('../../models');

module.exports = {
    get: async (req, res) => {
        // 서버만으로 동작이 안되니까 임의로 지정
        await User.destroy({ where: { id: 78, password: req.body.password } });

        res.status(200).send('없앴어여');
    }
}