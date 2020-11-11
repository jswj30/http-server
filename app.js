const express = require('express');
const app = express();
const port = 8000;
const session = require('express-session');

// 미들웨어 사용
app.use(cors());
app.use(express.json());
// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))


// get, post
app.get('/', (req, res) => {
    res.send('Hello World');
});

// 서버 실행
app.listen(port, () => {
    console.log(`fin.k.l(c) listening at http://localhost:${port}`);
});