'use strict';

const fs = require('fs');
const path = require('path');
const csvParse = require('csv-parse/lib/sync');
const csvDataPath = path.resolve("data");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let items = [];
    fs.readdirSync(csvDataPath).forEach(file => {
      if(!file.endsWith(".csv")) {
        return;
      }

      let categoryName = file.split(".")[0];
      const records = csvParse(fs.readFileSync(path.resolve(csvDataPath, file)), {
        columns: true,
        on_record: (record, context) => {
          return {
            name: record.name,
            baseprice: record.baseprice,
            wood: record.wood,
            steel: record.steel,
            plastic: record.plastic,
            category: categoryName,
            createdAt: new Date(),
            updatedAt: new Date()
          };
        }
      });
      // console.log(`Category: ${categoryName}, records: ${records.length}`);
      records.map(record => { items.push(record); });
    });

    return queryInterface.bulkInsert('Items', items);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
