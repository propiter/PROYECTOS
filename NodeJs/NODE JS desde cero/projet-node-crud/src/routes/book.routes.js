const express = require("express")
//import express from "express"
const router = express.Router()
//import router from "express"
const Book=require("../models/book.model")

//MIDDLEWARE
const getbook =  async(req, res, next)=> {
    let book;
    const {id} = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json(
            {
                message: "El ID del Libro no es Válido"
            }
        )
    }
    try {
        book = await Book.findById(id)
        if(!book){
            return res.status(404).json(
                {
                message: "El Libro no fue encontrado"
                }
            )
        }
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    res.book = book;
    next()
}


//obtener todos los libros [GETT ALL]
router.get("/", async(req,res) => {
    try {
        const books  = await Book.find();
        console.log("get all", books)
        if(books.length === 0){
            res.status(204).json([])
        }
        return res.json(books)
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log("error 500")
    }
})

// crear un nuevo libro (recurso) [POST]
router.post("/", async(req, res)=>{
    const {title, author, genre, publication_date}= req?.body
    if(!title || !author || !genre || !publication_date){
        return res.status(400).json({message: "todos los campos son obligatorios"})
    }

    const book = new Book(
        {
            title, 
            author,
            genre, 
            publication_date
        }
)
try {
    const newBook = await book.save()
    res.status(201).json(newBook)
} catch (error) {
    res.status(404).json({message: error.message})
}
})

router.get("/:id", getbook, async(req, res)=>{
    res.json(res.book)
})

router.put("/:id", getbook, async (req, res)=> {
    try {
        const book = res.book
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updateBook = await book.save()
        res.json(updateBook)

    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
})



router.patch("/:id", getbook, async (req, res)=> {
    if(!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date){
        res.status(400).json({
            message: "debes ingresar al menos uno de estos campos: Titulo, Autor, Genero o fecha de publicacion"
        })
    }
    try {
        const book = res.book
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updateBook = await book.save()
        res.json(updateBook)

    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
})

router.delete("/:id", getbook, async (req, res) => {
    try {
        const book= res.book
        await book.deleteOne({_id: book._id});
        res.json({message: `el libro ${book.title}, fue eliminado correctamente` })
    } catch (error) {
        res.json({message: error.message})
    }
})

module.exports= router;