const Sequelize = require('sequelize');

const sequelize = new Sequelize('wordquest', 'root', 'Nipuna2001', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // Enable Sequelize logging
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    // loadWordsIntoTrie();
    console.log(
      `Database connected: ${sequelize.config.database} and Trie populated`
    );

    // Sync all models (use { force: true } for debugging, { alter: true } for production)
    await sequelize.sync();
    // console.log('Tables have been created successfully!');
  } catch (err) {
    console.error('Unable to connect to the database:', err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {
  connectDB,
  sequelize,
};