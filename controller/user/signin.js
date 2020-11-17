const { User } = require('../../models');
const axios = require('axios');

require('dotenv').config();

const clientID = process.env.CLIENT_ID;
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
    const requestToken = req.query.code;
    let result = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
      headers: {
        accept: 'application/json'
      }
    })
    // console.dir(result.data);
    const token = result.data.access_token;

    let getInfo = await axios({
      method: 'get',
      url: 'https://api.github.com/user',
      headers: { Authorization: `token ${token}` }
    });
    // userInfo = JSON.stringify(userInfo);
    let userInfo = {
      login: getInfo.data.login,
      email: getInfo.data.email === null ? `${getInfo.data.login}@github.com` : getInfo.data.email,
      name: getInfo.data.name
    }
    console.dir(userInfo);

    const userData = await User
      .findOrCreate({
        where: {
          email: userInfo.email,
          name: userInfo.name
        },
        default: {
          email: userInfo.email,
          name: userInfo.name
        }
      });
    let [user, created] = userData;

    try {
      if (created) {
        req.session.userid = user.id;
        res.status(201).json(user);
      } else {
        User.findOne({
          where: {
            email: userInfo.email
          }
        })
          .then((result) => {
            req.session.userid = user.id;
            res.status(200).json(result);
          })
          .catch(err => {
            res.sendStatus(404);
          })
      }

      // res.redirect(`/main?access_token=${token}`);
    }
    catch {
      res.sendStatus(500);
    }
  }
};