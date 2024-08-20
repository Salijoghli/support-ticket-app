const express = require("express");
const cors = require("cors");
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

// Enable CORS for all origins
app.use(cors());

app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/tickets/", require("./routes/ticketRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("server started on port", PORT);
});
