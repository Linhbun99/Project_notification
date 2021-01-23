const {
  PORT,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,

  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME,
} = process.env;

const { A_WEEK } = require('../constants');

module.exports = {
  PORT: PORT || 3000,
  MONGO_URI: `mongodb://${MONGO_HOST}:${
    MONGO_PORT || '27017'
  }/${MONGO_DATABASE}`,
  JWT_SECRET_KEY,
  JWT_EXPIRES_TIME: parseInt(JWT_EXPIRES_TIME, 10) || A_WEEK,
  EMAIL_SERVER: 'linhak129@gmail.com',
  EMAIL_PASS_SERVER: 'ohnobaby',
  BATCH_SIZE: 5,
};
