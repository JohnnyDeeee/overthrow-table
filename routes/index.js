const models = require('../models');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    models.Item.findAll()
        .then(items => {
            console.log(items);
            res.render('index', {
                title: 'Overthrow Price Table',
                items: items
            });
        });
});

module.exports = router;
