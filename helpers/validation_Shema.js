const Joi = require('joi');


 exports.creatUserValidation = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2}).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // ConPassword: Joi.ref('password'),
    address:Joi.string().allow(''),
    phone:Joi.number().required(),

})

exports.customMessages = {
    'string.alphanum': 'Username must only contain alpha-numeric characters',
    'string.min': 'Username must be at least 3 characters long',
    'string.max': 'Username must be less than or equal to 30 characters long',
    'any.required': 'Field is required',
    'string.email': 'Please enter a valid email address',
    'string.pattern.base': 'Password must only contain alpha-numeric characters and be between 4 to 30 characters long'
};


