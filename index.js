var express = require('express');
var app = express();
var morgan = require('morgan');
var sample = require('./api/sample')

if(process.env.NODE_ENV !== 'test'){
  app.use(morgan('dev'));
}
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/sample', sample);

module.exports = app;