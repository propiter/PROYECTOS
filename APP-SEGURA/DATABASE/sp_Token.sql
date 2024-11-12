-- Token

-- Generar un token de recuperacion
ALTER PROCEDURE sp_generar_token_recuperacion
    @correo NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el correo existe en la tabla usuarios
    IF EXISTS (SELECT 1 FROM usuarios WHERE correo = @correo)
    BEGIN
		DECLARE @nombre NVARCHAR(50);
        DECLARE @token NVARCHAR(6);
        DECLARE @expiracion DATETIME;
		SET @nombre = (SELECT nombre FROM usuarios WHERE correo = @correo);
        SET @token = RIGHT('000000' + CAST(CAST(RAND() * 1000000 AS INT) AS NVARCHAR), 6);  -- Generar un nuevo token
        SET @expiracion = DATEADD(HOUR, 1, GETDATE());  -- Token válido por 1 hora


        -- Insertar o actualizar el token en la tabla tokens_recuperacion
        IF EXISTS (SELECT 1 FROM tokens_recuperacion WHERE correo = @correo)
        BEGIN
            UPDATE tokens_recuperacion
            SET token = @token, fecha_creacion = GETDATE(), expiracion = @expiracion
            WHERE correo = @correo;
        END
        ELSE
        BEGIN
            INSERT INTO tokens_recuperacion (correo, token, expiracion)
            VALUES (@correo, @token, @expiracion);
        END


        -- Devolver el token generado (en una implementación real, enviar por email)
        SELECT 
			@nombre AS Nombre,
			@correo AS Correo, 
            @token AS Token, 
            @expiracion AS Expiracion, 
            'Token de recuperación generado. Por favor, revisa tu correo.' AS Mensaje;
			RETURN;
    END
    ELSE
    BEGIN
        -- El correo no existe en la tabla usuarios
        SELECT 
            'El correo no está registrado o no coincide con el documento, verifica tus datos e intenta nuevamente.' AS Mensaje;
			RETURN;
    END
END;
GO


-- reestablecer la contraseña
ALTER PROCEDURE sp_restablecer_contraseña
    @correo NVARCHAR(50),
    @token NVARCHAR(255),
    @nueva_contraseña NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Verificar si el token es válido
    IF EXISTS (SELECT 1 FROM tokens_recuperacion WHERE token = @token AND expiracion > GETDATE())
    BEGIN
        -- Token válido, actualizar la contraseña del usuario
        UPDATE usuarios
        SET contraseña = @nueva_contraseña
        WHERE correo = (SELECT correo FROM tokens_recuperacion WHERE token = @token)

        -- Eliminar el token usado
        DELETE FROM tokens_recuperacion WHERE token = @token;

        SELECT 
            'Contraseña actualizada con éxito.' AS Mensaje;
		Return;
    END
    ELSE
    BEGIN
        -- Token inválido o expirado
        SELECT 
            'Token inválido o expirado.' AS Mensaje;
			Return;
    END
END;
GO
