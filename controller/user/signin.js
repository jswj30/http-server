const { User } = require('../../models');
const axios = require('axios');

require('dotenv').config();

const github = `https://github.com/login/oauth`;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// 로그인
module.exports = {
  post: async (req, res) => {
    const { email, password } = req.body;
    let sess = req.session;
    let findUser = await User.findOne({ where: { email, password } });

    try {
      if (findUser === null) {
        res.status(404).send('유저를 찾을 수 없습니다.');
      } else {
        // 쿠키 전달
        sess.userid = findUser.id;
        res.status(200).json({ id: sess.userid });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  get: async (req, res) => {
    axios({
      method: 'post',
      url: `${github}/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      header: { accept: 'application/json' }
    }).then((res) => {
      const token = res.data.access_token;
      res.redirect(`/main?access_token=${token}`);
    })
  }
};