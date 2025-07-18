const express=require('express');
const authController=require('../controller/authController');
const { body } = require('express-validator');

const router=express.Router();

const loginValidator=[
    body('username')
        .notEmpty().withMessage('Username is required')
        .isEmail().withMessage('Username must be a valid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({min:6}).withMessage('Password must be 6 character long')
];

router.post('/login',loginValidator,authController.login);
router.post('/logout',authController.logout);
router.post('/is-user-logged-in',authController.isUserLoggedIn);
router.post('/register',authController.register);
router.post('/google-auth',authController.googleAuth);
router.post('/refresh-token',authController.refreshToken);
router.post('/send-reset-password-token',authController.sendResetPasswordToken);
router.post('/reset-password',authController.resetPassword);

module.exports=router;
