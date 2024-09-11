using AngularEDotNet.Domain.Entidades;
using FluentValidation;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface IBaseService<TEntity> where TEntity : BaseEntity
    {
        TEntity Add<TValidator>(TEntity obj) where TValidator : AbstractValidator<TEntity>;

        Task<bool> Delete(Guid id);

        Task<IList<TEntity>> Get();

        Task<TEntity?> GetById(Guid id);

        TEntity Update<TValidator>(TEntity obj) where TValidator : AbstractValidator<TEntity>;
    }
}
