const { sectorService } = require('../services');

const getCompanyInRank = async (req, res) => {
  try {
    const query = req.query;
    const data = await sectorService.getSectorAndCompany(query);
    const companies = data.company;
    companies.sort(function(company1, company2) {
      return company1.score < company2.score ? 1 : -1;
    });
    res.status(200).json(companies.map((company, index) => { return { id: company.id, name: company.name, ceo: company.ceo, score: company.score, rank: index + 1 }; }));
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {getCompanyInRank};