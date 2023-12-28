const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const passport = require('passport');


router.post('/signUp',authController.createUser);
router.post('/login', passport.authenticate('local'), authController.logInUser)
      .get('/check', passport.authenticate('jwt'), authController.checkUser);

module.exports = router;