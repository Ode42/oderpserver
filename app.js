const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

console.log(process.env.DB_PASSWORD)

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  }) 
  
app.get("/", (request, response) => {
    response.json({'message':'Welcome to OdeRP'});
})

app.listen(5000, () => {
    console.log("Server listening in port 5000")
})