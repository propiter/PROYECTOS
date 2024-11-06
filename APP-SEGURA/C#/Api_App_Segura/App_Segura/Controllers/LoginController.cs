using App_Segura.Data;
using App_Segura.Models;
using System.Web.Http;

namespace App_Segura.Controllers
{

    public class LoginController : ApiController
    {


        // POST controller
        // POST api/<controller>
        public Resultado Post([FromBody] Usuario oLogin)
        {
            return UsuarioData.ValidarUsuario(oLogin);
        }

    }
}