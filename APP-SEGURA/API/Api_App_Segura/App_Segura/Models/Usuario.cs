using System;

namespace App_Segura.Models
{
    public class Usuario
    {

        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Celular { get; set; }
        public string Documento { get; set; }
        public string Correo { get; set; }
        public string Contraseña { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Codigo { get; set; }


    }
    public class Resultado
    {
        public bool Success { get; set; }
        public string Mensaje { get; set; }

    }
}