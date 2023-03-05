const express = require('express');
const { userController } = require('../controllers');
const auth = require('../middlewares/auth/auth');

const router = express.Router();

// '/user'
router.post('/', userController.createUser);
router.get('/', auth, userController.getAllUsers);

module.exports = router;