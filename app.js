const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/user");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Freelance Job Board API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});