const express = require("express")
const Journal = require("../models/journal")

const router = express.Router()

router.use((req, res, next) => {
    if (req.session.loggedIn){
        next()
    } else {
        res.redirect("/user/login")
    }
})

router.get("/", (req, res) => {
    let loginVerify = "logout"
    let loginText = "Logout"
    let loginGreet = `Hello, ${req.session.username}`
    let signUp = ""
    let signUpText = ""
    if(req.session.username === undefined){
      loginVerify = "login"
      loginText = "Login"
      loginGreet = "Hello, stranger"
      signUp = "/user/signup/"
      signUpText = "Sign Up"
    }
    Journal.find({userKey: req.session.username}, (err, journals) => {
        res.render("journal/index.ejs", {journals, loginGreet, loginVerify, loginText, signUp, signUpText})
    })
})

router.get("/new", (req, res) => {
    let loginVerify = "logout"
    let loginText = "Logout"
    let loginGreet = `Hello, ${req.session.username}`
    let signUp = ""
    let signUpText = ""
    if(req.session.username === undefined){
      loginVerify = "login"
      loginText = "Login"
      loginGreet = "Hello, stranger"
      signUp = "/user/signup/"
      signUpText = "Sign Up"
    }
    res.render("journal/new.ejs", {loginGreet, loginVerify, loginText, signUp, signUpText})
})

router.post("/", (req, res) => {
    req.body.userKey = req.session.username
    req.body.public = req.body.public === "on" ? true : false
    req.body.date = Date()
    Journal.create(req.body, (err, journal) => {
        res.redirect("/journal")
    })
})

router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    let loginVerify = "logout"
    let loginText = "Logout"
    let loginGreet = `Hello, ${req.session.username}`
    let signUp = ""
    let signUpText = ""
    if(req.session.username === undefined){
      loginVerify = "login"
      loginText = "Login"
      loginGreet = "Hello, stranger"
      signUp = "/user/signup/"
      signUpText = "Sign Up"
    }
    Journal.findById(id,(err, journal) => {
        if(req.session.username !== journal.userKey){
            res.redirect("/user/login")
        }
        else{
        res.render("journal/edit.ejs", {journal, loginGreet, loginVerify, loginText, signUp, signUpText})
    }})
})

router.put("/:id", (req, res) =>{
    const id = req.params.id
    req.body.public = req.body.public === "on" ? true : false
    Journal.findByIdAndUpdate(id, req.body, {new: true}, (err, journal) => {
        res.redirect("/journal")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    Journal.findById(id,(err, journal) => {
        if(req.session.username === journal.userKey){
        Journal.findByIdAndRemove(id, (err, journal) => {
        res.redirect("/journal")
    })
}
    else{
        res.redirect("/user/login") 
}})})

router.get("/:id", (req, res) => {
    let loginVerify = "logout"
    let loginText = "Logout"
    let loginGreet = `Hello, ${req.session.username}`
    let signUp = ""
    let signUpText = ""
    if(req.session.username === undefined){
      loginVerify = "login"
      loginText = "Login"
      loginGreet = "Hello, stranger"
      signUp = "/user/signup/"
      signUpText = "Sign Up"
    }
    const id = req.params.id
    Journal.findById(id, (err, journal) => {
        res.render("journal/show.ejs", {journal, loginGreet, loginVerify, loginText, signUp, signUpText})
    })
})

module.exports = router