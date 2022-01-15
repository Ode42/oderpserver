const express = require("express");
const Router = require("express").Router;
const router = Router();
const projectsRouter = require("./projectsRouter");

router.use("/projects", projectsRouter);

router.get("/", (request, response) => {
    response.json("Hello from api")
});

module.exports = router;