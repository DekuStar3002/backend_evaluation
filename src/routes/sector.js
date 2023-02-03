const express = require('express');
const { sectorController } = require('../controllers');
const middlewares = require('../middlewares');
const router = express.Router();

router.route('/companies')
  .get(middlewares.queryValidaton, sectorController.getCompanyInRank);

module.exports = {router};