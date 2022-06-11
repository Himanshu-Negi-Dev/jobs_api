const express = require('express');
const { getJobs, getJob, updateJob, createJob, deleteJob } = require('../controllers/jobs');
const jobRouter = express.Router();

jobRouter.get('/',getJobs);
jobRouter.get('/:id', getJob);
jobRouter.post('/', createJob);
jobRouter.patch('/:id', updateJob);
jobRouter.delete('/:id', deleteJob)

module.exports = { jobRouter }