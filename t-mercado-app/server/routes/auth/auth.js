const express = require('express');
const router = express.Router();
const Account = require('../../models/account');
const errorFormat = require('./errorFormat');

// return a map of error key and error message value


router.post('/signup', async (req, res) => {
    const emailExists = await Account.findOne({ email: req.body.email });
    if (emailExists) return res.status(400).json({ error: { message: 'Email already exists' } });

    const account = new Account({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        cemail: req.body.cemail,
        password: req.body.password,
        cpassword: req.body.cpassword,
    });

    try {
        const savedAccount = await account.save();
        res.status(200).json({ message: 'Account successfully created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
