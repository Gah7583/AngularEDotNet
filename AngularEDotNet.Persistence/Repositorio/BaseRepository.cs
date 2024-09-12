using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Infra.Data.Contexto;
using Microsoft.EntityFrameworkCore;

namespace AngularEDotNet.Infra.Data.Repositorio
{
    public class BaseRepository<TEntity>(AngularEDotNetContext context) : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly AngularEDotNetContext _context = context;

        public async Task<bool> Delete(Guid id)
        {
            var result = await Select(id);
            if (result != null)
            {
                _context.Set<TEntity>().Remove(result);
            }
            return (await _context.SaveChangesAsync()) > 0;
        }

        public void Insert(TEntity obj)
        {
            _context.Set<TEntity>().Add(obj);
            _context.SaveChanges();
        }

        public async Task<IList<TEntity>> SelectAsync() => await _context.Set<TEntity>().ToListAsync();

        public async Task<TEntity?> Select(Guid id)
        {
            var result = await _context.Set<TEntity>().FindAsync(id);
            if (result != null) return result;
            else return null;
        }

        public void Update(TEntity obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
