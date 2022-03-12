const express = require("express");
const Router = require("express").Router;
const pool = require("./../db/db");
const projectsRouter = Router();
const auth = require("./../middleware/auth");

projectsRouter.get("/hello", auth, async (request, response) => {
  try {
    response.json({ message: "Hello" });
  } catch (error) {
    console.error(error);
  }
});

projectsRouter.get("/user-projects", auth, async (request, response) => {
  try {
    const projects = await pool.query()
  }
})
projectsRouter.get("/all", auth, async (request, response) => {
  try {
    const projects = await pool.query("SELECT * FROM projects;");
    response.json(projects.rows);
  } catch (error) {
    console.error(error);
  }
});

module.exports = projectsRouter;
