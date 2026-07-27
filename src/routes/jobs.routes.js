const express = require("express");

const router = express.Router();

const {
  createJob,
  getJobStatus,
} = require("../controllers/jobs.controller");

router.post("/generate", createJob);
router.get("/:jobId", getJobStatus);

module.exports = router;