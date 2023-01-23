const {Login,Signup} = require('../Controller/auth');
const express = require('express')
const router = express.Router();

router.post('/signup',Signup);
router.post('/login',Login);

module.exports=router;