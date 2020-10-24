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
            .matches('/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_])(?=\\S+$).{6,}$/', 'g'),
        body('cpassword')
            .notEmpty()
            .bail()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Must match password');
                }
            })];
} 

module.exports = signupValidation;