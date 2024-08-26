using AngularEDotNet.Domain.Entidades;
using FluentValidation;

namespace AngularEDotNet.Service.Validators
{
    public class TarefaValidator : AbstractValidator<Tarefa>
    {
        public TarefaValidator() {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("Por favor insira o nome.")
                .NotNull().WithMessage("Por favor insira o nome")
                .MaximumLength(100).WithMessage("Máximo de 100 caracteres");

            RuleFor(c => c.Descricao)
                .NotEmpty().WithMessage("Por favor insira a descrição")
                .NotNull().WithMessage("Por favor insira a descrição")
                .MaximumLength(200).WithMessage("Máximo de 200 caracteres");

            RuleFor(c => c.DataDeRealizacao)
                .NotEmpty().WithMessage("Por favor insira uma data de realização")
                .NotNull().WithMessage("Por favor insira uma data de realização");

            RuleFor(c => c.Status)
                .NotEmpty().WithMessage("Por favor insira o status da tarefa")
                .NotNull().WithMessage("Por favor insira o status da tarefa");
        }
    }
}
