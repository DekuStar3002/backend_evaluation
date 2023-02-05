const Joi = require('joi');

const urlValidation = (req, res, next) => {
  const schema = Joi.object({
    urlLink: Joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = urlValidation;