const express = require('express');
const router = express.Router();
const { controller } = require('../controller');

router.post('/email', controller.searchEmail.post);
router.post('/password', controller.searchPassword.post);