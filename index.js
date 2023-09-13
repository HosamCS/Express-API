const express = require("express");
const morgan = require("morgan"); // logger middleware function
const mongoose = require('mongoose');
require('dotenv').config()
const { ERROR } = require('./utils/statusText')

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
  console.log('mongodb connected successfully');
}).catch(err => {
  console.log("Failed to connect to Mongo" ,err);
});

const app = express();
const port =process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json()); // for parsing application/json * handle json body requests

// call the middleware Coursesrouter
const coursesRouter = require('./routers/courses.route')
app.use('/api/courses' , coursesRouter)

app.all('*', (req, res) => {
  return  res.status(404).json({ status: ERROR , data:{course:null}});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
