using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AngularEDotNet.Domain.Enums;

namespace AngularEDotNet.Domain.Entidades
{
    [Table("Tarefas")]
    public class Tarefa : BaseEntity
    {
        [Column("Nome")]
        [Required(ErrorMessage = "Nome necessário.")]
        [StringLength(100)]
        public required string Nome { get; set; }

        [Column("Descricao")]
        [Required(ErrorMessage = "Descrição necessária.")]
        [StringLength(200)]
        public required string Descricao { get; set; }

        [Column("Data de Realizacao")]
        [Required(ErrorMessage = "Data de realização necessária.")]
        [Display(Name = "Data de Realizacao")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [DataType(DataType.Date)]
        public DateOnly DataDeRealizacao { get; set; }

        [Column("Status")]
        [Required(ErrorMessage = "Status necessário")]
        public Status Status { get; set; } = Status.Pendente;

        [Column("UsuarioId")]
        [Required(ErrorMessage = "Usuário necessário")]
        public Guid UsuarioId { get; set; }
    }
}
