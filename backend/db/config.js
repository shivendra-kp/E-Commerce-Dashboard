const mongoose = require("mongoose");
const DATABASE_NAME = "ECommDB";

const DB_URL = "mongodb://localhost:27017/" + DATABASE_NAME;

mongoose.connect(DB_URL);
