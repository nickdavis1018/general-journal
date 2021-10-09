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
    Journal.find({userKey: req.session.username}, (err, journals) => {
        res.render("journal/index.ejs", {journals})
    })
})

router.get("/new", (req, res) => {
    res.render("journal/new.ejs")
})

router.post("/", (req, res) => {
    req.body.userKey = req.session.username
    req.body.public = req.body.public === "on" ? true : false
    Journal.create(req.body, (err, journal) => {
        res.redirect("/journal")
    })
})

router.get("/:id/edit", (req, res) => {
    const id = req.params.id
    Journal.findById(id,(err, journal) => {
        res.render("journal/edit.ejs", {journal})
    })

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
    Journal.findByIdAndRemove(id, (err, journal) => {
        res.redirect("/journal")
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    Journal.findById(id, (err, journal) => {
        res.render("journal/show.ejs", {journal})
    })
})

module.exports = router