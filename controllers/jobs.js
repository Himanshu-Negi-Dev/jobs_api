
const Job = require('../models/Jobs');
const { asyncWrapper } = require("../middleware/async");
const { CustomErrorAPI } = require('../errors/CustomErrorAPI');

const createJob = asyncWrapper(async (req, res) => {
  const { company, position, status } = req.body;
  if (!company || !position) throw new CustomErrorAPI('Please provide valid info', 400)
  const newJob = { company, position, status, createdBy: req.user.id };

  const job = await Job.create(newJob);

  res.status(200).json({ job });
});


const getJobs = asyncWrapper(async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({data: jobs, message: "All jobs!"});
});

const getJob = asyncWrapper(async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  res.status(200).json({data: job, message: "Get Success!"})
});

const updateJob = asyncWrapper(async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findByIdAndUpdate({ _id: jobId }, req.body, { new: true, runValidators: true });
  res.status(200).json({data: job, message: "Update Success!"})
});

const deleteJob = asyncWrapper(async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findByIdAndRemove({ _id: jobId });
  res.status(200).json({data: job, message: "Delete Success!"})
});

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob }