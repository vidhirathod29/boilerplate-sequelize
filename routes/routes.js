const express = require('express');
const router = express.Router();
const authRoutes = require('../routes/authRoute');
const addressBookRoutes = require('../routes/addressBookRoute')

router.use('/user',authRoutes);
router.use('/addressBook',addressBookRoutes);
module.exports= router;