const mongoose = require("mongoose");

const { MONGODB } = require("../config");

const connect = async () => {
  await mongoose.connect(MONGODB);
};
const disconnect = () => {
  mongoose.connection.close();
};

module.exports = { connect, disconnect };
