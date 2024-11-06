using System;

namespace App_Segura.Models
{
    public class Reportar
    {
        public int Id { get; set; }
        public int IdRep { get; set; }
        public int IdUsuario { get; set; }
        public string Enlace { get; set; }
        public string RazonReporte { get; set; }
        public DateTime FechaReporte { get; set; }
    }


}