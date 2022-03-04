const express = require("express");
const Router = require("express").Router;
const router = Router();
const projectsRouter = require("./projectsRouter");
const resourcesRouter = require("./resourcesRouter");
const authRouter = require("./authRouter");

router.use("/resources", resourcesRouter);
router.use("/projects", projectsRouter);
router.use("/auth", authRouter);
router.get("/", (request, response) => {
  response.json("Hello from api");
});

module.exports = router;
