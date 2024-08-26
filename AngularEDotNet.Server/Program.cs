using AngularEDotNet.Domain.Entidades;
using AngularEDotNet.Domain.Interfaces;
using AngularEDotNet.Infra.Data.Repositorio;
using AngularEDotNet.Persistence.Contexto;
using AngularEDotNet.Service.Services;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<AngularEDotNetContext>(context => context.UseSqlServer
    (builder.Configuration.GetConnectionString("AngularEDotNetDB") 
    ?? throw new InvalidOperationException("Connection string 'ProEventosDB' not found")));

//App informations
var appName = "Angular e DotNet";
var appVersion = "v1";
var appDescription = "Aplicativo desenvolvido para teste de avaliação técnica ";

//JSON support
builder.Services.AddMvc(options =>
{
    options.FormatterMappings.SetMediaTypeMappingForFormat("json", MediaTypeHeaderValue.Parse("application/json"));
});

//CORS
builder.Services.AddCors(options => options.AddDefaultPolicy(builder =>
{
    builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

//Add services to the container.
builder.Services.AddControllers();

builder.Services.AddScoped<IBaseRepository<Usuario>, BaseRepository<Usuario>>();
builder.Services.AddScoped<IBaseService<Usuario>, BaseService<Usuario>>();
builder.Services.AddScoped<ITarefaService, TarefaService>();
builder.Services.AddScoped<ITarefaRepository, TarefaRepository>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc(appVersion, new OpenApiInfo
    {
        Title = appName,
        Version = appVersion,
        Description = appDescription,
        Contact = new OpenApiContact
        {
            Name = "Luís Gabriel Laurindo Maurício",
            Url = new Uri("https://github.com/Gah7583")
        }
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint($"/swagger/{appVersion}/swagger.json", $"{appName} - {appVersion}");
    });
}

app.UseHttpsRedirection();

//Swagger
var option = new RewriteOptions();
option.AddRedirect("^$", "swagger");
app.UseRewriter(option);

app.UseAuthorization();

app.MapControllers();
//Route HATEOAS
app.MapControllerRoute("DefaultApi", "{controller=values}/{id?}");


app.MapFallbackToFile("/index.html");

//CORS
app.UseCors();

app.Run();
