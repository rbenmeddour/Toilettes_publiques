const express = require('express');
const app = express();
const sequelize = require('sequelize');
const { Toilette } = require('../models');

app.post('/', async (req, res) => {
  const { name, latitude, longitude } = req.body;

  const point = {
    type: 'Point',
    coordinates: [longitude, latitude],
  };

  const toilette = await Toilette.create({
    name: name,
    position: point,
  });

  res.json(toilette);
});

app.get('/', async (req, res) => {
  const { r, latitude, longitude } = req.query;

  // distance max jusqu'a laquelle on veut chercher
  const radius = r * 1000;

  // définition de notre point de départ (centre du cercle)
  const location = sequelize.literal(
    `ST_GeomFromText('POINT(${longitude} ${latitude})')`
  );

  // calculer la distance entre notre point de départ
  // et les monuments
  const distance = sequelize.fn(
    'ST_Distance_Sphere',
    sequelize.col('toilette.position'),
    location
  );

  const toilettes = await Toilette.findAll({
    where: {
      // on veut récupérer les monuments dont la distance
      // est inférieure ou égale (lte = lower than or equal) au rayon
      position: sequelize.where(distance, { [sequelize.Op.lte]: radius }),
    },
  });

  res.json(toilettes);
});

module.exports = app;
