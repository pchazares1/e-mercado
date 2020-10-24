const {body} = require('express-validator');

const signupValidation = () => {
    return [
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
            .isEmail()
            .bail(),
        body('cemail')
            .custom((value, { req }) => {
                if (value !== req.body.email) {
                    throw new Error('Must match email');
                } else {
                    return true;
                }
            })
            .bail(),
        body('password')
            .notEmpty()
            .bail()
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_]).{6,}$/, 'g')
            .bail(),
        body('cpassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Must match password');
                } else {
                    return true;
                }
            })
            .bail()
        ];
} 

module.exports = signupValidation;