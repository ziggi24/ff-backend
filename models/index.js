const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log('mongo db connected...');
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
}).catch((err) => {
  console.log('mongo error ' + err);
  console.log(`MongoDB URI: ${process.env.MONGODB_URI}`);
});

module.exports = {
  Url: require('./Url'),
};