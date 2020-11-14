const express = require('express');
const router = express.Router();
const { indexController } = require('../controller');

router.post('/signin', indexController.signin.post);
router.post('/signup', indexController.signup.post);
router.get('/mypage', indexController.mypage.get);
router.post('/mypage', indexController.mypage.post);
router.get('/main', indexController.main.get);
router.post('/main', indexController.main.post);
router.get('/completed', indexController.completed.get);
router.get('/important', indexController.important.get);
router.post('/signout', indexController.signout.post);
router.post('/remove', indexController.remove.post);
router.post('/update', indexController.update.post);

module.exports = router;