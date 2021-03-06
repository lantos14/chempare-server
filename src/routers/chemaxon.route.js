import express from 'express';
import getImageData from '../api/getImageData';
import getStructureData from '../api/getStructureData';

const chemAxon = express.Router();

chemAxon
  .route('/chemaxon')

  .post(async (req, res, next) => {
    console.log(`request arrived at ${new Date()}. Url: ${req.originalUrl}, Method: ${req.method}, Body: `, req.body);

    const names = req.body.names;
    const result = {
      'compounds': [],
      'comparison': null,
    };

    // get images
    for (let i = 0; i < names.length; i++) {
      const compound = names[i];
      try {
        const imageData = await getImageData({
          'structure': compound,
          'format': 'SVG',
        });
        
        console.log('imageData result: ', imageData && `${compound}: success`);

        result.compounds.push({
          'compoundName': compound,
          'rawImg': imageData.image,
        });
      } catch (error) {
        res.status(400);
        res.json({
          'status': 400,
          'msg': 'compound does not exist'
        });
        return;
      }
    }

    // get comparison data
    if (names.length === 2) {
      const structureData = await getStructureData({
        'searchType': 'SUBSTRUCTURE',
        'query': names[0],
        'target': names[1],
      });

      console.log('structureData result: ', structureData);
      result.comparison = structureData.matching;
    }

    return res.json(
      result,
    );
  })

module.exports = chemAxon;
