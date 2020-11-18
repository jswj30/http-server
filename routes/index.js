const express = require('express');
const router = express.Router();
const { indexController } = require('../controller');
const cors = require('cors');


router.post('/signinMain', indexController.signinMain.post);
router.post('/signin', indexController.signin.post);
router.get('/github', indexController.signin.github);
router.get('/githubLogin', indexController.signin.githubLogin);
router.post('/signup', indexController.signup.post);
router.get('/mypage', indexController.mypage.get);
router.post('/mypage', indexController.mypage.post);
router.get('/main', indexController.main.get);
router.post('/main', indexController.main.post);
router.patch('/main', indexController.main.patch);
router.get('/completed', indexController.completed.get);
router.patch('/completed', indexController.completed.patch);
router.get('/important', indexController.important.get);
router.patch('/important', indexController.important.patch);
router.post('/signout', indexController.signout.post);
router.post('/remove', indexController.remove.post);
router.patch('/update', indexController.update.patch);
router.post('/main2', indexController.main2.post);

module.exports = router;
