'use-strict';
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
const uri =
  MONGO_USERNAME !== '' && MONGO_PASSWORD !== ''
    ? `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
    : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

module.exports = {
  options: {
    useNewUrlParser: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500,
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  uri,
};
