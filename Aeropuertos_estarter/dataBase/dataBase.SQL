-- Tabla de Clientes
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Ubicaciones (para ciudades)
CREATE TABLE ubicaciones (
    id SERIAL PRIMARY KEY,
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100)
);

-- Tabla de Conductores
CREATE TABLE conductores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    placa VARCHAR(50) NOT NULL,
    ubicacion INT REFERENCES ubicaciones(id)
);

-- Tabla de Vehículos
CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(50) NOT NULL,
    capacidad_pasajeros INT NOT NULL,
    cant_maxima_maletas INT
);

-- Tabla de Tarifas
CREATE TABLE tarifas (
    id SERIAL PRIMARY KEY,
    vehiculo_id INT REFERENCES vehiculos(id),
    ubicacion_id INT REFERENCES ubicaciones(id),
    tarifa_base DECIMAL(10, 2) NOT NULL,
    distancia_incluida_km DECIMAL(5, 2) NOT NULL,
    km_adicional DECIMAL(10, 2) NOT NULL,
    distancia_maxima DECIMAL(5, 2)
);

-- Tabla de Reservas
CREATE TABLE reservas (
    id BIGINT PRIMARY KEY,
    cliente_id INT REFERENCES clientes(id),
    vehiculo_id INT REFERENCES vehiculos(id),
    conductor_id INT REFERENCES conductores(id),
    direccion_origen VARCHAR(255) NOT NULL,
    direccion_destino VARCHAR(255) NOT NULL,
    ciudad_origen_valida BOOLEAN DEFAULT FALSE,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    ida_y_vuelta BOOLEAN DEFAULT FALSE,
    distancia_km DECIMAL(5, 2) NOT NULL,
    distancia_minutos INT,
    monto_total DECIMAL(10, 2),
    estado_pago BOOLEAN DEFAULT FALSE
);

-- Tabla de Pagos
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    reserva_id BIGINT REFERENCES reservas(id),
    monto DECIMAL(10, 2) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    metodo VARCHAR(50) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Servicios
CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);


-- INSER INTOS DE PRUEBAS--

-- Tabla de Clientes
INSERT INTO clientes (nombre, telefono, email) VALUES
('Juan Pérez', '3123456789', 'juan.perez@example.com'),
('Ana Gómez', '3159876543', 'ana.gomez@example.com');

-- Tabla de Ubicaciones
INSERT INTO ubicaciones (ciudad, estado) VALUES
('Bogotá', 'Cundinamarca'),
('Medellín', 'Antioquia');

-- Tabla de Conductores
INSERT INTO conductores (nombre, telefono, placa, ubicacion) VALUES
('Carlos López', '3165432109', 'ABC123', 1),
('María Rodriguez', '3176543210', 'XYZ789', 2);

-- Tabla de Vehículos
INSERT INTO vehiculos (tipo, capacidad_pasajeros, cant_maxima_maletas) VALUES
('Duster', 4, 3),
('Van H1', 8, 5);

-- Tabla de Tarifas
INSERT INTO tarifas (vehiculo_id, ubicacion_id, tarifa_base, distancia_incluida_km, km_adicional, distancia_maxima) VALUES
(1, 1, 80000.00, 10.00, 8000.00, 50.00),
(2, 2, 150000.00, 10.00, 15000.00, 100.00);



-- Tabla de Reservas
INSERT INTO reservas (id, cliente_id, vehiculo_id, conductor_id, direccion_origen, direccion_destino, ciudad_origen_valida, fecha, hora, ida_y_vuelta, distancia_km, distancia_minutos, monto_total, estado_pago) VALUES
(10000001, 1, 1, 1, 'Calle 123 #45-67', 'Avenida 89 #10-11', TRUE, '2024-12-01', '08:00', FALSE, 15.00, 30, 90000.00, TRUE),
(10000002, 2, 2, 2, 'Carrera 7 #50-60', 'Calle 80 #20-30', TRUE, '2024-12-02', '09:00', TRUE, 20.00, 45, 170000.00, FALSE);

-- Tabla de Pagos
INSERT INTO pagos (reserva_id, monto, estado, metodo) VALUES
(10000001, 90000.00, 'Completado', 'Tarjeta de Crédito'),
(10000002, 170000.00, 'Pendiente', 'Transferencia Bancaria');

-- Tabla de Servicios
INSERT INTO servicios (nombre, descripcion) VALUES
('Transporte Privado', 'Servicio de transporte privado para pasajeros'),
('Transporte Empresarial', 'Servicio de transporte para empresas');