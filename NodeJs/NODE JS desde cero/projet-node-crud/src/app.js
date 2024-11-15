const express = require("express")
//import express from express
const mongoose = require ("mongoose")
const bodyParser = require ("body-parser")
const {config}=require("dotenv")
config();

const bookRoutes = require("./routes/book.routes");

//usamos express para los middlewares
const app = express();

app.use(bodyParser.json()) // parseador para los bodys

//conectamos la DataBase
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection;

app.use("/books", bookRoutes);

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log(`server initialized to port ${port}`)
})
