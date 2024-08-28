using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface IAutenticacaoService
    {
        Token ValidateCredentials(Usuario usuario);
        Token ValidateCredentials(Token token);
        bool RevokeToken(string userEmail);
    }
}
