
const { Worker } = require("bullmq");

const connection = require("../config/redis");

const worker = new Worker(
  "ai-jobs",
  async (job) => {
    console.log("================================");
    console.log(`🚀 Job Started: ${job.id}`);
    console.log(`Payload:`, job.data);

    if (job.attemptsMade > 0) {
      console.log(`🔄 Retry Attempt: ${job.attemptsMade}`);
    }

    if (job.data && job.data.prompt === "fail") {
      throw new Error("AI Service Unavailable");
    }

    // Simulate long-running work
    await new Promise((resolve) => setTimeout(resolve, 5000));

    console.log(`✨ Processing Completed for Job: ${job.id}`);

    return {
      success: true,
      message: "Report Generated",
    };
  },
  {
    connection,
  }
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.log(`❌ Job ${job.id} failed (Attempts Made: ${job.attemptsMade})`);
  console.error(`Reason: ${err.message}`);
});