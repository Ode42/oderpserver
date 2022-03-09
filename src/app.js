const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const routes = require("./routes");
const auth = require("./middleware/auth");

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header({ "Access-Control-Allow-Origin": "*" });
  next();
});
app.use(express.urlencoded({ extend: true }));
app.use(express.json());
app.use(routes);

app.get("/welcome", auth, (request, response) => {
  response.send("Welcome");
});
app.listen(process.env.API_PORT || 5000, () => {
  console.log(`Server listening in port ${process.env.API_PORT}`);
});
