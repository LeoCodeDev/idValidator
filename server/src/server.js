const express = require("express");
const axios = require("axios");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const origin = process.env.ORIGIN || "http://127.0.0.1:5173";
const dotenv = require("dotenv");

dotenv.config();

axios.defaults.baseURL = "https://api.validations.truora.com/v1";
axios.defaults.headers = {
  Accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
  "Truora-API-Key": process.env.API_KEY,
};

server.use(morgan("dev"));

server.use(
  cors({
    origin: origin,
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

server.use(express.json());

server.use("/", router);

module.exports = server;
