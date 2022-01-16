const express = require("express");
const Router = require("express").Router;

const projectsRouter = Router();

projectsRouter.get("/", async (request, response) => {
    try {
        response.json("message: Moiz");
    } catch (error) {
        console.error(error);
    }
});

module.exports = projectsRouter;