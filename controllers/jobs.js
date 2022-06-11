
const createJob = (req, res) => {
  res.send('hello from createJob');
}

const getJobs = (req,res) =>{
  res.send('hello from getJobs');
}

const getJob = (req, res) =>{
  res.send('hello from getJob')
}

const updateJob = (req, res) => {
  res.send('hello from updatejob')
}

const deleteJob = (req, res) => {
  res.send('hello from deleteJob');
}

module.exports = { createJob, getJobs, getJob, updateJob, deleteJob }