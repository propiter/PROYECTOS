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

-- Tabla de Servicios
CREATE TABLE servicios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
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
