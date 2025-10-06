const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");  
const LogInCollection = require("./mongo");
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const templatePath = path.join(__dirname, "../templates");  
const publicPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));


app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/", (req, res) => {
  res.render("login");
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  };

  try {
    const checking = await LogInCollection.findOne({ name: req.body.name });

    if (checking) {
      res.send("User details already exist");
    } else {
      await LogInCollection.insertMany([data]);
      res.status(201).render("home", { naming: req.body.name });
    }
  } catch (error) {
    res.send("Error occurred");
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await LogInCollection.findOne({ name: req.body.name });

    if (check && check.password === req.body.password) {
      res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
    } else {
      res.send("Incorrect password");
    }
  } catch (error) {
    res.send("Wrong details");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
