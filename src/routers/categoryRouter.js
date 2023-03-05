const express = require('express');
const { categoryController } = require('../controllers');
const auth = require('../middlewares/auth/auth');

const router = express.Router();

// '/categories'
router.post('/', auth, categoryController.createCategory);

module.exports = router;