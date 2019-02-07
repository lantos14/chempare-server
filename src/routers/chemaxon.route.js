import express from 'express';
import getImageData from '../api/getImageData';
import getStructureData from '../api/getStructureData';

const chemAxon = express.Router();

chemAxon
  .route('/chemaxon')

  .get(async (req, res, next) => {
    const name = req.query.compound;
    const imageData = await getImageData({
      'structure': name,
      'format': 'SVG',
    });

    const structureData = await getStructureData({
      'searchType': 'SUBSTRUCTURE',
      'query': 'aspirin',
      'target': 'aspirin',
    });

    return res.json({
      imageData,
      structureData,
    });
  })

module.exports = chemAxon;