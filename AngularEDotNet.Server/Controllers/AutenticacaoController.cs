﻿using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AngularEDotNet.Server.Controllers
{
    [ApiVersion("1.0")]
    [Route("api/[controller]/v{version:ApiVersion}")]
    [ApiController]
    public class AutenticacaoController(IAutenticacaoService autenticacaoService) : ControllerBase
    {
        private readonly IAutenticacaoService _autenticacaoService = autenticacaoService;

        [HttpPost]
        [Route("signin")]
        public IActionResult SignIn([Bind("Email,Senha")] Usuario usuario)
        {
            if (usuario == null) return BadRequest("Requisição inválida");
            var token = _autenticacaoService.ValidateCredentials(usuario);
            return Ok(token);
        }

        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh([FromBody] Token token)
        {
            if (token is null) return BadRequest("Requisição inválida");
            var newToken = _autenticacaoService.ValidateCredentials(token);
            if (newToken == null) return BadRequest("Requisição inválida");
            return Ok(newToken);
        }

        [HttpGet]
        [Route("revoke")]
        [Authorize("Bearer")]
        public IActionResult Revoke()
        {
            if (User.Identity != null)
            {
                var userEmail = User.Identity.Name;
                if (userEmail != null)
                {
                    var result = _autenticacaoService.RevokeToken(userEmail);
                    if (!result) return BadRequest("Requisição inválida");
                }
            }
            return NoContent();
        }
    }
}
