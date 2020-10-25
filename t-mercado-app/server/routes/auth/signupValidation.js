const {body} = require('express-validator');

const signupValidation = () => {
    return [
        body('fname')
            .notEmpty()
            .bail()
            .withMessage('First name cannot be empty')
            .isString()
            .withMessage('First name must contain characters')
            .bail()
            .isLength({ min: 2 })
            .withMessage('First name must be at least 2 letters')
            .bail()
            .isAlpha()
            .withMessage('First name must be alphanumeric')
            .bail(),
        body('lname')
            .notEmpty()
            .bail()
            .withMessage('Last name cannot be empty')
            .isString()
            .withMessage('Last name must contain characters')
            .bail()
            .isLength({ min: 2 })
            .withMessage('Lasst name must be at least 2 letters')
            .bail()
            .isAlpha()
            .withMessage('Lasst name must be alphanumeric')
            .bail(),
        body('email')
            .notEmpty()
            .bail()
            .withMessage('Email cannot be empty')
            .isLength({ min: 3 })
            .bail()
            .withMessage('Email must be at least 3 letters')
            .isEmail()
            .bail()
            .withMessage('Email is invalid'),
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
            .withMessage('Password cannot be empty')
            .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_])(?=\S+$).{6,}$/, 'g')
            .bail()
            .withMessage('Password must have at least 6 characters long, at least one digit, at least one lowercase letter,'
            + ' at least one uppercase letter, at least one valid special characters !@#$%^&*()_, and no white spaces'),
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