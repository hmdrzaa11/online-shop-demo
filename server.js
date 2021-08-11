let dotenv = require("dotenv");
let mongoose = require("mongoose");
let app = require("./app");
dotenv.config();

let PORT = process.env.PORT || 3000;
let server = app.listen(PORT, () => console.log(`Server on PORT ${PORT}`));

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to DB"))
  .catch((err) => {
    console.log(err);
    server.close((err) => {
      process.exit(1);
    });
  });
