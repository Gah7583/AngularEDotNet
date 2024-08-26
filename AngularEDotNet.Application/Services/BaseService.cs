using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using FluentValidation;

namespace AngularEDotNet.Service.Services
{
    public class BaseService<TEntity>(IBaseRepository<TEntity> baseRepository) : IBaseService<TEntity> where TEntity : BaseEntity
    {
        private readonly IBaseRepository<TEntity> _baseRepository = baseRepository;

        public TEntity Add<TValidator>(TEntity obj) where TValidator : AbstractValidator<TEntity>
        {
            BaseService<TEntity>.Validate(obj, Activator.CreateInstance<TValidator>());
            _baseRepository.Insert(obj);
            return obj;
        }

        public Task<bool> Delete(Guid id) => _baseRepository.Delete(id);

        public async Task<IList<TEntity>> Get() => await _baseRepository.SelectAsync();

        public async Task<TEntity> GetById(Guid id) => await _baseRepository.Select(id);

        public async Task<TEntity> Update<TValidator>(TEntity obj) where TValidator : AbstractValidator<TEntity>
        {
            BaseService<TEntity>.Validate(obj, Activator.CreateInstance<TValidator>());
            _baseRepository.Update(obj);
            return obj;
        }

        private static async void Validate(TEntity obj, AbstractValidator<TEntity> validator)
        {
            if (obj == null) throw new Exception("Registros não detectados!");
            validator.ValidateAndThrow(obj);
        }
    }
}
