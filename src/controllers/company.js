const { companyService } = require('../services');
const save = async (req, res) => {
  try {
    const body = req.body;
    const data = await companyService.save(body);
    res.status(201).json(data.map((company) => { return { id: company.id, name: company.name, score: company.score }; }));
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.query.id;
    const body = req.body;
    const data = await companyService.update(id, body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {save, update};