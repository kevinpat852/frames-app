const express = require('express');
const http = require('http');
const admin = express.Router();
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');
const webToken = require('jsonwebtoken');
//const bodyParser = require('body-parser');
const bodyParser = express.json();
const mongoose = require('mongoose');
const Admin = require('./schemas/adminSchema');

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

admin.use((req, res, next) => {
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

admin.use(bodyParser);

//add an admin
admin.post('/signup', (req, res, next) => {
  console.log(req.body);

  Admin.findOne({'username': req.body.username})
  .then(input => {
    console.log(input);
    if(!input) {
      bcrypt.hash(req.body.password,10)
      .then(hash => {
        console.log(hash);

        const admins = new Admin({
          username: req.body.username,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          isAdmin: true,
          djoin: req.body.dateJoined
        });

        admins.save()

        .then(createdPost => {
          console.log('Successfulled added new user!');
          return res.status(201).json({
            message: 'User successfully added!',
            post_id: createdPost._id
          });
        });
      });
    }
    else {
      console.log('Error: Username already exists!');
      return res.status(201).json({
        message: 'Error: User already exists!'
      });
    }
  });
});

//admin attempts to login
admin.post('/login', (req, res, next) => {
  let userInfo;
  console.log(req.body);

  Admin.findOne({'username': req.body.username})
  .then(input => {
    console.log(input);
    if(!input) {
      console.log('Error: User does not exist!');
      return res.status(401).json({
        message: 'Error: User does not exist!'
      });
    }
    userInfo = input;
    console.log(userInfo);
    console.log(req.body.password + ' ' + input.password);
    return bcrypt.compare(req.body.password, input.password);
  })
  .then(result => {
    console.log(result);
    if(!result) {
      console.log(result);
      return res.status(401).json({
        message: 'Authorization failed!'
      });
    }
    const token = webToken.sign(
      {username: userInfo.username, userID: userInfo._id},
      'Admin_secret_encode_so_nobody_will_ever_Admin_it_by_us_avengers_endgame_three_hours_Admin',
      {expiresIn: '1 hr'}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: userInfo._id,
      messsage: 'Delivery!'
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: 'Failure. Please try again!'
    });
  });
});

module.exports = admin;
