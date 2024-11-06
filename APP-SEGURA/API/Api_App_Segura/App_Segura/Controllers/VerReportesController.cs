using App_Segura.Data;
using App_Segura.Models;
using System.Collections.Generic;
using System.Web;
using System.Web.Http;

namespace App_Segura.Controllers
{
    public class VerReportesController : ApiController
    {
        // GET api/<controller>
        [Route("api/VerReportes")]
        public List<EnlacesReportados> Get()
        {
            return EnlacesReportadosData.Listar();
        }


            // POST: api/VerReportes
            [HttpPost]
            [Route("api/VerReportes")]
            public IHttpActionResult Post([FromBody] EnlacesReportados oReporte)
            {
                var resultado = EnlacesReportadosData.VerReporte(oReporte);

                if (resultado != null)
                {
                    return Ok(resultado);
                }
                else
                {
                    return BadRequest("No se encontraron reportes para el enlace proporcionado.");
                }
            }

        }

}