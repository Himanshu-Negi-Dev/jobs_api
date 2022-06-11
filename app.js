const express = require('express');
const { connectDB } = require('./db/connect');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { authRouter } = require('./routes/auth');
const { jobRouter } = require('./routes/jobs');
require('dotenv').config();
const app = express();

app.use(express.json());

app.use('/jobs/v1/auth', authRouter);
app.use('/jobs/v1', jobRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, ()=> {console.log(`server connected at port: ${PORT}`)})
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

start();