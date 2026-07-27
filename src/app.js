const express = require("express");

const jobsRoutes = require("./routes/jobs.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Background Job API is running 🚀",
    });
});

app.use("/api/jobs", jobsRoutes);

module.exports = app;