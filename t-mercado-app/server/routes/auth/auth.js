const express = require('express');
const router = express.Router();
const Account = require('../../models/account');

// return a map of error key and error message value
const errorFormat = error => {
    const errorMap = new Map();
    const errorMsg = error.substring(error.indexOf(':') + 1).trim();
    const errorArr = errorMsg.split(',').map(err => err.trim());
    errorArr.forEach(err => {
        let colonSplit = err.indexOf(':');
        errorMap.set(err.substring(0, colonSplit), err.substring(colonSplit + 1).trim());
    });

    return errorMap;
}

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
        const errorMap = errorFormat(error.message);
        console.log(errorMap);
        res.status(400).json({
            errors: errorMap.forEach((key, value) => {
                    return key + ' ' + value;
            })
        });
    }
});

module.exports = router;
