// config/database.js
var mongoUrl = process.env.MONGOLAB_URI ||
  "mongodb://localhost:27017/pinterestClone";
module.exports = {
  'url': mongoUrl
};
