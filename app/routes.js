/* jshint node: true */
"use strict";

// load up the user model
var Pin = require('./models/pin.js');

// app/routes.js
module.exports = function(app, passport) {

  // HOME PAGE (with login links) ========
  app.get('/', function(req, res) {
    res.render('index.jade'); // load the index.ejs file
  });

  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('login.jade', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/all-pins', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP ==============================
  // show the signup form
  app.get('/signup', function(req, res) {
    // render the page and pass in any flash data if it exists
    res.render('signup.jade', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // all Pins =====================
  app.get('/all-pins', isLoggedIn, function(req, res) {
    res.render('all-pins.jade');
  });

  app.post('/all-pins', isLoggedIn, function(req, res) {
    Pin.find({}, function (err, docs) {
      console.log(JSON.stringify(docs));
      console.log(JSON.stringify(err));
      res.send({myDocuments: docs, error: err});
    });
  });

  // User Pins =====================
  app.get('/my-pins', isLoggedIn, function(req, res) {
    res.render('my-pins.jade');
  });

  app.post('/my-pins', isLoggedIn, function(req, res) {
    if(req.body.action === 'show'){
      Pin.find({owner: req.user._id}, function (err, docs) {
        console.log(JSON.stringify(docs));
        res.send({myDocuments: docs, error: err});
      });
    }else if(req.body.action === 'delete'){
      Pin.remove({_id: req.body._id}, function (err, docs) {
        console.log(JSON.stringify(docs));
        res.send({myDocuments: docs, error: err});
      });
    }
  });

  // User Pins =====================
  app.get('/add-pin', isLoggedIn, function(req, res) {
    res.render('add-pin.jade');
  });

  app.post('/add-pin', isLoggedIn, function(req, res) {
    var objectToInsert = new Pin({
      title: req.body.title,
      url: req.body.url,
      owner: req.user._id
    });
    objectToInsert.save(function (err) {
      res.send({error: err, obj: objectToInsert});
    });
  });

  // PROFILE SECTION =====================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile.jade', {
      user: req.user // get the user out of session and pass to template
    });
  });

  app.get('/user/:id', function(req, res) {
    console.log(req.params.id);
    res.render('user-pins.jade', {userID: req.params.id});
  });

  app.post('/user', function(req, res) {
    Pin.find({owner: req.body._id}, function (err, docs) {
      console.log(JSON.stringify(docs));
      res.send({myDocuments: docs, error: err});
    });
  });

  // twitter --------------------------------
  // send to twitter to do the authentication
  app.get('/auth/twitter', passport.authenticate('twitter'));

  // twitter --------------------------------
  app.get('/unlink/twitter', function(req, res) {
      var user           = req.user;
      user.twitter.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
  });

  // handle the callback after twitter has authorized the user
  app.get('/auth/twitter/callback/',
      passport.authenticate('twitter', {
          successRedirect : '/my-pins',
          failureRedirect : '/'})
  );

  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Handle 404
 app.use(function(req, res) {
   res.status(404).send('404 Page not found');
 });

 // Handle 500
 app.use(function(error, req, res, next) {
   res.status(500).send('500 Internal Server Error');
 });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  } else {
    // if they aren't redirect them to the home page
    res.redirect('/');
  }

}
