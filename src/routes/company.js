const express = require('express');
const { companyController } = require('../controllers');
const middlewares = require('../middlewares');
const router = express.Router();

router.route('/save')
  .post(middlewares.urlValidation, companyController.save);

router.route('/update')
  .patch(middlewares.queryValidaton.idValidaton, middlewares.bodyValidation, companyController.update);

module.exports = {router};