const express = require('express');
const { companyRoute, sectorRoute } = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', companyRoute.router);   
app.use('/api', sectorRoute.router);
module.exports = app;