const express = require('express');
const router = express.Router();
const Account = require('../../models/account');

router.post('/signup', async (req, res) => {
    const emailExists = await Account.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ error: 'Email already exists' });

    const account = new Account({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        cemail: req.body.cemail,
        password: req.body.password,
        cpassword: req.body.cpassword,
    });
    
    account.save(error => {
        if(error) {
        console.log(error);
        res.status(400).json(error.errors);
        }
        res.status(200).json({error: 'Account successfully created'})
    });
})

module.exports = router;
