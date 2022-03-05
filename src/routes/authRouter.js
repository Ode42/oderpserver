const express = require("express");
const res = require("express/lib/response");
const Router = require("express").Router;
const pool = require("../db/db");
const authRouter = Router();

authRouter.get("/", async (request, response) => {
  try {
    response.json("message: Moiz from auth");
  } catch (error) {
    console.error(error);
  }
});

authRouter.post("/register", async (request, response) => {
  const { first_name, last_name, email, password } = request.body;

  if (!(email && password && first_name && last_name)) {
    response.status(400).json({ error: "OE01" });
  }

  try {
    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, password]
    );
    response.json(newUser.rows[0]);
  } catch (error) {
    console.error(error);
    if (error.code == "23505") {
      response.json({ error: "OE02" });
    }
  }
});

authRouter.post("/login", (request, response) => {});

module.exports = authRouter;
