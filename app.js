const express = require('express');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { authRouter } = require('./routes/auth');
const { jobRouter } = require('./routes/jobs');
const app = express();

app.use(express.json());

app.use('/jobs/v1/auth', authRouter);
app.use('/jobs/v1', jobRouter);

app.use(errorMiddleware);

app.listen(3001, () => { console.log("express is here") });
