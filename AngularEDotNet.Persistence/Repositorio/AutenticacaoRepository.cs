using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Infra.Data.Contexto;

namespace AngularEDotNet.Infra.Data.Repositorio
{
    public class AutenticacaoRepository(AngularEDotNetContext context) : IAutenticacaoRepository
    {
        private readonly AngularEDotNetContext _context = context;

        public Usuario? RefreshUserInfo(Usuario user)
        {
            if (!_context.Usuarios.Any(u => u.Id.Equals(user.Id))) return null;
            var result = _context.Usuarios.SingleOrDefault(p => p.Id.Equals(user.Id));
            if (result != null)
            {
                try
                {
                    _context.Entry(result).CurrentValues.SetValues(user);
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    throw;
                }
            }
            return result;
        }

        public bool RevokeToken(string userEmail)
        {
            var user = ValidateCredentials(userEmail);
            if (user == null) return false;
            user.RefreshToken = null;
            _context.SaveChanges();
            return true;
        }

        public Usuario? ValidateCredentials(Usuario usuario)
        {
            return _context.Usuarios.FirstOrDefault(u => (u.Email == usuario.Email) && (u.Senha == usuario.Senha));
        }

        public Usuario? ValidateCredentials(string userEmail)
        {
            return _context.Usuarios.SingleOrDefault(u => u.Email == userEmail);
        }
    }
}
