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
            .isLength({ min: 8 })
            .bail()
            .matches(('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,})$', 'i'),
        body('cpassword')
            .notEmpty()
            .bail()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Must match password');
                }
            }))];
} 

module.exports = signupValidation;