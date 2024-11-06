using ActiveUp.Net.WhoIs;
using App_Segura.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace App_Segura.Data
{
    public class EnlacesReportadosData
    {

        // funcionando todo 
        //Listar todos los reportes

        public static List<EnlacesReportados> Listar()
        {
            List<EnlacesReportados> oListaEnlacesReportados = new List<EnlacesReportados>();
            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = "EXECUTE sp_ver_enlaces_reportados";

            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                while (dr.Read())
                {
                    oListaEnlacesReportados.Add(new EnlacesReportados()
                    {

                        IdRep = Convert.ToInt32(dr["idrep"]),
                        Enlace = dr["enlace"].ToString(),
                        CantidadReportes = Convert.ToInt32(dr["cantidad_reportes"]),
                    });

                }
                return oListaEnlacesReportados;
            }
            else
            {
                return oListaEnlacesReportados;
            }
        }


        //Consultar un reporte por el enlace
        
        public static List<ResultadoReportes> VerReporte(EnlacesReportados oReporte)
        {
            if (oReporte.Enlace == null)
            {
                throw new ArgumentNullException(nameof(oReporte.Enlace), "insertar un enlace a reportar");
            }
            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = $"EXECUTE sp_listar_reportes '{oReporte.Enlace}'";
            List<ResultadoReportes> listaReportes = new List<ResultadoReportes>();

            if (objEst.Consultar(sentencia, false))
            {
                SqlDataReader dr = objEst.Reader;
                while (dr.Read())
                {
                    int IdRep = dr.GetInt32(dr.GetOrdinal("ReporteID"));
                    string Razon = dr["Razon"].ToString();
                    DateTime FechaReporte = dr.GetDateTime(dr.GetOrdinal("FechaReporte"));

                    var reporte = new ResultadoReportes
                    {
                        IdRep = IdRep,
                        Razon = Razon,
                        FechaReporte = FechaReporte
                    };


                    listaReportes.Add(reporte);
                }
             
            }
            return listaReportes;
        }




        }
}