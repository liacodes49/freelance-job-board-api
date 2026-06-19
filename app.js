const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const applicationRoutes = require("./routes/application");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/jobs", jobRoutes);
app.use("/applications", applicationRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("Freelance Job Board API Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
