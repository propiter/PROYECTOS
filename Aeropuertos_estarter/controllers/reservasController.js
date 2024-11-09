const reservasModel = require('../models/reservasModel');

// Controlador para crear una reservas


// Controlador para obtener todas las reservas
const obtenerReservas = async (req, res) => {
    try {
        const reservas = await reservasModel.obtenerReservas();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservas' });
    }
};

// Controlador para obtener una reserva por ID
const obtenerreservasPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const reserva = await reservasModel.obtenerreservasPorId(id);
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener Reserva' });
    }
};


module.exports = {
    
    obtenerReservas,
    obtenerreservasPorId
};
