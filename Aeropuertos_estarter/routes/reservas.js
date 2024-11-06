const { Router } = require("express");
const router = Router();
const { pool } = require("../config/db"); // Asegúrate de que esta ruta sea correcta

router.get('/', (req, res) => {
    res.send('Bienvenido a la API de reservas de transporte, bienvenido');
}); 

// Aquí puedes añadir más rutas para manejar las reservas

module.exports = router;
