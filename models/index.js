const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'jdqjfe6ekt5x5ic1',
  'ql8ioendwzijdo41',
  'duiaqbr2yz6583e8',
  {
    host: 'oliadkuxrl9xdugh.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',
    dialect: 'mysql',
    logging: false,
  }
);

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to db');
  } catch (e) {
    console.log(e);
  }
};

connectDb();

const Toilette = require('./Toilette')(sequelize);

sequelize.sync({ alter: true });

const db = {
  sequelize,
  Toilette,
};

module.exports = db;
