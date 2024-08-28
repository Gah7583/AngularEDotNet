namespace AngularEDotNet.Domain.Entidades
{
    public class Token(bool authenticated, string? created, string? expiration, string acessToken, string refreshToken)
    {
        public bool Authenticated { get; set; } = authenticated;
        public string? Created { get; set; } = created;
        public string? Expiration { get; set; } = expiration;
        public string AcessToken { get; set; } = acessToken;
        public string RefreshToken { get; set; } = refreshToken;
    }
}
