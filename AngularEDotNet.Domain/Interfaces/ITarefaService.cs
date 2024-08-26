using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface ITarefaService : IBaseService<Tarefa>
    {
        Tarefa Concluir(Guid id);

        Task<Tarefa[]> GetByUsuarioId(Guid id);
    }
}
