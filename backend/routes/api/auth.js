const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth');
const isAuth = require('../../middleware/is-auth');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.post('/reset', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

router.get('/me', isAuth, (req, res) => {
  res.json({
    userId: req.userId
  });
});

module.exports = router;
