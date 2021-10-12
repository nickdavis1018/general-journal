const express = require("express");
const Journal = require("../models/journal")
const checkLogin = require("../public/app.js")

const router = express.Router();

router.get("/", (req, res) => {
  let loginVerify = "logout"
  let loginText = "Logout"
  let loginGreet = `Hello, ${req.session.username}`
  let signUp = ""
  let signUpText = ""
  let currentUser = req.session.username 
  if(req.session.username === undefined){
    loginVerify = "login"
    loginText = "Login"
    loginGreet = "Hello, stranger"
    signUp = "/user/signup/"
    signUpText = "Sign Up"
  }
  Journal.find({public: true}, (err, journals) => {
    res.render("index.ejs", {journals, loginGreet, loginVerify, loginText, signUp, signUpText, currentUser})
})
})
module.exports = router