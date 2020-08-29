require("dotenv").config();
const express = require("express");
const app = express();
const api = require("./routes/api");
const user = require("./routes/user-routes");
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
//app.use("/api", api);

// app.use(app.router);
// api.initialize(app);

app.use("/api", api);
app.use("/user", user);

if (process.env.NODE_ENV === "production") {
  console.log("heloooooo");
  app.use(express.static(__dirname + "/frontend/build")); //change folder name from frontend to whatever you have there
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html")); //change folder name from frontend to whatever you have there
  });
}

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log(`App is running at ${PORT}`);
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
