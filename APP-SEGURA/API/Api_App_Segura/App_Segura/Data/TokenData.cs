using App_Segura.Models;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.Net;
using System.Net.Configuration;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;


namespace App_Segura.Data
{

    public class TokenData
    {
        // Generar Token de Recuperación
        public static ResultadoToken GenerarToken(TokenService oToken)
        {
            if (oToken.Correo == null)
            {
                throw new ArgumentNullException(nameof(oToken), "insertar el correo.");
            }
            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = $"EXECUTE sp_generar_token_recuperacion '{oToken.Correo}'";


            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                if (dr.Read())
                {
                    string mensaje = dr["Mensaje"].ToString();
                    string Nombre = dr["Nombre"].ToString();
                    string Token = dr["Token"].ToString();
                    bool success = mensaje == "Token de recuperación generado. Por favor, revisa tu correo.";
                    var Result = new ResultadoToken { Success = success, Mensaje = mensaje, Token = Token };

                    //ENVIAR EL Token al  CORREO o al Whatsapp de la persona para que lo pueda escribir para luego reestablecer la contraseña
                    if (success)
                    {
                        //obtener los datos del correo que configuramos en Web.config
                        var smtpSection = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
                        string strHost = smtpSection.Network.Host;
                        int port = smtpSection.Network.Port;
                        string struserName = smtpSection.Network.UserName;
                        string strpassword = smtpSection.Network.Password;

                        // Proporcionar la informacion de autenticacion de gmail
                        SmtpClient smtp = new SmtpClient(strHost, port);
                        MailMessage message = new MailMessage();

                        // Creamos el contenido del correo
                        message.From = new MailAddress(smtpSection.From, "APP SEGURA");
                        message.To.Add(new MailAddress(oToken.Correo));
                        message.Subject = "TOKEN DE RECUPERACION DE CLAVE";
                        message.IsBodyHtml = true;
                        message.Body = $@"
<div style='font-family: Arial, sans-serif; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;'>
  <div style='text-align: center; background-color: #2d89ed; padding: 20px; border-radius: 10px 10px 0 0;'>
      <img src='https://appsegura.netlify.app/img/logo.jpg' alt='APP SEGURA' style='width: 100px; border-radius: 50%; background-color: #fff; padding: 10px;'/>
      <h2 style='color: #fff; margin: 20px 0 0 0;'>Recuperación de Contraseña</h2>
  </div>
  <div style='background-color: #cff4fc; padding: 20px; border-radius: 0 0 10px 10px; text-align: center; '>
    <h3>Hola, {Nombre}</h3>
    <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
    <p style=""font-size: 12"">
      Haz Click en el siguiente boton para continuar o copia el Numero de Token
    </p>
        <div style='text-align: center; margin: 30px 0;'>
            <a href='https://appsegura.netlify.app/view/restablecercontrase%C3%B1a?token={Token}' 
               style='background-color: #007BFF; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;'>
               Restablecer Contraseña
            </a>
        </div>
      <p>Este token es válido solo por 1 hora.<br> Si no solicitaste este cambio, por favor ignora este correo.</p>
       <div style='text-align: center; margin: 20px 0;'>
          <span style='font-size: 25px; font-weight: bold; color: #28A745;'>{Token}</span>
        </div>
      <p style='text-align: center;'>¡Gracias por confiar en nosotros!</p>
        
        <div style='text-align: center; margin-top: 20px;'>
          <small style='color: #888;'>© 2024 APP SEGURA. Todos los derechos reservados.</small>
        </div>
</div>

</div>";


                        //enviamos el correo
                        smtp.Credentials = new NetworkCredential(struserName, strpassword);
                        smtp.EnableSsl = true;
                        smtp.Send(message);

                    }
                    return Result;
                }
                else
                {
                    return new ResultadoToken { Success = false, Mensaje = "Error al generar el Token. " };
                }
            }
            else
            {
                return new ResultadoToken { Success = false, Mensaje = "Error al ejecutar la consulta" };
            }
        }



        // Restablecer Contraseña
        public static ResultadoToken RestablecerContraseña(TokenService oToken)
        {
            if (oToken.Token == null)
            {
                throw new ArgumentNullException(nameof(oToken), "El token no puede estar vacio.");
            }

            // Encriptar la nueva contraseña en SHA-256
            string contraseñaEncriptada = ConvertToSha256(oToken.Contraseña);

            ConexionBD objEst = new ConexionBD();
            string sentencia = $"EXECUTE sp_restablecer_contraseña '', '{oToken.Token}', '{contraseñaEncriptada}'";


            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                if (dr.Read())
                {
                    string mensaje = dr["Mensaje"].ToString();
                    bool succes = mensaje == "Contraseña actualizada con éxito.";
                    return new ResultadoToken { Success = succes, Mensaje = mensaje };

                }
                else
                {
                    return new ResultadoToken { Success = false, Mensaje = "error al conectar a la base de datos " };
                }
            }
            else
            {
                return new ResultadoToken { Success = false, Mensaje = "Error al ejecutar la consulta" };
            }
        }




        // Convertir contraseña a SHA-256
        private static string ConvertToSha256(string input)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(input));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

    }

}
