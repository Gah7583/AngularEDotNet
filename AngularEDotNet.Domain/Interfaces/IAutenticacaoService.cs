using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface IAutenticacaoService
    {
        (string token, Guid userId) ValidateCredentials(Usuario usuario);
        Token ValidateCredentials(Token token);
        bool RevokeToken(string userEmail);
    }
}
