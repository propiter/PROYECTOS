const clientesModel = require('../models/clientesModel');

// Controlador para crear un cliente
const crearCliente = async (req, res) => {
    const { nombre, telefono, email } = req.body;
    try {
        const cliente = await clientesModel.crearCliente(nombre, telefono, email);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear cliente' });
    }
};

// Controlador para obtener todos los clientes
const obtenerClientes = async (req, res) => {
    try {
        const clientes = await clientesModel.obtenerClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};

// Controlador para obtener un cliente por ID
const obtenerClientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await clientesModel.obtenerClientePorId(id);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente' });
    }
};

// Controlador para actualizar un cliente
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;
    try {
        const cliente = await clientesModel.actualizarCliente(id, nombre, telefono, email);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar cliente' });
    }
};

// Controlador para eliminar un cliente
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await clientesModel.eliminarCliente(id);
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar cliente' });
    }
};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente
};
