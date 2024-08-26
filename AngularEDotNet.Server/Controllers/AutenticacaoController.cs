using AngularEDotNet.Domain.Entidades;
using Microsoft.AspNetCore.Mvc;

namespace AngularEDotNet.Server.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        [HttpPost]
        [Route("signin")]
        public IActionResult SignIn([Bind("Email,Senha")] Usuario usuario)
        {
            if (usuario == null) return BadRequest("Usuário nulo");
            return Ok();
        }
    }
}
