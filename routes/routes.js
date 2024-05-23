const express = require('express');
const router = express.Router();
const authRoutes = require('../routes/authRoute');

router.use('/user',authRoutes);

module.exports= router;