const express = require('express');
const router =  express.Router();

router.get('/signup', (req, res) => {
    res.status(200).json('In the signup');
})

module.exports = router;
