using App_Segura.Models;

namespace App_Segura.Data
{
    public class ReportarData
    {
        // Reportar Enlace (Post)
        public static Resultado ReportarEnlace(Reportar oReporte)
        {
            // Hace parte de encriptar contraseña 

            if (oReporte.Enlace == null)
            {
                return new Resultado { Success = false, Mensaje = "debes proporcionar una url para reportar" };

            }
            if (oReporte.RazonReporte == null)
            {
                return new Resultado { Success = false, Mensaje = "debes proporcionar una Razon por la cual estas reportando el enlace" };

            }


            ConexionBD objEst = new ConexionBD();
            string sentencia;
            sentencia = $"EXECUTE sp_reportar_enlace '{oReporte.Enlace}', '{oReporte.IdUsuario}', '{oReporte.RazonReporte}'";

            if (!objEst.EjecutarSentencia(sentencia, false))
            {

                objEst = null;
                return new Resultado { Success = false, Mensaje = "no se pudo reportar el enlace" };
            }
            else
            {
                objEst = null;
                return new Resultado { Success = true, Mensaje = "enlace reportado con exito" };
            }
        }













    }

}
