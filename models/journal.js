const mongoose = require("./connection")

const {Schema, model} = mongoose

const journalSchema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, required: true},
    public: {type: Boolean},
    content: {type: String, required: true},
    userKey: {type: String, required: true},
})

const Journal = model("Journal", journalSchema)
module.exports = Journal