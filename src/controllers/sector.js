const { sectorService } = require('../services');

const getCompanyInRank = async (req, res) => {
  try {
    const query = req.query;
    const data = await sectorService.getSectorAndCompany(query);
    const companies = data.company;
    // const compare = (data1, data2) => {
    //   if(data1.score < data2.score )
    //     return -1;
    //   else if(data1.score > data2.score)
    //     return 1;
    //   else 
    //     return 0;
    // };
    console.log(data);
    // companies.sort(compare);
    // const responseData = companies.map(( comapny, index ) => { return {
    //   id: comapny.id,
    //   name: comapny.name,
    //   ceo: comapny.ceo,
    //   score: comapny.score,
    //   ranking: index + 1,
    // };
    // });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {getCompanyInRank};