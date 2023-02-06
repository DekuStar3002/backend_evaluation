const axios = require('axios');
const { Company, Sector } = require('../../database/models');
const utils = require('../utils');
const { GET_COMPANY_API_URL, GET_SECTOR_API_URL } = require('../constants');

const save = async ({ urlLink }) => { // FUCNTION TO SAVE COMPANY AND SECTOR DATA;
  const csv = await axios.get(urlLink);
  const lines = utils.readDataByLine(csv);

  // CREATE COMPANY DATA
  for(let [index, line] of lines.entries() ){
    if(index === 0){
      continue;
    }
    const data = utils.splitString(line);
    const companyData = await axios.get(`${GET_COMPANY_API_URL}${data[0]}`);
    const company = {
      id: companyData.data.id,
      name: companyData.data.name,
      ceo: companyData.data.ceo,
      sector_id: 1
    };
    await Company.create(company);
  }

  //   CREATE SECTOR DATA AND UPDATE COMPANY DATA
  for(let [index, line] of lines.entries() ) {
    if(index === 0)
      continue;
    const data = utils.splitString(line);
    const sectorData = await axios.get(`${GET_SECTOR_API_URL}${data[1]}`);
    var sector;
    sector = await Sector.findOne({ where: { name: data[1] }});
    if(sector === null) {
      sector = await Sector.create({ name: data[1] });
    }
    sectorData.data.filter( async (secData) => {
      const score = ((Number(secData.performanceIndex[0].value) * 10) + (Number(secData.performanceIndex[1].value) / 10000) + (Number(secData.performanceIndex[2].value) * 10) + Number(secData.performanceIndex[3].value)) / 4;
      
      await Company.update({ sector_id: sector.id, score: `${score ? score : 0}` }, { where: {
        id: secData.companyId
      } });
    });
  }
  return Company.findAll();
};

const update = async (id, body) => {
  const company = await Company.findOne({ where: { id: id } });
  if(!company)
    return {};
  const ceo = body.ceo ? body.ceo : company.data.ceo;
  const address = body.address ? body.address : company.data.address;
  return Company.update({ ceo: ceo, address: address }, { where: { id: id } });
};

module.exports = { save, update };