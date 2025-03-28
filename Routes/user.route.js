const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const usercontroller = require("../Controller/user.controller");
const authmiddleware = require("../Middleware/auth.middleware");

router.post('/register', [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be of more then three letters'),
    body('fullname.lastname').isLength({min:3}).withMessage("Lastname must be of more then three letters"),
    body('password').isLength({min:8}).withMessage("Password must be more than 8 character please")
], usercontroller.registeruser);


router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage("Password must be 8 character please")
], usercontroller.userlogin)

router.get('/profile', authmiddleware.authuser, usercontroller.userprofile )
router.get('/logout',authmiddleware.authuser, usercontroller.userlogout)

module.exports = router