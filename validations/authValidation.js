const Joi = require('joi');

module.exports = {
  register: Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should have a minimum length of 3`,
      'any.required': `"name" is a required field`,
    }),

    email: Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`,
    }),
    gender: Joi.string().required().messages({
      'any.required': `"gender" is a required field`,
    }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
      .max(250)
      .required()
      .messages({
        'string.base': `"password" should contain at least 1 uppercase,1 lowercase,1 digit'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 `,
        'any.required': `"password" is a required field`,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character'`,
      }),

    confirmPassword: Joi.valid(Joi.ref('password')).messages({
      'string.base': `"confirmPassword" and password should be same'`,
    }),
    image: Joi.string().optional().empty().messages({
      'string.base': 'Image must be a string',
      'string.empty': 'Image cannot be empty',
    }),
  }),

  login: Joi.object({
    email: Joi.string().min(11).max(50).required().email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`,
    }),
    password: Joi.string()
      .min(8)
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      )
      .max(250)
      .required()
      .messages({
        'string.base': `"password" should contain at least 1 uppercase,1 lowercase,1 digit'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 `,
        'any.required': `"password" is a required field`,
        'string.pattern.base': `Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character'`,
      }),
  }),
  resetpassword: Joi.object({
    oldPassword: Joi.string().required().min(8).empty().messages({
      'string.base': 'old password field should be a type of string.',
      'string.empty': 'old password can not be an empty field.',
      'string.min': 'old password should be a minimum of 8 characters.',
      'any.required': 'old password is a required field.',
    }),
    newPassword: Joi.string().required().min(8).empty().messages({
      'string.base': `New password should be a type of 'text'.`,
      'string.empty': `New password can not be an empty field.`,
      'string.min': `New password should be a minimum of 8 characters.`,
      'any.required': `New password is a required field.`,
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).messages({
      'string.base': `Confirm password should be a type of 'text'.`,
      'any.only': `Confirm password doesn't match the password.`,
      'any.required': `Confirm password is a required field.`,
    }),
  }),
  update: Joi.object({
    name: Joi.string().min(3).max(30).messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'string.min': `"name" should have a minimum length of 3`,
      'any.required': `"name" is a required field`,
    }),

    email: Joi.string().min(11).max(50).email().messages({
      'string.empty': `"email" cannot be an empty field`,
      'any.required': `"email" is a required field`,
    }),
    gender: Joi.string().messages({
      'any.required': `"gender" is a required field`,
    }),
    image: Joi.string().optional().empty().messages({
      'string.base': 'Image must be a string',
      'string.empty': 'Image cannot be empty',
    }),
  }),
};
