const IORedis = require("ioredis");

const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxRetriesPerRequest: null,
});

connection.on("connect", () => {
    console.log("✅ Redis Connected");
});

connection.on("error", (err) => {
    console.error("❌ Redis Error:", err.message);
});

module.exports = connection;