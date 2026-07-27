const { Queue } = require("bullmq");
const connection = require("../config/redis");

const jobQueue = new Queue("ai-jobs", {
    connection,
});

module.exports = jobQueue;