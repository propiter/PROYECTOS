const reservasModel = require('../models/reservasModel');

// Controlador para crear una reservas
const crearReserva = async (req, res) => {
    const { nombre, telefono, email } = req.body;
    try {
        const reservas = await reservasModel.crearReserva(nombre, telefono, email);
        res.status(201).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear reservas' });
    }
};

// Controlador para obtener todas las reservas
const obtenerReservas = async (req, res) => {
    try {
        const reservas = await reservasModel.obtenerReservas();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener reservas' });
    }
};

// Controlador para obtener un cliente por ID
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
    crearReserva,
    obtenerReservas,
    obtenerreservasPorId
};
