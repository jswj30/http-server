const express = require('express');
const router = express.Router();
const { indexController } = require('../controller');

router.get('/oauth', indexController.signin.get);
router.post('/signin', indexController.signin.post);
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

module.exports = router;