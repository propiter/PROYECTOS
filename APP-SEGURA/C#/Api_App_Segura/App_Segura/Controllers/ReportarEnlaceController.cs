using App_Segura.Data;
using App_Segura.Models;
using System.Web.Http;

namespace App_Segura.Controllers
{
    public class ReportarEnlaceController : ApiController
    {

        // POST api/<controller>
        public IHttpActionResult Post([FromBody] Reportar oReporte)
        {
            var resultado = ReportarData.ReportarEnlace(oReporte);

            if (resultado.Success)
            {
                return Ok(resultado);
            }
            else
            {
                return BadRequest(resultado.Mensaje);
            }
        }

    }
}