const express = require('express');
const http = require('http');
const frame = express();
const bodyParser = express.json();
const mongoose = require('mongoose');
const Wood = require('./schemas/woodFramesSchema');
const Metal = require('./schemas/metalFramesSchema');

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

frame.use((req, res, next) => {
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

frame.use(bodyParser);

//add a wooden frame
frame.post('/addWooden',(req,res,next)=>
{
  const woodenFrames = new Wood({
    frameTitle: req.body.frameTitle,
    frameType: req.body.frameType,
    frameColor: req.body.frameColor,
    frameWidth: req.body.frameWidth,
    frameHeight: req.body.frameHeight,
    framePrice: req.body.framePrice,
    framePic: req.body.framePic
  });
  woodenFrames
  .save()
  .then(createdPost =>{
    return res.status(201).json(
    {
      message:"Project added properly !",
      post_id: createdPost._id
    });
  });
});

//add a metal frame
frame.post('/addMetal',(req,res,next)=>
{
  const metalFrames = new Metal({
    frameTitle: req.body.frameTitle,
    frameType: req.body.frameType,
    frameColor: req.body.frameColor,
    frameWidth: req.body.frameWidth,
    frameHeight: req.body.frameHeight,
    framePrice: req.body.framePrice,
    framePic: req.body.framePic
  });
  metalFrames
  .save()
  .then(createdPost =>{
    return res.status(201).json(
    {
      message:"Project added properly !",
      post_id: createdPost._id
    });
  });
});

frame.get('/getWooden', (req, res, next) => {
  console.log(req.body);
  Wood.find({}).then(input => {
    console.log(input);
    let responseArr = input;
    return res.status(200).json({
      message: "Success!",
      input: responseArr
    });
  });
});

frame.get('/getMetal', (req, res, next) => {
  console.log(req.body);
  Metal.find({}).then(input => {
    console.log(input);
    let responseArr = input;
    return res.status(200).json({
      message: "Success!",
      input: responseArr
    });
  });
});

frame.delete('/deleteWooden/:id', (req, res, next) => {
  Wood.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Wooden Frame Successfully Deleted!" });
  });
});

frame.delete('/deleteMetal/:id', (req, res, next) => {
  Metal.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Metal Frame Successfully Deleted!" });
  });
});

module.exports = frame;
