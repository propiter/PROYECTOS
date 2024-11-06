using App_Segura.Data;
using App_Segura.Models;
using System.Collections.Generic;
using System.Web.Http;

namespace App_Segura.Controllers
{
    public class RegistroController : ApiController
    {
        // cambios
        // GET api/<controller>
        public List<Usuario> Get()
        {
            return UsuarioData.Listar();
        }



        // POST api/<controller>
        public Resultado Post([FromBody] Usuario oUsuario)
        {
            return UsuarioData.RegistrarUsuario(oUsuario);
        }





    }
}