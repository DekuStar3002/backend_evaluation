const express = require('express');
const { companyController } = require('../controllers');
const middlewares = require('../middlewares');
const router = express.Router();

router.route('/save')
  .post(middlewares.bodyValidation, companyController.save);

module.exports = {router};