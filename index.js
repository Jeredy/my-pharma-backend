const { connect } = require("./db/connection");
const app = require("./server");

const port = 5000;

module.exports = connect().then(() => {
  app.listen(port, () => {
    console.log(`Exemple app listening at http://localhost:${port}`);
  });
});
