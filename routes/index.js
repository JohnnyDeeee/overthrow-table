const models = require('../models');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: "Overthrow table"
    });
});

module.exports = router;
