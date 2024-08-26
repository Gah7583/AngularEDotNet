using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Persistence.Contexto;
using Microsoft.EntityFrameworkCore;

namespace AngularEDotNet.Infra.Data.Repositorio
{
    public class BaseRepository<TEntity>(AngularEDotNetContext context) : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        protected readonly AngularEDotNetContext _context = context;

        public async Task<bool> Delete(Guid id)
        {
            _context.Set<TEntity>().Remove(await Select(id));
            return (await _context.SaveChangesAsync()) > 0;
        }

        public void Insert(TEntity obj)
        {
            _context.Set<TEntity>().Add(obj);
            _context.SaveChanges();
        }

        public async Task<IList<TEntity>> SelectAsync() => await _context.Set<TEntity>().ToListAsync();

        public async Task<TEntity> Select(Guid id) => await _context.Set<TEntity>().FindAsync(id);

        public void Update(TEntity obj)
        {
            _context.Entry(obj).State = EntityState.Modified;
            _context.SaveChanges();
        }
    }
}
