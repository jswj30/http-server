const express = require('express');
const router = express.Router();
const { controller } = require('../controller');

router.post('/signin', contorller.signin.post);
router.post('/signup', constroller.signup.post);
route.get('/mypage', contorller.mypage.get);
route.post('/mypage', controller.mypage.post);
route.get('/main', controller.main.get);
route.post('/main', controller.main.post);
route.get('/completed', controller.completed.get);
route.get('/important', controller.important.get);
route.post('/signout', controller.signout.post);
route.get('/remove', controller.remove.get);
