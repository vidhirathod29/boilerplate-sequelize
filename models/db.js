const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize-boilerplate', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.authModel = require('../models/auth')(sequelize, Sequelize);
db.addressBookModel= require('../models/addressBook')(sequelize, Sequelize);

db.sequelize.sync().then(() => {
  console.log('Re-sync');
});
module.exports = db;
