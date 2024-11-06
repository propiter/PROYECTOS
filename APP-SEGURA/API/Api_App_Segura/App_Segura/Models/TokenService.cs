namespace App_Segura.Models
{
    public class TokenService
    {
        public string Nombre { get; set; }
        public string Correo { get; set; }
        public string Token { get; set; }
        public string Contraseña { get; set; }


    }

    public class ResultadoToken
    {
        public bool Success { get; set; }
        public string Mensaje { get; set; }
        public string Token { get; set; }
    }


}