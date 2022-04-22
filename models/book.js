const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({
        name: String,
        author: String,
        link: String,
        bookNumber: String
    });
module.exports = mongoose.model("book", bookSchema)