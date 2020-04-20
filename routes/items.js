const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    models.Item.findAll()
        .then(items => {
            res.render('items', {
                title: 'Overthrow Item Table',
                items: items
            });
        });
});

module.exports = router;
