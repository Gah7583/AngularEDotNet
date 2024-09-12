using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AngularEDotNet.Domain.Enums;

namespace AngularEDotNet.Domain.Entidades
{
    [Table("Usuarios")]
    public class Usuario : BaseEntity
    {
        [Column("Email")]
        [Required(ErrorMessage = "O email é obrigatório")]
        [MaxLength(320, ErrorMessage = "{0} deve ter no máximo 320 caracteres")]
        [DataType(DataType.EmailAddress, ErrorMessage = "O campo {0} precisa ser um e-mail válido")]
        public string Email { get; set; }

        [Column("Senha")]
        [Required(ErrorMessage = "A senha é obrigatório")]
        [MinLength(8, ErrorMessage = "Senha deve ter no mínimo 8 caracteres")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Column("Telefone")]
        [MaxLength(14, ErrorMessage = "{0} deve ter no máximo 14 caracteres")]
        [DataType(DataType.PhoneNumber, ErrorMessage = "O campo {0} está com número inválido")]
        public string? Telefone { get; set; }

        [Column("Data de Nascimento")]
        [Display(Name = "Data de Nascimento")]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}")]
        [DataType(DataType.Date)]
        public DateOnly? DataDeNascimento { get; set; }

        [Column("Genero")]
        public Genero? Genero { get; set; }

        [Column("Refresh Token")]
        public string? RefreshToken { get; set; }

        [Column("Refresh Token Expiry Time")]
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
