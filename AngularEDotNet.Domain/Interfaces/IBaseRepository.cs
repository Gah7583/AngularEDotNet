using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        void Insert(TEntity obj);

        void Update(TEntity obj);

        Task<bool> Delete(Guid id);

        Task<IList<TEntity>> SelectAsync();

        Task<TEntity> Select(Guid id);
    }
}
