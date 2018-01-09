/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var express = require('express');
var bodyParser = require('body-parser');
var store = require('./store');
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static('public'));
app.use(bodyParser.json());
app.post('/addHobby', (req, res) => {
    console.log(req.body);
  store.addHobby({
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      hobby: req.body.hobby
    })
    .then(() => res.sendStatus(200));
});
app.post('/findHobby', (req, res) => {
 console.log('req at index'+req.body);   
  store.findHobby({
      searchFirstName: req.body.firstname
    })
    .then(function( hobbyRows ){
      console.log('res from Store in undex'+JSON.stringify(hobbyRows));       
      res.send(hobbyRows);
    });
});
app.listen(8085, () => {
  console.log('Server running on http://localhost:8085');
});

