const { Sector } = require('../../database/models');

const getSectorAndCompany = async ({sector}) => {
  return Sector.findOne({ where: { name: sector }, include: [ 'company' ] });
};

module.exports = { getSectorAndCompany };