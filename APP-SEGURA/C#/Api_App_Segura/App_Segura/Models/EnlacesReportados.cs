using System;

namespace App_Segura.Models
{
    public class EnlacesReportados
    {
        public int IdRep { get; set; }
        public string Enlace { get; set; }
        public int CantidadReportes { get; set; }
    }

    public class ResultadoReportes
    {
        public int IdRep { get; set; }
        public string Razon { get; set; }
        public DateTime FechaReporte { get; set; }
    }
}