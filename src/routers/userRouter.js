const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// '/user'
router.post('/', userController.createUser);

module.exports = router;