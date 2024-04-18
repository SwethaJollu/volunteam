const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3300;

const User = require("./models/User");

app.use(express.static(__dirname));
app.use("/images", express.static("images"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/volunteam")
  .then(() => console.log("Connection successfull"))
  .catch((err) => {
    console.log("Error in connection" + err.stack);
    process.exit(1);
  });

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      await User.create({ name, email, password });
      res.redirect("/login");
    } else {
      return res.send("User already exist");
    }
  } catch (error) {
    console.error("Failed to register", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.send("Invalid User");
    } else {
      res.redirect("/Home1");
    }
  } catch (error) {
    console.error("Failed to Login", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/frontp.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

app.get("/Home1", (req, res) => {
  res.sendFile(__dirname + "/Home1.html");
});






app.listen(port, () =>
  console.log(`Server is running in http://localhost:${port}`)
);
