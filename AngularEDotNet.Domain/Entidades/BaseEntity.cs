using System.ComponentModel.DataAnnotations.Schema;

namespace AngularEDotNet.Domain.Entidades
{
    public abstract class BaseEntity
    {
        [Column("Id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
    }
}
