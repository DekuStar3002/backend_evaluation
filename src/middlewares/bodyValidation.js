const Joi = require('joi');

const bodyValidation = (req, res, next) => {
  const schema = Joi.object({
    ceo: Joi.string(),
    address: Joi.string(),
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = bodyValidation;