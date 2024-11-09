const { pool } = require('../config/db');

// Crear un cliente
const crearCliente = async (nombre, telefono, email) => {
    const query = `
        INSERT INTO clientes (nombre, telefono, email)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [nombre, telefono, email];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear cliente:', error);
        throw error;
    }
};

// Obtener todos los clientes
const obtenerClientes = async () => {
    const query = `SELECT * FROM clientes;`;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        throw error;
    }
};

// Obtener un cliente por ID
const obtenerClientePorId = async (id) => {
    const query = `SELECT * FROM clientes WHERE id = $1;`;
    const values = [id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al obtener cliente:', error);
        throw error;
    }
};

// Actualizar un cliente
const actualizarCliente = async (id, nombre, telefono, email) => {
    const query = `
        UPDATE clientes
        SET nombre = $1, telefono = $2, email = $3
        WHERE id = $4
        RETURNING *;
    `;
    const values = [nombre, telefono, email, id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        throw error;
    }
};

// Eliminar un cliente
const eliminarCliente = async (id) => {
    const query = `DELETE FROM clientes WHERE id = $1 RETURNING *;`;
    const values = [id];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        throw error;
    }
};

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    actualizarCliente,
    eliminarCliente
};
