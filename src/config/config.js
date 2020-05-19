'use-strict';
const uri = process.env.MONGO_URI

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
