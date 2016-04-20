// config/database.js
var mongoUrl = process.env.MONGODB_URI ||
  "mongodb://localhost:27017/pinterestClone";
module.exports = {
  'url': mongoUrl
};
