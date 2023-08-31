const mongoose = require("mongoose");
const app = require("./app");

const { DB_URI, PORT = 8080 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("CONNECT SUCCESS");
    app.listen(PORT);
  })

  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000");
});
