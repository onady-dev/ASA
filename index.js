var express = require('express');
var app = express();
var morgan = require('morgan');

var users = [
    {id:1, name:"user1"},
    {id:2, name:"user2"},
    {id:3, name:"user3"}
]

app.use(morgan('dev'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function (req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10)
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
  });

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;