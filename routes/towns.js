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

router.get('/:id', function(req, res, next){
    models.Town.findAll({
        where: {
            id: req.params.id
        }
    }).then(town => {
        res.json(town);
    });
});

router.post('/', function(req, res, next) {
    const body = req.body;
    models.Town.create({
        name: body.name,
        stability: body.stability,
        population: body.population,
        support: body.support
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

router.post('/edit', function(req, res, next) {
    const id = req.body.id;
    const name = req.body.name;
    const stability = req.body.stability;
    const population = req.body.population;
    const support = req.body.support;

    models.Town.update({
        name: name,
        stability: stability,
        population: population,
        support: support
    },{
        where: {
            id: id
        }
    }).then(() => {
        res.send("OK");
    });
});

module.exports = router;
