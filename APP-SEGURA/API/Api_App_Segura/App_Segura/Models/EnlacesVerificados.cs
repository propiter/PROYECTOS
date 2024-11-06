namespace App_Segura.Models
{
    public class EnlacesVerificados
    {

        public string Enlace { get; set; }


    }
    public class ResultadoVerificacion
    {
        public bool Success { get; set; }
        public string Mensaje { get; set; }
        public string Enlace { get; set; }
        public bool EsSeguro { get; set; }
        public int CantidadConsultas { get; set; }
        public int CantidadReportes { get; set; }
    }

}