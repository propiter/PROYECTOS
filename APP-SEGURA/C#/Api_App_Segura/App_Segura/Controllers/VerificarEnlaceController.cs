using App_Segura.Data;
using App_Segura.Models;
using System.Web.Http;

namespace App_Segura.Controllers

{
    public class VerificarEnlaceController : ApiController

    {
        public ResultadoVerificacion Post([FromBody] EnlacesVerificados oVerificacion)
        {
            return EnlacesVerificadosData.VerificarEnlace(oVerificacion);

        }




    }

}