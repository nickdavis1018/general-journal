const express = require("express");
const Journal = require("../models/journal")

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs");
  });

module.exports = router