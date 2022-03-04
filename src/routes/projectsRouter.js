const express = require("express");
const Router = require("express").Router;
const pool = require("./../db/db");
const projectsRouter = Router();

projectsRouter.get("/", async (request, response) => {
  try {
    response.json({ message: "Moiz" });
  } catch (error) {
    console.error(error);
  }
});

projectsRouter.get("/all", async (request, response) => {
  try {
    const projects = await pool.query("SELECT * FROM projects;");
    response.json(projects.rows);
  } catch (error) {
    console.error(error);
  }
});

projectsRouter.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const project = await pool.query(
      `SELECT * FROM projects WHERE project_id = ${id}`
    );
    response.json(project.rows[0]);
  } catch (error) {
    console.error(error);
  }
});
module.exports = projectsRouter;
