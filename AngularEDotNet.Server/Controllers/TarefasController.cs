﻿using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Service.Validators;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularEDotNet.Server.Controllers
{
    [Route("api/[controller]/v{version:ApiVersion}")]
    [ApiController]
    [ApiVersion("1")]
    [Authorize("Bearer")]
    public class TarefasController(ITarefaService tarefaService) : ControllerBase
    {
        private readonly ITarefaService _tarefaService = tarefaService;

        // GET: Tarefa by id
        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(Tarefa))]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public async Task<IActionResult> GetByIdAsync(Guid id)
        {
            try
            {
                var tarefa = await _tarefaService.GetById(id);
                if (tarefa == null) return NotFound("Tarefa por Id não encontrado.");

                return Ok(tarefa);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar tarefa. Erro: {ex.Message}");
            }
        }

        // GET: Tarefa by usuarioId
        [HttpGet("usuario/{usuarioId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Tarefa>))]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public async Task<IActionResult> GetByUsuarioIdAsync(Guid usuarioId)
        {
            try
            {
                var tarefa = await _tarefaService.GetByUsuarioId(usuarioId);
                if (tarefa == null) return NotFound("Tarefas por id do usuário não encontrado.");

                return Ok(tarefa);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar tarefa. Erro: {ex.Message}");
            }
        }

        // POST: Tarefa
        [HttpPost]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public IActionResult Post(Tarefa model)
        {
            try
            {
                var tarefa = _tarefaService.Add<TarefaValidator>(model);
                if (tarefa == null) return BadRequest("Erro ao tentar adicionar tarefa.");

                return Ok(tarefa);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar adicionar tarefa. Erro: {ex.Message}");
            }
        }

        // PUT: Tarefa
        [HttpPut]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public IActionResult Put([Bind("Id,Nome,Descricao,DataDeRealizacao,Status,usuarioId")] Tarefa model)
        {
            try
            {
                var tarefa = _tarefaService.Update<TarefaValidator>(model);
                if (tarefa == null) return BadRequest("Erro ao tentar atualizar tarefa.");

                return Ok(tarefa);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar atualizar tarefa. Erro: {ex.Message}");
            }
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(200)]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public IActionResult Patch(Guid id)
        {
            var tarefa = _tarefaService.Concluir(id);
            return Ok(tarefa);
        }


        // DELETE: Tarefas/Delete/5

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(401)]
        [MapToApiVersion("1")]
        public async Task<IActionResult> DeleteAsync(Guid id)
        {
            try
            {
                return await _tarefaService.Delete(id) ? 
                    Ok() : 
                    BadRequest("Tarefa não deletada.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar tarefa. Erro: {ex.Message}");
            }
        }
    }
}
