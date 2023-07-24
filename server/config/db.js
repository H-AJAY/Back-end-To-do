const config = require('../config/config');
const db = require('../models');
const logger = require('../config/logger.config');

const connect = () => {
  try {
    db.mongoose
      .connect(
        `mongodb://${config.db.USER}:${encodeURIComponent(config.db.PASS)}@${config.db.HOST}:${
          config.db.PORT
        }/${config.db.DB}`,
        {
          authSource: 'admin',
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
          useUnifiedTopology: true,
          keepAlive: true,
          socketTimeoutMS: 30000,
        }
      )
      .then(() => {
        logger.info('Successfully connect to MongoDB.');
      })
      .catch((err) => {
        logger.error('Connection error' + err);
      });
  } catch (err) {
    logger.error('Catch block of initial');
    logger.error(err);
  }
};

const disconnect = () => {
  db.mongoose.disconnect();
};

const status = () => {
  const status = db.mongoose.connection.readyState;
  logger.info(status);
};

const connectedDb = async () => {
  logger.info('fetching db');
  return await db.mongoose.connection.db;
};

module.exports = {
  connect,
  disconnect,
  status,
  connectedDb,
};
