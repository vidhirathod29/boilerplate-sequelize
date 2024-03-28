module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'users',
    {
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
        enum: ['Male', 'Female', 'Other'],
      },
      image: {
        type: Sequelize.STRING,
      },
    },
    { freezeTableName: true, timestamps: false },
  );
};
