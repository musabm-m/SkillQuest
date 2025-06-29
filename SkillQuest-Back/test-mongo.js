const mongoose = require('mongoose');
require('dotenv').config();

console.log("Connecting to:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected successfully to MongoDB");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:");
    console.error(err);
    process.exit(1);
  });
