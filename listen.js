const port = process.env.PORT || 9090;
const app = require("./app");

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Listening on port ${port}`);
});
