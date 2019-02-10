var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Animal = sequelize.import('../models/animal');

module.exports = router;