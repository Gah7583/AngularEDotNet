using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;

namespace AngularEDotNet.Service.Services
{
    public class TarefaService(ITarefaRepository tarefaRepository) : BaseService<Tarefa>(tarefaRepository), ITarefaService
    {
        private readonly ITarefaRepository _tarefaRepository = tarefaRepository;

        public Tarefa? Concluir(Guid id)
        {
            var result = _tarefaRepository.Concluir(id);
            if (result != null)
            {
                return result;
            }
            return null;
        }

        public async Task<Tarefa[]> GetByUsuarioId(Guid id)
        {
            return await _tarefaRepository.GetTarefasByUsuarioId(id);
        }
    }
}
