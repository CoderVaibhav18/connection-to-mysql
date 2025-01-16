require("dotenv").config();
const express = require("express");
const pool = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// MySql db connection
pool
  .query("SELECT 1")
  .then(() => {
    console.log("my sql connect");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/user", authRoutes);

app.listen(port, () => console.log(`Server started at port ${port}`));
