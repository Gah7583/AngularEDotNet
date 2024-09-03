using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface IAutenticacaoService
    {
        Tuple<string, Guid>? ValidateCredentials(Usuario usuario);
        Token ValidateCredentials(Token token);
        bool RevokeToken(string userEmail);
    }
}
