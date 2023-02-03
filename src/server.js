const express = require('express');
const { companyRoute } = require('./routes');
const app = express();

app.use(express.json());
app.use('/api', companyRoute.router);   
module.exports = app;