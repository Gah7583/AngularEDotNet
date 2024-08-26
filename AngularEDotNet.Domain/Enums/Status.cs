using System.ComponentModel;

namespace AngularEDotNet.Domain.Enums
{
    public enum Status
    {
        [Description("Pendente")]
        Pendente = 1,
        [Description("Concluido")]
        Concluido = 2
    }
}
