const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const routes = require("./routes");

const pool = require("./db/db");

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  });
app.use(express.json());
app.use(routes);

app.listen(process.env.API_PORT, () => {
    console.log(`Server listening in port ${process.env.API_PORT}`)
})
