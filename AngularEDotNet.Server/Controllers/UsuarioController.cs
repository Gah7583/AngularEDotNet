using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Service.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularEDotNet.Server.Controllers
{
    [Route("api/[controller]/v{version:ApiVersion}")]
    [ApiController]
    [ApiVersion("1")]
    public class UsuarioController(IBaseService<Usuario> usuarioService) : ControllerBase
    {
        private readonly IBaseService<Usuario> _usuarioService = usuarioService;

        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public IActionResult Post([Bind("Email,Senha")] Usuario model)
        {
            try
            {
                var usuario = _usuarioService.Add<UsuarioValidator>(model);
                if (usuario == null) return BadRequest("Erro ao tentar adicionar usuário.");

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar usuário. Erro: {ex.Message}");
            }
        }

        // GET: usuario by id
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [Authorize("Bearer")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            try
            {
                var usuario = await _usuarioService.GetById(id);
                if (usuario == null) return NotFound("Usuário por Id não encontrado.");

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar usuário. Erro: {ex.Message}");
            }
        }

        // PUT: Usuario
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        [Authorize("Bearer")]
        public IActionResult Put([Bind("")] Usuario model)
        {
            try
            {
                var usuario = _usuarioService.Update<UsuarioValidator>(model);
                if (usuario == null) return BadRequest("Erro ao tentar atualizar usuário.");

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar usuário. Erro: {ex.Message}");
            }
        }
    }
}
