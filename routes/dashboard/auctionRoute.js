const express = require('express');


const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        status: 'success',
        message: 'This is the dashboard homepage'
    });
});


module.exports = router;