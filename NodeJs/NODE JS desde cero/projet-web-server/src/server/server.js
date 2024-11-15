//const express = require("express")
import express from "express";
//const path = require ("path")
import path from "path";

export function startServer(options) {
    const { port, public_path = "public" } = options;
    const app = express();

    // middleware se usa use
    app.use(express.static(public_path)); // contenido disponible 
    app.get("", (req, res) => {
        const indexPath = path.join(__dirname + `../../../${public_path}/indexedDB.html`);
        res.sendFile(indexPath)

    });
    app.listen (port, ()=> {
        console.log(`Listen to port ${port}`)
    })
}


