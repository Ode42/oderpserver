const express = require("express");
const Router = require("express").Router;
const router = require("./routes/router");
const routes = Router();

routes.use("/api", router);

module.exports = routes;