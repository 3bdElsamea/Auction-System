const express = require('express');

const dashboardRoute=require('./routes/dashboardRoute');
const websiteRoute=require('./routes/websiteRoute');

const router = express.Router();

router.use('/dashboard',dashboardRoute);
router.use('/',websiteRoute);

router.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'fail',
        message:`Can't find ${req.originalUrl} on this server`
    });
});

module.exports = router;