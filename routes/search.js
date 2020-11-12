const express = require('express');
const router = express.Router();

const { searchController } = require('../controller');

router.post('/email', searchController.searchEmail.post);
router.post('/password', searchController.searchPassword.post);

module.exports = router;