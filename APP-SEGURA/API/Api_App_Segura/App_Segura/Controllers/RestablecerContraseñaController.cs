using App_Segura.Data;
using App_Segura.Models;
using System.Web.Http;

namespace App_Segura.Controllers
{
    public class RestablecerContraseñaController : ApiController
    {
        [HttpPost]

        public ResultadoToken Post([FromBody] TokenService oToken)
        {

            return TokenData.RestablecerContraseña(oToken);

        }

    }
}