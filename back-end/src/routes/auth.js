const { loginUser, registerUser } = require('../controllers/auth');
const express = require('express');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
