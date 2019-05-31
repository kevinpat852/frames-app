const express = require('express');
const http = require('http');
const survey = express();
const bodyParser = express.json();
const mongoose = require('mongoose');
const Survey = require('./schemas/surveySchema');

mongoose.connect(
  //8PbDZmpZoOmEFRfV
  "mongodb+srv://kevinp2494:8PbDZmpZoOmEFRfV@cluster0-bo6dg.mongodb.net/test?retryWrites=true", {useNewUrlParser: true}
)
.then(() => {
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

survey.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

survey.use(bodyParser);

survey.post('/addSurvey',(req,res,next)=>
{
  const surveys = new Survey({
    feedback: req.body.feedback,
    suggestions: req.body.suggestions
  });
  surveys
  .save()
  .then(createdPost =>{
    return res.status(201).json(
    {
      message:"Project added properly !",
      post_id: createdPost._id
    });
  });
});

module.exports = survey;
