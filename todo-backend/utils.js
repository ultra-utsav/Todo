const User = require("./models/User");
const mongoose = require("mongoose");
const mongoURI = require("./config").mongoURI;

const InitDBConnection = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log(`Connected to mongodb : ${mongoURI}`));
};

module.exports = {
  InitDBConnection,
};
