require('dotenv').config();
const express = require('express');
const config = require("config");
const cors = require('cors');
const app = express();
const serverless = require('serverless-http')
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "POST, GET, PUT, DELETE, PATCH",
    preflightContinue: false,
    optionSuccessStatus: 204
}));
// app.listen(process.env.PORT || config.get('PORT') || 4001, () => { console.log('listen') })
require('../startup/db')();
require('../startup/routes')(app);
module.exports.handler = serverless(app)