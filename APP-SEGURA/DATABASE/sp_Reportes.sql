USE [app_segura]
GO

-- Procedimiento para verificar enlace
CREATE PROCEDURE sp_verificar_enlace 
    @url_input NVARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el enlace existe en enlaces_verificados
    IF EXISTS (SELECT 1 FROM enlaces_verificados WHERE enlace = @url_input)
    BEGIN
        -- La URL ya existe, actualizar contador de consultas
        UPDATE enlaces_verificados
        SET cantidad_consultas = cantidad_consultas + 1
        WHERE enlace = @url_input;

        -- Obtener información del enlace actualizado
        SELECT 
            es_seguro, 
			cantidad_consultas,
            (SELECT COUNT(*) FROM reportes WHERE idrep = (SELECT idrep FROM enlaces_reportados WHERE enlace = @url_input)) AS cantidad_reportes,
            (SELECT STRING_AGG(razon_reporte, '; ') FROM reportes WHERE idrep = (SELECT idrep FROM enlaces_reportados WHERE enlace = @url_input)) AS razones_reporte
        FROM enlaces_verificados 
        WHERE enlace = @url_input;
    END
    ELSE
    BEGIN
        -- La URL no existe, insertar como segura con cantidad_consultas = 1
        INSERT INTO enlaces_verificados (enlace, es_seguro, cantidad_consultas, fecha_creacion) 
        VALUES (@url_input, 1, 1, GETDATE());
		
        -- Devolver información de URL insertada
        SELECT 
            1 AS es_seguro, 
            0 AS cantidad_reportes, 
			1 AS cantidad_consultas,
            NULL AS razones_reporte;
    END
END;
GO

-- Procedimiento para listar todos los enlaces reportados (no se usa)
CREATE PROCEDURE sp_ver_enlaces_reportados
as 
begin
select * from enlaces_reportados
END;
GO

-- procedimiento para listar los reportes Por la url
CREATE PROCEDURE sp_listar_reportes 
    @url_input NVARCHAR(1000)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si la URL existe en enlaces_reportados
    IF EXISTS (SELECT 1 FROM enlaces_reportados WHERE enlace = @url_input)
    BEGIN
        -- Obtener el idrep correspondiente a la URL
        DECLARE @idrep INT;
        SET @idrep = (SELECT idrep FROM enlaces_reportados WHERE enlace = @url_input);

        -- Seleccionar todos los reportes asociados con el idrep
        SELECT 
            r.id AS ReporteID,
            r.id_usuario AS UsuarioID,
            u.nombre AS NombreUsuario,
            u.apellido AS ApellidoUsuario,
            r.razon_reporte AS Razon,
            r.fecha_reporte AS FechaReporte
        FROM reportes r
        JOIN usuarios u ON r.id_usuario = u.idu
        WHERE r.idrep = @idrep;
    END
    ELSE
    BEGIN
        -- La URL no existe en enlaces_reportados, devolver mensaje de error
        PRINT 'La URL no está reportada.';
    END
END;
GO


-- Procedimiento para reportar enlace
CREATE PROCEDURE sp_reportar_enlace 
    @url_input NVARCHAR(1000),
    @id_usuario INT,
    @razon_reporte NVARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @idrep INT;
    DECLARE @success BIT = 1;

    BEGIN TRY
        -- 1. Verificar si la URL está en enlaces_verificados
        IF EXISTS (SELECT 1 FROM enlaces_verificados WHERE enlace = @url_input)
        BEGIN
            -- La URL existe, actualizar es_seguro a 0
            UPDATE enlaces_verificados
            SET es_seguro = 0
            WHERE enlace = @url_input;
        END
        ELSE
        BEGIN
            -- La URL no existe, insertarla
            INSERT INTO enlaces_verificados (enlace, es_seguro, cantidad_consultas, fecha_creacion)
            VALUES (@url_input, 0, 1, GETDATE());
        END

        -- 2. Verificar si la URL está en enlaces_reportados
        IF EXISTS (SELECT 1 FROM enlaces_reportados WHERE enlace = @url_input)
        BEGIN
            -- La URL existe, actualizar cantidad_reportes
            UPDATE enlaces_reportados
            SET cantidad_reportes = cantidad_reportes + 1
            WHERE enlace = @url_input;
        END
        ELSE
        BEGIN
            -- La URL no existe, insertarla
            INSERT INTO enlaces_reportados (enlace, cantidad_reportes)
            VALUES (@url_input, 1);
        END

        -- Obtener idrep para la inserción en la tabla reportes
        SET @idrep = (SELECT idrep FROM enlaces_reportados WHERE enlace = @url_input);

        -- Insertar el reporte en la tabla de reportes
        INSERT INTO reportes (idrep, id_usuario, razon_reporte, fecha_reporte)
        VALUES (@idrep, @id_usuario, @razon_reporte, GETDATE());

    END TRY
    BEGIN CATCH
        SET @success = 0;  -- Establecer éxito a falso si ocurre un error
    END CATCH

    -- Devolver el resultado
    SELECT @success AS Success;
END;
GO

