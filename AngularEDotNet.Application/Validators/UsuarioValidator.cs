using AngularEDotNet.Domain.Entidades;
using FluentValidation;

namespace AngularEDotNet.Service.Validators
{
    public class UsuarioValidator : AbstractValidator<Usuario>
    {
        public UsuarioValidator() {
            RuleFor(u => u.Email)
                .NotEmpty().WithMessage("Por favor insira o e-mail")
                .NotNull().WithMessage("Por favor insira o e-mail")
                .EmailAddress().WithMessage("Precisa ser um e-mail válido")
                .MaximumLength(320).WithMessage("Máximo de 320 caracteres");

            RuleFor(u => u.Senha)
                .NotEmpty().WithMessage("Por favor insira a senha")
                .NotNull().WithMessage("Por favor insira a senha")
                .MinimumLength(8).WithMessage("Mínimo de 8 caracteres");

            RuleFor(u => u.Telefone)
                .MaximumLength(14).WithMessage("Máximo de 14 caracteres");
        }
    }
}
