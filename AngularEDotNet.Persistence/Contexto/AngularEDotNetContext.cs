using AngularEDotNet.Domain.Entidades;
using Microsoft.EntityFrameworkCore;

namespace AngularEDotNet.Persistence.Contexto
{
    public class AngularEDotNetContext(DbContextOptions<AngularEDotNetContext> options) : DbContext(options)
    {
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Tarefa> Tarefas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>().HasIndex(u => u.Email).IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}
