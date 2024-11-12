const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/v1/reservas', require('./routes/reservasRouter.js'));
app.use('/api/v1/clientes', require('./routes/clientesRoutes'));

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal!', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
