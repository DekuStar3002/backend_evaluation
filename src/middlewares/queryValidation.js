const Joi = require('joi');
const sectorValidaton = (req, res, next) => {
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
const idValidaton = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });
  const { error } = schema.validate(req.query);
  if(error) {
    res.status(400).json({ message: error.message });
    return;
  }
  next();
};

module.exports = { sectorValidaton, idValidaton };