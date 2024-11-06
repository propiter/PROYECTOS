using App_Segura.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using System.Xml.Linq;

namespace App_Segura.Data
{
    public class UsuarioData
    {
        // Registrar Usuarios (Post)
        public static Resultado RegistrarUsuario(Usuario oUsuario)
        {
            // Hace parte de encriptar contraseña 

            if (oUsuario == null)
            {
                throw new ArgumentNullException(nameof(oUsuario), "el objeto usuario no puede ser null");
            }

            // Encriptar la contraseña en SHA-256
            oUsuario.Contraseña = ConvertToSha256(oUsuario.Contraseña);

            // Registrar Usuario
            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = "EXECUTE sp_crear_nuevo_usuario '" + oUsuario.Nombre + "','" + oUsuario.Apellido + "','" + oUsuario.Celular + "','" + oUsuario.Documento + "','" + oUsuario.Correo + "','" + oUsuario.Contraseña + "'";

            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                if (dr.Read())
                {
                    string mensaje = dr["Mensaje"].ToString();

                    bool success = mensaje == "Usuario registrado con éxito";

                    return new Resultado { Success = success, Mensaje = mensaje };



                }
                else
                {
                    return new Resultado { Success = false, Mensaje = "error al conectar a la base de datos" };
                }

            }
            else
            {
                return new Resultado { Success = false, Mensaje = "Error al ejecutar la consulta" };
            }
        }

        //Listar Usuarios (Get)
        public static List<Usuario> Listar()
        {
            List<Usuario> oListaUsuario = new List<Usuario>();
            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = "EXECUTE sp_ver_usuarios";

            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                while (dr.Read())
                {
                    oListaUsuario.Add(new Usuario()
                    {

                        Nombre = dr["nombre"].ToString(),
                        Apellido = dr["apellido"].ToString(),
                        Celular = dr["celular"].ToString(),
                        Documento = dr["documento"].ToString(),
                        Correo = dr["correo"].ToString(),


                    });
                }

                return oListaUsuario;
            }
            else
            {
                return oListaUsuario;
            }
        }

        // Validar Usuario Login (Post)
        public static Resultado ValidarUsuario(Usuario oLogin)
        {
            if (oLogin == null)
            {
                throw new ArgumentNullException(nameof(oLogin), "insertar usuario y contraseña");
            }

            //Encriptar la contraseña en SHA-256

            oLogin.Contraseña = ConvertToSha256(oLogin.Contraseña);

            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = $"EXECUTE sp_verificar_inicio_sesion '{oLogin.Correo}', '{oLogin.Contraseña}'";

            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                if (dr.Read())
                {
                    int idu;
                    if (int.TryParse(dr[0].ToString(), out idu) && idu > 0)
                    {

                        string Nombre = dr["nombre"].ToString();
                        string Apellido = dr["apellido"].ToString();
                        string Celular = dr["celular"].ToString();
                        string Documento = dr["documento"].ToString();
                        string Correo = dr["correo"].ToString();

                        return new Resultado { Success = true, Mensaje = "Inicio de sesión exitoso" };
                    }
                    else
                    {
                        return new Resultado { Success = false, Mensaje = "Credenciales inválidas" };
                    }

                }
                else
                {
                    return new Resultado { Success = false, Mensaje = "No se encontraron resultados" };
                }

            }
            else
            {
                return new Resultado { Success = false, Mensaje = "Error al consultar en la Base de Datos" };
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



















