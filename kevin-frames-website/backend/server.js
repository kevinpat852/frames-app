const express = require('express');
const http = require('http');
const app = express();
const user = require('./users');
const admin = require('./admin');
const frame = require('./frames');
const accessory = require('./accessories');
const survey = require('./survey');

app.use((req,res,next) => {
  // allow any origin
  res.setHeader('Access-Control-Allow-Origin', '*');

  //allow these headers
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  //allow these methods
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.use('/users', user);
app.use('/admins', admin);
app.use('/frames', frame);
app.use('/accessories', accessory);
app.use('/surveys', survey);

const port = process.env.PORT || 8080; //create port to listen on

app.set('port', port); //use the port

const server = http.createServer(app); //create the server

server.listen(port); //listen to the port

console.log('Server is up and running!');
