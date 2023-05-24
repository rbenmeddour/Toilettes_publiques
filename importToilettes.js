require('./models');
const { Toilette } = require('./models');
const toilettesPubliques = require('./sanisettesparis.json');

const createToilette = async () => {
  await Toilette.destroy({ where: {} });

  // Vous avez le droit aujourd'hui avec le forEach
  // mais normalement on utilise Promise.all
  toilettesPubliques.forEach(async (toilette) => {
    const latitude = toilette.fields.geo_point_2d[0];
    const longitude = toilette.fields.geo_point_2d[1];

    const point = {
      type: 'Point',
      coordinates: [longitude, latitude],
    };

    const newToillete = await Toilette.create({
      adresse: toilette.fields.adresse,
      position: point,
      horaire: toilette.fields.horaire,
      arrondissement: toilette.fields.arrondissement,
    });

    // console.log(toilette.adresse);
  });
};

createToilette();
