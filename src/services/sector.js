const { Sector } = require('../../database/models');

const getSectorAndCompany = async ({sector}) => {
  return Sector.findAll({ where: { name: sector }, include: [ 'company' ] });
};

module.exports = { getSectorAndCompany };