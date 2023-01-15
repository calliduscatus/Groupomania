const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const path = require("path");

const usersRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase connected !");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connexion à MongoDB échouée !");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
