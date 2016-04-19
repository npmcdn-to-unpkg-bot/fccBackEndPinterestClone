// app/models/pins.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var pinSchema = mongoose.Schema({
  owner: String,
  title: String,
  url: String
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Pin', pinSchema);
