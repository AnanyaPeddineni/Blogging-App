const mongoose = require('mongoose');
require('dotenv').config();

const connectString = process.env.MONGO_URI;

mongoose.connect(connectString)
  .then(() => console.log('MongoDB connected')) 
  .catch((error) => console.log(error));