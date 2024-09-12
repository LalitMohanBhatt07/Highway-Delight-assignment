const express = require('express');
const { signUp, signIn, signOut, verifyOTP } = require('../controllers/userController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/signout', signOut);
router.post('/verify-otp', verifyOTP);

module.exports = router;
