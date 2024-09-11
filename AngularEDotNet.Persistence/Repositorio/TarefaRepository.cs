using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Persistence.Contexto;
using AngularEDotNet.Domain.Enums;
using AngularEDotNet.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AngularEDotNet.Infra.Data.Repositorio
{
    public class TarefaRepository(AngularEDotNetContext angularEDotNetContext) : BaseRepository<Tarefa>(angularEDotNetContext), ITarefaRepository
    {

        public Tarefa? Concluir(Guid id)
        {
            try
            {
                var tarefa = _context.Tarefas.Find(id);
                if (tarefa != null)
                {
                    tarefa.Status = Status.Concluido;
                    _context.SaveChanges();
                    return tarefa;
                }

                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error marking tarefa {id} concluida: {ex.Message}");
                throw;
            }
        }

        public async Task<Tarefa[]> GetTarefasByUsuarioId(Guid id)
        {
            Tarefa[] tarefas = await _context.Tarefas.OrderBy(t => t.DataDeRealizacao).Where(t => t.UsuarioId.Equals(id)).ToArrayAsync();
            return tarefas;
        }
    }
}
