const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const app = require("./server");

const port = 5000;

module.exports = mongoose.connect(MONGODB).then(() => {
  app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`);
  });
});
