const express = require("express");
const Router = require("express").Router;
const pool = require("../db/db")
const resourcesRouter = Router();

resourcesRouter.get("/", async (request, response) => {
    try {
        response.json("message: Moiz");
    } catch (error) {
        console.error(error);
    }
});


resourcesRouter.get("/resources", async (request, response) => {
    try {
        const resources = await pool.query("SELECT * FROM resources;");
        response.json(resources);
    } catch (error) {
        console.error(error);
    }
});

resourcesRouter.get("/offices", async (request, response) => {
    try {
        const offices = await pool.query("SELECT * FROM offices;");
        response.json(offices);
    } catch (error) {
        console.error(error);
    }
});

module.exports = resourcesRouter;