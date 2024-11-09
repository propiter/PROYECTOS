const { pool } = require('../config/db');


// Obtener todos los clientes
const obtenerReservas = async () => {
    const query = `SELECT * FROM reservas;`;

    try {
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error al obtener reservas:', error);
        throw error;
    }
};

module.exports = {
    obtenerReservas,
}