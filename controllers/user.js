const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
   req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
   User.create(req.body, (err, user) => {
       console.log(user)
       res.redirect("/user/login")
   })
})
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/")
    })
})
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      if (!user) {
        res.send("Error. Cannot find user.");
      } else {
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
          req.session.username = username
          req.session.loggedIn = true
          res.redirect("/journal");
        } else {
          res.send("Error. Bad password.");
        }
      }
    });
  });
module.exports = router;