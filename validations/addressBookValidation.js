const Joi = require('joi');
module.exports = {
  addAddressBook: Joi.array().items(
    Joi.object({
      title: Joi.string().empty().required().messages({
        'string.base': `"title" should be a type of 'text'`,
        'string.empty': `"title" cannot be an empty field`,
        'any.required': `"title" is a required field`,
      }),
      addressLine1: Joi.string().empty().required().min(5).messages({
        'string.base': `"addressLine1" should be a type of 'text'`,
        'string.empty': `"addressLine1" cannot be an empty field`,
        'string.min': `"title" should be a minimum of 3 characters`,
        'any.required': `"addressLine1" is a required field`,
      }),
      addressLine2: Joi.string().empty().required().min(5).messages({
        'string.base': `"addressLine2" should be a type of 'text'`,
        'string.empty': `"addressLine2" cannot be an empty field`,
        'string.min': `"title" should be a minimum of 3 characters`,
        'any.required': `"addressLine2" is a required field`,
      }),
      country: Joi.string().empty().required().messages({
        'string.base': `"country" should be a type of 'text'`,
        'string.empty': `"country" cannot be an empty field`,
        'any.required': `"country" is a required field`,
      }),
      state: Joi.string().empty().required().messages({
        'string.base': `"state" should be a type of 'text'`,
        'string.empty': `"state" cannot be an empty field`,
        'any.required': `"state" is a required field`,
      }),
      city: Joi.string().empty().required().messages({
        'string.base': `"city" should be a type of 'text'`,
        'string.empty': `"city" cannot be an empty field`,
        'any.required': `"city" is a required field`,
      }),
      pin_code: Joi.string().empty().required().messages({
        'string.base': `"pin code" should be a type of 'text'`,
        'string.empty': `"pin code" cannot be an empty field`,
        'string.pattern.base': `pin code should be in valid credentials`,
        'any.required': `"pin code" is a required field`,
      }),
    }),
  ),
  updateAddressBook: Joi.object({
    title: Joi.string().empty().optional().messages({
      'string.base': `"title" should be a type of 'text'`,
      'string.empty': `"title" cannot be an empty field`,
      'any.required': `"title" is a required field`,
    }),
    addressLine1: Joi.string().empty().optional().min(5).messages({
      'string.base': `"addressLine1" should be a type of 'text'`,
      'string.empty': `"addressLine1" cannot be an empty field`,
      'string.min': `"title" should be a minimum of 3 characters`,
      'any.required': `"addressLine1" is a required field`,
    }),
    addressLine2: Joi.string().empty().optional().min(5).messages({
      'string.base': `"addressLine2" should be a type of 'text'`,
      'string.empty': `"addressLine2" cannot be an empty field`,
      'string.min': `"title" should be a minimum of 3 characters`,
      'any.required': `"addressLine2" is a required field`,
    }),
    country: Joi.string().empty().optional().messages({
      'string.base': `"country" should be a type of 'text'`,
      'string.empty': `"country" cannot be an empty field`,
      'any.required': `"country" is a required field`,
    }),
    state: Joi.string().empty().optional().messages({
      'string.base': `"state" should be a type of 'text'`,
      'string.empty': `"state" cannot be an empty field`,
      'any.required': `"state" is a required field`,
    }),
    city: Joi.string().empty().optional().messages({
      'string.base': `"city" should be a type of 'text'`,
      'string.empty': `"city" cannot be an empty field`,
      'any.required': `"city" is a required field`,
    }),
    pin_code: Joi.string().empty().optional().messages({
      'string.base': `"pin code" should be a type of 'text'`,
      'string.empty': `"pin code" cannot be an empty field`,
      'string.pattern.base': `pin code should be in valid credentials`,
      'any.required': `"pin code" is a required field`,
    }),
  }),
};
