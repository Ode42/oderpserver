const bcrypt = require("bcryptjs/dist/bcrypt");
const express = require("express");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { user } = require("pg/lib/defaults");
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
  try {
    const { first_name, last_name, email, password } = request.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: encryptedPassword,
      user_id: 0,
      token: "XXXXXXXXXX",
    };

    if (!(email && password && first_name && last_name)) {
      response.status(400).json({ error: "OE01" });
    }

    try {
      const newUser = await pool.query(
        "INSERT INTO users (first_name, last_name, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          user.first_name,
          user.last_name,
          user.email,
          user.password,
          "XXXXXXXXX",
        ]
      );
      user.first_name = newUser.rows[0]["first_name"];
      user.last_name = newUser.rows[0]["last_name"];
      user.email = newUser.rows[0]["email"];
      user.password = newUser.rows[0]["password"];
      user.user_id = newUser.rows[0]["user_id"];
      const token = jwt.sign(
        { user_id: user.user_id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      const newToken = await pool.query(
        "UPDATE users SET token = $1 WHERE user_id = $2",
        [user.token, user.user_id]
      );
    } catch (error) {
      console.error(error);
      if (error.code == "23505") {
        response.json({ error: "OE02" });
      }
    }

    response.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

authRouter.post("/login", (request, response) => {});

module.exports = authRouter;
