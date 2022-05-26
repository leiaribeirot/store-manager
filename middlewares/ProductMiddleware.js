const Joi = require('joi');

const productDTO = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
}).messages({
    'any.required': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least 5 characters long',
    'number.min': '{{#label}} must be greater than or equal to 1',
    
});

const validateProduct = (req, res, next) => {
    const { error } = productDTO.validate(req.body, { abortEarly: false });

    if (!error) {
        return next();
    }

    const messages = error.details.map((e) => e.message);
    return res.status(400).json(messages);
};

module.exports = validateProduct;                                   