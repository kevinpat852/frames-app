const express = require('express');
const http = require('http');
const accessory = express();
const bodyParser = express.json();
const mongoose = require('mongoose');
const Accessory = require('./schemas/accessoriesSchema');

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

accessory.use((req, res, next) => {
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

accessory.use(bodyParser);

accessory.post('/addAccessory',(req,res,next)=>
{
  const accessories = new Accessory({
    accessoryTitle: req.body.accessoryTitle,
    accessoryType: req.body.accessoryType,
    accessoryDescription: req.body.accessoryDescription,
    accessoryWidth: req.body.accessoryWidth,
    accessoryHeight: req.body.accessoryHeight,
    accessoryPrice: req.body.accessoryPrice,
    accessoryPic: req.body.accessoryPic
  });
  accessories
  .save()
  .then(createdPost =>{
    return res.status(201).json(
    {
      message:"Project added properly !",
      post_id: createdPost._id
    });
  });
});

accessory.get('/getAccessories', (req, res, next) => {
  console.log(req.body);
  Accessory.find({}).then(input => {
    console.log(input);
    let responseArr = input;
    return res.status(200).json({
      message: "Success!",
      input: responseArr
    });
  });
});

accessory.delete('/deleteAccessory/:id', (req, res, next) => {
  Accessory.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Accessory Successfully Deleted!" });
  });
});

module.exports = accessory;
