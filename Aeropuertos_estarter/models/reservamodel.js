// models/reserva.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cliente = require('./cliente');
const Vehiculo = require('./vehiculo');
const Conductor = require('./conductor');

const Reserva = sequelize.define('Reserva', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'id',
        },
    },
    vehiculo_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Vehiculo,
            key: 'id',
        },
    },
    conductor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Conductor,
            key: 'id',
        },
    },
    direccion_origen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion_destino: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ciudad_origen_valida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    ida_y_vuelta: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    distancia_km: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
    },
    distancia_minutos: DataTypes.INTEGER,
    monto_total: DataTypes.DECIMAL(10, 2),
    estado_pago: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'reservas',
    timestamps: false,
});

module.exports = Reserva;
