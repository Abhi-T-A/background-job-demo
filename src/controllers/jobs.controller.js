const jobQueue = require("../queue/jobQueue");

const createJob = async (req, res) => {
  try {
    const { prompt } = req.body;

    const job = await jobQueue.add(
      "generate-report",
      {
        prompt,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
        removeOnComplete: 100,
        removeOnFail: 50,
      }
    );

    return res.status(202).json({
      success: true,
      message: "Job queued successfully",
      jobId: job.id,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to queue job",
    });
  }
};

const getJobStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await jobQueue.getJob(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const state = await job.getState();

    return res.json({
      jobId: job.id,
      state,
      data: job.data,
      result: job.returnvalue || null,
      failedReason: job.failedReason || null,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch job status",
    });
  }
};

module.exports = {
  createJob,
  getJobStatus,
};