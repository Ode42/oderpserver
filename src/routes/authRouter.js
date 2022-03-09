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
      response
        .status(400)
        .json({ error: "OE01", description: "All input is required" });
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
      console.log(user);
    } catch (error) {
      console.error(error);
      if (error.code == "23505") {
        response.json({
          error: "OE02",
          description: "User with given email already exists",
        });
      }
    }

    response.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
});

authRouter.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!(email && password)) {
      res
        .status(400)
        .json({ error: "OE3", description: "All input is required" });
    }

    const loggedUser = {
      first_name: "first_name",
      last_name: "last_name",
      email: email,
      password: password,
      user_id: 0,
      token: "XXXXXXXXXX",
    };

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    loggedUser.first_name = user.rows[0]["first_name"];
    loggedUser.last_name = user.rows[0]["last_name"];
    loggedUser.user_id = user.rows[0]["user_id"];
    if (user && (await bcrypt.compare(password, user.rows[0]["password"]))) {
      const token = jwt.sign(
        { user_id: loggedUser.user_id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      loggedUser.token = token;
      response.status(200).json(loggedUser);
    }
    response
      .status(400)
      .json({ error: "OE4", description: "Invalid credentials" });
  } catch (error) {
    console.error(error);
  }
});

module.exports = authRouter;
