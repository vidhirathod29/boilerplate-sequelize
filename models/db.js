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
