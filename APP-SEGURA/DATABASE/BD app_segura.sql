-- crear base de datos
CREATE DATABASE app_segura;
use app_segura;
GO

-- Crear tabla usuarios
CREATE TABLE usuarios 
(
    idu INT IDENTITY(1,1) PRIMARY KEY,  -- id de usuario
    nombre NVARCHAR(12) NOT NULL, 
    apellido NVARCHAR(20) NOT NULL,
    celular NVARCHAR(15) NOT NULL,  -- teléfono con código de país +57 celular
    documento NVARCHAR(20) UNIQUE NOT NULL, -- tipo de documento seguido del número CC-numero de documento
    correo NVARCHAR(50) UNIQUE NOT NULL,
    contraseña NVARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    codigo AS ('IDU-' + RIGHT('000' + CAST(idu AS VARCHAR), 3)) PERSISTED  -- columna calculada para ID personalizado
);
GO

-- Crear tabla enlaces_verificados
CREATE TABLE enlaces_verificados
(
    idurl INT IDENTITY(1,1) PRIMARY KEY,  -- Clave primaria para identificar el enlace
    enlace NVARCHAR(256) UNIQUE NOT NULL,  -- Longitud máxima de URL 1000
    es_seguro BIT NOT NULL DEFAULT 1,    -- Campo BIT para indicar si el enlace es seguro (1 = seguro, 0 = no seguro)
    cantidad_consultas INT NOT NULL DEFAULT 0,  -- Contador de consultas a la URL
    fecha_creacion DATETIME DEFAULT GETDATE(),  -- Fecha y hora de creación del registro
    codigo AS ('IDURL-' + RIGHT('000' + CAST(idurl AS VARCHAR), 3)) PERSISTED,  -- Columna calculada para ID personalizado
    CONSTRAINT CHK_es_seguro CHECK (es_seguro IN (0, 1))  -- Restricción de verificación para es_seguro
);
GO

-- Crear tabla enlaces_reportados
CREATE TABLE enlaces_reportados
(
    idrep INT IDENTITY(1,1) PRIMARY KEY,  -- id del enlace reportado
    enlace NVARCHAR(1000) UNIQUE NOT NULL,
    cantidad_reportes INT NOT NULL DEFAULT 0,
    codigo AS ('IDREP-' + RIGHT('000' + CAST(idrep AS VARCHAR), 3)) PERSISTED  -- columna calculada para ID personalizado
);
GO

-- Crear tabla reportes para detalles de los reportes
CREATE TABLE reportes
(
    id INT IDENTITY(1,1) PRIMARY KEY,
    idrep INT,
    id_usuario INT,
    razon_reporte NVARCHAR(MAX),
    fecha_reporte DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (idrep) REFERENCES enlaces_reportados(idrep),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(idu)
);
GO

-- una ultima tabla para almacenar tokens para recuperar la contraseña
CREATE TABLE tokens_recuperacion (
    id INT IDENTITY(1,1) PRIMARY KEY,
    correo NVARCHAR(50) UNIQUE NOT NULL,
    token NVARCHAR(255) NOT NULL,
    fecha_creacion DATETIME DEFAULT GETDATE(),
    expiracion DATETIME NOT NULL  -- Fecha y hora de expiración del token
);
GO