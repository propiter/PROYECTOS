-- Usuarios

-- Procedimiento para crear un nuevo usuario
ALTER PROCEDURE sp_crear_nuevo_usuario 
    @nombre NVARCHAR(12), 
    @apellido NVARCHAR(20), 
	@celular NVARCHAR(15),
	@documento NVARCHAR(20), 
    @correo NVARCHAR(50), 
    @contraseña NVARCHAR(255)
	
AS
BEGIN
    -- Verificar si el correo ya existe
    IF EXISTS (SELECT 1 FROM usuarios WHERE correo = @correo)
    BEGIN
    SELECT 'El correo ya está registrado' AS Mensaje;
	RETURN;
    END
    
    -- Verificar si el documento ya existe
    IF EXISTS (SELECT 1 FROM usuarios WHERE documento = @documento)
    BEGIN
        SELECT 'El documento ya está registrado' AS Mensaje;
		RETURN;
    END
    
    -- Insertar el nuevo usuario
    INSERT INTO usuarios (nombre, apellido, celular, documento, correo, contraseña, fecha_creacion)
    VALUES (@nombre, @apellido, @celular,  @documento, @correo, @contraseña, GETDATE());
    
    -- Retornar el ID del nuevo usuario
    SELECT 'Usuario registrado con éxito' AS Mensaje;
END;
GO



-- Procedimiento para listar usuarios
CREATE PROCEDURE sp_ver_usuarios
    @idu INT = NULL -- Parámetro opcional
AS
BEGIN
    SET NOCOUNT ON;

    IF @idu IS NULL
    BEGIN
        -- Si no se pasa el idu, lista todos los usuarios
        SELECT 
            idu, 
            nombre, 
            apellido, 
            celular, 
            documento, 
            correo, 
            fecha_creacion, 
            codigo
        FROM 
            usuarios;
    END
    ELSE
    BEGIN
        -- Si se pasa el idu, lista solo el usuario con ese idu
        SELECT 
            idu, 
            nombre, 
            apellido, 
            celular, 
            documento, 
            correo, 
            fecha_creacion, 
            codigo
        FROM 
            usuarios
        WHERE
            idu = @idu;
    END
END;
GO

-- Procedimiento para verificar inicio de sesión
CREATE PROCEDURE sp_verificar_inicio_sesion
    @correo NVARCHAR(50),
    @contraseña NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el correo y la contraseña coinciden
    IF EXISTS (SELECT 1 FROM usuarios WHERE correo = @correo AND contraseña = @contraseña)
    BEGIN
        -- El correo y la contraseña coinciden, devolver el idu
        SELECT idu FROM usuarios WHERE correo = @correo AND contraseña = @contraseña
    END
    ELSE
    BEGIN
        -- El correo y la contraseña no coinciden, el acceso es denegado
        SELECT 
            '0' AS idu
    END
END;
GO






