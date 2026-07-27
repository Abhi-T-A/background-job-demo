require("dotenv").config();

const app = require("./app");

// Initialize BullMQ + Redis
require("./queue/jobQueue");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});