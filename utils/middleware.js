require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const JournalRouter = require("../controllers/journal")
const UserRouter = require("../controllers/user")
const session = require('express-session')
const MongoStore = require("connect-mongo")
const HomeRouter = require("../controllers/home")

const middleware = (app) =>{
app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
    saveUninitialized: true,
    resave: false
}))
app.use("/journal", JournalRouter)
app.use("/user", UserRouter)
app.use("/", HomeRouter)
}

module.exports = middleware