const Joi = require('joi');
const queryValidaton = (req, res, next) => {
  const schema = Joi.object({
    sector: Joi.string().required()
  });
  const { error } = schema.validate(req.query);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = queryValidaton;