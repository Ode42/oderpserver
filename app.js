const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const pool = require("./db/db");

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  });
app.use(express.json());

app.get("/projects", async (request, response) => {
    try {
        const projects = await pool.query("SELECT * FROM projects;")
        response.json(projects);
    } catch (error) {
        console.error(error);
    }
})




app.listen(process.env.API_PORT, () => {
    console.log(`Server listening in port ${process.env.API_PORT}`)
})
