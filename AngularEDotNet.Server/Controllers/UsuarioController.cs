using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Service.Validators;
using Microsoft.AspNetCore.Mvc;

namespace AngularEDotNet.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController(IBaseService<Usuario> usuarioService) : ControllerBase
    {
        private readonly IBaseService<Usuario> _usuarioService = usuarioService;

        [HttpPost]
        public async Task<IActionResult> PostAsync([Bind("Email,Senha")] Usuario model)
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

        // GET: Tarefa by id
        [HttpGet("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
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
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPut]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> PutAsync([Bind("Id,Email,Senha,Telefone,DataDeNascimento,Genero")] Usuario model)
        {
            try
            {
                var usuario = await _usuarioService.Update<UsuarioValidator>(model);
                if (usuario == null) return BadRequest("Erro ao tentar atualizar usuário.");

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar usuário. Erro: {ex.Message}");
            }
        }

        // DELETE: Tarefas/Delete/5

        [HttpDelete]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            try
            {
                return await _usuarioService.Delete(id) ?
                    Ok("Deletado") :
                    BadRequest("Usuário não deletado.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar usuário. Erro: {ex.Message}");
            }
        }
    }
}
