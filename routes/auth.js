// Add Passport-related auth routes here.

var express = require('express');
var router = express.Router();
// var models = require('../models/models');
var User = require('../models/user');


module.exports = function(passport) {

  // GET registration page
  router.get('/register', function(req, res) {
    res.render('register');
  });

  // POST registration page
  var validateReq = function(userData) {
    return (userData.password === userData.passwordRepeat);
  };

  router.post('/register', function(req, res) {
    // validation step
    if (!validateReq(req.body)) {
      return res.render('register', {
        error: "Passwords don't match."
      });
    }
    //var u = new models.User({
    var u = new User({
      username: req.body.username,
      password: req.body.password,
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).redirect('/register');
        return;
      }
      else { res.redirect('/login') }
    });
  });


  // GET Login page
  router.get('/login', function(req, res) {
    res.render('login');
  });

  // POST Login page

  router.post('/login', passport.authenticate('local'), function(req, res) {
    // console.log("/" + req.session.cart)
    res.redirect('/');
  });

  router.get('/auth/facebook',
  passport.authenticate('facebook'));

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
      // res.render('otherstuffyouneed' {
      //  facebookId:
      // });

  });

  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
};