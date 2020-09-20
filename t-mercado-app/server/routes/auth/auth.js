const express = require('express');
const router = express.Router();
const Account = require('../../models/account');
const argon2 = require('argon2');
const { body, validationResults } = require('express-validator');

router.post('/signup', [
    body('fname')
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 2 })
        .bail()
        .isAlpha()
        .bail(),
    body('lname')
        .notEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ min: 2 })
        .bail()
        .isAlpha()
        .bail(),
    body('email')
        .notEmpty()
        .bail()
        .isLength({ min: 3 })
        .bail()
        .isEmail(),
    body('cemail')
        .notEmpty()
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.email) {
                throw new Error('Must match email');
            }
        })
        .bail(),
    body('password')
        .notEmpty()
        .bail()
        .isLength({ min: 8 })
        .bail()
        .matches((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,})$/, "i"),
    body('cpassword')
        .notEmpty()
        .bail()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Must match password');
            }
        })],
    async (req, res) => {
        const emailExists = await Account.findOne({ email: req.body.email });
        let hashPassword = '';
        if (emailExists) return res.status(400).json({ error: 'Email already exists' });

        // TODO: change method of validating confirmation email and password within the schema
        if (req.body.cemail !== req.body.email) return res.status(400).json({ error: 'Must match email' });

        if (req.body.cpassword !== req.body.password) {
            return res.status(400).json({ error: 'Must match password' });
        } else {
            // hash password
            try {
                hashPassword = await argon2.hash(req.body.password);
            } catch (error) {
                console.log(error);
            }
        }

        const account = new Account({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: hashPassword
        });

        try {
            const savedAccount = await account.save();
            res.status(200).json({ message: 'Account successfully created' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

router.post('/login', async (req, res) => {
    /**
     * Request password and email, verify if it matches from database.
     * generate a webtoken when it matches
     */
    // Account.findOne({ email: req.body.email }).exec().then(user => {
    //     if(!user) res.status(401).json({ error: 'Email does not exist'});

    //     return argon2.verify(user.password, req.body.password);
    // }).then(result => {
    //     if(!result) res.status(401).json('Password does not match');

    //     res.status(200).json('Auth Succesful');
    // }).catch(error => {
    //     console.log(error);
    //     res.status(401).json('Auth Failed')
    // });

    try {
        const user = await Account.findOne({ email: req.body.email }).exec();
        let isPass = true;
        if (!user) {
            res.status(401).json({ error: 'Email does not exist' });
        }
        else if (user) {
            isPass = argon2.verify(user.password, req.body.password);
        }
        else if (!isPass) {
            res.status(401).json('Password does not match');
        } else {
            res.status(200).json('Auth Succesful');
        }
    } catch (error) {
        console.log(error);
        res.status(401).json('Auth Failed');
    }
});

module.exports = router;
