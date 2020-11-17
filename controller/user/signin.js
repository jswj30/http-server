const { User } = require('../../models');
const axios = require('axios');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

// 소셜 로그인 요청 기능
let getToken = async function (code) {
  let res = await axios({
    method: 'POST',
    url: `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`,
    headers: { accept: 'application/json' }
  });
  console.log('요기는 토큰받는곳', res.data.access_token);
  const access_token = res.data.access_token;
  return access_token;
};

let getUserInfo = async function (token) {
  let data = await axios({
    method: 'GET',
    url: 'https://api.github.com/user',
    headers: { Authorization: 'token ' + token }
  });

  return data.data;
}

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

  github: async (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://localhost:8000/githubLogin`;
    res.redirect(url);
  },

  githubLogin: async (req, res) => {
    const code = req.query.code;
    const token = await getToken(code);
    const userInfo = await getUserInfo(token);

    //userInfo 바탕으로 DB에 정보 저장
    const { login } = userInfo;
    try {
      const userData = await User.findOrCreate({
        where: { name: login },
        default: { name: login }
      });

      if (userData) {
        const [user, created] = userData;

        if (created) {
          let sess = req.session;
          sess.userid = findUser.id;
          res.status(200).json({ id: sess.userid });
          res.redirect('/main');
        } else {
          res.redirect('/main');
        }
      }
    } catch (err) {
      res.redirect('/main');
    }
  }
};