const models = require('../models');
const express = require('express');
const router = express.Router();
const title = "Overthrow Profit Table";

/* GET home page. */
router.get('/', function (req, res, next) {
    models.Town.findAll()
        .then(towns => {
            res.render('index', {
                title: title,
                towns: towns
            });
        });
});

router.post('/', async function (req, res, next) {
    const body = req.body;
    const buyFromTownID = body.buyFromTown;
    const sellToTownID = body.sellToTown;
    const tradeLvl = parseInt(body.tradeLvl);

    let buyFromTown = await models.Town.findAll({
        where: {
            id: buyFromTownID
        }
    });
    let sellToTown = await models.Town.findAll({
        where: {
            id: sellToTownID
        }
    });
    const towns = await models.Town.findAll();
    const items = await models.Item.findAll();

    buyFromTown = buyFromTown[0];
    sellToTown = sellToTown[0];

    // Calculate buy price
    const profitTable = [];
    items.forEach(item => {
        const buyPrice = getBuyPrice(item.baseprice, buyFromTown.stability, buyFromTown.population, buyFromTown.support, tradeLvl);
        const sellPrice = getSellPrice(item.baseprice, sellToTown.stability, sellToTown.population, sellToTown.support, tradeLvl);
        profitTable.push({
            itemName: item.name,
            buyPrice: buyPrice,
            sellPrice: sellPrice,
            profitMargin: Math.round(((sellPrice / buyPrice) - 1.0) * 10000) / 100
        });
    });

    // Return buyPrice and sellPrice for all items
    res.render('index', {
        title: title,
        profitTable: profitTable,
        buyFromTown: buyFromTown,
        sellToTown: sellToTown,
        towns: towns
    });
});

function getBuyPrice(baseprice, stability, population, standing, tradeLvl) {
    const OT_standardMarkup = 1.2;

    stability = 1.0 - (stability / 100);
    population = population > 2000 ? 2000 : population; // Max 2000
    population = 1 - (population / 2000);
    standing = standing < -100 ? -100 : standing; // Min -100
    standing = standing > 100 ? 100 : standing; // Max 100
    standing = standing === 0 ? 1 : standing; // 0 = 1
    standing = standing / 100;
    let discount = 0;
    if(tradeLvl > 1) {
        discount = 0.02 * (tradeLvl - 1);
    }
    discount = discount + (standing * 0.2);

    let buyPrice = baseprice + (baseprice + (baseprice * stability * population) * OT_standardMarkup);
    return Math.round(buyPrice - (buyPrice * discount));
}

function getSellPrice(baseprice, stability, population, standing) {
    stability = 1.0 - (stability / 100);
    population = population > 1000 ? 1000 : population; // Max 1000
    population = 1 - (population / 1000);
    // standing = standing < -100 ? -100 : standing; // Min -100
    // standing = standing > 100 ? 100 : standing; // Max 100
    // standing = standing === 0 ? 1 : standing; // 0 = 1
    // standing = (standing / 100) + 1;

    let sellPrice = baseprice + ((baseprice * 0.55) + (baseprice * stability * population));
    sellPrice = sellPrice < 0 ? 1 : sellPrice; // Min 1
    return Math.round(sellPrice);
}

module.exports = router;
