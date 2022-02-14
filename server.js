const express = require("express");
const connectDB = require("./config/db");
const firebase = require("./config/firebaseDB");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const authRoute = require("./routes/authAPI");
const projectRoute = require("./routes/projectAPI");
const cookieParser = require('cookie-parser')

// console.log(defaultApp)

// express and mongoDb-connectivity
const app = express();
connectDB();
firebase();

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ credentials: true, origin: "http://localhost:3000"}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/project", projectRoute);

app.get("/", (req, res) => {
  res.send("welcome to our app");
});

app.listen(7070, () => {
  console.log("Server is started...");
});
