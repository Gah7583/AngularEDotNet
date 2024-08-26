using AngularEDotNet.Domain.Entidades;

namespace AngularEDotNet.Domain.Interfaces
{
    public interface ITarefaRepository : IBaseRepository<Tarefa>
    {
        Tarefa Concluir(Guid id);

        Task<Tarefa[]> GetTarefasByUsuarioId(Guid id);
    }
}
