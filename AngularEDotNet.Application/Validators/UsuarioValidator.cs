using AngularEDotNet.Domain.Entidades;
using FluentValidation;

namespace AngularEDotNet.Service.Validators
{
    public class UsuarioValidator : AbstractValidator<Usuario>
    {
        public UsuarioValidator() {
            RuleFor(c => c.Email)
                .NotEmpty().WithMessage("Por favor insira o e-mail")
                .NotNull().WithMessage("Por favor insira o e-mail")
                .EmailAddress().WithMessage("Precisa ser um e-mail válido")
                .MaximumLength(320).WithMessage("Máximo de 320 caracteres");

            RuleFor(c => c.Senha)
                .NotEmpty().WithMessage("Por favor insira a senha")
                .NotNull().WithMessage("Por favor insira a senha")
                .MinimumLength(8).WithMessage("Mínimo de 8 caracteres");
        }
    }
}
