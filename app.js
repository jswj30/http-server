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

app.post('/signin', (req, res) => {
    res.sendStatus(500);
});

app.use('/searchinfo', (req, res) => {
    // searchinfo router email/password
    res.sendStatus(500);
});

app.post('/signup', (req, res) => {
    res.sendStatus(500);
});

app.route('/main')
    .get((req, res) => {
        res.sendStatus(500);
    })
    .post('/main', (req, res) => {
        res.sendStatus(500);
    });

app.route('/mypage')
    .get((req, res) => {
        res.sendStatus(500);
    })
    .post((req, res) => {
        res.sendStatus(500);
    });

app.get('/completed', (req, res) => {
    res.sendStatus(500);
});

app.get('/important', (req, res) => {
    res.sendStatus(500);
});

app.post('/signout', (req, res) => {
    res.sendStatus(500);
});

app.get('/remove', (req, res) => {
    res.sendStatus(500);
});

// 서버 실행
app.listen(port, () => {
    console.log(`fin.k.l(c) listening at http://localhost:${port}`);
});