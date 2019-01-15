import express from 'express';
import Product from '../models/product.model';
import scrapeController from '../Scrapers/scrapeController';
import productCategories from '../Scrapers/catFilter';
import countProductsSum from '../utilities/countProductsSum';
import handleData from '../scheduler';

const routerDB = express.Router();

routerDB
  .route('/products')

  .get(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || 30;
    console.log('limit: ', limit);
    Product.find({
      store: ['promod'],
      type: ['pulover-kardigan']
    })
    .limit(limit)
    .exec((err, products) => {
      return res.json({ products });
    });
  })

  
  .post(async (req, res, next) => {
    
    if (req.headers.authorization !== process.env.SECRET) {
      return res.status(401).send("401 - Not authorized");
    }
    // start the scraping
    const status = await handleData();

    return res.json({
      status,
    });
  })
  
  .delete(async (req, res, next) => {
    Product.deleteMany({ }, (err) => {
      return res.json({ result: "success" });
    });
  });

  const handleError = function (err) {
  console.error(err);
  // handle your error
};

module.exports = routerDB;