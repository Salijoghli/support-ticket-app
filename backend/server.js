const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//connect database
connectDB();

// initiate express
const app = express();

//enable body access
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(201).json({ message: "hello world" });
});

app.use("/api/users/", require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
