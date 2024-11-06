using App_Segura.Data;
using App_Segura.Models;
using System.Web.Http;

namespace App_Segura.Controllers
{
    public class TokenController : ApiController
    {



        public ResultadoToken Post([FromBody] TokenService oToken)
        {
            return TokenData.GenerarToken(oToken);

        }

    }
}
