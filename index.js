const express = require("express");
const connectDb = require("./db/config");
const { urlencoded } = require("body-parser");
const router = require("./routes/userRoutes");

const app = express();
var cors = require("cors");
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api/user", router);
app.listen(port, () => {
  connectDb();
  console.log(`Task Tap listening on port ${port}`);
});
