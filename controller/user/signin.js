const { User } = require('../../models');
const axios = require('axios');
// const jwt = require('jsonwebtoken');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
// const jwtKey = process.env.JWT_SECRET;

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
    let findUser = await User.findOne({ where: { email, password } });

    try {
      if (findUser === null) {
        res.status(404).send('유저를 찾을 수 없습니다.');
      } else {

        // let token = jwt.sign(
        //   { email: email, id: findUser.id },
        //   jwtKey,
        //   { expiresIn: '10m' });
        // res.cookie('user', token);

        res.status(200).json({ id: findUser.id, email : findUser.email, name: findUser.name, mobile: findUser.mobile });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  github: async (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=http://54.180.79.137:8000/githubLogin`;
    res.redirect(url);
  },

  githubLogin: async (req, res) => {
    const code = req.query.code;
    const token = await getToken(code);
    const userInfo = await getUserInfo(token);

    //userInfo 바탕으로 DB에 정보 저장
    const { login, email, name } = userInfo;

    // let userInfo = {
    //   login: getInfo.data.login,
    //   email: getInfo.data.email === null ? `${getInfo.data.login}@github.com` : getInfo.data.email,
    //   name: getInfo.data.name === null ? getInfo.data.login : getInfo.data.name
    // }
    try {
      const userData = await User.findOrCreate({
        where: { name: login },
        defaults: {
          email: email === null ? `${login}@github.com` : email
        }
      });

      if (userData) {
        const [user, created] = userData;

        if (created) {
          res.redirect(`http://http-client.s3-website.ap-northeast-2.amazonaws.com?access=true`);
        } else {
          User.findOne({
            where: { email: email }
          })
            .then(result => {
              res.redirect(`http://http-client.s3-website.ap-northeast-2.amazonaws.com?access=true`);
            }).catch(err => {
              res.status(404).json(err);
            })
        }
      }
    } catch (err) {
      res.redirect('/signin');
    }
  }
};
