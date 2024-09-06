using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Security.Claims;

namespace AngularEDotNet.Service.Services
{
    public class AutenticacaoService(TokenConfiguration configuration, IAutenticacaoRepository repository, ITokenService tokenService) : IAutenticacaoService
    {
        private const string DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
        private readonly TokenConfiguration _configuration = configuration;

        private readonly IAutenticacaoRepository _repository = repository;
        private readonly ITokenService _tokenService = tokenService;

        public bool RevokeToken(string userEmail)
        {
            return _repository.RevokeToken(userEmail);
        }

        public Tuple<Token, Guid>? ValidateCredentials(Usuario usuario)
        {
            var user = _repository.ValidateCredentials(usuario);
            if (user == null) return null;
            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString("N")),
                new(JwtRegisteredClaimNames.UniqueName, user.Email)
            };
            var acessToken = _tokenService.GenerateAccessToken(claims);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_configuration.DaysToExpiry);

            _repository.RefreshUserInfo(user);

            DateTime createDate = DateTime.Now;
            DateTime expirationDate = createDate.AddMinutes(_configuration.Minutes);

            Token token = new (true, createDate.ToString(DATE_FORMAT), expirationDate.ToString(DATE_FORMAT), acessToken, refreshToken);

            var userData = Tuple.Create(token, user.Id);

            return userData;
        }

        public Token ValidateCredentials(Token token)
        {
            var accessToken = token.AcessToken;
            var refreshToken = token.RefreshToken;

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken);

            var email = principal.Identity.Name;

            var user = _repository.ValidateCredentials(email);

            if (user == null ||
                refreshToken != user.RefreshToken ||
                user.RefreshTokenExpiryTime <= DateTime.Now)
                return null;

            accessToken = _tokenService.GenerateAccessToken(principal.Claims);
            refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;

            _repository.RefreshUserInfo(user);

            DateTime createDate = DateTime.Now;
            DateTime expirationDate = createDate.AddMinutes(_configuration.Minutes);

            return new Token(
                true,
                createDate.ToString(DATE_FORMAT),
                expirationDate.ToString(DATE_FORMAT),
                accessToken,
                refreshToken);
        }
    }
}
