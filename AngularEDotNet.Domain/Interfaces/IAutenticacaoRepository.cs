using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface IAutenticacaoRepository
    {
        Usuario ValidateCredentials(Usuario user);
        Usuario ValidateCredentials(string userEmail);
        bool RevokeToken(string userEmail);
        Usuario RefreshUserInfo(Usuario user);
    }
}
