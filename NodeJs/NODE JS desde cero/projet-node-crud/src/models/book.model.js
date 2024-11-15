const mongoose = require("mongoose")
// import mongoose from "mongoose"

const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        genre: String,
        publication_date: String
        
    }
)

module.exports = mongoose.model("Book", bookSchema)
