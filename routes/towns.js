const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    models.Town.findAll()
        .then(towns => {
            res.render('towns', {
                title: 'Overthrow Town Table',
                towns: towns
            });
        });
});

router.post('/', function(req, res, next) {
    const body = req.body;
    models.Town.create({
        name: body.townName,
        stability: body.townStability,
        population: body.townPopulation,
        support: body.townSupport
    }).then(() => {
        res.redirect('/towns');
    });
});

router.post('/delete/:id', function(req, res, next) {
    const id = req.params.id;
    models.Town.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/towns');
    });
});

module.exports = router;
