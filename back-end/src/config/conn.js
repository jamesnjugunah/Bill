const sequelize = require('./db');

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.'.green.inverse);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = connectDB;
