const express = require("express");
const Router = require("express").Router;
const pool = require("./../db/db")
const resourceRouter = Router();

resourceRouter.get("/", async (request, response) => {
    try {
        response.json("message: Moiz");
    } catch (error) {
        console.error(error);
    }
});


resourceRouter.get("/resources", async (request, response) => {
    try {
        const projects = await pool.query("SELECT * FROM resources;");
        response.json(projects);
    } catch (error) {
        console.error(error);
    }
});

resourceRouter.get("/offices", async (request, response) => {
    try {
        const projects = await pool.query("SELECT * FROM offices;");
        response.json(projects);
    } catch (error) {
        console.error(error);
    }
});

module.exports = projectsRouter;