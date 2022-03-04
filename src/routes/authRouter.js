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

authRouter.post("/register", (request, response) => {
  const { first_name, last_name, email, password } = request.body;

  if (!(email && password && first_name && last_name)) {
    response.status(400).json({ error: "OE01" });
  }

  const emailCheck = pool.query(
    `SELECT * FROM users WHERE email LIKE '${email}';`
  );

  if (emailCheck.rows.length() !== 0) {
    return response.status(409).json({ error: "OE02" });
  }
});

authRouter.post("/login", (request, response) => {});

module.exports = authRouter;
